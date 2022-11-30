
import React from "react";
import { Route, Routes} from "react-router-dom";
import withContext, { Provider } from "./Context";


//------------------COMPONENTS---------------//
import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CourseDetail from "./components/CourseDetail";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from './components/UpdateCourse';

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const UserSignInWithContext = withContext(UserSignIn);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignOutWithContext = withContext(UserSignOut);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);

const App = () => {
  return (
    <Provider>
    <React.Fragment>
      <HeaderWithContext />

        <Routes>
          <Route path="/" element={<CoursesWithContext />} />
          <Route path="/courses/create" element={<CreateCourseWithContext />} />
          <Route path="courses/:id" element={<CourseDetailWithContext />} />
          <Route path="courses/:id/update" element={<UpdateCourseWithContext />} />
          <Route path="/signin" element={<UserSignInWithContext />} />
          <Route path="/signout" element={<UserSignOutWithContext />} />
          <Route path="/signup" element={<UserSignUpWithContext />} />
        </Routes>

    </React.Fragment>
    </Provider> 
  );
};


export default App;
