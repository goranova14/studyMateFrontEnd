import React, { useState, useEffect } from "react";
import { CourseAPI } from '../apis/apiCourses.js';
import { useLocation } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import { GradeApi } from '../apis/apiGrades.js';
import { apiAssignments } from "../apis/apiAssignment.js";
import { apiNotification } from "../apis/apiNotification.js";
export default function GradeStudents(props) {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const { assignment } = location.state;
  const [gradeData, setGradeData] = useState({
    user: '',
    gradeNum: '',
    assignment: assignment
  });
  const [usersMinGrade, setUserMinGrade] = useState([]);
  const [existingGrades, setExistingGrades] = useState([]);
  const [submittedUrl, setSubmittedUrl] = useState([]);
  const logout = () => {
    props.logout();
  }
  const [gradeConfirmation, setGradeConfirmation] = useState(null);

  const getUsersGrade = (requestNum) => {

    GradeApi.getUsersGradeMin(requestNum, assignment)
      .then(response => {
        setUserMinGrade(response.grades)
        const pcn = response.grades.map(grade => grade.userPcn)
        console.log(pcn);
        const filteredUsers = users.filter(user => pcn.includes(user.pcn));
        console.log(filteredUsers);
        setUsers(filteredUsers)
        console.log(usersMinGrade);
      })
      .catch(err => {
        window.alert(`No users found`)

      })
  }


  const handleGradeChange = () => {
    if (gradeData.gradeNum !== '' && gradeData.gradeNum !== 0 && gradeData.gradeNum !== null && gradeData.gradeNum !== undefined) {
      if (existingGrades[gradeData.user.pcn] !== gradeData.gradeNum) {

        GradeApi.create(gradeData)
          .then(responseData => {
            const notificationRequest = {
              assignmentId: assignment.id,
              userId: gradeData.user.pcn
            };
            apiNotification.create(notificationRequest)
              .then(notificationData => {
                console.log("Notification created:", notificationData);
              })
              .catch(error => {
                console.error("Error creating notification:", error);
              });
            CourseAPI.getAllStudents(assignment.course.id)
              .then(users => {
                setUsers(users.users);
                const updatedGrades = {
                  ...existingGrades,
                  [gradeData.user.pcn]: gradeData.gradeNum
                };
                setExistingGrades(updatedGrades);
                setGradeConfirmation({
                  message: `User has been graded successfully.`,
                  remainingTime: 10
                });
              })
              .catch(error => {
                console.log(error);
              })
          })
          .catch(error => {
            setGradeConfirmation({
              message: `${error}`,
              remainingTime: 10
            });
          })
      }
      else {
        window.alert("Grade should be different than it was before.")
      }
    }
    else {
      window.alert("Grade should not be 0")
    }

  };
  const handleGradeUpdate = () => {
    if (gradeData.gradeNum !== '' && gradeData.gradeNum !== 0 && gradeData.gradeNum !== null && gradeData.gradeNum !== undefined) {

      CourseAPI.getAllStudents(assignment.course.id)
        .then(users => {
          setUsers(users.users);
          const updatedGrades = {
            ...existingGrades,
            [gradeData.user.pcn]: gradeData.gradeNum
          };
          setExistingGrades(updatedGrades);
          setGradeConfirmation({
            message: `User has been updated successfully.`,
            remainingTime: 10
          });
        })
        .catch(error => {
          console.error('Error fetching users list:', error);
        });
      GradeApi.update(gradeData);
      setGradeConfirmation({
        message: `Grade has been updated successfully.`,
        remainingTime: 10
      });
    }
    else {
      window.alert("Grade should be different than it was before.")
    }

  };
  useEffect(() => {
    CourseAPI.getAllStudents(assignment.course.id)
      .then(users => {
        setUsers(users.users);
      })
      .catch(error => {
        console.error('Error fetching users list:', error);
      });
  }, [assignment.course.id]);
  useEffect(() => {
    const fetchGrades = async () => {
      const gradePromises = users.map(user => {
        const userpcn = user.pcn;
        return GradeApi.getGradeForAssignment({
          assignment, userpcn
        })
          .then(response => {
            return { userpcn, gradeNum: response.gradeNum };
          })
          .catch(error => {
            console.error('Error grade:', error);
            return {
              userpcn,
              response: null
            };
          });
      });
      const grades = await Promise.all(gradePromises);
      const updatedGrades = grades.reduce((prevGradeData, { userpcn, gradeNum }) => ({
        ...prevGradeData,
        [userpcn]: gradeNum
      }), {});
      setExistingGrades(updatedGrades);
    };
    fetchGrades()
  }, [users, assignment]);
  useEffect(() => {
    console.log(existingGrades);
  }, [existingGrades]);
  useEffect(() => {
    let interval;
    if (gradeConfirmation) {
      interval = setInterval(() => {
        setGradeConfirmation(prevState => ({
          ...prevState,
          remainingTime: prevState.remainingTime - 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gradeConfirmation]);
  useEffect(() => {
    if (gradeConfirmation?.remainingTime === 0) {
      setGradeConfirmation(null);
    }
  }, [gradeConfirmation]);
  const fetchUrls = async (userpcn) => {
    try {
      const requestData = {
        studentPcn: userpcn,
        assignmentId: assignment.id,
        course: assignment.course.id
      }; console.log(userpcn);
      console.log(requestData);
      const response = await apiAssignments.getSubmittedUrl({
        requestData
      });
      if (response) {
        setSubmittedUrl(response.url)
        const downloadLink = document.createElement('a');
        downloadLink.href = response.url;
        downloadLink.click();
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching grade:', error);
    }
    console.log(submittedUrl);
  };
  const handleClearFilter = () => {
    CourseAPI.getAllStudents(assignment.course.id)
      .then(users => {
        setUsers(users.users);
        setUserMinGrade([]);
        setGradeData({ ...gradeData, user: '' });
        setExistingGrades([]);
        setSubmittedUrl([]);
      })
      .catch(error => {
        console.error('Error fetching users list:', error);
      });
  };
  
  return (
    <Container fluid>
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
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>

        <p>Select a grade and see the users who have the same or a higher grade:</p>
        <select
          onChange={
            (event) =>
              getUsersGrade(event.target.value)
            // setGradeData({ ...gradeData, gradeNum: event.target.value, user: user })
          }
        >
          {Array.from({ length: 11 }, (_, i) => i).map(num => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleClearFilter} style={{
        backgroundColor: "#D78521",
        color: "#F4F9E9",
        fontFamily: "cursive",
        fontSize: "1.2rem",
        padding: "10px 15px",
        borderRadius: "5px",
        margin: "10px",
      }}>
        Clear filter
      </button>

      {
        gradeConfirmation && (
          <div className="alert alert-success">
            {gradeConfirmation.message} This message will disappear in {gradeConfirmation.remainingTime} seconds.
          </div>
        )
      }
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Submission</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            if (user.role === "STUDENT") {
              return (
                <tr key={user.pcn}>
                  <td>{user.pcn}</td>
                  <td>{user.firstName}</td>
                  <td>{user.email}</td>
                  <td>
                    {existingGrades[user.pcn] !== undefined && (
                      <MDBBtn
                        onClick={() => fetchUrls(user.pcn)}
                        className='w-100 mb-4'
                        style={{
                          color: "#D78521",
                          background: "rgb(39,48,67)",
                          background: "linear-gradient(90deg, rgba(39,48,67,1) 0%, rgba(244,249,233,1) 31%, rgba(215,133,33,0.8772759103641457) 98%)",
                          fontFamily: "cursive",
                          fontSize: "1.2rem",
                          borderRadius: "5px",
                          margin: "10px"
                        }}
                        size='md'
                      >
                        Download submission
                      </MDBBtn>
                    )}
                  </td>
                  <td>  </td>
                  <select
                    onChange={
                      (event) =>
                        setGradeData({ ...gradeData, gradeNum: event.target.value, user: user })
                    }
                  >
                    {Array.from({ length: 11 }, (_, i) => i).map(num => (
                      <option key={num} value={num} selected={existingGrades[user.pcn] === num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  {!existingGrades[user.pcn] && (<MDBBtn onClick={
                    handleGradeChange} className='w-100 mb-4'
                    style={{
                      backgroundColor: "#222222",
                      fontSize: "1.2rem",
                      color: "#fefae0", height: "70px"
                    }}
                    size='md'>Submit grade</MDBBtn>
                  )}
                  {existingGrades[user.pcn] && (
                    <MDBBtn
                      onClick={() => handleGradeUpdate(user.pcn)}
                      className='w-100 mb-4'
                      style={{
                        backgroundColor: "#D78521",
                        color: "#F4F9E9",
                        fontFamily: "cursive",
                        fontSize: "1.2rem",
                        borderRadius: "5px",
                        margin: "10px"
                      }}
                      size='md'
                    >
                      Update Grade
                    </MDBBtn>
                  )}
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
    </Container >
  )
}
