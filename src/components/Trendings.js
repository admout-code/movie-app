import React, { useEffect, useMemo, useReducer } from "react";
// import ShowCard from "./ShowCard";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import ShowList from "./ShowList";
import { showsReducer, initialState } from "./reducers";

export default function Trendings() {
    const { type } = useParams();

    const [state, dispatch] = useReducer(showsReducer, initialState);
    const { shows, loading, error } = state;

    const fetchData = async () => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
        try {
            let response = await fetch(url);
            const data = await response.json();
            if (data.results) dispatch({ type: "FETCH_SUCCESSFUL", payload: data.results });
            else dispatch({ type: "FETCH_FAILED", payload: "An error occurred" });
        } catch (error) {
            dispatch({ type: "FETCH_FAILED", payload: error });
        }
    };

    const trendingShows = shows.filter((show) => show.media_type === type); // TODO Wrap this in useMemo

    const showType = useMemo(() => (type === "movie" ? "Movies" : "Series"), [type]);

    useEffect(() => {
        dispatch({ type: "FETCH_STATED" });
        fetchData();
    }, [type]);

    if (!shows || error) return <div>{error}</div>;

    if (loading) return <Loading />;

    return (
        <Container>
            <h1>Trending {showType}</h1>
            <ShowList shows={trendingShows} />
        </Container>
    );
}

// Styles
const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem 1rem 2rem;
`;
