import React, {useRef, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserSignUp = () => {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text" 
                      defaultValue=""
                      ref={firstName}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      defaultValue=""
                      ref={lastName}/>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                      id="emailAddress" 
                      name="emailAddress"
                      type="email" 
                      defaultValue=""
                      ref={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input
                      id="password" 
                      name="password" 
                      type="password" 
                      defaultValue=""
                      ref={password}/>
                    <button className="button" type="submit">Sign Up</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                    <p>Already have a user account? Click here to {" "}
                    <NavLink to="/signin">sign in</NavLink>
                    </p>
            </div>
        </main>
 )};

export default UserSignUp;