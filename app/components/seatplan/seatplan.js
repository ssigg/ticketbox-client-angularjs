'use strict';

angular.module('ticketbox.components.seatplan', [
    'ticketbox.config',
    'ticketbox.components.canvas'])

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
            handlers.draw(scope.eventid, scope.categoryid, seat, polygon);
            _bind(scope, polygon, seat);
            return polygon;
        }

        function _bind(scope, element, seat, reservationState) {
            element.bind("click tap", function () {
                handlers.click(scope.eventid, scope.categoryid, seat, element);
                element.redraw();
            });
            element.bind("mouseenter", function () {
                handlers.mouseenter(scope.eventid, scope.categoryid, seat, element);
                element.redraw();
            });
            element.bind("mouseleave", function () {
                handlers.mouseleave(scope.eventid, scope.categoryid, seat, element);
                element.redraw();
            });
        }

        function _create(scope, element, attrs) {
            var canvas = null;
            var seats = null;
            var canvas = element.children()[0];

            scope.$watch('src', function (newSrc, oldSrc) {
                if (newSrc !== undefined) {
                    canvas = canvasImage.createCanvasObject(newSrc, canvas);
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
                categoryid: '=',
                seats: '='
            },
            template: '<canvas></canvas>',
            link: _create
        }
    })
    
    .directive('ngMergedSeatSelection', function (canvasImage, $rootScope, coordinates, handlers) {
        var currentPolygons = [];

        function _refreshParts(scope, canvas, parts) {
            _.each(currentPolygons, function (p) {
                canvas.removeChild(p, false);
            });
            currentPolygons = [];

            _.each(parts, function(part) {
                _.each(part.seats, function(seat) {
                    var polygon = _drawSeat(scope, canvas, seat, part.category);
                    currentPolygons.push(polygon);
                });
            });

            canvas.redraw();
        }

        function _drawSeat(scope, canvas, seat, category) {
            var polygon = canvasImage.drawPolygon(canvas, coordinates.seatToCoordinates(seat.seat), '#333', '2px #000');
            handlers.draw(scope.eventid, category, seat, polygon);
            _bind(scope, polygon, seat, category);
            return polygon;
        }

        function _bind(scope, element, seat, category) {
            element.bind("click tap", function () {
                handlers.click(scope.eventid, category, seat, element);
                element.redraw();
            });
            element.bind("mouseenter", function () {
                handlers.mouseenter(scope.eventid, category, seat, element);
                element.redraw();
            });
            element.bind("mouseleave", function () {
                handlers.mouseleave(scope.eventid, category, seat, element);
                element.redraw();
            });
        }

        function _create(scope, element, attrs) {
            var canvas = null;
            var parts = null;
            var canvas = element.children()[0];

            scope.$watch('src', function (newSrc, oldSrc) {
                if (newSrc !== undefined) {
                    canvas = canvasImage.createCanvasObject(newSrc, canvas);
                    if (parts !== null) {
                        _refreshParts(scope, canvas, parts);
                    }
                }
            }, true);

            scope.$watch('parts', function (newParts, oldParts) {
                if (newParts !== undefined) {
                    parts = newParts;
                    if (canvas !== null) {
                        _refreshParts(scope, canvas, newParts);
                    }
                }
            }, true);
        }

        return {
            restrict: 'E',
            scope: {
                src: '=',
                eventid: '=',
                parts: '='
            },
            template: '<canvas></canvas>',
            link: _create
        }
    });