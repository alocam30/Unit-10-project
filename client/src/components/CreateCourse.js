import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";


const CreateCourse = () => {
const navigate = useNavigate();
const errors = useRef();

const [title, setTitle] = useState();
const [courseDescription, setCourseDescription] = useState();
const [estimatedTime, setEstimatedTime] = useState();
const [materialsNeeded, setMaterialsNeeded] = useState();

const handleChange= (e) => {
 setTitle(e.target.value);
 setCourseDescription(e.target.value);
 setEstimatedTime(e.target.value);
 setMaterialsNeeded(e.target.value);

    useContext.data
    .then ( (errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`${title} was successfully created!`)
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
                             onChange={handleChange}
                             value={title}/>

                            <p>By </p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                             id="courseDescription" 
                             name="courseDescription"
                             type="text"
                             onChange={handleChange}
                             value={courseDescription}>
                             </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                             id="estimatedTime" 
                             name="estimatedTime" 
                             type="text" 
                             onChange={handleChange}
                             value={estimatedTime}
                             />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                             id="materialsNeeded" 
                             name="materialsNeeded"
                             onChange={handleChange}
                             value={materialsNeeded}>
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