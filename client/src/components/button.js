import React from "react";
import { styled } from "styled-components";



const ButtonBlock = styled.div`
padding-bottom:1rem;
`

const StyledButton = styled.button`
width: 40%;
height:100%;
padding: 0.5rem;
background-color: #4caf50;
color: white;
width: 100%;
display:block;
border: none;
border-radius: 0.5rem;
`

const Button = (props) => {
    const {label,onClick}=props

    const onButtonClick=(event)=>{
        onClick && onClick(event)
    }

    return (
        <ButtonBlock>
            <StyledButton onClick={onButtonClick}>{label}</StyledButton>
        </ButtonBlock>
    )
}


export { Button }