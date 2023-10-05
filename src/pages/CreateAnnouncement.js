import React, { useState, useEffect } from "react";
import { apiAnnouncements } from '../apis/apiAnnouncements';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar.js';
import {
  MDBBtn,
  MDBCol,
  MDBRow,
  MDBInput
}
  from 'mdb-react-ui-kit';
import '../context/login.css'
export default function CreateAnnouncement(props) {
  const logout = () => {
    props.logout();
  }
  const location = useLocation();
  const { course } = location.state;
  const [user, setUser] = useState([]);
  useEffect(() => {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    setUser(parsedUser)
    setAnnouncementData({ ...announcementData, userEntity: parsedUser })
  }, []);
  const [Message, setMessage] = useState("");
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    description: '',
    course: course
    , userEntity: ''
  }); const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiAnnouncements.create(course, announcementData)
      setMessage("Successfully created.");
    } catch (error) {
      console.log(error);
      setMessage("You should fill every field.");
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
      </div>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px' }}></div>
        <div className='mx-5 mb-5 p-5 ' style={{ marginTop: '-180px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
            <h2 className="fw-bold mb-5">Make an announcement</h2>
            <MDBRow>
              <MDBCol col='6'>
                <p>Title</p>
                <MDBInput wrapperClass='mb-4'  type='text' value={announcementData.title}
                  onChange={(event) =>
                    setAnnouncementData({ ...announcementData, title: event.target.value })
                  } required />
              </MDBCol>
              <MDBCol col='6'>
                <p>Description</p>
                <MDBInput wrapperClass='mb-4' type='text' value={announcementData.description}
                  onChange={(event) =>
                    setAnnouncementData({ ...announcementData, description: event.target.value })
                  } required />
              </MDBCol>
            </MDBRow>
            <MDBBtn type='submit' className='w-100 mb-4 myButton' style={{ backgroundColor: "#222222", height: "70px" }} size='md'>Make an announcement</MDBBtn>
            {Message && (
              <div className="alert alert-success" role="alert">
                {Message}
              </div>
            )}
          </div>
      </form>
    </Container>
  )
}
