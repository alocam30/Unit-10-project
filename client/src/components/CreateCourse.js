import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";


const CreateCourse = ({ context }) => {
    const navigate = useNavigate();

    const [errors, setErrors] = useState([]);

    const authUser = context.authenticatedUser;
    const title = useRef();
    const description = useRef();
    const estimatedTime = useRef();
    const materialsNeeded= useRef();

   
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
            setErrors({ errors });
          } else {
            navigate("/")
          }
        })
        .catch( (err) => {
          console.log(err);
          navigate("/error");
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