'use strict';

angular.module('ticketbox.components.itemlist', [ ])
    .service('itemListFactory', function() {
        return {
            create: function (resource, list) {
                var _resource = resource;
                var _list = list;
                var _persistedList = _.map(list, _.clone);

                return {
                    save: function(data, item, resource) {
                        if (item.isTransient) {
                            _resource.save(data)
                                .$promise.then(function(savedItem) {
                                    item.id = savedItem.id;
                                    item.isInEditMode = false;
                                    item.isTransient = false;
                                    _updatePersistedList();
                                });
                        } else {
                            _resource.update({ 'id': item.id }, data)
                                .$promise.then(function() {
                                    item.isInEditMode = false;
                                    _updatePersistedList();
                                });
                        }
                    },

                    cancel: function() {
                        _list.length = 0;
                        _.each(_persistedList, function(pi) {
                            _list.push(_.clone(pi));
                        });
                    },

                    create: function(data) {
                        data.isTransient = true;
                        data.isInEditMode = true;
                        _list.push(data);
                    },

                    delete: function(item, resource) {
                        _resource.delete({ 'id': item.id })
                            .$promise.then(function() {
                                var indexOfItemToBeRemoved = _list.indexOf(item);
                                _list.splice(indexOfItemToBeRemoved, 1);
                                _updatePersistedList();
                            });
                    }
                };

                function _updatePersistedList() {
                    _persistedList = _.map(_list, _.clone);
                }
            }
        }
    });