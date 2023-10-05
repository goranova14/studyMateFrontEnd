import React, { useState, useEffect } from "react";
import { CourseAPI } from '../apis/apiCourses';
import { UserAPI } from '../apis/api';
import NavigationBar from '../components/NavigationBar.js';
// import '../context/settings.css'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput
}
  from 'mdb-react-ui-kit';
import '../context/login.css'
export default function Settings(props) {
  const logout = () => {
    props.logout();
  }
  const [Message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    users: []
  });
  useEffect(() => {
    UserAPI.getAll()
      .then(users => {
        setUsers(users.users);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
  }, []);
  const UserSelection = (event) => {
    const selectedUser = users.find(user => user.email === event.target.value)
    const foundStudent = selectedUsers.find(user => user.email === selectedUser.email)
    if (!foundStudent) {
      setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, selectedUser]);
      setCourseData(prevState => ({
        ...prevState,
        users: [...prevState.users, selectedUser]
      }));
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCourseData({
      name: '',
      description: '',
      users: []
    })
    try {
      const updatedCourseData = {
        ...courseData,
        users: selectedUsers
      };
      console.log(courseData);
      const response = await CourseAPI.create(updatedCourseData);
      console.log(response)
      setMessage("Successfully created.");
    }
    catch (error) {
      console.log(error);
      setMessage("You should fill every field.")
    }
  };
  return (
    <MDBContainer fluid>
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
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="p-5 bg-image" style={{ backgroundColor: "#E4C7C4", height: '300px' }}></div>
        <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
          {/* <MDBCardBody className='p-5 text-center'> */}
          <h2 className="fw-bold mb-5">Create a course</h2>
          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Name' id='name' name='name' type='text' value={courseData.name}
                onChange={(event) =>
                  setCourseData({ ...courseData, name: event.target.value })
                } required />
            </MDBCol>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' label='Description' id='description' name='description' type='text' value={courseData.description}
                onChange={(event) =>
                  setCourseData({ ...courseData, description: event.target.value })
                } required />
            </MDBCol>
          </MDBRow>
          <div>
            <h1>User List</h1>
            <select onChange={UserSelection}>
              <option value="">Select a user</option>
              {users.map(user => (
                <option key={user.email} value={user.email}>{user.firstName}</option>
              ))}
            </select>
            <ul>
              {selectedUsers.map(user => (
                <li key={user.email}>
                  {user.email}
                  <button onClick={() => setSelectedUsers(prevSelectedUsers => prevSelectedUsers.filter(u => u.email !== user.email))}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <MDBBtn type='submit' className='w-100 mb-4 myButton' style={{ backgroundColor: "#222222", height: "70px" }} size='md'>Create course</MDBBtn>
          {Message && (
            <div className="alert alert-success" role="alert">
              {Message}
            </div>
          )}
          {/* </MDBCardBody> */}
        </MDBCard>
      </form>
    </MDBContainer>
  )
}