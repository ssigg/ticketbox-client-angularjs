'use strict';

angular.module('ticketbox.admin.block.seats', [
    'ngRoute',
    'ticketbox.components.api',
    'ticketbox.components.canvas'])

    .config(function ($routeProvider) {
        $routeProvider.when('/block/:id/seats', {
            controller: 'BlockSeatsCtrl',
            templateUrl: 'admin.block.seats/admin.block.seats.html'
        });
    })

    .controller('BlockSeatsCtrl', function($scope, $routeParams, $location, $q, Block, Seat, geometry) {
        $scope.block = Block.get({ id: $routeParams.id });
        $scope.seats = Seat.query({ block_id: $routeParams.id });
        _resetState();

        $scope.add = function (block_id, namePattern, startNumber, endNumber, coordinates) {
            var newSeats = [];
            for (var seatNumber = startNumber; seatNumber <= endNumber; seatNumber += 1) {
                var name = '';
                if (namePattern.indexOf('{i}') !== -1) {
                    name = namePattern.replace('{i}', seatNumber);
                } else {
                    name = namePattern;
                }
                var data = {'block_id': block_id, 'name': name};
                if (coordinates.length === 4) {
                    var seatCoordinates = geometry.calculateSeatCoordinates(coordinates, endNumber - startNumber + 1, seatNumber - startNumber);
                    data.x0 = seatCoordinates.x0;
                    data.y0 = seatCoordinates.y0;
                    data.x1 = seatCoordinates.x1;
                    data.y1 = seatCoordinates.y1;
                    data.x2 = seatCoordinates.x2;
                    data.y2 = seatCoordinates.y2;
                    data.x3 = seatCoordinates.x3;
                    data.y3 = seatCoordinates.y3;
                }
                newSeats.push(data);
            }
            Seat.save(newSeats)
                .$promise.then(function(response) {
                    $scope.seats.push(response);
                    _resetState();
                });
        };

        $scope.removeAll = function() {
            var promises = _.map($scope.seats, function(seat) {
                return Seat.delete({ id: seat.id });
            });
            $q.all(promises).then(function() {
                $scope.seats = Seat.query({ block_id: $routeParams.id });
                _resetState();
            });
        };

        function _resetState() {
            $scope.namePattern = '';
            $scope.startSeatNumber = 1;
            $scope.endSeatNumber = 1;
            $scope.coordinates = [];
        }
    })

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

    .service('geometry', function() {
        return {
            calculateSeatCoordinates: function(coordinates, numberOfSeats, seatIndex) {
                var dx01 = coordinates[1].x - coordinates[0].x;
                var dy01 = coordinates[1].y - coordinates[0].y;
                var dx32 = coordinates[2].x - coordinates[3].x;
                var dy32 = coordinates[2].y - coordinates[3].y;
                var seatCoordinates = {};
                seatCoordinates.x0 = coordinates[0].x + (dx01 / numberOfSeats) * seatIndex;
                seatCoordinates.y0 = coordinates[0].y + (dy01 / numberOfSeats) * seatIndex;
                seatCoordinates.x1 = coordinates[3].x + (dx32 / numberOfSeats) * seatIndex;
                seatCoordinates.y1 = coordinates[3].y + (dy32 / numberOfSeats) * seatIndex;
                seatCoordinates.x2 = coordinates[3].x + (dx32 / numberOfSeats) * (seatIndex + 1);
                seatCoordinates.y2 = coordinates[3].y + (dy32 / numberOfSeats) * (seatIndex + 1);
                seatCoordinates.x3 = coordinates[0].x + (dx01 / numberOfSeats) * (seatIndex + 1);
                seatCoordinates.y3 = coordinates[0].y + (dy01 / numberOfSeats) * (seatIndex + 1);
                return seatCoordinates;
            }
        }
    })

    .directive('ngSeatDefinition', function (canvasImage, coordinates) {
        var coordinateMarkers = [];
        var currentPolygons = [];
        var selectedCoordinates;

        function _refreshSeats(canvas, seats) {
            _.each(currentPolygons, function (p) {
                canvas.removeChild(p, false);
            });
            currentPolygons = [];
            _.each(seats, function (seat) {
                var polygon = canvasImage.drawPolygon(canvas, coordinates.seatToCoordinates(seat), '#333', '2px #000');
                currentPolygons.push(polygon);
            });
            canvas.redraw();
        }

        function _bindClick(canvas) {
            canvas.bind("click tap", function () {
                if (selectedCoordinates.length < 4) {
                    var circle = canvasImage.drawCoordinate(canvas);
                    var point = {x: circle.x, y: circle.y};
                    coordinateMarkers.push({ point: point, marker: circle });
                    selectedCoordinates.push(point);
                }
            });
        }

        function _create(scope, element, attrs) {
            selectedCoordinates = scope.coordinates;
            var canvas = null;
            var canvasId = 'ngClickableImageCanvas';

            scope.$watch('src', function (newSrc, oldSrc) {
                if (newSrc !== undefined) {
                    canvas = canvasImage.createCanvasObject(newSrc, canvasId);
                    _bindClick(canvas);
                }
            }, true);

            scope.$watch('seats', function (newSeats, oldSeats) {
                if (canvas !== null) {
                    _refreshSeats(canvas, newSeats);
                }
            }, true);

            scope.$watch('coordinates', function (newCoordinates, oldCoordinates) {
                selectedCoordinates = newCoordinates;
                var removedCoordinates = _.filter(oldCoordinates, function(c) { return !_.contains(newCoordinates, c); });
                _.each(removedCoordinates, function(c) {
                    var coordinateMarker = _.find(coordinateMarkers, function(m) { return m.point.x === c.x && m.point.y === c.y; });
                    if (coordinateMarker !== undefined) {
                        if (canvas !== null) {
                            canvas.removeChild(coordinateMarker.marker);
                        }
                        coordinateMarkers.splice(coordinateMarker, 1);
                    }
                });
            }, true);
        }

        return {
            restrict: 'E',
            scope: {
                src: '=',
                seats: '=',
                coordinates: '='
            },
            template: '<canvas id="ngClickableImageCanvas"></canvas>',
            link: _create
        }
    });