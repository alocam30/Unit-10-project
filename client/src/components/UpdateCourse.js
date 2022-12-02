import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  
    const navigate = useNavigate();
    const {id} = useParams();
    const [errors, setErrors] = useState([]);

    const [course, setCourse] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");
    const [materialsNeeded, setMaterialsNeeded] = useState("");

    useEffect( () => {
        context.data
        .getCourse(id)
        .then((course) => {
            if (course) {
              if (course.userId !== context.authenticatedUser?.id) {
                navigate("/");
              }
              setCourse(course);
              setTitle(course.title);
              setDescription(course.description);
              setEstimatedTime(course.estimatedTime);
              setMaterialsNeeded(course.materialsNeeded);
            }
          })
          .catch((err) => {
            if (err.message === "404") {
              navigate("/");
            } else {
              navigate("/");
            }
          });
          // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleUpdate = (e) => {
        e.preventDefault();

        const course = {
          title,
          description,
          estimatedTime,
          materialsNeeded,
        };
        context.data
          .updateCourse(
            id,
            course,
            context.authenticatedUser.email,
            context.authenticatedUser.password
          )
          .then((errors) => {
            if (errors.length) {
              setErrors(errors);
              console.log(errors);
            } else {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log("interal server error", err);
            navigate("/");
          });   
    }


return (
    <main>
        <div className="wrap">
            <h2>Update Course</h2>
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
            <form onSubmit={handleUpdate}>
                <div className="main--flex">
                    <div>
                        <label htmlFor="courseTitle">Course Title</label>
                        <input 
                            id="courseTitle"
                            name="courseTitle" 
                            type="text" 
                            value="Build a Basic Bookcase"
                            onChange={(e) => {
                                setTitle(e.target.value);
                                }}
                            />

                        <p>By {course.firstName} {course.lastName}</p>

                        <label htmlFor="courseDescription">Course Description</label>
                        <textarea 
                            id="courseDescription" 
                            name="courseDescription"
                            value={description}
                            onChange={(e) => {
                            setDescription(e.target.value);
                            }}>
                        </textarea>
                    </div>
                    <div>
                        <label hmtlFor="estimatedTime">Estimated Time</label>
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime}
                            onChange={(e) => {
                                setEstimatedTime(e.target.value)
                            }}
                        />

                        <label htmlFor="materialsNeeded">Materials Needed</label>
                        <textarea id="materialsNeeded" name="materialsNeeded">* 1/2 x 3/4 inch parting strip&#13;&#13;* 1 x 2 common pine&#13;&#13;* 1 x 4 common pine&#13;&#13;* 1 x 10 common pine&#13;&#13;* 1/4 inch thick lauan plywood&#13;&#13;* Finishing Nails&#13;&#13;* Sandpaper&#13;&#13;* Wood Glue&#13;&#13;* Wood Filler&#13;&#13;* Minwax Oil Based Polyurethane</textarea>
                    </div>
                </div>
                <button class="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
            </form>
        </div>
    </main>
);
}



export default UpdateCourse;