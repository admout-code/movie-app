import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [visible, setVisible] = useState(false);
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
            <Container>
                <Dropdown>
                    <DropdownBtn
                        to="/movie"
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        Movies ⯆
                    </DropdownBtn>
                    <MoviesDropdownContent
                        visible={visible}
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        <Link to={"/trendings/movie"}>Trendings</Link>
                        {movieGenres.map((genre) => (
                            <Link to={`/discover/movie/${genre.id}`} key={genre.id}>
                                {genre.name}
                            </Link>
                        ))}
                    </MoviesDropdownContent>
                </Dropdown>
                <Dropdown>
                    <DropdownBtn to="/tv" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                        Series ⯆
                    </DropdownBtn>
                    <SeriesDropdownContent
                        visible={visible}
                        onMouseEnter={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        <Link to={"/trendings/tv"}>Trendings</Link>
                        {tvGenres.map((genre) => (
                            <Link to={`/discover/tv/${genre.id}`} key={genre.id}>
                                {genre.name}
                            </Link>
                        ))}
                    </SeriesDropdownContent>
                </Dropdown>
            </Container>
            <Home>
                <StyledLink to="/">Homepage</StyledLink>
            </Home>
            <SearchBar>
                <input type="text" onChange={handleChange} value={search} />
                <SearchButton to={`/search&q=${search}`} onClick={handleClick}>
                    Search
                </SearchButton>
            </SearchBar>
        </Nav>
    );
}

const SearchButton = styled(Link)`
    text-decoration: none;
    color: black;
    background-color: white;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    cursor: pointer;
    & :visited {
        text-decoration: none;
        color: white;
    }
`;

const Home = styled.span`
    /* text-decoration: none;
    color: white;
    cursor: pointer;
    & :visited {
        text-decoration: none;
        color: white;
    } */
`;

const Nav = styled.nav`
    display: flex;
    background-color: rgba(0, 0, 0, 0.801);
    color: white;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    transition: all ease-in-out 0.1s;
`;

const DropdownBtn = styled(Link)`
    border: none;
    color: white;
    background: none;
    cursor: pointer;
    margin: 0.5rem;
`;

const MoviesDropdownContent = styled.div`
    transition: all ease-in-out 1s;
    display: ${({ visible }) => (visible ? "flex" : "none")};
    position: absolute;
    flex-direction: column;
    /* min-width: 160px; */
    z-index: 1;
    background-color: lightblue;
    margin-top: -0.05rem;
`;

const SeriesDropdownContent = styled.div`
    transition: all ease-in-out 1s;
    display: ${({ visible }) => (visible ? "flex" : "none")};
    position: absolute;
    flex-direction: column;
    /* min-width: 160px; */
    z-index: 1;
    background-color: lightblue;
    margin-top: -0.05rem;
`;

const SearchBar = styled.div``;
