import React from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
height:100%;
`

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`


const TitleContainer = styled.div`
 padding-bottom:1rem;
 font-size: 1.2rem;
`


const BaseLayout = (props) => {
    return (
        <Container>{props.children}</Container>
    )
}

const PageLayout = (props) => {
    return (
        <PageContainer>{props.children}</PageContainer>
    )
}

const Title = (props) => {
    return (
        <TitleContainer><b>{props.title}</b></TitleContainer>
    )
}

export { BaseLayout, PageLayout, Title }