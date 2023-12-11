import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidate";
import axios from "axios";


function Login({onLogin}){
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/login', values)
            .then(res =>{
                if(res.data.status === "success"){
                    const uid = res.data.uid;
                    console.log(uid);
                    localStorage.setItem('user_id', uid);
                    localStorage.setItem('jwt',res.data.token);
                    onLogin();
                    navigate('/home');
                }
                else{
                    alert("Retry");
                }
            })
            .catch(err => console.log(err));
        }
    }

    const handleInput =(event)=>{
        setValues(prev=>({...prev, [event.target.name]: event.target.value}))
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="bg-white p-3 rounded w-25 mt-5">
                <h2>Login Here</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="ui-1">
                        <label htmlFor="Email">Email Id</label>
                        <input type="email" name="email" placeholder="Enter Email id" onChange={handleInput} className="form-control rounded-0" />
                        {errors.email && <span className ='text-danger'> {errors.email}</span>}
                    </div>
                    <div className="ui-2">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" placeholder="Enter Password"onChange={handleInput} className="form-control rounded-0"/>
                        {errors.password && <span className ='text-danger'> {errors.password}</span>}
                    </div>
                    <p></p>
                    <button type ="submit" className="btn btn-success w-100 rounded-0">Log In</button>
                    <p></p>
                    <p>New User?</p>
                    <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Sign Up</Link>
                </form>

            </div>
        </div>
    )
}

export default Login