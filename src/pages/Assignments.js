import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from 'react-router-dom';
import { apiAssignments } from '../apis/apiAssignment.js';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../context/login.css'
export default function Assignments(props) {
    const logout = () => {
        props.logout();
    }
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state;
    const userRole = localStorage.getItem('role');
    const isTeacher = userRole === "TEACHER";
    const [filterChoice, setFilterChoice] = useState('');
    const [filterType, setFilterType] = useState('')
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        apiAssignments.getAll(course)
            .then(assignments => {
                setAssignments(assignments.assignmentList);
                console.log(assignments);
            })
            .catch(error => {
                console.error('Error fetching assignment list:', error);
            });
    }, []);
    let filteredAssignments = [...assignments]
    useEffect(() => {
        if (filterChoice === 'deadline') {
            filteredAssignments.sort((a, b) => {
                if (filterType === 'asc') {
                    apiAssignments.getAllDeadlineASC(course.id)
                        .then(sortedAssignments => {
                            setAssignments(sortedAssignments.assignmentList);
                        })
                        .catch(error => {
                            console.error('Error sorting assignments:', error);
                        });
                }
                else if (filterType === 'desc') {
                    apiAssignments.getAllDeadlineDESC(course.id)
                        .then(sortedAssignments => {
                            setAssignments(sortedAssignments.assignmentList);
                        })
                        .catch(error => {
                            console.error('Error sorting assignments:', error);
                        });
                }
                return 0;
            })
        }
    }, [filterChoice, filterType]);
    return (
        <div>
            <Container fluid>
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
                <div>
                    <select
                        className="form-select" style={{ marginBottom: "10px", width: "160px" }}
                        value={filterChoice}
                        onChange={(event) => setFilterChoice(event.target.value)}
                    >
                        <option value="">Filter by</option>
                        <option value="deadline">Deadline</option>
                    </select>
                    <select
                        className="form-select" style={{ marginBottom: "10px", width: "160px" }}
                        value={filterType}
                        onChange={(event) => setFilterType(event.target.value)}
                    >
                        <option value="Ord">Order by</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="card-container" style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                    cursor: "pointer"
                    
                }}>
                    {filteredAssignments.map(assignment => (
                        <div key={assignment.id} className="card card-margin " style={{
                            borderRadius: "10px",
                            boxShadow: "5px 5px 10px #B5B5B5",
                            width: "300px",
                            marginRight: "10px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            height: "250px",
                            cursor: "pointer"
                            
                        }}
                            onClick={() => {
                                if (isTeacher) {
                                    navigate(`/courses/${course.id}/assignments/${assignment.id}`, { state: { assignment: assignment } });
                                }
                                if (!isTeacher) {
                                    navigate(`/courses/${course.id}/assignments/${assignment.id}/grade`, { state: { assignment: assignment } });
                                }
                            }
                            }
                        >
                            <div class="card-header no-border">
                                <h5 class="card-title" style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                }}>{assignment.title}</h5>
                            </div>
                            <div class="card-body pt-0">
                                <div class="widget-49">
                                    <div class="widget-49-title-wrapper">
                                        <div class="widget-49-date-primary">
                                            <span class="widget-49-date-day">{(new Date(assignment.deadline)).getDate()}</span>
                                            <span class="widget-49-date-month">{(new Date(assignment.deadline)).toLocaleString('default', { month: 'long' })}</span>
                                        </div>
                                        <div class="widget-49-meeting-info">
                                            <span>{assignment.name}</span>
                                            <span>Deadline:</span>
                                            <span class="widget-49-pro-title">{(new Date(assignment.deadline)).toTimeString().split(' ')[0]}</span>
                                        </div>
                                    </div>
                                    <ol class="widget-49-meeting-points" >
                                        <span>{assignment.description}</span>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}