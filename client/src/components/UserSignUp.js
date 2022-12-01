import React, { useRef} from "react";
import { useNavigate, Link } from "react-router-dom";


const UserSignUp = ({ context }) => {
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password = useRef(null);
    const errors = useRef(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        };
        
        await context.actions
        .createUser(user)
        .then ( (errors) => {
          if (errors.length) {
            this.setState({ errors });
          } else {
            console.log(`${firstName} ${lastName} is succcessfully signed up and authenticated!`)
          }
        })
        .catch( (err) => {
          console.log(err);
          this.props.history.push("/error");
          })
          navigate("/")
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
                    <p>Already have a user account?<Link to="/signin"> Click here </Link> to sign in!
                    </p>
            </div>
        </main>
 )};

export default UserSignUp;
