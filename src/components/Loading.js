import React from "react";
import styled from "styled-components";
import RingLoader from "react-spinners/RingLoader";
import { css } from "@emotion/core";

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export default function Loading() {
    return (
        <Container>
            <RingLoader css={override} size={100} color={"rgb(255, 255, 255)"} />
        </Container>
    );
}

const Container = styled.div`
    padding: 20rem;
`;
