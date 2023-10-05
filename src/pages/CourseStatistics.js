import React, { useState, useEffect } from "react";
import { UserAPI } from '../apis/api.js';
import { Chart } from "react-google-charts";
import { apiAssignments } from '../apis/apiAssignment.js';
import NavigationBar from '../components/NavigationBar.js';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
export default function CourseStatistics(props) {
  const logout = () => {
    props.logout();
  };
  const [grades, setGrades] = useState([]);
  const [avgGrade, setAvgGrade] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const course = location.state.course;
  const [courseData, setCourseData] = useState({
    name: '',
    id: '',
    description: '',
    users: []
  });
  useEffect(() => {
    setCourseData({
      id: course.id,
      name: course.name,
      description: course.description,
      users: course.users
    });
    UserAPI.getAll()
      .then(users => {
        setUsers(users.users);
        setSelectedUsers(course.users);
      })
      .catch(error => {
        console.error('Error fetching user list:', error);
      });
    apiAssignments.getAll(course)
      .then(assignments => {
        setAssignments(assignments.assignmentList);
      })
      .catch(error => {
        console.error('Error fetching assignment list:', error);
      });
  }, []);
  useEffect(() => {
    if (selectedUser) {
      UserAPI.getAllGradesForUser(selectedUser.pcn)
        .then(grades => {
          setGrades(grades.grades);
        })
        .catch(error => {
          console.error('Error fetching grades list:', error);
        });
      UserAPI.getAvgGradeForUser(selectedUser.pcn)
        .then(response => {
          setAvgGrade(response.grade);
        })
        .catch(error => {
          console.error('Error fetching users list:', error);
        });
    }
  }, [selectedUser]);
  useEffect(() => {
    const gradeMap = {};
    grades.forEach(grade => {
      gradeMap[grade.assignmentId] = grade.gradeNum;
    });
    const updatedData = [
      ["Assignments", "Grades of student"],
      ...assignments.map(assignment => {
        const gradeValue = gradeMap[assignment.id] || 0;
        return [assignment.name, gradeValue];
      }),
    ];
    const updatedOptions = {
      chart: {
        title: "Grades for Assignments",
        subtitle: `Average grade of student: ${avgGrade}`,
      },
    };
    setChartData({
      data: updatedData,
      options: updatedOptions,
    });
  }, [grades, assignments, avgGrade]);
  const [chartData, setChartData] = useState({
    data: [],
    options: {},
  });
  const UserSelection = (event) => {
    const selectedUser = users.find(user => user.email === event.target.value);
    setSelectedUser(selectedUser);
  }
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
        <div className='mx-5 mb-5 p-5 ' style={{
          marginTop: '-10px',
          width: '720px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
        }}>
          <div className="col-md-6">
            <p>Select a user in order to see its grade statistics:</p>
            <select onChange={UserSelection} style={{ width: "17rem" }}>
              <option value="">Select a user</option>
              {course.users.map(user => (
                <option key={user.email} value={user.email}>{user.firstName}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

        <div className='mx-5 mb-5 p-5 ' style={{
       justifyContent: 'center',
          alignItems: 'center', width: '800px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'
        }}>
          {selectedUser && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #ccc", padding: "10px" }}>
              <Chart
                chartType="Line"
                width="80%"
                height="200px"
                data={chartData.data}
                options={chartData.options}
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
