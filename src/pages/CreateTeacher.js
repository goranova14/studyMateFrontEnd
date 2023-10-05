import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar.js';
import { Container, Form } from 'react-bootstrap';
import showPwdImg from "../context/hide-password.svg";
import hidePwdImg from "../context/show-password.svg";
import {
  MDBCol,
  MDBRow,
  MDBInput
}
  from 'mdb-react-ui-kit';
import { UserAPI } from '../apis/api';
export default function CreateTeacher(props) {
  const logout = () => {
    props.logout();
  }
  const [formData, setFormData] = useState({
    pcn: '',
    firstName: '',
    lastName: '',
    address: '',
    password: '',
    email: '',
  });
  const [Message, setMessage] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await UserAPI.createTeacher(formData);
      setMessage('User has been created.');
      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        password: '',
        email: '',
      })
    } catch (error) {
      console.error(error);
      setMessage(`Failed to create user:${error}`);
      // setMessage("Failed to create user: User with this Email already exists");
    }
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  return (
    <Container fluid>
      <div>
        <NavigationBar />
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
      <form onSubmit={handleSubmit}>
        <div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px' }}></div>
        <div className='mx-5 mb-5 p-5 ' style={{ marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)' }}>
          <h2 className="fw-bold mb-5">Become a teacher</h2>
          <MDBRow>
            <MDBCol col='6'>
              <p>First name</p>
              <MDBInput wrapperClass='mb-4' id='firstName' name='firstName' type='text' value={formData.firstName}
                onChange={(event) =>
                  setFormData({ ...formData, firstName: event.target.value })
                } required />
            </MDBCol>
            <MDBCol col='6'>
              <p>Last name</p>
              <MDBInput wrapperClass='mb-4' id='lastName' name='lastName' type='text' value={formData.lastName}
                onChange={(event) =>
                  setFormData({ ...formData, lastName: event.target.value })
                } required />
            </MDBCol>
          </MDBRow>
          <MDBCol col='6'>
            <p>Address</p>
            <MDBInput wrapperClass='mb-4' id='address' name='address' type='text' value={formData.address}
              onChange={(event) =>
                setFormData({ ...formData, address: event.target.value })
              } required />
          </MDBCol>
          <p>Email</p>
          <MDBInput wrapperClass='mb-4' id='email' name='email' type='email' value={formData.email}
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            } required />
          <p>Password</p>
          <div style={{
            display: 'flex',
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center', gap: "10px"
          }}>
            <Form.Control type={isRevealPwd ? "text" : "password"} placeholder="Password"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              } required />
            <img style={{ width: "20px" }}
              title={isRevealPwd ? "Hide password" : "Show password"}
              src={isRevealPwd ? hidePwdImg : showPwdImg}
              onClick={() => setIsRevealPwd(prevState => !prevState)}
            />
          </div>
          <button type='submit' className='w-100 mb-4 myButton' style={{ backgroundColor: "#222222", height: "70px" }} size='md'>Sign up</button>
          {Message && (
            <div className="alert alert-success" role="alert">
              {Message}
            </div>
          )}
        </div>
      </form>
    </Container >
  );
}