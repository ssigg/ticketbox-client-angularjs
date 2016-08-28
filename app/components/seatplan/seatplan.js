'use strict';

angular.module('ticketbox.components.seatplan', ['ticketbox.components.canvas'])

    .factory('styles', function() {
        return {
            'free': { 'background': '#3f3', 'stroke': '1px solid #000', 'opacity': 0.2 },
            'freeHover': { 'background': '#282', 'stroke': '1px solid #000', 'opacity': 0.5 },
            'reserved': { 'background': '#000', 'stroke': '1px solid #000', 'opacity': 1 },
            'reservedbymyself': { 'background': '#f33', 'stroke': '1px solid #000', 'opacity': 0.4 }
        };
    })

    .service('handlers', function (draw, reserver) {
        return {
            draw: function (event, seat, element, reservationState) {
                draw.applySeatStyle(element, reservationState, false);
            },
            click: function (event, seat, element, reservationState) {
                if (reservationState === 'free') {
                    reserver.reserve(event.id, seat.seat.id);
                } else if (reservationState === 'reservedbymyself') {
                    reserver.release(seat.reservation_id);
                }
            },
            mouseenter: function (event, seat, element, reservationState) {
                draw.applySeatStyle(element, reservationState, true);
            },
            mouseleave: function (event, seat, element, reservationState) {
                draw.applySeatStyle(element, reservationState, false);
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

    .directive('ngSeatSelection', function (canvasImage, $rootScope, separator, coordinates, reservationState, handlers) {
        var currentPolygons = [];

        function _refreshSeats(scope, canvas, seats) {
            _.each(currentPolygons, function (p) {
                canvas.removeChild(p, false);
            });
            currentPolygons = [];

            _.each(seats, function (seat) {
                var polygon = _drawSeat(scope, canvas, seat.seat, seat.state);
                currentPolygons.push(polygon);
            });

            canvas.redraw();
        }

        function _drawSeat(scope, canvas, seat, reservationState) {
            var polygon = canvasImage.drawPolygon(canvas, coordinates.seatToCoordinates(seat), '#333', '2px #000');
            handlers.draw(scope.event, seat, polygon, reservationState);
            _bind(scope, polygon, seat, reservationState);
            return polygon;
        }

        function _bind(scope, element, seat, reservationState) {
            element.bind("click tap", function () {
                handlers.click(scope.event, seat, element, reservationState);
                element.redraw();
            });
            element.bind("mouseenter", function () {
                handlers.mouseenter(scope.event, seat, element, reservationState);
                element.redraw();
            });
            element.bind("mouseleave", function () {
                handlers.mouseleave(scope.event, seat, element, reservationState);
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
                event: '=',
                seats: '='
            },
            template: '<canvas id="ngSelectableImageCanvas"></canvas>',
            link: _create
        }
    });