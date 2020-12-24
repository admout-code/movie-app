import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../images/gnomi_tv.png";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function Navbar() {
    const [search, setSearch] = useState("");
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleClick = (e) => {
        setSearch("");
        if (search === "") {
            e.preventDefault();
        }
    };

    const fetchData = async (type) => {
        const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`;
        try {
            let response = await fetch(url);
            const data = await response.json();
            if (type === "movie") setMovieGenres(data.genres);
            if (type === "tv") setTvGenres(data.genres);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData("movie");
        fetchData("tv");
    }, []);

    return (
        <Nav>
            <TypeButtons>
                    <Button to="/movie">Movies</Button>
                    <DropdownButton variant="outline-light" id="dropdown-item-button">
                        <Dropdown.Item><DropdownItems to={"/trendings/movie"}>Trendings</DropdownItems></Dropdown.Item>
                            <Dropdown.Divider />
                            {movieGenres.map((genre) => (
                                <Dropdown.Item eventKey={genre.id} key={genre.id}>
                                    <DropdownItems to={`/discover/movie/${genre.id}`}>{genre.name}</DropdownItems>
                                </Dropdown.Item>
                            ))}
                    </DropdownButton>

                    <Button to="/tv">Series</Button>
                    <DropdownButton variant="outline-light" id="dropdown-item-button">
                        <Dropdown.Item><DropdownItems to={"/trendings/tv"}>Trendings</DropdownItems></Dropdown.Item>
                            <Dropdown.Divider />
                            {tvGenres.map((genre) => (
                                <Dropdown.Item variant="light" eventKey={genre.id} key={genre.id}>
                                    <DropdownItems to={`/discover/tv/${genre.id}`}>{genre.name}</DropdownItems>
                                </Dropdown.Item>
                            ))}
                    </DropdownButton>
                </TypeButtons>
            <HomepageBtn to="/">
                <Logo src={logo} alt="Homepage-button" />
            </HomepageBtn>
            <Search>
                <Input type="text" onChange={handleChange} value={search} />
                <SearchButton to={`/search&q=${search}`} onClick={handleClick}>
                    Search
                </SearchButton>
            </Search>
        </Nav>
    );
}

// Styles
const TypeButtons = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`
const DropdownItems = styled(Link)`
    color: black;
    &:hover {
        text-decoration: none;
    }
    &:active {
        /* background-color: red; */
        color: black;
    }
`
const Button = styled(Link)`
    background-color: rgba(255, 255, 255, 0);
    color: #ffffff;
    font-size: 1.5rem;
    text-decoration: none;
    height: 2.4rem;
    border-radius: 5px;
    width: 6rem;
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    transition: all 0.2s ease-in-out;
    &:hover {
        transition: all 0.1s ease-in-out;
        text-decoration: none;
        transition: all 0.1s ease-ease-in-out;
        background-color: white;
        color: black;
    }
`
const Search = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Input = styled.input`
    font-size: 1.5rem;
    width: 15rem;
    height: 2.5rem;
    border: 0;
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0);
    border: solid 2px white;
    outline: none;
    transition: ease-in-out all 0.2s;
    &:hover,
    &:focus {
        background-color: white;
        transition: ease-in-out all 0.2s;
    }
`;
const SearchButton = styled(Link)`
    font-size: 1.65rem;
    text-decoration: none;
    color: white;
    background-color: rgba(255, 255, 255, 0);
    margin-right: 0.5rem;
    margin-left: 0.3rem;
    border-radius: 5px;
    transition: ease-in-out all 0.1s;
    &:active,
    &:hover {
        transition: ease-in-out all 0.1s;
        background-color: white;
        color: black;
        text-decoration: none;
    }
`;
const Logo = styled.img`
    width: 20rem;
`;
const HomepageBtn = styled(Link)`
    text-decoration: none;
    color: white;
    cursor: pointer;
    margin-left: 3.8rem;
    display: flex;
    justify-content: center;
    &:visited {
        text-decoration: none;
        color: white;
    }
`;
const Nav = styled.nav`
    display: flex;
    background-color: rgba(0, 0, 0, 0.835);
    color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    top: 0%;
    height: 4rem;
    position: fixed;
    width: 100%;
    z-index: 1;
`;
