'use strict';

angular.module('ticketbox.admin.events', [
    'ticketbox.components.api',
    'ticketbox.components.itemlist'])

    .directive('events', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'EventsCtrl',
            templateUrl: 'admin.events/admin.events.html'
        }
    })

    .controller('EventsCtrl', function($scope, Event, itemListFactory) {
        var list = null;

        $scope.events = Event.query(function() {
            list = itemListFactory.create(Event, $scope.events);
        });

        $scope.save = function(event) {
            var eventData = {
                'name': event.name,
                'location': event.location,
                'dateandtime': event.dateandtime
            };
            list.save(eventData, event);
        }

        $scope.cancel = function() {
            list.cancel();
        }

        $scope.create = function() {
            var newEvent = {
                'name': '',
                'location': '',
                'dateandtime': ''
            };
            list.create(newEvent);
        }

        $scope.delete = function(event) {
            if (confirm("Delete event " + event.name + "?")) {
                list.delete(event);
            }
        }
    })
    
    .filter('isAnyEventTransient', function() {
        return function(events) {
            if (events === undefined) {
                return false;
            } else {
                return !_.some(events, function(e) { return e.isTransient === true; })
            }
        }
    });