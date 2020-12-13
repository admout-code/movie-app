import React from "react";
import { Link } from "react-router-dom";

export default function ShowCard({ title, imgUrl, id }) {
    const url = `https://image.tmdb.org/t/p/w400/${imgUrl}`;

    return (
        <div>
            {title}
            <Link to={`/${id}`}>
                <img src={url} alt="Photo" />
            </Link>
        </div>
    );
}
