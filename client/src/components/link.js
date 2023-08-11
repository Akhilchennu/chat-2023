import React from "react";
import { styled } from "styled-components";

const LinkContainer = styled.div`
padding-bottom:1rem;
display:inline-block;
`

const Href = styled.a`
text-decoration:${props => props.decoration ? props.decoration : 'none'};
`

const link = (props) => {

    return (
        <LinkContainer>
            <Href href={props.href} target={props.target} >{props.title}</Href>
        </LinkContainer>
    )
}

export default link