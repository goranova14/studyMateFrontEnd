import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { UserAPI } from "../apis/api";
import announcement from '../components/announcement.jpg';
import assignments from '../components/assignments.jpg';
export default function HomePageAdmin(props) {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    course: '',
    pcn: '',
    password: '',
    address: '',
    email: ''
  });
  const logout = () => {
    props.logout();
    console.log(userData);
  }
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('token');
      const decodedToken = jwt_decode(accessToken);
      const foundUser = UserAPI.getByPCN(decodedToken.userId)
        .then((foundUser) => {
          if (foundUser) {
            setUserData(foundUser);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      if (foundUser) {
        setUserData(foundUser);
      }
    }
    catch (error) {
      console.log(error);
    }
  }, []);
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
      <Row>
        <Col>
          <h1 style={{
            fontFamily: "Brush Script MT, cursive",
            fontSize: "3.2rem"
          }}>Welcome to StudyMate,teacher !</h1>
        </Col>
        </Row>
        <Col>
        <button onClick={() => navigate('/createTeacher')} style={{
          backgroundColor: "#D78521",
          // color: "#F4F9E9",
          fontFamily: "cursive",
          fontSize: "1.2rem",
          padding: "10px 25px"
        }}>
          Create teacher profile
        </button>
        <button onClick={() => navigate('/students')} style={{
          backgroundColor: "#D78521",
          fontFamily: "cursive",
          fontSize: "1.2rem",
          padding: "10px 25px",
        }}>
          View all users
        </button>
          </Col>
      <Row>
        <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
          <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{
            cursor: 'pointer'
          }} onClick={() => {
            navigate(`/settings`);
          }}>
            <div class="my-3 p-3" >
              <h2 class="display-5">Settings</h2>
              <p class="lead">Here you are able to see and change you personal data.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0', backgroundImage: ` url(${announcement})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
            </div>
          </div>

          <div class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden" style={{
            cursor: 'pointer'
          }} onClick={() => {
            navigate(`/courses`)
          }}>
            <div class="my-3 p-3" >
              <h2 class="display-5">All courses</h2>
              <p class="lead">Here you can review every course data.</p>
            </div>
            <div class="bg-dark box-shadow mx-auto" style={{
              width: '80%', height: '300px', borderRadius: '21px 21px 0 0', backgroundImage: ` url(${assignments})`, backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          </div>
        </div>
      </Row>
    </Container >
  );
}
