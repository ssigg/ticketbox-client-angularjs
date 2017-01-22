'use strict';

describe('ticketbox.components.reserver', function() {
    describe('reserver', function() {
        var windowAlertSpy,
            translateStubSuccess,
            translateStubError,
            reserver,
            promiseContainerStubSuccess,
            promiseContainerStubError,
            reservationSaveSpy,
            reservationDeleteSpy,
            basketAddReservationSpy,
            basketRemoveReservationSpy;

        angular.module('pascalprecht.translate',[]);
        beforeEach(module('ticketbox.components.reserver', function($provide) {
            var windowStub = {
                alert: function() { }
            };
            windowAlertSpy = spyOn(windowStub, 'alert');
            $provide.value('$window', windowStub);

            var translateStub = function() {
                return {
                    then: function(success, error) {
                        translateStubSuccess = success;
                        translateStubError = error;
                    }
                }
            };
            $provide.value('$translate', translateStub);

            var reservationStub = {
                save: function() { },
                delete: function() { }
            };
            
            var promiseContainerStub = {
                '$promise':  {
                    'then': function(success, error) {
                        promiseContainerStubSuccess = success;
                        promiseContainerStubError = error;
                    }
                }
            };
            reservationSaveSpy = spyOn(reservationStub, 'save').and.returnValue(promiseContainerStub);
            reservationDeleteSpy = spyOn(reservationStub, 'delete').and.returnValue(promiseContainerStub);
            $provide.value('Reservation', reservationStub);
            
            var basketStub = {
                addReservation: function() { },
                removeReservation: function() { }
            };
            basketAddReservationSpy = spyOn(basketStub, 'addReservation');
            basketRemoveReservationSpy = spyOn(basketStub, 'removeReservation');
            $provide.value('basket', basketStub);
        }));

        beforeEach(inject(function(_reserver_) {
            reserver = _reserver_;
        }));

        describe('reserve()', function() {
            it('should create a reservation', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seat = {
                    'seat': { 'id': seatId }
                };
                var expectedReservation = {
                    event_id: eventId,
                    category_id: categoryId,
                    seat_id: seatId
                };                
                expect(reservationSaveSpy).not.toHaveBeenCalled();
                reserver.reserve(eventId, categoryId, seat);
                expect(reservationSaveSpy).toHaveBeenCalledWith(expectedReservation);
            });

            it('should update the seat when reservation was created successfully', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);

                var reservationId = 'r1';
                var reservationSaveDataStub = {
                    id: reservationId
                };

                expect(seatStub.state).toEqual(undefined);
                expect(seatStub.reservation_id).toEqual(undefined);
                promiseContainerStubSuccess(reservationSaveDataStub);
                expect(seatStub.state).toEqual('reservedbymyself');
                expect(seatStub.reservation_id).toEqual(reservationId);
            });

            it('should add the reservation to the basket when reservation was created successfully', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);
                
                var reservationId = 'r1';
                var reservationSaveDataStub = {
                    id: reservationId
                };

                expect(basketAddReservationSpy).not.toHaveBeenCalled();
                promiseContainerStubSuccess(reservationSaveDataStub);
                expect(basketAddReservationSpy).toHaveBeenCalledWith(reservationSaveDataStub);
            });

            it('should not add the reservation to the basket when reservation was not created successfully', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);

                var reservationSaveErrorResponseStub = {
                    status: 409
                };

                expect(basketAddReservationSpy).not.toHaveBeenCalled();
                promiseContainerStubError(reservationSaveErrorResponseStub);
                expect(basketAddReservationSpy).not.toHaveBeenCalled();
            });

            it('should inform the user with a translated alert message when reservation was not created successfully', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);

                var reservationSaveErrorResponseStub = {
                    status: 409
                };

                var translatedErrorMessage = 'translated error';
                expect(windowAlertSpy).not.toHaveBeenCalled();
                promiseContainerStubError(reservationSaveErrorResponseStub);
                expect(windowAlertSpy).not.toHaveBeenCalled();
                translateStubSuccess(translatedErrorMessage);
                expect(windowAlertSpy).toHaveBeenCalledWith(translatedErrorMessage);
            });

            it('should inform the user with the error message id when reservation was not created successfully and translation failed', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);

                var reservationSaveErrorResponseStub = {
                    status: 409
                };

                var errorMessageId = 'error message id';
                expect(windowAlertSpy).not.toHaveBeenCalled();
                promiseContainerStubError(reservationSaveErrorResponseStub);
                expect(windowAlertSpy).not.toHaveBeenCalled();
                translateStubError(errorMessageId);
                expect(windowAlertSpy).toHaveBeenCalledWith(errorMessageId);
            });

            it('should not inform the user when reservation was not created successfully and the status is not 409', function() {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seatStub = {
                    'seat': { 'id': seatId }
                };
                reserver.reserve(eventId, categoryId, seatStub);

                var reservationSaveErrorResponseStub = {
                    status: 42
                };

                var errorMessageId = 'error message id';
                expect(windowAlertSpy).not.toHaveBeenCalled();
                promiseContainerStubError(reservationSaveErrorResponseStub);
                expect(windowAlertSpy).not.toHaveBeenCalled();
                translateStubError(errorMessageId);
                expect(windowAlertSpy).not.toHaveBeenCalled();
            });
        });

        describe('release()', function() {
            it('should delete a reservation', function() {
                var reservationId = 'r1';
                var seatStub = {
                    'reservation_id': reservationId
                }
                expect(reservationDeleteSpy).not.toHaveBeenCalled();
                reserver.release(seatStub);
                expect(reservationDeleteSpy).toHaveBeenCalledWith({ 'id': reservationId });
            });

            it('should update the seat when the reservation is released', function() {
                var reservationId = 'r1';
                var seatStub = {
                    reservation_id: reservationId
                };
                reserver.release(seatStub);

                expect(seatStub.state).toEqual(undefined);
                expect(seatStub.reservation_id).toEqual(reservationId);
                promiseContainerStubSuccess();
                expect(seatStub.state).toEqual('free');
                expect(seatStub.reservation_id).toEqual(null);
            });

            it('should remove the reservationId from the basket when the reservation is released', function() {
                var reservationId = 'r1';
                var seatStub = {
                    reservation_id: reservationId
                };
                reserver.release(seatStub);

                expect(basketRemoveReservationSpy).not.toHaveBeenCalled();
                promiseContainerStubSuccess();
                expect(basketRemoveReservationSpy).toHaveBeenCalledWith(reservationId);
            });
        });

        describe('releaseReservation()', function() {
            it('should delete a reservation', function() {
                var reservationId = 'r1';
                var reservationStub = {
                    id: reservationId
                }

                expect(reservationDeleteSpy).not.toHaveBeenCalled();
                reserver.releaseReservation(reservationStub);
                expect(reservationDeleteSpy).toHaveBeenCalledWith({ 'id': reservationId });
            });

            it('should remove the reservationId from the basket when the reservation is released', function() {
                var reservationId = 'r1';
                var reservationStub = {
                    id: reservationId
                }
                reserver.releaseReservation(reservationStub);

                expect(basketRemoveReservationSpy).not.toHaveBeenCalled();
                promiseContainerStubSuccess();
                expect(basketRemoveReservationSpy).toHaveBeenCalledWith(reservationId);
            });
        });
    });
});
