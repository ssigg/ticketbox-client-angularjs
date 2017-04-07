'use strict';

angular.module('ticketbox.common.seatplan.handlers', [
    'ticketbox.config',
    'ticketbox.components.reserver'])

    .service('draw', function (styles) {
        return {
            applySeatStyle: function (element, reservationState, category, isHovered) {
                var style = {};
                if (reservationState === 'free') {
                    if (isHovered) {
                        style = styles.freeHover;
                        style.background = category.color;
                    } else {
                        style = styles.free;
                        style.background = category.color;
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
            draw: function (eventid, category, seat, element) {
                draw.applySeatStyle(element, seat.state, category, false);
            },
            click: function (eventid, category, seat, element) {
                if (seat.state === 'free') {
                    reserver.reserve(eventid, category.id, seat);
                } else if (seat.state === 'reservedbymyself') {
                    reserver.release(seat);
                }
            },
            mouseenter: function (eventid, category, seat, element) {
                draw.applySeatStyle(element, seat.state, category, true);
            },
            mouseleave: function (eventid, category, seat, element) {
                draw.applySeatStyle(element, seat.state, category, false);
            }
        };
    });