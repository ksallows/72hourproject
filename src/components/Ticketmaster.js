import React, { useState, useEffect } from "react";
import Geohash from 'latlon-geohash';
import TicketmasterDisplay from "./TicketmasterDisplay";

const Ticketmaster = (props) => {
    const [ events, setEvents ] = useState([]);
    const geohash = Geohash.encode(props.lat, props.lng, 4);
    const [ fetchApi , setFetchApi ] = useState(false);
    const [ pageNum, setPageNum ] = useState(0);
    const [ totalPageNum, setTotalPageNum ] = useState(0);

    const fetchEvents = async () => {
        const res = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${geohash}&page=${pageNum}&source=ticketmaster&sort=distance,asc&apikey=QBf3zwmOoGSNeHwcCIZohtcQvRTCQLqb`, {mode: 'cors'}
        );
        const json = await res.json();
        setEvents(json._embedded.events);
    }

    const loadMore = () => {
        if (pageNum <= totalPageNum) {

        }
    }

    useEffect(() => {
        setPageNum(0);
        fetchEvents();
        setFetchApi(true);

        return () => {
            setFetchApi(false);
            setEvents([]);
        }
    }, [])

    return(
        <>
        <TicketmasterDisplay events={events} fetchEvents={fetchEvents} setFetchApi={setFetchApi} setEvents={setEvents} />
        </>
    );
};

export default Ticketmaster;