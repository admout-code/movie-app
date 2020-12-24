import React from "react";
import styled from "styled-components"

export default function SortBy({ handleChange, options }) {
    return (
        <div>
            <Select onChange={handleChange}>
                <option value="" disabled selected hidden>Sort By</option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>{option.text}</option>
                ))}
            </Select>
        </div>
    );
}

// Styles
const Select = styled.select`
    border-radius: 5px;
    font-size: 1.4rem;

    &:focus {
        outline: none;
    }
`
