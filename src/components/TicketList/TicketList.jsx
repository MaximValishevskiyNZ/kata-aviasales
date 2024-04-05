import React, { useState } from 'react';
import './TicketList.css';
import { useSelector } from 'react-redux';
import {
  selectFilters,
  selectOrder,
  selectTickets,
} from '../../features/tickets.js';
import { format, parseISO } from 'date-fns';
import pluralize from 'pluralize-ru/index.js';

export default function TicketList() {
  const tickets = ticketsFiltering([...useSelector(selectTickets)]);
  const [ticketsShow, setTicketsShow] = useState(5);

  function ticketsFiltering(tickets) {
    const order = useSelector(selectOrder);
    const filter = useSelector(selectFilters).map((f) => {
      switch (f) {
        case 'Без пересадок':
          return 0;
        case '1 пересадка':
          return 1;
        case '2 пересадки':
          return 2;
        case '3 пересадки':
          return 3;
      }
    });
    let ticketsNew = tickets.filter((ticket) => {
      const stops =
        ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      return filter.includes(stops);
    });
    return sortTickets(ticketsNew, order);
  }

  function sortTickets(tickets, sortType) {
    if (sortType === 'a') {
      return tickets.sort((a, b) => a.price - b.price);
    } else if (sortType === 'b') {
      return tickets.sort((a, b) => {
        let totalDurationA = a.segments.reduce(
          (total, segment) => total + segment.duration,
          0,
        );
        let totalDurationB = b.segments.reduce(
          (total, segment) => total + segment.duration,
          0,
        );
        return totalDurationA - totalDurationB;
      });
    } else if (sortType === 'c') {
      return tickets.sort((a, b) => {
        let totalDurationA = a.segments.reduce(
          (total, segment) => total + segment.duration,
          0,
        );
        let totalDurationB = b.segments.reduce(
          (total, segment) => total + segment.duration,
          0,
        );
        let priceDurationRatioA = a.price * totalDurationA;
        let priceDurationRatioB = b.price * totalDurationB;
        return priceDurationRatioA - priceDurationRatioB;
      });
    }
  }

  function formatFlightTime(departureTime, flightDuration) {
    const departureDate = parseISO(departureTime);

    const arrivalDate = new Date(
      departureDate.getTime() + flightDuration * 60000,
    );

    const formattedDepartureTime = format(departureDate, 'HH:mm');
    const formattedArrivalTime = format(arrivalDate, 'HH:mm');

    return `${formattedDepartureTime} – ${formattedArrivalTime}`;
  }

  function formatMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  }

  return (
    <>
      {tickets.slice(0, ticketsShow).map((ticket) => (
        <div className="ticket">
          <div className="ticket__header">
            <span className="ticket__header--price">{ticket.price} P</span>
            <img
              className="ticket__header--logo"
              src={`//pics.avs.io/99/36/${ticket.carrier}.png`}
              alt="logo"
            />
          </div>
          {ticket.segments.map((segment) => (
            <div className="ticket__section">
              <div className="ticket__segment">
                <div className="ticket__segment--title">
                  {segment.origin} – {segment.destination}
                </div>
                <div className="ticket__segment--description">
                  {formatFlightTime(segment.date, segment.duration)}
                </div>
              </div>
              <div className="ticket__segment">
                <div className="ticket__segment--title">В пути</div>
                <div className="ticket__segment--description">
                  {formatMinutes(segment.duration)}
                </div>
              </div>
              <div className="ticket__segment">
                <div className="ticket__segment--title">
                  {pluralize(
                    segment.stops.length,
                    'Нет пересадок',
                    '%d Пересадка',
                    '%d Пересадки',
                    '$d Пересадок',
                  )}
                </div>
                <div className="ticket__segment--description">
                  {segment.stops.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div
        className="show-more"
        onClick={() => setTicketsShow(ticketsShow + 5)}
      >
        Показать еще 5 билетов!
      </div>
    </>
  );
}
