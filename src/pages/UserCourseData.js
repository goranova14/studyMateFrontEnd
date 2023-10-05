import React from 'react'
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import '../context/course.css'
import { useNavigate } from 'react-router-dom';
import assignments from '../components/assignments.jpg';
import announcement from '../components/announcement.jpg';
import statistics from '../components/statistics.jpg';
import students from '../components/students.jpg';
export default function UserCourseData(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state.course;
  console.log(course);
  const logout = () => {
    props.logout();
  }
  return (
    <Container fluid>
      <div>
        <NavigationBar />
        <button onClick={logout}  style={{
          backgroundColor: "#D78521",
          color: "#F4F9E9",
          fontFamily: "cursive",
          fontSize: "1.2rem",
          padding: "10px 25px",
          borderRadius: "5px",
          margin: "10px",
          background: " rgb(160,172,173)",
          background: " linear-gradient(90deg, rgba(160,172,173,1) 0%, rgba(215,133,33,1) 98%)",
        }}>
          Log out
        </button>
      </div>
      <body>
        <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
          <div class="col-md-5 p-lg-5 mx-auto my-5">
            <h1 class="display-4 font-weight-normal">{course.name}</h1>
            <p class="lead font-weight-normal">{course.description}</p>
          </div>
          <div class="product-device box-shadow d-none d-md-block"></div>
          <div class="product-device product-device-2 box-shadow d-none d-md-block"></div>
        </div>
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div class="bg-dark mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
            <div class="my-3 py-3">
              <h2 class="display-5">
                Welcome to your {course.name} course page!<br></br>
              </h2>
              <p class="lead">
                Here, you can find everything related to your course. If you are looking to improve your skills, we are here for you by providing you with guidance and support, so you can achieve your goals. Let's get started!
              </p>
            </div>
          </div>
        </div>
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{
            cursor: 'pointer'
          }} onClick={() => {
            navigate(`/courses/${course.id}/announcements`, { state: { course } });
          }}>
            <div class="my-3 p-3" >
              <h2 class="display-5">Announcements</h2>
              <p class="lead">See all that your teacher have to share with you.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0', backgroundImage: ` url(${announcement})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
          <div class="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden" style={{
            cursor: 'pointer'
          }} onClick={() => {
            navigate(`/courses/${course.id}/assignments`, { state: { course } });
          }}>
            <div class="my-3 py-3">
              <h2 class="display-5">Assignments</h2>
              <p class="lead">Check out what you should submit.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0',
              backgroundImage: ` url(${assignments})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
            style={{
              cursor: 'pointer'
            }} onClick={() => {
              navigate(`/courses/${course.id}/users`, { state: { course } });
            }}>
            <div class="my-3 p-3" >
              <h2 class="display-5">Users</h2>
              <p class="lead">See your classmates and teachers.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0', backgroundImage: ` url(${students})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
          </div>
          <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{
            cursor: 'pointer'
          }} onClick={() => {
            navigate(`/students/statistics`, { state: { course } });
          }}>
            <div class="my-3 p-3" >
              <h2 class="display-5">Grades</h2>
              <p class="lead">See your grade progress.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0', backgroundImage: ` url(${statistics})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>

      </body >
    </Container >
  )
}
