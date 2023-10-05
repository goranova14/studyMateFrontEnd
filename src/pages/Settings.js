import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { UserAPI } from '../apis/api';
import '../context/settings.css'
import NavigationBar from '../components/NavigationBar.js';
import '../context/login.css'
import showPwdImg from "../context/hide-password.svg";
import hidePwdImg from "../context/show-password.svg";
export default function Settings(props) {
  const logout = () => {
    props.logout();
  }
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    course: '',
    pcn: '',
    password: '',
    address: '',
    email: '',
  });
  const [isRevealPwd, setIsRevealPwd] = useState(false);
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
  const [Message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(userData)
      userData.role = "STUDENT"
      const response = await UserAPI.update(userData.pcn, userData);
      console.log(response)
      setMessage("Successfully updated.");
    }
    catch (error) {
      setMessage(`${error}`);
      console.log(error);
    }
  };
  return (
    <Container fluid>
      <div>
        <NavigationBar />
        <div>
          <button onClick={logout} style={{
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

        <div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px' }}>

        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>

          <div className='mx-5 mb-5 p-5 ' style={{
            marginTop: '-260px', justifyContent: 'center',
            alignItems: 'center', width: '670px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Row >
                <Col>
                  <h1>Settings</h1>
                  <br></br>
                  <Form onSubmit={handleSubmit} >
                    <p>First name</p>
                    <Form.Control type="text" placeholder="Enter your first name" value={userData.firstName} id="firstName"
                      onChange={(event) =>
                        setUserData({ ...userData, firstName: event.target.value })} required />
                    <p>Last name</p>
                    <Form.Control
                      type="text" placeholder="Enter your last name" value={userData.lastName}
                      onChange={(event) =>
                        setUserData({ ...userData, lastName: event.target.value })} required />
                    <p>Email address</p>
                    <Form.Control
                      type="text"
                      value={userData.email}
                      placeholder={userData.email}
                      onChange={(event) =>
                        setUserData({ ...userData, email: event.target.value })}
                      required />
                    <p>Address</p>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={userData.address}
                      onChange={(event) =>
                        setUserData({ ...userData, address: event.target.value })}
                      required />
                    <div className="pwd-container1">
                      <p>Password</p>
                      <div style={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: 'center',
                        alignItems: 'center', gap: "10px"
                      }}>

                        <Form.Control
                          type={isRevealPwd ? "text" : "password"} placeholder="Password"
                          onChange={(event) =>
                            setUserData({ ...userData, password: event.target.value })}
                          required />
                        <img style={{ width: "20px" }}
                          title={isRevealPwd ? "Hide password" : "Show password"}
                          src={isRevealPwd ? hidePwdImg : showPwdImg}
                          onClick={() => setIsRevealPwd(prevState => !prevState)}
                        />
                      </div>
                    </div>
                    <br></br>
                    <br></br>
                    <Button className="myButton" variant="primary" type="submit">
                      Save Changes
                    </Button>
                    {Message && (
                      <div className="alert alert-success" role="alert">
                        {Message}
                      </div>
                    )}
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </Container >
  )
}
