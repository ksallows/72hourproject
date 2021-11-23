import React, { useState, useEffect } from "react";
import Geohash from 'latlon-geohash';
import TicketmasterDisplay from "./TicketmasterDisplay";

const Ticketmaster = (props) => {
    const [events, setEvents] = useState([]);
    const geohash = Geohash.encode(props.lat, props.lng, 4);

    const fetchEvents = async () => {
        const res = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geohash}&source=ticketmaster&sort=distance,asc&apikey=QBf3zwmOoGSNeHwcCIZohtcQvRTCQLqb`, { mode: 'cors' }
        );
        const json = await res.json();
        setEvents(json._embedded.events);
    }

    // useEffect(() => {
    //     setPageNum(0);
    //     fetchEvents();
    //     setFetchApi(true);

    //     return () => {
    //         setFetchApi(false);
    //         setEvents([]);
    //     }
    // }, [])

    useEffect(() => {
        if (props.lat !== '' && props.lng !== '') {
            ;
            fetchEvents();
        }
    }, [props.lng])

    return (
        <>
            <TicketmasterDisplay events={events} fetchEvents={fetchEvents} setEvents={setEvents} />
        </>
    );
};

export default Ticketmaster;