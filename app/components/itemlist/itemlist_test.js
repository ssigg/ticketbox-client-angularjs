'use strict';

describe('ticketbox.components.itemlist', function() {
    describe('itemListFactory', function() {
        var itemListFactory;

        beforeEach(module('ticketbox.components.itemlist'));

        beforeEach(inject(function(_itemListFactory_) {
            itemListFactory = _itemListFactory_;
        }));

        describe('create()', function() {
            it('should create the itemList with methods save(), cancel(), create(), delete()', function() {
                var resourceStub = { };
                var listStub = { };

                var itemList = itemListFactory.create(resourceStub, listStub);
                expect(itemList).toBeDefined();
                expect(itemList.save).toBeDefined();
                expect(itemList.cancel).toBeDefined();
                expect(itemList.create).toBeDefined();
                expect(itemList.delete).toBeDefined();
            });
        });

        describe('itemList', function() {
            var savedItemStub, resourceStub, listStub, resourceSaveSpy, resourceUpdateSpy, resourceDeleteSpy;
            beforeEach(function() {
                savedItemStub = { };
                resourceStub = {
                    save: function() { },
                    update: function() { },
                    delete: function() { }
                };
                var promiseStub = {
                    $promise: {
                        then: function(success) {
                            success(savedItemStub);
                        }
                    }
                };
                resourceSaveSpy = spyOn(resourceStub, 'save').and.returnValue(promiseStub);
                resourceUpdateSpy = spyOn(resourceStub, 'update').and.returnValue(promiseStub);
                resourceDeleteSpy = spyOn(resourceStub, 'delete').and.returnValue(promiseStub);
            });

            describe('save()', function() {
                it('should save the item if it is transient', function() {
                    var dataStub = { foo: 'bar' };
                    var listItem0Stub = { isTransient: true };
                    var listStub = [
                        listItem0Stub,
                        { id: 2, isTransient: false }
                    ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    expect(resourceSaveSpy).not.toHaveBeenCalled();
                    itemList.save(dataStub, listStub[0], resourceStub);
                    expect(resourceSaveSpy).toHaveBeenCalledWith(dataStub);
                });

                it('should update the item when it is saved', function() {
                    var dataStub = { foo: 'bar' };
                    var listItem0Stub = { isTransient: true };
                    var listStub = [
                        listItem0Stub,
                        { id: 2, isTransient: false }
                    ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    savedItemStub.id = 42;

                    expect(listItem0Stub.id).not.toBeDefined();
                    expect(listItem0Stub.isInEditMode).not.toBeDefined();
                    expect(listItem0Stub.isTransient).toEqual(true);
                    itemList.save(dataStub, listItem0Stub, resourceStub);
                    expect(listItem0Stub.id).toEqual(savedItemStub.id);
                    expect(listItem0Stub.isInEditMode).toEqual(false);
                    expect(listItem0Stub.isTransient).toEqual(false);
                });

                it('should update the item if it is not transient', function() {
                    var dataStub = { foo: 'bar' };
                    var listItem1Stub = { id: 2, isTransient: false };
                    var listStub = [
                        { isTransient: true },
                        listItem1Stub
                    ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    expect(resourceUpdateSpy).not.toHaveBeenCalled();
                    itemList.save(dataStub, listItem1Stub, resourceStub);
                    expect(resourceUpdateSpy).toHaveBeenCalledWith({ id: 2 }, dataStub);
                });

                it('should update the item when it is updated', function() {
                    var dataStub = { foo: 'bar' };
                    var listItem1Stub = { id: 2, isTransient: false };
                    var listStub = [
                        { isTransient: true },
                        listItem1Stub
                    ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    expect(listItem1Stub.isInEditMode).not.toBeDefined();
                    itemList.save(dataStub, listItem1Stub, resourceStub);
                    expect(listItem1Stub.isInEditMode).toEqual(false);
                });
            });

            describe('cancel()', function() {
                it('should reset the list', function() {
                    var listStub = [ 'a', 'b', 'c' ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    listStub.push('d');

                    expect(listStub).toContain('d');
                    itemList.cancel();
                    expect(listStub).not.toContain('d');
                });
            });

            describe('create()', function() {
                it('should add an item which is transient and in edit mode', function() {
                    var listStub = [ ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    expect(listStub.length).toEqual(0);
                    itemList.create({ foo: 'bar' });
                    expect(listStub.length).toEqual(1);
                    expect(listStub[0].isTransient).toEqual(true);
                    expect(listStub[0].isInEditMode).toEqual(true);
                });
            });

            describe('delete()', function() {
                it('should delete the item using the resource', function() {
                    var listStub = [ { id: 1 }, { id: 2 } ];
                    var itemList = itemListFactory.create(resourceStub, listStub);

                    expect(resourceDeleteSpy).not.toHaveBeenCalled();
                    var listItemToBeDeleted = listStub[0];
                    itemList.delete(listItemToBeDeleted);
                    expect(resourceDeleteSpy).toHaveBeenCalledWith({ id: listItemToBeDeleted.id });
                });
            });
        });
    });
});