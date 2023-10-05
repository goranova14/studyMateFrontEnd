import React, { useState, useEffect } from "react";
import '../context/user.css';
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
export default function CourseUsers(props) {
    const location = useLocation();
    const course = location.state.course;
    const logout = () => {
        props.logout();
    }
    console.log(course);
    console.log("q");
    const [users, setUsers] = useState([]);
    useEffect(() => {
        setUsers(course.users);
    }, [course.users]);
    return (
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
            <div><link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css">
            </link>
                <div class="container bootstrap snippets bootdey">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="main-box no-header clearfix">
                                <div class="main-box-body clearfix">
                                    <div class="table-responsive">
                                        <table class="table user-list">
                                            <thead>
                                                <th>&nbsp;</th>
                                                <tr>
                                                    <th><span>User</span></th>
                                                    <th class="text-center"><span>Role</span></th>
                                                    <th><span>Email</span></th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(user => (
                                                    <tr>
                                                        <td>
                                                            <a>{user.firstName} {user.lastName}</a>
                                                        </td>
                                                        <td>{user.role}</td>
                                                        <td>
                                                            <a>{user.email}</a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}
