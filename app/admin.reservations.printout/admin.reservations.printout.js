'use strict';

angular.module('ticketbox.admin.reservations.printout', [
    'ngRoute',
    'ticketbox.components.api'])

    .config(function ($routeProvider) {
        $routeProvider.when('/event/:id/reservations', {
            controller: 'ReservationsPrintoutCtrl',
            templateUrl: 'admin.reservations.printout/admin.reservations.printout.html'
        });
    })

    .controller('ReservationsPrintoutCtrl', function($scope, $routeParams, $q,  Reservation, Event, Order, BoxofficePurchase, Seat, currency) {
        $scope.currency = currency;

        var event = Event.get({ id: $routeParams.id }).$promise;
        var reservations = Reservation.query().$promise;
        var orders = Order.query().$promise;
        var boxofficePurchases = BoxofficePurchase.query().$promise;
        var seats = Seat.query().$promise;

        $q.all([ event, reservations, orders, boxofficePurchases, seats ]).then(function(data) {
            var eventObject = data[0];
            var reservationList = data[1];
            var orderList = data[2];
            var boxofficePurchaseList = data[3];
            var seatList = data[4];
            $scope.eventAggregate = {
                event: eventObject,
                reservations: _getOrders(eventObject, reservationList, orderList, seatList, _filterReservations),
                boxofficePurchases: _getBoxofficePurchases(eventObject, reservationList, seatList)
            };
        });

        function _getOrders(eventObject, reservationList, orderList, seatList, filter) {
            return _.map(
                _.groupBy(
                    _.filter(
                        reservationList,
                        function(r) { return filter(r, eventObject.id); }
                    ),
                    function(r) { return r.order_id; }
                ),
                function(reservations, key) {
                    var reservationsAggregate = _addPrices(eventObject, _addSeats(reservations, seatList));
                    return {
                        metaData: _getOrder(reservations[0].order_id, orderList, reservationsAggregate),
                        reservations: reservationsAggregate
                    }
                }
            );
        };

        function _getBoxofficePurchases(eventObject, reservationList, seatList) {
            return _addPrices(
                eventObject,
                _addSeats(
                    _.filter(
                        reservationList,
                        function(r) { return _filterBoxofficePurchases(r, eventObject.id); }
                    ),
                    seatList)
            );
        };

        function _filterReservations(reservation, event_id) {
            return reservation.event_id === event_id && reservation.order_id !== null && reservation.order_kind === 'reservation';
        };

        function _filterBoxofficePurchases(reservation, event_id) {
            return reservation.event_id === event_id && reservation.order_id !== null && reservation.order_kind === 'boxoffice-purchase';
        };

        function _getOrder(order_id, orders, reservationsAggregate) {
            return {
                order: _.find(orders, function(o) { return o.id === order_id }),
                totalPrice: _.reduce(reservationsAggregate, function(memo, r) { return memo + r.price; }, 0)
            };
        };

        function _addSeats(reservations, seatList) {
            return _.map(reservations, function(r) {
                return {
                    reservation: r,
                    seat: _.find(seatList, function(s) { return s.id === r.seat_id; })
                };
            });
        };

        function _addPrices(eventObject, reservationsWithSeats) {
            return _.map(reservationsWithSeats, function(rws) {
                var category = _getCategory(eventObject, rws);
                return {
                    price: rws.reservation.is_reduced ? category.price_reduced : category.price,
                    reservation: rws.reservation,
                    seat: rws.seat
                };
            });
        };

        function _getCategory(eventObject, reservationWithSeat) {
            return _.find(eventObject.blocks, function(b) { return b.block.id === reservationWithSeat.seat.block_id; }).category;
        }
    })