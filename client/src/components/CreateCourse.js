import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";


const CreateCourse = ({ context }) => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);
    const authUser = context.authenticatedUser;
    const title = useRef(null);
    const description = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded= useRef(null);

    /**
     *
     * @param {event object} e - prevents the default functionality of form submission
     *  creates a course object that references input values
     *  * the course object is them passed to createCourse function via context along with username and password
     */

    const handleChange= (e) => {
    e.preventDefault();
    const course = {
    userId: context.authenticatedUser.id,
    title: title.current.value,
    description: description.current.value,
    estimatedTime: estimatedTime.current.value,
    materialsNeeded: materialsNeeded.current.value,
    };
    context.data
      .createCourse(
          course,
          context.authenticatedUser.email,
          context.authenticatedUser.password
        )
      .then ( (errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          navigate("/")
        }
      })
      .catch( (err) => {
        console.log(err);
        this.props.history.push("/error");
        })

        navigate("/");
        };

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                  {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                  ))}
                </ul>
            </div>
                </div>
                <form onSubmit={handleChange}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                             id="courseTitle" 
                             name="courseTitle" 
                             type="text" 
                             ref={title}/>

                            <p>By {authUser.firstName} {authUser.lastName} </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                             id="courseDescription" 
                             name="courseDescription"
                             type="text"
                             ref={description}>
                             </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                             id="estimatedTime" 
                             name="estimatedTime" 
                             type="text" 
                             ref={estimatedTime}
                             />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                             id="materialsNeeded" 
                             name="materialsNeeded"
                             ref={materialsNeeded}>
                             </textarea>
                        </div>
                    </div>
                    <button 
                     className="button" 
                     type="submit">Create Course</button>
                    <Link className="button button-secondary" to="/"> Cancel</Link>
                </form> 
        </main>          
    );
} 

export default CreateCourse;