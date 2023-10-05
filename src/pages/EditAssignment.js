import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import { apiAssignments } from '../apis/apiAssignment.js';
import '../context/login.css'
import { useNavigate } from 'react-router-dom';
import {
    MDBInput
}
    from 'mdb-react-ui-kit';
export default function EditAssignment(props) {
    const logout = () => {
        props.logout();
    }
    useEffect(() => {
        setAssignmentData({
            id: assignment.id,
            name: assignment.name,
            description: assignment.description,
            course: assignment.courseEntity,
            deadline: assignment.deadline
        })
    }, []);
    const navigate = useNavigate();
    const location = useLocation();
    const [Message, setMessage] = useState("");
    const [Message2, setMessage2] = useState("");
    const { assignment } = location.state;
    const [assignmentData, setAssignmentData] = useState({
        id: '',
        name: '',
        description: '',
        course: '',
        deadline: ''
    });
    const deadline = (assignmentId, deadline) => {
        setAssignmentData(prevAssignment => {
            if (prevAssignment.id === assignmentId) {
                return { ...assignment, deadline: deadline }
            }
        })
    }
    const handleSubmit = async (event) => {
        const assignmentName = assignmentData.name;
        const assignmentDescritpion = assignmentData.description;
        const assignmentDeadline = assignmentData.deadline;
        if (!assignmentDescritpion || !assignmentDeadline || !assignmentName) {
            alert("Assignment title,deadline and  description is required")
            return;
        }
        event.preventDefault();
        setAssignmentData({
            name: '',
            id: assignment.id,
            description: '',
            deadline: ''
        })
        try {
            const response = await apiAssignments.update(assignment.courseEntity.id, assignmentData);
            console.log(response)
            setMessage2("Successfully updated.");
        }
        catch (error) {
            console.log(error);
            setMessage2("You should fill every field.")
        }
    };
    const deleteAssignment = async (event) => {
        const confirmation = window.confirm("Do you want to delete this assignment?");
        if (!confirmation) {
            return;
        }
        setAssignmentData({
            name: '',
            id: assignment.id,
            description: '',
            deadline: ''
        })
        setMessage("Successfully deleted.");
        try {
            const response = await apiAssignments.delete(assignment.courseEntity.id, assignmentData.id);
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <NavigationBar />
            <Container fluid>
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
                <div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px', display: "flex", flexDirection: "column" }}>
                    <button onClick={deleteAssignment} id="delete-assignment-info" className="px-25" style={{
                        backgroundColor: "#f4f9e9",
                        color: "#273043",
                        fontFamily: "cursive",
                        padding: "15px 20px",

                        fontSize: "1rem", alignSelf: "flex-start",
                        marginBottom: "60px",
                    }}>Delete assignment</button>

                    <button onClick={() => navigate('/students/grades', { state: { assignment: assignmentData } })} className="px-25" style={{
                        backgroundColor: "#D78521",
                        fontFamily: "cursive",
                        fontSize: "1.2rem",
                        padding: "15px 10px",
                        borderRadius: "5px", alignSelf: "flex-start",
                    }}>
                        Students and grades

                    </button>
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
                        <div class="form-group">
                            <label for="assignment-name">Assignment title:</label>
                            <input type="text" onChange={(event) =>
                                setAssignmentData({ ...assignmentData, name: event.target.value })
                            } value={assignmentData.name} class="form-control" ></input>
                        </div>
                        <div class="form-group">
                            <label for="assignment-description">Assignment description:</label>
                            <input type="text" value={assignmentData.description} onChange={(event) =>
                                setAssignmentData({ ...assignmentData, description: event.target.value })
                            }
                                placeholder={assignment.description} class="form-control" >
                            </input>	</div>
                        <div class="form-group">
                            <label for="assignment-deadline">Assignment deadline:</label>
                            <MDBInput wrapperClass='mb-4' label='' type="datetime-local" value={assignment.deadline}
                                onChange={(event) =>
                                    deadline(assignment.id, event.target.value)
                                } required />
                        </div>
                        <br></br>
                        <button onClick={handleSubmit} id="edit-assignment-info" className="px-1 myButton" style={{
                            backgroundColor: "#D78521",
                            color: "#F4F9E9",
                            fontFamily: "cursive",
                            fontSize: "1rem",
                            padding: "10px 25px",
                            borderRadius: "5px",
                            margin: "10px"
                        }}>Edit assignment information</button>
                        {Message2 && (
                            <div className="alert alert-success" role="alert">
                                {Message2}
                            </div>
                        )}

                        {Message && (
                            <div className="alert alert-success" role="alert">
                                {Message}
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    )
}
