import React, { useEffect, useState, useReducer } from "react";
import { useParams } from "react-router-dom";
import SortBy from "./SortBy";
import styled from "styled-components";
import Loading from "./Loading";
import ShowList from "./ShowList";
import { showsReducer, initialState } from "./reducers";

const options = [
    { value: "popularity.desc", text: "popularity" },
    { value: "release.date", text: "release date" },
    { value: "vote_average.desc", text: "vote average" },
];

export default function ShowsDiscover() {
    const { id, type } = useParams();
    const [sortby, setSortby] = useState(options[0].value);
    const [page, setPage] = useState(1);

    const [state, dispatch] = useReducer(showsReducer, initialState);
    const { shows, loading, error } = state;

    const fetchData = async () => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=en-US&sort_by=${sortby}&include_adult=false&include_video=false&page=${page}&with_genres=${id}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results) dispatch({ type: "FETCH_SUCCESSFUL", payload: data.results });
            else dispatch({ type: "FETCH_FAILED", payload: "An error occured" });
        } catch (error) {
            dispatch({ type: "FETCH_FAILED", payload: error });
        }
    };

    const handleChange = (e) => {
        setSortby(e.target.value);
        dispatch({ type: "RESET_SHOWS" });
        setPage(1);
    };

    const handleClick = () => {
        setPage((page) => page + 1);
    };

    useEffect(() => {
        dispatch({ type: "RESET_SHOWS" });
    }, [id, type]);

    useEffect(() => {
        dispatch({ type: "FETCH_STARTED" });
        fetchData();
    }, [type, sortby, page, id]);

    if (!shows || error) return <div>{error}</div>;

    if (loading) return <Loading />;

    return (
        <Container>
            <SortBy handleChange={handleChange} options={options} />
            <ShowList shows={shows} />
            <LoadMore onClick={handleClick}>Load more...</LoadMore>
        </Container>
    );
}
// Styles
const LoadMore = styled.span`
    font-size: 1.5rem;
    color: black;
    background: rgb(255, 255, 255);
    border-radius: 50px;
    padding: 2rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`;

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem 1rem 2rem;
`;
