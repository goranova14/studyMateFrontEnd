import React, { useState } from "react";
import { apiAssignments } from '../apis/apiAssignment';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar.js';
import '../context/login.css'
import '../context/settings.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput
}
    from 'mdb-react-ui-kit';
export default function CreateAssignment(props) {
    const logout = () => {
        props.logout();
    }
    const location = useLocation();
    const { course } = location.state;
    const [Message, setMessage] = useState("");
    const [assignmentData, setAssignmentData] = useState({
        title: '',
        description: '',
        course: course
    });
    const handleSubmit = async (event) => {
        event.preventDefault();
        setAssignmentData({
            name: '',
            description: '',
            course: course,
            deadline: ''
        })
        try {
            console.log(assignmentData);
            console.log(course);
            const response = await apiAssignments.create(course, assignmentData);
            setMessage("Successfully created.");
        }
        catch (error) {
            console.log(error);
            setMessage("You should fill every field.")
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
                    <h2 className="fw-bold mb-5">Make an assignment</h2>
                    <MDBRow>
                        <MDBCol col='6'>
                            <p>Name</p>

                            <MDBInput wrapperClass='mb-4' type='text' value={assignmentData.name}
                                onChange={(event) =>
                                    setAssignmentData({ ...assignmentData, name: event.target.value })
                                } required />
                        </MDBCol>
                        <MDBCol col='6'>
                            <p>Description</p>

                            <MDBInput wrapperClass='mb-4' type='text' value={assignmentData.description}
                                onChange={(event) =>
                                    setAssignmentData({ ...assignmentData, description: event.target.value })
                                } required />
                        </MDBCol>
                        <MDBCol>
                            <p>Deadline</p>
                            <MDBInput wrapperClass='mb-4' type="datetime-local" value={assignmentData.deadline}
                                onChange={(event) =>
                                    setAssignmentData({ ...assignmentData, deadline: event.target.value })
                                } required />
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn type='submit' className='w-100 mb-4 myButton' style={{ backgroundColor: "#222222", height: "70px" }} size='md'>Make an assignment</MDBBtn>
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
