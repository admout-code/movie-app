import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "./Loading";

export default function ShowPage() {
    const { id, type } = useParams();
    const [showInfo, setShowInfo] = useState(undefined);
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await fetch(url);
            const data = await response.json();
            if (data.id) setShowInfo(data);
            else setError(data.status_message);
        } catch (error) {
            setError(error);
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    if (error || !showInfo) return <div>{error}</div>;
    if (loading) return <Loading />;

    const { vote_average, overview, release_date, status, poster_path, genres } = showInfo;
    const title = showInfo.title || showInfo.name;

    const getVoteColor = (vote_average) => {
        if (vote_average < 5) return "red";
        else if (vote_average < 7) return "orange";
        else if (vote_average < 8.5) return "greenyellow";
        else return "green";
    };

    return (
        <Container>
            <Show>
                <ShowImage src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt="Photo" />
            </Show>

            <ShowInfo>
                <Title>{title}</Title>
                <Overview>{overview}</Overview>
                <ExtraInfo>
                    <div>
                        {genres.map((genre) => (
                            <div key={genre.id}> {genre.name} </div>
                        ))}
                    </div>
                    <div>
                        <span>Vote average</span>
                        <Vote color={() => getVoteColor(vote_average)}>{vote_average}</Vote>
                    </div>
                    <div>
                        <span>{status}</span> {release_date}
                    </div>
                </ExtraInfo>
            </ShowInfo>
        </Container>
    );
}

// Styles
const Vote = styled.div`
    color: ${({ color }) => color};
`;
const ExtraInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
`;
const Overview = styled.div`
    padding-bottom: 5rem;
    padding-top: 2rem;
`;
const Show = styled.div`
    display: flex;
    padding: 2rem;
`;
const ShowInfo = styled.div`
    font-size: 2rem;
    color: white;
    display: flex;
    flex-direction: column;
`;
const ShowImage = styled.img`
    border-radius: 30px;
    width: 30rem;
`;
const Title = styled.div`
    font-size: 3rem;
    color: white;
    display: flex;
    margin-top: 1rem;
`;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-self: center;
    height: 100%;
    padding-top: 5rem;
`;
