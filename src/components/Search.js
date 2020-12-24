import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";
import ShowList from "./ShowList";

export default function Search() {
    const { title } = useParams();
    const [shows, setShows] = useState(undefined);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.results) setShows(data.results);
                else setError("An error occurred");
            } catch (error) {
                setError(error);
                console.log(error);
            }
            setLoading(false);
        };
        setLoading(true);
        fetchData();
    }, [title]);

    if (!shows || error) return <div>{error}</div>;

    if (loading) return <Loading />;

    return (
        <Container>
            <ShowList shows={shows} />
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 5rem 2rem 1rem 2rem;
`;
