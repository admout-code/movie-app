import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowCard from "./ShowCard";

const options = [
    { value: "popularity.desc", text: "popularity" },
    { value: "release.date.asc", text: "release date" },
    { value: "vote_average.desc", text: "vote average" },
];

export default function ShowsDiscover() {
    const [shows, setShows] = useState(undefined);
    const [sortby, setSortby] = useState(options[0].value);
    const {type} = useParams();
    const showType = type || 'movie';

    const fetchData = async () => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/discover/${showType}?api_key=${API_KEY}&language=en-US&sort_by=${sortby}&include_adult=false&include_video=false&page=1`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setShows(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setSortby(e.target.value);
    };

    useEffect(() => {
        fetchData();
    }, [showType, sortby]);

    if (!shows) return <div>loading...</div>;

    return (
        <div>
            <select onChange={handleChange} name="" id="">
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </select>
            {shows.map((show) => (
                <ShowCard title={show.title || show.name} imgUrl={show.poster_path} id={show.id} key={show.id} type={show.title ? "movie" : "tv"}/>
            ))}
        </div>
    );
}
