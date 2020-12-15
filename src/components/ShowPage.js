import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    if (error || !showInfo) return <div>{error}</div>;  
    if (loading) return <div>loading...</div>;
    
    const { vote_average, overview, release_date, status, poster_path, genres } = showInfo
    const title = showInfo.title || showInfo.name
    
    return (
        <div>
            <h1>{title}</h1>
            <img src={`https://image.tmdb.org/t/p/w400/${poster_path}`} alt="Photo" />
            <div>
                <h4>{status}</h4> {release_date}
            </div>
            {genres.map((genre) => (
                <span key={genre.id}> {genre.name} </span>
            ))}
            <h4>Vote average</h4>
            {vote_average}
            <h4>Overview:</h4>
            {overview}
        </div>
    );
}
