import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { UserAPI } from '../apis/api';
import { Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../context/login.css'
import '../context/navbar.css'
import { CourseAPI } from '../apis/apiCourses.js';
import {
  MDBInput
}
  from 'mdb-react-ui-kit';
export default function Course(props) {
  const logout = () => {
    props.logout();
  }
  const location = useLocation();
  const course = location.state.course;
  const [courseData, setCourseData] = useState({
    name: '',
    id: '',
    description: '',
    users: []
  });
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    course: '',
    pcn: '',
    password: '',
    address: '',
    email: '',
  });
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await localStorage.getItem('user');
        const parsedUser = JSON.parse(user);
        setUserData(parsedUser);
      } catch (error) {
        console.error('Error retrieving and parsing user data', error);
      }
    };
    getUserData();
  }, []);
  useEffect(() => {
    setCourseData({
      id: course.id,
      name: course.name,
      description: course.description,
      users: course.users
    })
    console.log(course);
    UserAPI.getAll()
      .then(users => {
        setUsers(users.users);
        setSelectedUsers(course.users)
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);
  const [Message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const UserSelection = (event) => {
    const selectedUser = users.find(user => user.email === event.target.value)
    const foundStudent = selectedUsers.find(user => user.email === selectedUser.email)
    if (!foundStudent) {
      const updatedUsers = [...selectedUsers, selectedUser];
      setSelectedUsers(updatedUsers);
      setCourseData(prevCourseData => ({
        ...prevCourseData,
        users: selectedUsers
      }));
    }
  }
  const updateCourse = async (event) => {
    try {
      const updatedCourseData = {
        ...courseData,
        users: selectedUsers
      };
      console.log(selectedUsers);
      console.log(courseData);
      const response = await CourseAPI.update(updatedCourseData);
      setMessage("Successfully updated.");
    }
    catch (error) {
      console.log(error);
    }
  };
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
      </div><div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px' }}>

      </div>
      <div style={{ alignItems: "center", display: "flex" }}>
        <div className=' p-2 ' style={{
          marginTop: '-306px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
        }}>
          <Navbar className="flex-column" style={{ width: "22%" }}>
            <Container>
              <Nav className="me-auto" style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}>
                <Link to="/createAnnouncement" state={{ course: { course } }} className=" myButton " style={{
                  backgroundColor: "#D78521",
                  color: "#F4F9E9", padding: "10px 25px",
                    textDecoration: "none",
                    fontFamily: "cursive",
                  fontSize: "1.2rem",
                }}>Create Announcement</Link>
                <Link to={`/courses/${course.id}/announcements`} className="myButton" state={{ course }} style={{
                    textDecoration: "none",
                    backgroundColor: "#D78521", color: "#F4F9E9", fontFamily: "cursive", padding: "10px 25px", fontSize: "1.2rem",
                }}>All announcements</Link>
                <Link to={`/courses/${course.id}/createAssignment`} className="myButton" state={{ course }} style={{
                    textDecoration: "none",
                    backgroundColor: "#D78521", color: "#F4F9E9", fontFamily: "cursive", padding: "10px 25px", fontSize: "1.2rem",
                }}>Create assignment</Link>
                <Link to={`/courses/${course.id}/assignments`} className="myButton" state={{ course }} style={{
                    textDecoration: "none",
                    backgroundColor: "#D78521", color: "#F4F9E9", fontFamily: "cursive", padding: "10px 25px", fontSize: "1.2rem",
                }}>All assignments</Link>
                <Link
                  to={`/chats`}
                  state={{ course }}
                  className="myButton"
                  style={{ backgroundColor: "#D78521",
                  textDecoration: "none",
                  color: "#F4F9E9", fontFamily: "cursive", padding: "10px 25px", fontSize: "1.2rem", }}
                  onClick={(event) => {
                    if (userData.course.id !== course.id) {
                      event.preventDefault();
                      alert("You don't have access to this course's chat.");
                    }
                  }}
                >
                  Chat
                </Link>
                <Link to={`/courses/${course.id}/statistics`} state={{ course }} className="myButton" style={{
                    textDecoration: "none",
                    backgroundColor: "#D78521", color: "#F4F9E9", fontFamily: "cursive", padding: "10px 25px", fontSize: "1.2rem",
                }}>See statistics</Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <Form.Group className="course-container">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div className='' style={{
              marginTop: '-200px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: "column",
                width: '900px',
                padding: '20px',
                border: '1px solid #ccc',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
              }}>
                <p>Course name</p>
                <MDBInput
                  id="course-name" value={courseData.name}
                  onChange={(event) =>
                    setCourseData({ ...courseData, name: event.target.value })}
                  style={{ width: "400px" }} required />
                <p>Course description:</p>
                <textarea type="text" wrap="hard" id="course-description" value={courseData.description} class="form-control" style={{ height: "7rem", width: "400px" }} onChange={(event) =>
                  setCourseData({ ...courseData, description: event.target.value })} required>
                </textarea>
                <p>Users in this course:</p>
                <ul className="list-group" >
                  {selectedUsers.map((user) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={user.id} style={{ width: "25rem" }}>
                      {user.email} with pcn {user.pcn}
                      <div  >
                        <button type="button" style={{height:"50px",width:"40px"}} onClick={() => setSelectedUsers(prevUsers => prevUsers.filter(u => u.pcn !== user.pcn))}>
                         X
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>All users: </p>
                <select onChange={UserSelection} style={{ width: "25rem" }}>
                  <option value="" >Select a user</option>
                  {users.map(user => (
                    <option key={user.email} value={user.email}>{user.email}</option>
                  ))}
                </select>
                <br></br>
                <button id="edit-course-info" type="button" onClick={() => updateCourse()} class="btn btn-primary myButton">Edit Course Information</button>
                {Message && (
                  <div className="alert alert-success" role="alert">
                    {Message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Form.Group>
      </div>

    </Container >
  )
}