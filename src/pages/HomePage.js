import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar.js';
import { CourseAPI } from '../apis/apiCourses.js';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import chats from '../components/chat.jpg';
import announcement from '../components/announcement.jpg';
import course from '../components/coursePic.jpg';
import '../components/button.css';
import '../context/login.css';
import '../context/items.css';
import { UserAPI } from '../apis/api';
import { apiNotification } from '../apis/apiNotification.js';
import { apiAssignments } from '../apis/apiAssignment.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function HomePage(props) {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    course: '',
    pcn: '',
    password: '',
    address: '',
    email: '',
  });
  const [notifications, setNotifications] = useState([]);
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('token');
    const decodedToken = jwt_decode(accessToken);
    UserAPI.getByPCN(decodedToken.userId).then((foundUser) => {
      if (foundUser) {
        setUserData(foundUser);
        if (foundUser.course) {


          const assignmentsPromise = apiAssignments.getAll(foundUser.course);
          const notificationsPromise = apiNotification.getNotifications(decodedToken.userId);
          Promise.all([assignmentsPromise, notificationsPromise])
            .then(([assignments, notificationsResult]) => {
              setAssignments(assignments.assignmentList);
              const notifications = notificationsResult.notificationList;
              setNotifications(notifications);
              console.log(notifications);
            })
            .catch((error) => {
              console.error('Error fetching assignments and notifications:', error);
            });
        }
      }
    });
  }, []);
  useEffect(() => {
    notifications.forEach((notification) => {
      const message = `Notification: Grade has been updated on: ${notification.submissionDate}`;
      if (!displayedNotifications.includes(notification.id)) {
        const toastOptions = {
          onClick: () => toastifyClick(notification)
        };
        toast(message, toastOptions); setDisplayedNotifications((prevNotifications) => [...prevNotifications, notification.id]);
      }
    });
  }, [assignments]);
  const toastifyClick = (notification) => {
    const assignment = assignments.find((assignment) => assignment.id === notification.assignmentId);
    if (assignment) {
      navigate(`/courses/${userData.course.id}/assignments/${notification.assignmentId}/grade`, {
        state: { assignment: assignment },
      });
      apiNotification.delete(notification.id)
    }
  };

  const logout = () => {
    props.logout();
  };
  return (
    <Container fluid>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <NavigationBar />
      </div>
      <button onClick={logout} className="px-25" style={{
        backgroundColor: "#D78521",
        color: "#F4F9E9",
        fontFamily: "cursive",
        fontSize: "1.2rem",
        padding: "10px 25px",
        borderRadius: "5px",
        margin: "10px",
        background: " rgb(160,172,173)",
        background: " linear-gradient(90deg, rgba(160,172,173,1) 0%, rgba(244,249,233,1) 17%, rgba(215,133,33,1) 98%)"
      }}>
        Log out
      </button>
      <br></br>
      <Row>
        <Col>
          <h1
            style={{
              fontFamily: 'Brush Script MT, cursive',
              fontSize: '3.2rem',
            }}
          >
            Welcome to StudyMate, {userData.firstName}!
          </h1>
        </Col>
      </Row>
      <div class="d-md-flex flex-md-equal w-100 my-md-3 pl-md-3">
        <div
          class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate(`/settings`);
          }}
        >
          <div class="my-3 p-3">
            <h2 class="display-5">Settings</h2>
            <p class="lead">Here you are able to see and change your personal data.</p>
          </div>
          <div
            class="bg-dark box-shadow mx-auto"
            style={{
              width: '80%',
              height: '300px',
              borderRadius: '21px 21px 0 0',
              backgroundImage: `url(${announcement})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div
          class="bg-primary mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden"
          style={{
            cursor: 'pointer',
          }}
          onClick={(event) => {
            if (!userData.course) {
              event.preventDefault();
              alert("You don't have access to this course's chat,since you are not enrolled in a course yet.");
              return;
            }
            navigate(`/chats`);
          }}
        >
          <div class="my-3 py-3">
            <h2 class="display-5">Chats</h2>
            <p class="lead">You can chat with your teachers or co-students.</p>
          </div>
          <div
            class="bg-dark box-shadow mx-auto"
            style={{
              width: '80%',
              height: '300px',
              borderRadius: '21px 21px 0 0',
              backgroundImage: `url(${chats})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div
          class="bg-light mr-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden"
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            if (userData.course && userData.course.id) {
              CourseAPI.getByID(userData.course.id)
                .then((course) => {
                  navigate(`/myCourse`, { state: { course } });
                  console.log(CourseAPI.getByID(userData.course.id));
                })
                .catch((error) => {
                  console.log(error);
                });
            } else {
              alert('You are not enrolled in any courses yet.');
            }
          }}
        >
          <div class="my-3 p-3">
            <h2 class="display-5">My course</h2>
            <p class="lead">See all that your teacher has to share with you.</p>
          </div>
          <div
            class="bg-dark box-shadow mx-auto"
            style={{
              width: '80%',
              height: '300px',
              borderRadius: '21px 21px 0 0',
              backgroundImage: `url(${course})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
      </div>
    </Container>
  );
}
export default HomePage;
