import React, { useEffect, useState } from "react";

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let time;
let hour;
let min;
let suffix;
let standardHour;

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

        if (event.dates.start.noSpecificTime === true) {
          time = 'No specific time:'
        } else if (event.dates.start.localTime === null) {
          time = 'No specific time'
        } else {
          time = event.dates.start.localTime.split(":");
          console.log(time);
          [ hour, min ] = time;
          suffix = Number(hour) >= 12 ? "PM" : "AM";
          standardHour = ((Number(hour) + 11) % 12) + 1;
        }

        console.log(event._embedded.venues[0].city.name, event._embedded.venues[0].name);

        return (
          <div key={event.id} className="eventDiv">
            <h3>{event.name}</h3>
            <img src={ratio43.url} alt={event.name} />
            <p>{event._embedded.venues[0].distance} miles away</p>
            {min === '00' ? <p>{month} {day}, {year} &nbsp; - &nbsp; {standardHour} {suffix}</p> : <p>{month} {day}, {year} &nbsp; - &nbsp; {standardHour}:{min} {suffix}</p>}
            <p>{event._embedded.venues[0].name}</p>
            <p>{event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name}, {event._embedded.venues[0].state.name}</p>
            <div id='buyTickets'>
                <a href={event.url} target='_blank'>Buy Tickets</a>
            </div>
          </div>
        );
      });
    };

    useEffect(() => {
      props.setFetchApi(true);
      props.fetchEvents();

      return () => {
        props.setFetchApi(false);
        props.setEvents([]);
      }
    }, [props.lng]);

    return(
        <>
        {eventMapper()}
        <button id='loadMore'>Load More Events</button>
        </>
    );
};

export default TicketmasterDisplay;