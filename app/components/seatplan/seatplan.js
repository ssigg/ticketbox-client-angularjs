'use strict';

angular.module('ticketbox.components.seatplan', [
    'ticketbox.config',
    'ticketbox.components.canvas',
    'ticketbox.components.reserver'])

    .service('coordinates', function() {
        return {
            seatToCoordinates: function(seat) {
                return [
                    { x: seat.x0, y: seat.y0 },
                    { x: seat.x1, y: seat.y1 },
                    { x: seat.x2, y: seat.y2 },
                    { x: seat.x3, y: seat.y3 }
                ];
            }
        };
    })

    .service('handlers', function (draw, reserver) {
        return {
            draw: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, false);
            },
            click: function (eventid, seat, element) {
                if (seat.state === 'free') {
                    reserver.reserve(eventid, seat);
                } else if (seat.state === 'reservedbymyself') {
                    reserver.release(seat);
                }
            },
            mouseenter: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, true);
            },
            mouseleave: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, false);
            }
        };
    })

    .service('draw', function (styles) {
        return {
            applySeatStyle: function (element, reservationState, isHovered) {
                var style = {};
                if (reservationState === 'free') {
                    if (isHovered) {
                        style = styles.freeHover;
                    } else {
                        style = styles.free;
                    }
                } else if (reservationState === 'reservedbymyself') {
                    style = styles.reservedbymyself;
                } else if (reservationState === 'reserved') {
                    style = styles.reserved;
                } else if (reservationState === 'ordered') {
                    style = styles.reserved;
                }
                element.fill = style.background;
                element.stroke = style.stroke;
                element.opacity = style.opacity;
            }
        };
    })

    .directive('ngSeatSelection', function (canvasImage, $rootScope, coordinates, handlers) {
        var currentPolygons = [];

        function _refreshSeats(scope, canvas, seats) {
            _.each(currentPolygons, function (p) {
                canvas.removeChild(p, false);
            });
            currentPolygons = [];

            _.each(seats, function (seat) {
                var polygon = _drawSeat(scope, canvas, seat);
                currentPolygons.push(polygon);
            });

            canvas.redraw();
        }

        function _drawSeat(scope, canvas, seat) {
            var polygon = canvasImage.drawPolygon(canvas, coordinates.seatToCoordinates(seat.seat), '#333', '2px #000');
            handlers.draw(scope.eventid, seat, polygon);
            _bind(scope, polygon, seat);
            return polygon;
        }

        function _bind(scope, element, seat, reservationState) {
            element.bind("click tap", function () {
                handlers.click(scope.eventid, seat, element);
                element.redraw();
            });
            element.bind("mouseenter", function () {
                handlers.mouseenter(scope.eventid, seat, element);
                element.redraw();
            });
            element.bind("mouseleave", function () {
                handlers.mouseleave(scope.eventid, seat, element);
                element.redraw();
            });
        }

        function _create(scope, element, attrs) {
            var canvas = null;
            var seats = null;
            var canvasId = 'ngSelectableImageCanvas';

            scope.$watch('src', function (newSrc, oldSrc) {
                if (newSrc !== undefined) {
                    canvas = canvasImage.createCanvasObject(newSrc, canvasId);
                    if (seats !== null) {
                        _refreshSeats(scope, canvas, seats);
                    }
                }
            }, true);

            scope.$watch('seats', function (newSeats, oldSeats) {
                if (newSeats !== undefined) {
                    seats = newSeats;
                    if (canvas !== null) {
                        _refreshSeats(scope, canvas, newSeats);
                    }
                }
            }, true);
        }

        return {
            restrict: 'E',
            scope: {
                src: '=',
                eventid: '=',
                seats: '='
            },
            template: '<canvas id="ngSelectableImageCanvas"></canvas>',
            link: _create
        }
    });