import React, { useState } from "react";
import { BaseLayout, PageLayout, Title } from '../layouts/baseLayout';
import { styled } from 'styled-components';
import { Input } from '../components/textFields';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import { Button } from '../components/button';
import Link from '../components/link';
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

const LogInContainer = styled.div`
    width: 20rem;  
    min-height: 16vh;
    border:0.1rem solid #f2f2f2;
    border-radius:0.5rem;
    background-color:#f2f2f2;
    padding: 1rem;
`

const LinkBlock = styled.div`
display: flex;
justify-content: space-between;
`

const ErrorBlock = styled.div`
padding-bottom:1rem;
color:red;
`

const LoginMutation = gql`
  mutation login($email:String,$password:String){
       logIn(email:$email,password:$password){
        success,
        error,
        name,
        email,
        token
       }
  }
`

const Login = (props) => {
    const [LoginMutate, { data, loading, error }] = useMutation(LoginMutation);
    const dispatch = useDispatch();

    const [formValues, setFormvalues] = useState({
        email: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        emailError: '',
        passwordError: '',
        generalError: ''
    });
    const navigate = useNavigate();

    const resetError = (id, error) => {
        const resetformError = { ...formErrors };
        resetformError[`${id}Error`] = error;
        setFormErrors(resetformError);
    }

    const setOnChange = (event) => {
        const { id, value } = event.target;
        const newFormData = { ...formValues }
        newFormData[id] = value;
        setFormvalues(newFormData);
        if (formErrors[`${id}Error`]) {
            resetError(id, '')
        }
    }

    const validateEmail = (event) => {
        let error = '';
        const { id } = event.target
        if (formValues.email === '' || !formValues.email) {
            error = 'This is a required data';
        } else {
            const validEmail = validator.isEmail(formValues.email);
            if (!validEmail) {
                error = 'Enter valid email address';
            }
        }
        resetError(id, error)
    }

    const validateUserPassword = (event) => {
        let error = '';
        const { id } = event.target
        if (formValues.password === '' || !formValues.password) {
            error = 'This is a required data';
        } else {
            if (formValues.password.length < 8) {
                error = 'Min length of password is 8';
            }
        }
        resetError(id, error)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = { ...formValues }
        const formKeys = Object.keys(formData);
        let error = { ...formErrors }, hasError = false;
        for (let i = 0; i < formKeys.length; i++) {
            if (formValues[formKeys[i]] && !formErrors[formKeys[i]]) {
                continue;
            } else {
                hasError = true;
                error[`${formKeys[i]}Error`] = formErrors[`${formKeys[i]}Error`] || 'This is a required data';
            }
        }
        if (hasError) {
            setFormErrors(error);
        } else {
            const { email, password } = formValues
            console.log(props)
            LoginMutate({
                variables: {
                    email: email,
                    password: password
                },
                onCompleted: async (data) => {
                    console.log(data)
                    if (data?.logIn?.success) {
                       await dispatch({
                        type:'USERDATA',
                        userData:{
                            name:data.logIn.name,
                            email:data.logIn.email,
                            token:data.logIn.token
                        }
                       })
                       await dispatch({
                        type:'AUTHENTICATE',
                        login:true
                       })
                    } else if (!data?.logIn?.success && data?.logIn?.error) {
                        resetError("general", data?.logIn?.error)
                        await dispatch({
                            type:'AUTHENTICATE',
                            login:false
                           })
                    }else{
                        resetError("general", "Something went wrong!kindly submit again")
                        await dispatch({
                            type:'AUTHENTICATE',
                            login:false
                           })
                    }

                }
            })
        }
    }

    return (
        <BaseLayout>
            <PageLayout>
                <LogInContainer>
                    <Title title="Login and start conversations" />
                    <Input label="Email" value={formValues.email} error={formErrors.emailError} onChange={(event) => setOnChange(event)} id="email" type="text" width="100%" onBlur={(event) => validateEmail(event)} />
                    <Input label="Password" value={formValues.password} error={formErrors.passwordError} onChange={(event) => setOnChange(event)} onBlur={(event => validateUserPassword(event))} id="password" type="password" width="100%" />
                    <Button label={loading ? "Submitting..." : "Login"} disabled={loading ? true : false} onClick={(event) => handleSubmit(event)}></Button>
                    {formErrors.generalError ? <ErrorBlock>{formErrors.generalError}</ErrorBlock> : null}
                    <LinkBlock>
                        <Link href="/signup" title="New user?" target="_self" decoration="none"></Link>
                        <Link href="/forgetpassword" title="Forget Password?" target="_self" decoration="none"></Link>
                    </LinkBlock>
                </LogInContainer>
            </PageLayout>
        </BaseLayout>
    )
}

export default Login