import React from "react";
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoStudyMate from '../components/logoStudyMate.jpg';
import { MDBCol } from 'mdb-react-ui-kit';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {

    return (
        <header class="header-area overlay">
            <nav class="navbar navbar-expand-md navbar-dark">
                <div class="container">
                    <MDBCol col='2' md='50'>
                        <img src={logoStudyMate} class="img-fluid" width="150px" alt="Sample image" />
                    </MDBCol>
                    <Navbar.Brand
                        style={{
                            fontFamily: "Brush Script MT, cursive",
                            fontSize: "4.2rem",
color:"black"
                        }}>StudyMate</Navbar.Brand>
                    <Container style={{
                        display: "flex",
                        flexDirection: 'row',
                        gap: "10px"
                    }}>
                        <Link to="/home" style={{
                            backgroundColor: "#273043",
                            color: "#F4F9E9",
                            fontFamily: "cursive",
                            textDecoration: "none",
                            fontSize: "1.3rem",
                            padding: "20px 25px",

                        }}>
                            Home
                        </Link>


                        <Link to="/settings" style={{
                            backgroundColor: "#273043",
                            color: "#F4F9E9",
                            textDecoration: "none",
                            fontFamily: "cursive",
                            fontSize: "1.3rem",
                            padding: "20px 25px",
                        }}>
                            Settings
                        </Link>



                    </Container>
                </div></nav></header>
    )
}