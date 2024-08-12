import Form from "react-bootstrap/esm/Form";
import '../Login.scss'
import Button from "react-bootstrap/esm/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { useForm } from "react-hook-form";
import Spinner from "react-bootstrap/esm/Spinner";
import { useState } from "react";
import React from "react";
import axios from 'axios';
import { errorToast, successToast } from "../../utils/Toasters";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({});

    const [isLoading, setIsLoading] = useState(false)
    const [passwordHide, setPasswordHide] = useState(false)
    const [confirmPasswordHide, setConfirmPasswordHide] = useState(false)

    const handleRegister = async (data) => {
        setIsLoading(true)
        console.log(data, 'user details')
        if (data.password === data.confirmPassword) {
            try {
                let response = await axios.post('http://localhost:9985/signupUser', data)
                console.log(response.data, 'response')
                setIsLoading(false)
                if (response.data.status) {
                    successToast(response.data.message)
                }
            } catch (error) {
                setIsLoading(false)
                errorToast('something went wrong, try again!')
            }
        } else {
            setIsLoading(false)
            errorToast('password and confirm password should be same')
        }


    }

    return (<>
        <section className="bg-light py-3 py-md-5 login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                        <div className="card border border-light-subtle rounded-3 shadow-sm">
                            <div className="card-body p-3 p-md-4 p-xl-5">
                                <div className="text-center mb-3">
                                    <h1>Business Optima</h1>
                                </div>
                                <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Create your account</h2>
                                <Form onSubmit={handleSubmit(handleRegister)}>
                                    <FloatingLabel
                                        controlId="fullName"
                                        label="Full Name"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text"
                                            placeholder="Full Name"
                                            {...register("fullName", { required: "Name is required" })} />
                                        {errors.fullName && <p>{errors.fullName.message}</p>}
                                    </FloatingLabel>
                                    <FloatingLabel
                                        controlId="email"
                                        label="E-Mail"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email"
                                            placeholder="E-Mail"
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Email is invalid",
                                                },
                                            })} />
                                        {errors.email && <p>{errors.email.message}</p>}
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="password"
                                        label="Password"
                                        className="mb-3 password"
                                    >
                                        <Form.Control type={passwordHide ? 'text' : "password"}
                                            placeholder="Password"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            })} />
                                        <span className="password-eye" onClick={() => setPasswordHide(!passwordHide)}>
                                            {passwordHide ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill" ></i>}
                                        </span>
                                        {errors.password && <p>{errors.password.message}</p>}
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="confirmPassword"
                                        label="Confirm Password"
                                        className="mb-3 password"
                                    >
                                        <Form.Control type={confirmPasswordHide ? 'text' : "password"}
                                            placeholder="Confirm Password"
                                            {...register("confirmPassword", {
                                                required: "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message: "Password must be at least 6 characters",
                                                },
                                            })} />
                                        <span className="password-eye" onClick={() => setConfirmPasswordHide(!confirmPasswordHide)}>
                                            {confirmPasswordHide ? <i className="bi bi-eye-slash-fill"></i> : <i className="bi bi-eye-fill" ></i>}
                                        </span>
                                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                                    </FloatingLabel>


                                    <div className="col-12">
                                        <div className="d-grid my-3">
                                            <Button variant="outline-primary" className="loginButton" disabled={isLoading} type="submit">
                                                {isLoading && <Spinner animation="border" className="me-2" />}  Sign up
                                            </Button>
                                        </div>
                                    </div>
                                </Form>

                                <div className="col-12">
                                    <p className="m-0 text-secondary text-center">Already have an account? <a href="/login" className="text-decoration-none register">Login</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section ></>)


}

export default Signup