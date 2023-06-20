import { Navigate, useNavigate } from "react-router-dom";
import "./user-signup.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import baseUrl from "../../../webApi/BaseUrl/baseUrl";
import UserSignIn from "../SignIn/user-signin";
import api from "../../../webApi/Home/api";
import { useDispatch } from "react-redux";
import { CurrentUser } from "../../../redux-Config/Index/userSlice";
import { ToastContainer, toast } from "react-toastify";
function UserSignUp() {
    const name = useRef();
    const contact = useRef();
    const password = useRef();
    const email = useRef();
    const submit = useRef();

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const HendleSignIn = async () => {
        navigate("/signIn");
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        try {
            let response = await axios.post(baseUrl.BASE_URl + api.SIGNUP_USER, { email: email.current.value, password: password.current.value, contact: contact.current.value, name: name.current.value });

            if (response.status) {

                dispatch(CurrentUser(response.data));
                navigate("/");
                toast.success("SignUp Success");

            }
        }
        catch (err) {

            toast.error("SignUp failed");
        }


    }


    return <div className="container" >
        <ToastContainer />
        <div className="col-md-8 col-sm-12 mt-4  userSignUpDiv">
            <div className="row  ">
                <div className="col-md-6  col-sm-12  ">
                    <img src="../img/customerLogin.jpg" height={"600px"} width={"100%"} />
                </div>

                <div className="col-md-6  col-sm-12 text-center">
                    <p className="user-form-title">Sign Up to your account</p>
                    <p className="text-muted">already have a  account? <span style={{ color: "red" }} onClick={HendleSignIn} >  click hear </span></p>
                    <form onSubmit={HandleSubmit} >

                        <div className="mt-3 ">
                            <input ref={name} className=" user-form-input" type="text" placeholder="Your name" />
                        </div>
                        <div className="mt-3 ">
                            <input ref={contact} className=" user-form-input" type="number" placeholder="Your contact Number" />
                        </div>

                        <div className="mt-3 ">
                            <input ref={email} className=" user-form-input" type="email" placeholder="Your email" />
                        </div>

                        <div className="mt-4">
                            <input ref={password} className="user-form-input" type="password" placeholder="Your password" />
                        </div>

                        <div className="mt-5 ">
                            <button ref={submit} className="btn btn-danger user-form-submit" type="submit">SignUp</button>
                        </div>

                    </form>

                </div>
            </div>
        </div>




    </div>
}

export default UserSignUp;