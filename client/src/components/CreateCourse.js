import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";


const CreateCourse = () => {
const navigate = useNavigate();

const [title, setTitle] = useState();
const [courseDescription, setCourseDescription] = useState();
const [estimatedTime, setEstimatedTime] = useState();
const [materialsNeeded, setMaterialsNeeded] = useState();

const handleChange= (e) => {
 setTitle(e.target.value);
 setCourseDescription(e.target.value);
 setEstimatedTime(e.target.value);
 setMaterialsNeeded(e.target.value);

 navigate("/");
};

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
                    </ul>
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
            </div>  
        </main>          
    );
} 

export default CreateCourse;