import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { BaseLayout, PageLayout, Title } from '../layouts/baseLayout';
import { Button } from '../components/button';
import { Input } from '../components/textFields';
import Link from '../components/link';
import validator from 'validator';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from "react-router-dom";


const SignUpContainer = styled.div`
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

const SignUpMutation = gql`
mutation signup($name:String,$email:String,$password:String){
    signUp(name:$name,email:$email,password:$password){
        success,
        error
    }
}
`;

const SignUp = (props) => {
    const [signUpMutate, { data, loading, error }] = useMutation(SignUpMutation);
    const navigate = useNavigate();
    const [formValues, setFormvalues] = useState({
        email: '',
        name: '',
        // lastName: '',
        password: ''
    });
    const [formErrors, setFormErrors] = useState({
        emailError: '',
        nameError: '',
        lastNameError: '',
        passwordError: '',
        generalError: ''
    })

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
        formErrors['generalError']='';
        if (formErrors[`${id}Error`]) {
            formErrors[`${id}Error`]=''
        }
        setFormErrors(formErrors);
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

    const validateUserName = (event, value) => {
        let error = '';
        const { id } = event.target
        if (value === '' || !value) {
            error = 'This is a required data';
        } else {
            const validName = validator.isAlpha(value)
            if (!validName) {
                error = 'Name should have only alphabets';
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
             if(formValues[formKeys[i]] && !formErrors[formKeys[i]]){
                continue;
            } else {
                hasError = true;
                error[`${formKeys[i]}Error`] = formErrors[`${formKeys[i]}Error`] || 'This is a required data';
            }
        }
        if (hasError) {
            setFormErrors(error);
        } else {
            const { name, lastName, email, password } = formValues
            console.log(props)
            signUpMutate({
                variables: {
                    name: `${name}${lastName}`,
                    email: email,
                    password: password
                },
                onCompleted: async (data) => {
                    if (data?.signUp?.success) {
                        navigate('/')
                    } else if (!data?.signUp?.success) {
                        try {
                            if(data?.signUp &&  !data.signUp.success && data.signUp?.error && !data.signUp?.error.includes("errors")){
                                resetError("general",data.signUp?.error)
                            }
                            else if (data?.signUp && !data.signUp.success && JSON.parse(data.signUp.error) && JSON.parse(data.signUp.error).errors) {
                                const { errors } = JSON.parse(data.signUp.error)
                                const errorKeys = Object.keys(errors);
                                const resetformError = { ...formErrors };
                                await errorKeys.map((key) => {
                                    resetformError[`${key}Error`]=`${errors[key].message}`
                                })
                                setFormErrors(resetformError);
                            }else{
                                resetError("general","Something went wrong!kindly submit again")
                            }
                        } catch (err) {
                            resetError("general", "Something went wrong!kindly submit again")
                        }
                    } else if (!data?.signUp) {
                        resetError("general", "Something went wrong!kindly submit again")
                    }
                }
            })
        }
    }
    if (error) return `Submission error! ${error.message}`;

    return (
        <BaseLayout>
            <PageLayout>
                <SignUpContainer>
                    <Title title="Signup and start conversations" />
                    <Input label="Name" value={formValues.name} error={formErrors.nameError} onChange={(event) => setOnChange(event)} onBlur={(event) => validateUserName(event, formValues.name)} id="name" type="text" width="100%" />
                    {/* <Input label="Last Name" value={formValues.lastName} error={formErrors.lastNameError} onChange={(event) => setOnChange(event)} onBlur={(event) => validateUserName(event, formValues.lastName)} id="lastName" type="text" width="100%" /> */}
                    <Input label="Email" value={formValues.email} error={formErrors.emailError} onChange={(event) => setOnChange(event)} id="email" type="text" width="100%" onBlur={(event) => validateEmail(event)} />
                    <Input label="Password" value={formValues.password} error={formErrors.passwordError} onChange={(event) => setOnChange(event)} onBlur={(event => validateUserPassword(event))} id="password" type="password" width="100%" />
                    <Button label={loading ? "Submitting..." : "Signup"} disabled={loading ? true : false} onClick={(event) => handleSubmit(event)}></Button>
                    {formErrors.generalError ? <ErrorBlock>{formErrors.generalError}</ErrorBlock> : null}
                    <LinkBlock>
                        <Link href="/login" title="Existing user?" target="_self" decoration="none"></Link>
                        <Link href="/forgetpassword" title="Forget Password?" target="_self" decoration="none"></Link>
                    </LinkBlock>
                </SignUpContainer>
            </PageLayout>
        </BaseLayout>
    )
}

// class SignUp extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             formValues: {
//                 email: '',
//                 name: '',
//                 lastName: '',
//                 password: ''
//             },
//             formErrors: {
//                 emailError: '',
//                 nameError: '',
//                 lastNameError: '',
//                 passwordError: ''
//             }
//         }

//     }

//     resetError = (id, error) => {
//         const resetformError = { ...this.state.formErrors };
//         resetformError[`${id}Error`] = error;
//         this.setState({ formErrors: resetformError });
//     }

//     setOnChange = (event) => {
//         const { id, value } = event.target;
//         const newFormData = { ...this.state.formValues }
//         newFormData[id] = value;
//         this.setState({ formValues: newFormData });
//         if (this.state.formErrors[`${id}Error`]) {
//             this.resetError(id, '')
//         }
//     }

//     validateUserPassword = (event) => {
//         let error = '';
//         const { id } = event.target
//         const { formValues } = this.state
//         if (formValues.password === '' || !formValues.password) {
//             error = 'This is a required data';
//         } else {
//             if (formValues.password.length < 8) {
//                 error = 'Min length of password is 8';
//             }
//         }
//         this.resetError(id, error)
//     }

//     validateEmail = (event) => {
//         let error = '';
//         const { id } = event.target;
//         const { formValues } = this.state
//         if (formValues.email === '' || !formValues.email) {
//             error = 'This is a required data';
//         } else {
//             const validEmail = validator.isEmail(formValues.email);
//             if (!validEmail) {
//                 error = 'Enter valid email address';
//             }
//         }
//         this.resetError(id, error)
//     }

//     validateUserName = (event, value) => {
//         let error = '';
//         const { id } = event.target
//         if (value === '' || !value) {
//             error = 'This is a required data';
//         } else {
//             const validName = validator.isAlpha(value)
//             if (!validName) {
//                 error = 'Name should have only alphabets';
//             }
//         }
//         this.resetError(id, error)
//     }

//     handleMutationCompleted=(data,loading,error)=>{
//         console.log(data,loading,error)
//     }

//     handleSubmit = async (event, client) => {
//         event.preventDefault();
//         const { formValues, formErrors } = this.state;
//         debugger
//         const formData = { ...formValues }
//         const formKeys = Object.keys(formData);
//         let error = { ...formErrors }, hasError = false;
//         for (let i = 0; i < formKeys.length; i++) {
//             if (formValues[formKeys[i]]) {
//                 continue;
//             } else {
//                 hasError = true;
//                 error[`${formKeys[i]}Error`] = formErrors[`${formKeys[i]}Error`] || 'This is a required data';
//             }
//         }
//         if (hasError) {
//             // setFormErrors(error);
//             this.setState({ formErrors: error });
//         } else {
//             const { name, lastName, email, password } = formValues
//             console.log(this.props)
//             this.props.mutate({
//                 variables: {
//                     name: `${name}${lastName}`,
//                     email: email,
//                     password: password
//                 },
//                 onCompleted: async (data) => {
//                     console.log(data)
//                 }
//             }).then(() => {
//                 console.log("jhbjkbjkjbkkjbjbkjbkjkjb")
//             }).catch((err) => console.log(err))
//             // SignUpWrapper(this.handleMutationCompleted)(formData)
//         }
//     }
//     render() {

//         const { formValues, formErrors } = this.state
//         return (
//             // <ApolloConsumer>
//             // {(client) => (
//             <Mutation mutation={SignUpMutation}>
//                 {(mutate, { loading, error }) => (
//                     <BaseLayout>
//                         <PageLayout>
//                             <SignUpContainer>
//                                 <Title title="Signup and start conversations" />
//                                 <Input label="First Name" value={formValues.name} error={formErrors.nameError} onChange={(event) => this.setOnChange(event)} onBlur={(event) => this.validateUserName(event, formValues.name)} id="name" type="text" width="100%" />
//                                 <Input label="Last Name" value={formValues.lastName} error={formErrors.lastNameError} onChange={(event) => this.setOnChange(event)} onBlur={(event) => this.validateUserName(event, formValues.lastName)} id="lastName" type="text" width="100%" />
//                                 <Input label="Email" value={formValues.email} error={formErrors.emailError} onChange={(event) => this.setOnChange(event)} id="email" type="text" width="100%" onBlur={(event) => this.validateEmail(event)} />
//                                 <Input label="Password" value={formValues.password} error={formErrors.passwordError} onChange={(event) => this.setOnChange(event)} onBlur={(event => this.validateUserPassword(event))} id="password" type="password" width="100%" />
//                                 <Button label="Signup" onClick={(event) => this.handleSubmit(event)}></Button>
//                                 <LinkBlock>
//                                     <Link title="Existing user?" target="_blank" decoration="none"></Link>
//                                     <Link title="Forget Password?" target="_blank" decoration="none"></Link>
//                                 </LinkBlock>
//                             </SignUpContainer>
//                         </PageLayout>
//                     </BaseLayout>
//     )}
//             </Mutation>
//             // </ApolloConsumer>
//         )
//     }
// }

// export default graphql(SignUpMutation)(SignUp);

export default SignUp