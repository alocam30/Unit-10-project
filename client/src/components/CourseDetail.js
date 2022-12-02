import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import  ReactMarkdown  from 'react-markdown';

const CourseDetail = ({ context }) => {
    const [course, setCourse] = useState([]);
    const { id } = useParams();

    let isAuthenticated = context.authenticatedUser;

    const firstName = useRef(null);
    const lastName = useRef(null);
    const title = useRef(null);
    // const description = useRef(null);
    // const materialsNeeded = useRef(null);
    const estimatedTime = useRef(null);


    useEffect(() => {
        context.data.course
            .getCourse(id)
            .then((data) => {setCourse(data)})

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link 
                        className="button" 
                        to="update" 
                        disabled={isAuthenticated ? false : true }>
                        Update Course
                        </Link>
                    <Link 
                        className="button" 
                        ref="#"
                        disabled={isAuthenticated ? false : true }>
                        Delete Course
                        </Link>
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{title}</h4>
                            <p>By {firstName} {lastName}</p>

                            <ReactMarkdown children={course.description}/>
                        </div>
                        <div>

                            <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{estimatedTime}</p>
                            <h3 className="course--detail--title">Materials Needed</h3>
                            
                            <ul className="course--detail--list">
                            <ReactMarkdown children={course.materialsNeeded}/>
                            </ul>

                        </div>
                    </div>
                </form>
            </div>
        </main>

    )
};


export default CourseDetail;