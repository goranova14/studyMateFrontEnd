import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import { GradeApi } from '../apis/apiGrades.js';
import { apiAssignments } from "../apis/apiAssignment.js";
export default function AssignmentDetails(props) {
  const location = useLocation();
  const [uploadConfirmation, setUploadConfirmation] = useState(null);
  const [assignmentUrl, setAssignmentUrl] = useState(null);
  const [assignmentSubmission, setAssignmentSubmission] = useState(null);
  const { assignment } = location.state;
  const logout = () => {
    props.logout();
  }
  const [gradeData, setGradeData] = useState({
    user: JSON.parse(localStorage.getItem('user')),
    gradeNum: '',
    assignment: assignment
  });
  useEffect(() => {
    let interval;
    if (uploadConfirmation) {
      interval = setInterval(() => {
        setUploadConfirmation(prevState => ({
          ...prevState,
          remainingTime: prevState.remainingTime - 1
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [uploadConfirmation]);
  useEffect(() => {
    if (uploadConfirmation?.remainingTime === 0) {
      setUploadConfirmation(null);
    }
  }, [uploadConfirmation]);
  const uploadAssignment = (event) => {
    var fileInput = document.getElementById('assignment');
    const file = fileInput.files[0];
   if(!file){
    setUploadConfirmation({
      message: `File is empty. Please select a file before submitting`,
      remainingTime: 10
    });
    return;
   }



    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
    apiAssignments.uploadAssignment(assignment.id, file, parsedUser.pcn, assignment.courseEntity.id)
      .then(
        responseData => {
          setUploadConfirmation({
            message: `Successsfully uploaded`,
            remainingTime: 10
          });
        }
      )
      .catch(error => {
        setUploadConfirmation({
          message: `${error}`,
          remainingTime: 10
        });
      })
  };
  useEffect(() => {
    console.log(assignment);
    const fetchGrades = async () => {
      try {
        const response = await GradeApi.getGradeForAssignmentUser({
          assignment
        }
        );
        console.log(response.submissionDate > assignment.deadline);
        if (response) {
          setGradeData((prevState) => ({
            ...prevState,
            gradeNum: response.gradeNum,
          }));
          setAssignmentSubmission(response.submissionDate)
          // console.log(assignmentSubmission);
        }
      } catch (error) {
        console.error('Error fetching grade:', error);
      }
    };
    fetchGrades();
  }, [assignment]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [requestData, setRequestData] = useState({
    studentPcn: user.pcn,
    assignmentId: assignment.id,
    course: assignment.courseEntity.id
  });
  useEffect(() => {
    const getUrl = async () => {
      try {
        console.log(requestData);
        const response = await apiAssignments.getSubmittedUrl({
          requestData
        });
        if (response) {
          setAssignmentUrl(response.url)
        }
      } catch (error) {
        console.error('Error fetching grade:', error);
      }
    };
    getUrl();
  }, [assignment]);
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

      {uploadConfirmation && (
        <div className="alert alert-success">
          {uploadConfirmation.message} This message will disappear in {uploadConfirmation.remainingTime} seconds.
        </div>
      )}
      <p>Assignment name: {assignment.name}</p>
      <p>Assignment description: {assignment.description}</p>
      <p>Assignment deadline: {assignment.deadline}</p>
      <p>Assignment grade : {gradeData.gradeNum}</p>
      {assignmentSubmission>assignment.deadline ? (
        <div style={{ width: '60px', height: '50px', borderRadius: '20%',color:'red', backgroundColor: 'pink',  border:'groove  red' }}>
          <p>LATE</p>
        </div>

          ) : null}
      {assignmentUrl ? (
        <div>
          <p>Submitted  : {assignmentSubmission}</p>
          <p>Your submission: <a href={assignmentUrl}>{assignmentUrl}</a></p>
        </div>
      ) : (
        <>
          <input type="file" id="assignment" accept=".doc" required/>
          <button type='submit' onClick={uploadAssignment}>Upload</button>
        </>
      )}
    </Container>
  )
}
