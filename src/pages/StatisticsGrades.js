import React, { useState, useEffect } from "react";
import { UserAPI } from '../apis/api.js';
import { Chart } from "react-google-charts";
import { apiAssignments } from '../apis/apiAssignment.js';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
export default function StatisticsGrades(props) {
  const [assignments, setAssignments] = useState([]);
  const [avgGrade, setAvgGrade] = useState(null);
  const [grades, setGrades] = useState([]);
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);
  const logout = () => {
    props.logout();
  }
  useEffect(() => {
    UserAPI.getAvgGradeForUser(parsedUser.pcn)
      .then(response => {
        console.log(response.grade);
        setAvgGrade(response.grade)
      })
      .catch(error => {
        console.error('Error fetching users list:', error);
      });
  },);
  useEffect(() => {
    apiAssignments.getAll(parsedUser.course)
      .then(assignments => {
        setAssignments(assignments.assignmentList);
        console.log(assignments);
      })
      .catch(error => {
        console.error('Error fetching assignment list:', error);
      });
  }, []);
  useEffect(() => {
    UserAPI.getAllGradesForUser(parsedUser.pcn)
      .then(grades => {
        setGrades(grades.grades);
      })
      .catch(error => {
        console.error('Error fetching grades list:', error);
      });
  }, []);
  const gradeMap = {};
  if (Array.isArray(grades)) {
    grades.forEach(grade => {
      gradeMap[grade.assignmentId] = grade.gradeNum;
    });
  }
  const data = [
    ["Assignments", "Your Grades",],
    ...assignments.map((assignment, index) => {
      const gradeValue = gradeMap[assignment.id] || 0;
      return [`${assignment.name} `, gradeValue];
    }),
  ];
  const options = {
    chart: {
      title: "Grades for Assignments",
      subtitle: `Your average grade ${avgGrade}`,
    },
  };
  const data1 = [
    [
      {
        type: "date",
        id: "Date",
      },
      {
        type: "number",
        id: "Won/Loss",
      }, { type: "string", role: "style" },
    ],
    ...assignments.map((assignment) => [
      new Date(assignment.deadline),
      38229,
      "color: red",
    ]),
  ];
  const options1 = {
    title: "Assignment deadlines",
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
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #ccc", padding: "10px" }}>
        <Chart
          chartType="Line"
          width="80%"
          height="200px"
          data={data}
          options={options}
        />
        <Chart
          chartType="Calendar"
          width="100%"
          height="400px"
          data={data1}
          options={options1}
        />
      </div>
    </Container>
  )
}
