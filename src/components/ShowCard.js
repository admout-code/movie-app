import React from "react";
import { Link } from "react-router-dom";

export default function ShowCard({ title, imgUrl, id, type }) {
    const url = `https://image.tmdb.org/t/p/w200/${imgUrl}`;

    return (
        <div>
            <Link to={`/${type}/${id}`}>{title}</Link>
            <Link to={`/${type}/${id}`}>
                {imgUrl && <img src={url} alt="Photo" />}
            </Link>
        </div>
    );
}
