import React, { useEffect } from "react";
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let time;
let hour;
let min;
let suffix;
let standardHour;
let info;
let venue;
let city;
let state;

const TicketmasterDisplay = (props) => {
  console.log(props.events);

  const eventMapper = () => {
    if (props.events !== []) {
      return props.events.map((event) => {
        let ratio43 = Object.values(event.images).find((ratio) => {
          return ratio.ratio === "4_3";
        });
        let date = event.dates.start.localDate.split('-');
        let [year, month, day] = date;
        if (month.startsWith('0')) {
          month = month.slice(1);
        }
        month = months[month - 1];
        if (day.startsWith('0')) {
          day = day.slice(1);
        }

        if (event.dates.start.noSpecificTime === true) {
          time = 'No specific time'
          standardHour = 'No time specified';
          suffix = '';
        } else if (event.dates.start.localTime === '') {
          time = 'No specific time'
          standardHour = 'No time specified';
          suffix = '';
        } else if (typeof event.dates.start.localTime !== 'undefined') {
          time = event.dates.start.localTime.split(":");
          [hour, min] = time;
          suffix = Number(hour) >= 12 ? "PM" : "AM";
          standardHour = ((Number(hour) + 11) % 12) + 1;
        }
        else {
          time = 'No time specified.'
        }

        if (typeof event._embedded.venues[0].name !== 'undefined') {
          venue = event._embedded.venues[0].name;
        } else {
          venue = 'No venue specified';
        }

        if (typeof event._embedded.venues[0].state !== 'undefined') {
          state = event._embedded.venues[0].state.name;
          console.log(`${event.name} State: ${state}`);
        } else {
          state = '';
        }

        if (typeof event._embedded.venues[0].city !== 'undefined') {
          city = event._embedded.venues[0].city.name;
          console.log(`${event.name} City: ${city}`);
        } else {
          city = '';
        }

        if (typeof event._embedded.venues[0].name !== 'undefined') {
          venue = event._embedded.venues[0].name;
        } else {
          venue = 'No venue specified';
        }

        if (typeof event._embedded.venues[0].state.name !== 'undefined') {
          state = event._embedded.venues[0].state.name;
        } else {
          state = '';
        }

        if (typeof info !== 'undefined') {
          info = event.info;
        } else {
          info = '';
        }

        return (

          <div key={event.id} className="eventDiv">
            <h3 className='eventName'>{event.name}</h3>
            <div className='eventFlex d-flex flex-row justify-content-between'>
              <div>
                <span className='badge'>{event._embedded.venues[0].distance} miles away</span>
                {min === '00' ?
                  <span className='badge'>{month} {day}, {year}</span> :
                  <span className='badge'>{month} {day}, {year}</span>
                }
                {min === '00' ?
                  <span className='badge'>{standardHour} {suffix}</span> :
                  <span className='badge'>{standardHour}:{min} {suffix}</span>
                }
                <span className='badge'>{event._embedded.venues[0].name}</span>
                <span className='badge'>{event._embedded.venues[0].address.line1}, {city}, {state}</span>
                <p className='info'>{info}</p>
              </div>
              <div>
                <img className='eventImage' src={ratio43.url} alt={event.name} />
                <a className='buyTickets' href={event.url} target='_blank'>Buy Tickets</a>
              </div>
            </div>
          </div>


        );
      });
    }
  };

  return (
    <>
      {eventMapper()}
    </>
  );
};

export default TicketmasterDisplay;