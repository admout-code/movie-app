import React from "react";
import styled from "styled-components";
import ShowCard from "./ShowCard";

export default function ShowList({ shows }) {
    return (
        <Cards>
            {shows.map((show) => (
                <ShowCard
                    title={show.title || show.name}
                    imgUrl={show.poster_path}
                    id={show.id}
                    type={show.title ? "movie" : "tv"}
                    key={show.id}
                />
            ))}
        </Cards>
    );
}

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
`;
