import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../asset/style/SignUpPage.css";

export function SignUpPage(){
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
     });

     const navigate  = useNavigate();

     const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

     const handleSubmit = async (event) =>{
        event.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const res = await fetch("/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            alert('Account created successfully!');
            navigate('/login'); 
        } else {
            const errorData = await res.json();
            alert('Signup failed: ' + errorData.msg);
        }
    };


    return (
        <>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
                <h2>Please Sign Up</h2>
                <div className="form-signup">
                <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <div className="form-group mb-3">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="form-control"
                        required
                    />
                </div>
                <label htmlFor="username">Username</label>
                <div className="form-group mb-3">
                        <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="form-control"
                        required
                    />
                </div>
                <label htmlFor="password">Password</label>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="form-control"
                        required
                        />
                </div>
                <label htmlFor="password">Confirm Password</label>
                <div className="form-group mb-3">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="form-control"
                        required
                        />
                </div>
                <button className="btn btn-secondary w-30 py-2" type="submit">Sign Up</button>
            </form> 
            </div>
            </div>
            </div>
            </div>       
       </> 
)};

SignUpPage.propTypes = {};

