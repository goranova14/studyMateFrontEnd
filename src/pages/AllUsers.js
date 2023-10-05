import React, { useState, useEffect } from "react";
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import '../context/login.css'
import { UserAPI } from '../apis/api.js';
import { Table } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
export default function AllUSers(props) {
    const [users, setUsers] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const logout = () => {
        props.logout();
    }
    useEffect(() => {
        UserAPI.getAll()
            .then(users => {
                setUsers(users.users);
                console.log(users);
            })
            .catch(error => {
                console.error('Error fetching users list:', error);
            });
    }, []);
    const deleteUser = (pcn) => {
        UserAPI.delete(pcn)
            .then(() => {
                setDeleteConfirmation({
                    message: `User ${pcn} has been deleted successfully.`,
                    remainingTime: 10
                });
                UserAPI.getAll()
                .then(users => {
                    setUsers(users.users);
                    console.log(users);
                })
                .catch(error => {
                    console.error('Error fetching users list:', error);
                });
            })
            .catch(error => {
                console.error(`Error deleting user ${pcn}:`, error);
            });
    };
    useEffect(() => {
        let interval;
        if (deleteConfirmation) {
            interval = setInterval(() => {
                setDeleteConfirmation(prevState => ({
                    ...prevState,
                    remainingTime: prevState.remainingTime - 1
                }));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [deleteConfirmation]);
    useEffect(() => {
        if (deleteConfirmation?.remainingTime === 0) {
            setDeleteConfirmation(null);
        }
    }, [deleteConfirmation]);
    return (
        <Container fluid>
            <NavigationBar />
            <button onClick={logout} className="px-25" style={{
                        backgroundColor: "#D78521",
                        color: "#F4F9E9",
                        fontFamily: "cursive",
                        fontSize: "1.2rem",
                        padding: "10px 25px",
                        borderRadius: "5px",
                        margin: "10px",
                        background:" rgb(160,172,173)",
                        background:" linear-gradient(90deg, rgba(160,172,173,1) 0%, rgba(244,249,233,1) 17%, rgba(215,133,33,1) 98%)"
                    }}>
                        Log out
                    </button>
            {deleteConfirmation && (
                <div className="alert alert-success">
                    {deleteConfirmation.message} This message will disappear in {deleteConfirmation.remainingTime} seconds.
                </div>
            )}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.pcn}>
                            <td>{user.pcn}</td>
                            <td>{user.firstName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <MDBBtn onClick={() => deleteUser(user.pcn)} className='w-80 mb-4 myButton' style={{ backgroundColor: "#FFCCCC",color:"#F4F9E9", height: "70px" }} size='md'>Delete profile</MDBBtn>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}