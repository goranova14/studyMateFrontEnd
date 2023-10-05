import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from 'react-router-dom';
import { CourseAPI } from '../apis/apiCourses.js';
import { Container } from 'react-bootstrap';
import '../context/courses.css'
export default function Courses(props) {
    const logout = () => {
        props.logout();
    }
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        CourseAPI.getAll()
            .then(courses => {
                setCourses(courses.courses);
            })
            .catch(error => {
                console.error('Error fetching courses list:', error);
            });
    }, []);
    return (
        <div>
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
                <button onClick={() => navigate('/createCourse')} className="px-25 myButton " style={{
                    backgroundColor: "#D78521", color: "#F4F9E9",
                    fontFamily: "cursive", fontSize: "1.2rem", padding: "10px 25px"
                }}> Create new course</button>



                <div className="d-flex flex-wrap justify-content-center align-items-center card-container ">
                    {courses.map(course => (
                        <div key={course.id} onClick={() => {
                            CourseAPI.getByID(course.id)
                                .then(course => {
                                    navigate(`/courses/${course.id}`, { state: { course } });
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        }} class="card text-center" >
                            <div class="card-body">
                                <p style={{ color: "#F4F9E9" }}>{course.name}</p>
                                <footer style={{ color: "#D78521" }}>< cite title="Source Title" >{course.description}</cite></footer>
                            </div>
                        </div>
                    ))}
                </div>
            </Container >
        </div >
    )
}