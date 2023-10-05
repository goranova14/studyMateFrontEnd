import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar.js';
import { useNavigate } from 'react-router-dom';
import { apiAnnouncements } from '../apis/apiAnnouncements';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { MDBBtn } from 'mdb-react-ui-kit';
import '../context/announcements.css'

export default function Announcements(props) {
    const logout = () => {
        props.logout();
    }
    const navigate = useNavigate();
    const location = useLocation();
    const { course } = location.state;
    const userRole = localStorage.getItem('role');
    const isTeacher = userRole === "TEACHER";
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    const [announcements, setAnnouncements] = useState([]);
    useEffect(() => {
        apiAnnouncements.getAll(course)
            .then(announcements => {
                setAnnouncements(announcements.announcementEntityList);
                console.log(announcements);
            })
            .catch(error => {
                console.error('Error fetching announcements list:', error);
            });
    }, []);
    const searchAnnouncement = (event) => {
        const searchItem = event.target.value.toLowerCase();
        const filteredAnnouncements =

            apiAnnouncements.getAllByTitle(course.id, searchItem.toLowerCase())
                .then(announcements => {
                    setAnnouncements(announcements.announcementEntityList);
                    console.log(announcements);
                })
                .catch(error => {
                    console.error('Error fetching filtered announcements list:', error);
                });
    }
    const clearFilteredAnnoucnements = () => {
        document.getElementById('searchitem').value = '';
        apiAnnouncements.getAll(course)
            .then(announcements => {
                setAnnouncements(announcements.announcementEntityList);
            })
            .catch(error => {
                console.error('Error fetching announcements list:', error);
            });
    };
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
                <div style={{ margin: '10px' }}>
                    <input type="text" style={{ width: "300px", height: "3rem" }} id="searchitem" placeholder="Search" onChange={searchAnnouncement} />
                    <MDBBtn onClick={clearFilteredAnnoucnements} type="reset" className='w-80 mb-4 myButton' style={{ backgroundColor: "#FFCCCC", height: "60px" }} size='md'>Clear filters</MDBBtn>
                </div>
                <div class="row">
                    <div className="card-container" style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "10px",
                        justifyContent: "center",
                        cursor: "pointer"
                    }}>
                        {announcements.map(announcement => (
                            <div key={announcement.id}
                                onClick={() => {
                                    if (isTeacher) {
                                        if (parsedUser.email === announcement.userEntityEmail) {
                                            navigate(`/courses/${course.id}/announcements/${announcement.id}`, { state: { announcement } });
                                        }
                                        else {
                                            alert("Only author of announcement can edit .");
                                        }
                                    }
                                }
                                }
                            >
                                <div class="col-md-6 ">
                                        <div class="media blog-media card">
                                            <a style={{ backgroundColor: "#273043" }}></a>
                                            <div class="circle" style={{ backgroundColor: "#d78521" }}>
                                                <h5 class="day">{(new Date(announcement.submissionDate)).getDate()}</h5>
                                                <span class="month">{(new Date(announcement.submissionDate)).toLocaleString('default', { month: 'long' })}</span>
                                            </div>
                                            <div class="media-body">
                                                <a><h5 class="mt-0">{announcement.title}</h5></a>
                                                {announcement.description}
                                                <ul style={{ paddingTop: "70px" }}>
                                                    <li>{announcement.userEntityEmail}</li>
                                                </ul>
                                                <h class="">{(new Date(announcement.submissionDate)).toTimeString().split(' ')[0]}</h>
                                            </div>
                                        </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}