import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./LoginValidate";
import axios from 'axios'


function Signup(){
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res =>{
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }

    const handleInput =(event)=>{
        setValues(prev=>({...prev, [event.target.name]: [event.target.value]}));
    }
    return(
        <div className="d-flex justify-content-center align-items-center vh-50">
            <div className="bg-white p-3 rounded w-25">
                <h2>Sign Up</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="ui-1">
                        <label htmlFor="name" >Name</label>
                        <input type="text" placeholder="Enter your Name" className="form-control rounded-0" name="name" onChange={handleInput} autoComplete="name"/>
                        {errors.name && <span className ='text-danger'> {errors.name}</span>}
                    </div>
                    <div className="ui-2">
                        <label htmlFor="email">Email Id</label>
                        <input type="email" placeholder="Enter Email id" className="form-control rounded-0" name="email" onChange={handleInput} autoComplete="email"/>
                        {errors.email && <span className ='text-danger'> {errors.email}</span>}
                    </div>
                    <div className="ui-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter Password" className="form-control rounded-0" name="password" onChange={handleInput} autoComplete="new-password"/>
                        {errors.password && <span className ='text-danger'> {errors.password}</span>}
                    </div>
                    <p></p>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
                    <p></p>
                    <p>Already have an account?</p>
                    <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Log In</Link>
                </form>

            </div>
        </div>
    )
}

export default Signup