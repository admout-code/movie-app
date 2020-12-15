import React, { useState, useEffect } from "react";
import ShowCard from "./ShowCard";
import { useParams } from "react-router-dom";

export default function Trendings() {
    const [trendings, setTrendings] = useState([]);
    const { type } = useParams();
    // const [showType, setShowType] = useState("");

    const fetchData = async () => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`;
        try {
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
    }, [type]);

    // console.log(type);
    const trendingShows = trendings.filter((show) => show.media_type === type);
    // const trendingSeries = trendings.filter((show) => show.media_type === "tv");
    
    let showType = ''
    if (type === "movie") showType = "Movies";
    else showType = "Series";
    // if (type === "movie") setShowType("Movies");
    // else setShowType("Series");

    return (
        <div>
            <div>
                <h1>Trending {showType}</h1>
                {trendingShows.map((show) => (
                    <ShowCard
                        title={show.title || show.name}
                        imgUrl={show.poster_path}
                        id={show.id}
                        type={type}
                        key={show.id}
                    />
                ))}
            </div>

            {/* <div>
                <h1>Trending Series</h1>
                {trendingSeries.map((tv) => (
                    <ShowCard title={tv.name} imgUrl={tv.poster_path} id={tv.id} key={tv.id} type="tv"/>
                ))}
            </div> */}
        </div>
    );
}
