import { useNavigate } from "react-router-dom";
import "./user-signin.css"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import baseUrl from "../../../webApi/BaseUrl/baseUrl";
import api from "../../../webApi/Home/api";
import { useDispatch } from "react-redux";
import { CurrentUser } from "../../../redux-Config/Index/userSlice";
import { ToastContainer, toast } from "react-toastify";
function UserSignIn(){
     const password=useRef();
     const email=useRef();
     const submit=useRef();

     const dispatch=useDispatch();

    const navigate=useNavigate();

   
    const HandleSubmit= async(event)=>{
        event.preventDefault();
        try{
            let response= await axios.post(baseUrl.BASE_URl+api.SIGNIN_USER,{email:email.current.value,password:password.current.value});
            
            if(response.status)
            {
             
              dispatch(CurrentUser(response.data));
              navigate("/");
              toast.success("SignIn Success");
             
            }
        }
        catch(err){
        
          toast.error("SignIn failed");
        }
        
    
    }


    return <div className="container" >
        <ToastContainer/>
           <div className="col-md-8 col-sm-12 mt-4  userSignInDiv  ">
             <div className="row  ">
               <div className="col-md-6  col-sm-12  ">
                  <img src="../img/customerLogin.jpg" height={"600px"} width={"100%"} /> 
               </div>

               <div className="col-md-6  col-sm-12 text-center">
                  <p className="user-form-title">Sign in to your account</p>
                  <p className="text-muted">Don't have an account? <span style={{color:"red"}}>Free sign up</span></p>
                  <form onSubmit={HandleSubmit} >

                    <div className="mt-3 ">
                      <input ref={email} className=" user-form-input" type="email" placeholder="Your email"/>
                    </div>

                    <div className="mt-4">
                      <input ref={password} className="user-form-input" type="password" placeholder="Your password"/>
                    </div>

                    <div className="mt-5 ">
                        <button ref={submit} className="btn btn-danger user-form-submit" type="submit">SignIn</button>
                    </div>

                  </form>
                 
               </div>
             </div>
             </div>
          
           


    </div>
}

export default UserSignIn;