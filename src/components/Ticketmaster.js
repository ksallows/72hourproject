import React, { useState, useEffect } from "react";

const Ticketmaster = (props) => {
    const [ events, setEvents ] = useState([]);

    const fetchEvents = () => {
        fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json&latlong=${props.lat}${props.lng}?apikey=QBf3zwmOoGSNeHwcCIZohtcQvRTCQLqb`
        )
        .then((res) => res.json())
        .then((json) => console.log(json))
    }

    useEffect(() => {
        fetchEvents();
    })

    return(
        <>
        Ticketmaster
        </>
    );
};

export default Ticketmaster;