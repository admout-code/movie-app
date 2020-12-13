import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";

export default function Homepage() {
    const [trendings, setTrendings] = useState([]);
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const fetchData = async () => {
        try {
            const url = `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`;
            let response = await fetch(url);
            const data = await response.json();
            setTrendings(data.results);
            // console.log(trendings)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const trendingMovies = trendings.filter((show) => show.media_type === "movie");
    const trendingSeries = trendings.filter((show) => show.media_type === "tv");

    return (
        <div>
            <div>
                <h1>Trending Movies</h1>
                {trendingMovies.map((movie) => (
                    <ShowCard title={movie.title} imgUrl={movie.poster_path} id={movie.id} key={movie.id} />
                ))}
            </div>

            <div>
                <h1>Trending Series</h1>
                {trendingSeries.map((tv) => (
                    <ShowCard title={tv.name} imgUrl={tv.poster_path} id={tv.id} key={tv.id} />
                ))}
            </div>
        </div>
    );
}
