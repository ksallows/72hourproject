import React, { useEffect } from "react";

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let time = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '9', '10', '11']

const TicketmasterDisplay = (props) => {
    console.log(props.events);

    const eventMapper = () => {
      return props.events.map((event) => {
        let ratio43 = Object.values(event.images).find((ratio) => {
          return ratio.ratio === "4_3";
        });

        let date = event.dates.start.localDate.split('-');
        let [ year, month, day ] = date;

        if (month.startsWith('0')) {
            month = month.slice(1);
        }
        month = months[month - 1];

        if (day.startsWith('0')) {
            day = day.slice(1);
        }

        let time = event.dates.start.localTime.split(':');
        let [ hour, min ] = time;
        let suffix = Number(hour) >= 12 ? 'PM' : 'AM';
        let standardHour = ((Number(hour) + 11) % 12 + 1);

        return (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <img src={ratio43.url} alt={event.name} />
            <p>{event._embedded.venues[0].distance} miles away</p>
            <p>{month} {day}, {year}</p>
            {min === '00' ? <p>{standardHour} {suffix}</p> : <p>{standardHour}:{min} {suffix}</p>}
            <p>{event._embedded.venues[0].name}</p>
            <p>{event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}</p>
            <a href={event.url} target='_blank'>Buy Tickets</a>
          </div>
        );
      });
    };

    useEffect(() => {
      props.fetchEvents();
    }, []);

    return(
        <>
        {eventMapper()}
        </>
    );
};

export default TicketmasterDisplay;