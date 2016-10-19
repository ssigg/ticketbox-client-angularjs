'use strict';

describe('ticketbox.admin.categories', function () {
    var scope,
    category,
    querySpy,
    queryCallback,
    itemListSaveSpy,
    itemListCancelSpy,
    itemListCreateSpy,
    itemListDeleteSpy,
    itemListFactoryCreateSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.admin.categories');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            category = {
                query: function() { }
            };
            querySpy = spyOn(category, 'query');
            queryCallback = querySpy.calls.argsFor(0);

            var itemList = {
                save: function() { },
                cancel: function() { },
                create: function() { },
                delete: function() { }
            };
            itemListSaveSpy = spyOn(itemList, 'save');
            itemListCancelSpy = spyOn(itemList, 'cancel');
            itemListCreateSpy = spyOn(itemList, 'create');
            itemListDeleteSpy = spyOn(itemList, 'delete');

            var itemListFactory = {
                create: function() { }
            };
            itemListFactoryCreateSpy = spyOn(itemListFactory, 'create').and.returnValue(itemList);

            $controller('CategoriesCtrl', {$scope: scope, Category: category, currency: '$', itemListFactory: itemListFactory});
        });
    });

    describe('CategoriesCtrl', function () {
        describe('$scope.categories', function () {
            it('should fetch all categories and initialize itemList with them', function () {
                expect(querySpy).toHaveBeenCalledWith(jasmine.any(Function));
                var callback = category.query.calls.argsFor(0)[0];

                expect(itemListFactoryCreateSpy).not.toHaveBeenCalled();
                callback();
                expect(itemListFactoryCreateSpy).toHaveBeenCalledWith(category, scope.categories);
            });
        });

        describe('$scope.save()', function () {
            it('should use the itemList to save the category', function () {
                var categoryObject = {
                    'name': 'name',
                    'price': 'price',
                    'price_reduced': 'price_reduced',
                    'foo': 'foo',
                    'bar': 'bar'
                };
                var categoryData = {
                    'name': categoryObject.name,
                    'price': categoryObject.price,
                    'price_reduced': categoryObject.price_reduced
                };

                // create the itemList
                category.query.calls.argsFor(0)[0]();

                expect(itemListSaveSpy).not.toHaveBeenCalled();
                scope.save(categoryObject);
                expect(itemListSaveSpy).toHaveBeenCalledWith(categoryData, categoryObject);
            });
        });

        describe('$scope.cancel()', function () {
            it('should use the itemList to cancel the category', function () {
                // create the itemList
                category.query.calls.argsFor(0)[0]();

                expect(itemListCancelSpy).not.toHaveBeenCalled();
                scope.cancel();
                expect(itemListCancelSpy).toHaveBeenCalled();
            });
        });

        describe('$scope.create()', function () {
            it('should use the itemList to create a category', function () {
                // create the itemList
                category.query.calls.argsFor(0)[0]();

                var categoryData = {
                    'name': '',
                    'price': '',
                    'price_reduced': ''
                };

                expect(itemListCreateSpy).not.toHaveBeenCalled();
                scope.create();
                expect(itemListCreateSpy).toHaveBeenCalledWith(categoryData);
            });
        });
    });
});