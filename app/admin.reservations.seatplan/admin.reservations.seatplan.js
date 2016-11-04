'use strict';

angular.module('ticketbox.admin.reservations.seatplan', [
    'ngRoute',
    'ticketbox.config',
    'ticketbox.components.api',
    'ticketbox.components.seatplan'])

    .config(function ($routeProvider) {
        $routeProvider.when('/event/:id/seatplan', {
            controller: 'ReservationsSeatplanCtrl',
            templateUrl: 'admin.reservations.seatplan/admin.reservations.seatplan.html'
        });
    })

    .service('draw', function (styles) {
        return {
            applySeatStyle: function (element, reservationState, isHovered) {
                var style = {};
                if (reservationState === 'free') {
                    style = styles.free;
                } else if (reservationState === 'ordered') {
                    style = styles.ordered;
                } else if (reservationState === 'sold') {
                    style = styles.sold;
                } else {
                    style = styles.free;
                }
                element.fill = style.background;
                element.stroke = style.stroke;
                element.opacity = style.opacity;
            }
        };
    })

    .service('handlers', function (draw) {
        return {
            draw: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, false);
            },
            click: function (eventid, seat, element) { },
            mouseenter: function (eventid, seat, element) { },
            mouseleave: function (eventid, seat, element) { }
        };
    })

    .controller('ReservationsSeatplanCtrl', function($scope, $routeParams, Event, Eventblock) {
        $scope.blocks = [];
        $scope.event = Event.get({ id: $routeParams.id });
        $scope.event.$promise
            .then(function() {
                _.each($scope.event.blocks, function(block) {
                    $scope.blocks.push(Eventblock.get({ id: block.id }));
                });
            });
    });