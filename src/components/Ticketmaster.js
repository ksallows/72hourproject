import React, { useState, useEffect } from "react";
import Geohash from 'latlon-geohash';

const Ticketmaster = (props) => {
    const [ events, setEvents ] = useState([]);
    const geohash = Geohash.encode(props.lat, props.lng, 4);

    const fetchEvents = () => {
        fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geohash}&source=ticketmaster&apikey=QBf3zwmOoGSNeHwcCIZohtcQvRTCQLqb`
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