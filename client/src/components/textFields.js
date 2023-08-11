import React from "react";
import { styled } from "styled-components";

const InputField = styled.input`
width: 100%;
padding: 0.63rem;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
margin-top:0.25rem;
${props =>
        props['data-error'] === true &&
        `
    border:1px solid red;
  `}
`;

const InputLabel = styled.label`
padding-left: 0.2rem;
display:block;
`;

const Inputblock = styled.div`
padding-bottom:1rem;
`
const HintDiv = styled.div`
padding-top: 0.2rem;
box-sizing: border-box;
${props =>
        props['data-error'] === true &&
        `
    color:red;
  `}
`

const Input = (props) => {
    const { label, id, value, type, width, onChange, error, onBlur, hint } = props
    const onInputChange = (event) => {
        onChange && onChange(event);
    }

    const onInputBlur = (event) => {
        onBlur && onBlur(event);
    }
    return (
        <Inputblock>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <InputField id={id} value={value}
                type={type} width={width} name={id}
                onChange={(event) => onInputChange(event)}
                onBlur={(event) => onInputBlur(event)}
                data-error={error ? true : false}></InputField>
            {(hint || error) ? <HintDiv data-error={error ? true : false}>{error ? error : hint ? hint : ''}</HintDiv> : null}
        </Inputblock>
    )
}


export { Input }