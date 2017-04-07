'use strict';

describe('ticketbox.common.seatplan.handlers', function () {
    describe('handlers', function () {
        var handlers, applySeatStyleSpy, reserveSpy, releaseSpy;

        beforeEach(module('ticketbox.common.seatplan.handlers', function ($provide) {
            var draw = {
                applySeatStyle: function () { }
            };
            applySeatStyleSpy = spyOn(draw, 'applySeatStyle');
            $provide.value('draw', draw);

            var reserver = {
                reserve: function () { },
                release: function () { }
            };
            reserveSpy = spyOn(reserver, 'reserve');
            releaseSpy = spyOn(reserver, 'release');
            $provide.value('reserver', reserver);
        }));

        beforeEach(inject(function (_handlers_) {
            handlers = _handlers_;
        }));

        describe('draw()', function () {
            it('should use draw.applySeatStyle()', function () {
                var eventId = 'e1';
                var category = 'c1';
                var reservationState = 'free';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': null
                };
                var element = {};
                
                expect(applySeatStyleSpy).not.toHaveBeenCalled();
                handlers.draw(eventId, category, seat, element);
                expect(applySeatStyleSpy).toHaveBeenCalledWith(element, reservationState, category, false);
            });
        });

        describe('click()', function () {
            it('should reserve seat if the seat is free', function () {
                var eventId = 'e1';
                var category = { id: 'c1' };
                var reservationState = 'free';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': null
                };
                var element = undefined;

                expect(reserveSpy).not.toHaveBeenCalled();
                expect(releaseSpy).not.toHaveBeenCalled();
                handlers.click(eventId, category, seat, element, reservationState);
                expect(reserveSpy).toHaveBeenCalledWith(eventId, category.id, seat);
                expect(releaseSpy).not.toHaveBeenCalled();
            });

            it('should release the seat if the seat is reserved by myself', function () {
                var eventId = 'e1';
                var categoryId = 'c1';
                var reservationState = 'reservedbymyself';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': 'r1'
                };
                var element = undefined;

                expect(reserveSpy).not.toHaveBeenCalled();
                expect(releaseSpy).not.toHaveBeenCalled();
                handlers.click(eventId, categoryId, seat, element, reservationState);
                expect(reserveSpy).not.toHaveBeenCalled();
                expect(releaseSpy).toHaveBeenCalledWith(seat);
            });

            it('should do nothing if the seat is reserved', function () {
                var eventId = 'e1';
                var categoryId = 'c1';
                var reservationState = 'reserved';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': null
                };
                var element = undefined;

                expect(reserveSpy).not.toHaveBeenCalled();
                expect(releaseSpy).not.toHaveBeenCalled();
                handlers.click(eventId, categoryId, seat, element, reservationState);
                expect(reserveSpy).not.toHaveBeenCalled();
                expect(releaseSpy).not.toHaveBeenCalled();
            });
        });

        describe('mouseenter()', function () {
            it('should use draw.applySeatStyle()', function () {
                var eventId = 'e1';
                var category = 'c1';
                var reservationState = 'free';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': null
                };
                var element = {};

                expect(applySeatStyleSpy).not.toHaveBeenCalled();
                handlers.mouseenter(eventId, category, seat, element);
                expect(applySeatStyleSpy).toHaveBeenCalledWith(element, reservationState, category, true);
            });
        });

        describe('mouseleave()', function () {
            it('should use draw.applySeatStyle()', function () {
                var eventId = 'e1';
                var category = 'c1';
                var reservationState = 'free';
                var seat = {
                    'seat': { 'id': 's1' },
                    'state': reservationState,
                    'reservation_id': null
                };
                var element = {};

                expect(applySeatStyleSpy).not.toHaveBeenCalled();
                handlers.mouseleave(eventId, category, seat, element);
                expect(applySeatStyleSpy).toHaveBeenCalledWith(element, reservationState, category, false);
            });
        });
    });

    describe('draw', function () {
        var draw;

        angular.module('pascalprecht.translate',[]);

        beforeEach(module('ticketbox.common.seatplan.handlers', function ($provide) {
            var styles = {
                'free': {'background': 'fb', 'stroke': 'fs', 'opacity': 0.0},
                'freeHover': {'background': 'fhb', 'stroke': 'fhs', 'opacity': 0.1},
                'reserved': {'background': 'lb', 'stroke': 'ls', 'opacity': 0.2},
                'reservedbymyself': {'background': 'lbmsb', 'stroke': 'lbmss', 'opacity': 0.3}
            };
            $provide.value('styles', styles);
        }));

        beforeEach(inject(function (_draw_) {
            draw = _draw_;
        }));

        describe('applySeatStyle()', function () {
            it('should apply free style if state is free and it is not hovered', function () {
                var element = {};
                var reservationState = 'free';
                var category = {
                    color: 'fb'
                };
                var isHovered = false;
                draw.applySeatStyle(element, reservationState, category, isHovered);
                expect(element.fill).toEqual('fb');
                expect(element.stroke).toEqual('fs');
                expect(element.opacity).toEqual(0.0);
            });

            it('should apply freeHover style if state is free and it is hovered', function () {
                var element = {};
                var reservationState = 'free';
                var category = {
                    color: 'fhb'
                };
                var isHovered = true;
                draw.applySeatStyle(element, reservationState, category, isHovered);
                expect(element.fill).toEqual('fhb');
                expect(element.stroke).toEqual('fhs');
                expect(element.opacity).toEqual(0.1);
            });

            it('should apply reserved style if state is reserved and it is not hovered', function () {
                var element = {};
                var reservationState = 'reserved';
                var isHovered = false;
                draw.applySeatStyle(element, reservationState, isHovered);
                expect(element.fill).toEqual('lb');
                expect(element.stroke).toEqual('ls');
                expect(element.opacity).toEqual(0.2);
            });

            it('should apply reserved style if state is reserved and it is hovered', function () {
                var element = {};
                var reservationState = 'reserved';
                var isHovered = true;
                draw.applySeatStyle(element, reservationState, isHovered);
                expect(element.fill).toEqual('lb');
                expect(element.stroke).toEqual('ls');
                expect(element.opacity).toEqual(0.2);
            });

            it('should apply reservedbymyself style if state is reservedbymyself and it is not hovered', function () {
                var element = {};
                var reservationState = 'reservedbymyself';
                var isHovered = false;
                draw.applySeatStyle(element, reservationState, isHovered);
                expect(element.fill).toEqual('lbmsb');
                expect(element.stroke).toEqual('lbmss');
                expect(element.opacity).toEqual(0.3);
            });

            it('should apply reservedbymyself style if state is reservedbymyself and it is hovered', function () {
                var element = {};
                var reservationState = 'reservedbymyself';
                var isHovered = true;
                draw.applySeatStyle(element, reservationState, isHovered);
                expect(element.fill).toEqual('lbmsb');
                expect(element.stroke).toEqual('lbmss');
                expect(element.opacity).toEqual(0.3);
            });
        });
    });
});