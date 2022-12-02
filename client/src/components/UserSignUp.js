import React, { useRef, useState} from "react";
import { useNavigate, Link } from "react-router-dom";


const UserSignUp = ({ context }) => {

  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);


    const handleChange =  (e) => {
        e.preventDefault();
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };
      }
      
      const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
          firstName,
          lastName,
          emailAddress,
          password,
          errors,
        };
        context.data
        .createUser(user)
        .then ( (errors) => {
          if (errors.length) {
            setErrors({ errors });
          } else {
            context.actions
              .signIn()
              .then(() => {
                console.log("authenticated");
                navigate("/");
              });
          }
        })
        .catch( (err) => {
          console.log(err);
          navigate("/");
          })
        
        };
    

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                {errors && errors.length ? (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                  ))}
                </ul>
            </div>
             ) : null}
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      id="firstName" 
                      name="firstName" 
                      type="text" 
                      defaultValue=""
                      ref={firstName}
                      onChange={handleChange}
                      />
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      id="lastName" 
                      name="lastName" 
                      type="text" 
                      defaultValue=""
                      ref={lastName}
                      onChange={handleChange}
                      />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                      id="emailAddress" 
                      name="emailAddress"
                      type="email" 
                      defaultValue=""
                      ref={emailAddress}
                      onChange={handleChange}
                      />
                    <label htmlFor="password">Password</label>
                    <input
                      id="password" 
                      name="password" 
                      type="password" 
                      defaultValue=""
                      ref={password}
                      onChange={handleChange}
                      />
                    <button className="button" type="submit">Sign Up</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                    <p>Already have a user account?<Link to="/signin"> Click here </Link> to sign in!
                    </p>
            </div>
        </main>
 )};

export default UserSignUp;
