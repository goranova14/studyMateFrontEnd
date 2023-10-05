import './App.css';
import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from './pages/Login.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import HomePageAdmin from './pages/HomePageAdmin';
import CreateCourse from './pages/CreateCourse';
import Settings from './pages/Settings';
import Courses from './pages/Courses';
import Course from './pages/Course';
import CreateAnnouncement from './pages/CreateAnnouncement';
import Announcements from './pages/Announcements';
import EditAnnouncement from './pages/EditAnnouncement';
import CreateAssignment from './pages/CreateAssignment';
import Assignments from './pages/Assignments';
import EditAssignment from './pages/EditAssignment';
import UserCourseData from './pages/UserCourseData';
import CreateTeacher from './pages/CreateTeacher';
import AllUSers from './pages/AllUsers';
import GradeStudents from './pages/GradeStudents';
import ChatRoom from './pages/Chat';
import AssignmentDetails from './pages/AssignmentDetails';
import StatisticsGrades from './pages/StatisticsGrades';
import CourseStatistics from './pages/CourseStatistics';
import CourseUsers from './pages/CourseUsers';
import NavigationBar from './components/NavigationBar';

function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState(null);

  const handleAuthentication = (isAuthenticated, role) => {
    setAuthenticated(isAuthenticated);
    localStorage.setItem('authenticated', 'true')
    localStorage.setItem('role', role)
    setUserRole(localStorage.getItem('role'))

  };

  const logout = () => {

    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    // localStorage.removeItem('role');
    // localStorage.removeItem('authenticated');
    setAuthenticated(false);
    localStorage.clear();
    setUserRole(null);

  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setUserRole(localStorage.getItem('role'))

    }
    else {

      <Navigate to="/"></Navigate>

    }
  }, [])


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleAuthentication={handleAuthentication} />} />

        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={
          localStorage.getItem('authenticated') === 'true' ? <Settings logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="/courses" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <Courses logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        } /><Route path="/students/statistics" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'STUDENT' ? (
            <StatisticsGrades logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        } />
        <Route path="/courses/:id" element={
          localStorage.getItem('authenticated') === 'true' ? <Course logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="/myCourse" element={
          localStorage.getItem('authenticated') === 'true' ? <UserCourseData logout={logout} /> : <Navigate to="/" />
        } />

        <Route path="/createCourse" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <CreateCourse logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        } />
        <Route path="/createAnnouncement" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <CreateAnnouncement logout={logout} />) : (

            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        } />
        <Route path="courses/:id/announcements" element={
          localStorage.getItem('authenticated') === 'true' ? <Announcements logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="/students/grades" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <GradeStudents logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        }
        />

        <Route path="courses/:id/createAssignment" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <CreateAssignment logout={logout} />)
            : (
              <Navigate to="/" />)) : (<Navigate to="/" />
          )

        } />
        <Route path="courses/:id/assignments" element={
          localStorage.getItem('authenticated') === 'true' ? <Assignments logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="courses/:id/assignments/:id" element={
          localStorage.getItem('authenticated') === 'true' ? <EditAssignment logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="courses/:id/announcements/:id" element={
          localStorage.getItem('authenticated') === 'true' ? <EditAnnouncement logout={logout} /> : <Navigate to="/" />
        } />
        <Route path="chats" element={
          localStorage.getItem('authenticated') === 'true' ? <ChatRoom logout={logout} /> : <Navigate to="/" />
        } />
         <Route path="courses/:id/users" element={
          localStorage.getItem('authenticated') === 'true' ? <CourseUsers logout={logout} /> : <Navigate to="/" />
        } />


        <Route path="/home" element={
          localStorage.getItem('authenticated') === 'true' ? (
            userRole === 'TEACHER' ?
              <HomePageAdmin logout={logout} />
              :
              <HomePage logout={logout} />

          ) : (
            <Navigate to="/" />
          )
        } />
        <Route path="/students" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <AllUSers logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        }
        />
        <Route path="/courses/:id/statistics" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <CourseStatistics logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        }
        />
        <Route path="/createTeacher" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'TEACHER' ? (
            <CreateTeacher logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        }
        /><Route path="/courses/:id/assignments/:id/grade" element={
          localStorage.getItem('authenticated') === 'true' ? (userRole === 'STUDENT' ? (
            <AssignmentDetails logout={logout} />) : (
            <Navigate to="/" />)) : (<Navigate to="/" />
          )
        }
        />

      </Routes>
    </Router>


  );
}

export default App;
