import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ShowCard({ title, imgUrl, id, type }) {
    const url = `https://image.tmdb.org/t/p/w300/${imgUrl}`;

    return (
        <Container>
            <ShowTitleOuter to={`/${type}/${id}`}><ShowTitleInner>{title}</ShowTitleInner></ShowTitleOuter>
            <ImageLink to={`/${type}/${id}`}>{imgUrl && <ShowImage imageUrl={() => "url(" + url + ")"} alt={title} />}</ImageLink>
        </Container>
    );
}

const ImageLink = styled(Link)`
`

const ShowTitleOuter = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 20rem;
    height: 30rem;
    border-radius: 40px;
    transition: all 0.1s ease-in-out;
    cursor: pointer;
    &:hover {
        background-color: rgba(0, 0, 0, 0.85);
    }
`
const ShowTitleInner = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: rgba(255, 255, 255, 0);
    font-size: 2rem;
    text-align: center;
    width: 20rem;
    height: 30rem;
    transform: scale(0.8);
    border-radius: 40px;
    transition: all 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
        color: white;
        transform: scale(1);
    }
`

const ShowImage = styled.div`
    background-image: ${({ imageUrl }) => imageUrl};
    background-size: cover;
    border: solid 0px white;
    border-radius: 40px;
    width: 20rem;
    height: 30rem;
    margin: 1rem;

`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-in-out;
    &:hover {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
    }
`;
