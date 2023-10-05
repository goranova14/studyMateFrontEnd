import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import { apiAnnouncements } from '../apis/apiAnnouncements';
import '../context/login.css'
export default function EditAnnouncement(props) {
  const logout = () => {
    props.logout();
  }
  useEffect(() => {
    setAnnouncementData({
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
      course: announcement.courseEntity
    })
  }, []);
  const location = useLocation();
  const [Message, setMessage] = useState("");
  const [Message2, setMessage2] = useState("");
  const { announcement } = location.state;
  const [announcementData, setAnnouncementData] = useState({
    id: announcement.id,
    title: '',
    description: '',
    course: announcement.courseEntityId
  });
  const handleSubmit = async (event) => {
    const announcementTitle = announcementData.title;
    const announcementDescription = announcementData.description;
    if (!announcementDescription || !announcementTitle) {
      alert("Announcement title and  description is required")
      return;
    }
    event.preventDefault();
    setAnnouncementData({
      title: '',
      id: announcement.id,
      description: '',
      course: announcement.courseEntityId
    })
    try {
      const response = await apiAnnouncements.update(announcement.courseEntity, announcementData);
      setMessage2("Successfully updated.");
    }
    catch (error) {
      console.log(error);
      setMessage2("You should fill every field.")
    }
  };
  const deleteAnnouncement = async (event) => {
    const confirmation = window.confirm("Do you want to delete this announcement?");
    if (!confirmation) {
      return;
    }
    setAnnouncementData({
      title: '',
      id: announcement.id,
      description: '',
      course: announcement.courseEntityId
    })
    setMessage("Successfully deleted.");
    try {
      const response = await apiAnnouncements.delete(announcement.courseEntity, announcementData.id);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  };
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
      <div className="p-5 bg-image" style={{ backgroundColor: "#273043", height: '300px' }}>
        <button onClick={deleteAnnouncement} id="edit-course-info" className="px-1 " style={{
          backgroundColor: "#f4f9e9",
          color: "#273043",
          fontFamily: "cursive",
          fontSize: "1rem",
          padding: "25px 20px",
        }}>Delete announcement</button>

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
            <label for="course-name">Announcement title:</label>
            <input type="text" onChange={(event) =>
              setAnnouncementData({ ...announcementData, title: event.target.value })
            } value={announcementData.title} class="form-control" ></input>
          </div>
          <div class="form-group">
            <label for="course-descritpion">Announcement description:</label>
            <input type="text" onChange={(event) =>
              setAnnouncementData({ ...announcementData, description: event.target.value })
            } value={announcementData.description} placeholder={announcement.description} class="form-control" >
            </input>	</div>
          <br></br>
          <button onClick={handleSubmit} id="edit-course-info" className="px-1 myButton" style={{
            backgroundColor: "#D78521",
            color: "#F4F9E9",
            fontFamily: "cursive",
            fontSize: "1rem",
            padding: "10px 25px",
            borderRadius: "5px",
            margin: "10px"
          }}>Edit announcement information</button>
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
  )
}
