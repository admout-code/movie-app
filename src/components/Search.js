import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowCard from './ShowCard'

export default function Search() {

    const { title } = useParams();
    const [shows, setShows] = useState(undefined)


    useEffect(() => {
        const fetchData = async () => {
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${title}&page=1&include_adult=false`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setShows(data.results);
                
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [title]);
    
    // console.log(shows);
    
    if (!shows) return <div>loading...</div>

    return (
        <div>
            {shows.map((show) => <ShowCard key={show.id} title={show.title || show.name} imgUrl={show.poster_path} id={show.id} type={show.title ? "movie" : "tv"}/>)}
        </div>
    )
}
