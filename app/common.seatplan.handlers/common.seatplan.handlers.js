'use strict';

angular.module('ticketbox.common.seatplan.handlers', [
    'ticketbox.config',
    'ticketbox.components.reserver'])

    .service('draw', function (styles) {
        return {
            applySeatStyle: function (element, reservationState, isHovered) {
                var style = {};
                if (reservationState === 'free') {
                    if (isHovered) {
                        style = styles.freeHover;
                    } else {
                        style = styles.free;
                    }
                } else if (reservationState === 'reservedbymyself') {
                    style = styles.reservedbymyself;
                } else if (reservationState === 'reserved') {
                    style = styles.reserved;
                } else if (reservationState === 'ordered') {
                    style = styles.reserved;
                } else if (reservationState === 'sold') {
                    style = styles.reserved;
                }
                element.fill = style.background;
                element.stroke = style.stroke;
                element.opacity = style.opacity;
            }
        };
    })

    .service('handlers', function (draw, reserver) {
        return {
            draw: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, false);
            },
            click: function (eventid, seat, element) {
                if (seat.state === 'free') {
                    reserver.reserve(eventid, seat);
                } else if (seat.state === 'reservedbymyself') {
                    reserver.release(seat);
                }
            },
            mouseenter: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, true);
            },
            mouseleave: function (eventid, seat, element) {
                draw.applySeatStyle(element, seat.state, false);
            }
        };
    });