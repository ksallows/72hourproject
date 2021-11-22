import React, { useState, useEffect } from "react";
import Geohash from 'latlon-geohash';
import TicketmasterDisplay from "./TicketmasterDisplay";

const Ticketmaster = (props) => {
    const [ events, setEvents ] = useState([]);
    const geohash = Geohash.encode(props.lat, props.lng, 4);
    const [ fetchApi, setFetchApi ] = useState(false);

    const fetchEvents = async () => {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geohash}&source=ticketmaster&sort=distance,asc&apikey=QBf3zwmOoGSNeHwcCIZohtcQvRTCQLqb`
        );
        const json = await res.json();
        setEvents(json._embedded.events);
    }

    useEffect(() => {
        fetchEvents();
        setFetchApi(true);

        return () => {
            setFetchApi(false);
        }
    }, [])

    return(
        <>
        <TicketmasterDisplay events={events} fetchEvents={fetchEvents} fetchApi={fetchApi} setFetchApi={setFetchApi} />
        </>
    );
};

export default Ticketmaster;