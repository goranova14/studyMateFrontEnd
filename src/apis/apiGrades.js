import axios from "axios";
import request from "./utils/request";

const baseURL = 'http://localhost:8080/courses';
export default axios.create({
    baseURL
})
const token = localStorage.getItem('token')


export const GradeApi = {

    create: function (grade) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(grade)
        };

        return request(`${baseURL}/${grade.assignment.course.id}/assignments/${grade.assignment.id}/grades`, options);
    },

    update: function (grade) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(grade)

        };
        return request(`${baseURL}/${grade.assignment.course.id}/assignments/${grade.assignment.id}/grades`, options);
    },
    delete: function (grade) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        };

        return request(`${baseURL}/${grade.assignment.course.id}/assignments/${grade.assignment.id}/grades/${grade.assignment.id}/${grade.user.pcn}`, options);

    },
    getGradeForAssignment: function (assignment) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }

        return request(`${baseURL}/${assignment.assignment.course.id}/assignments/${assignment.assignment.course.id}/grades/${assignment.assignment.id}/${assignment.userpcn}`, options);
    },
    getUsersGradeMin: function (requestnum,assignment) {
        const token = localStorage.getItem('token')
console.log(assignment);
        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }

        return request(`${baseURL}/${assignment.course.id}/assignments/${assignment.course.id}/grades/${requestnum}`, options);
    },

    getGradeForAssignmentUser: function (assignment) {
        const token = localStorage.getItem('token')

        const user = JSON.parse(localStorage.getItem('user'));
        const userpcn = user.pcn;
        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }
        return request(`${baseURL}/${assignment.assignment.courseEntity.id}/assignments/${assignment.assignment.courseEntity.id}/grades/${assignment.assignment.id}/${userpcn}`, options);
    },

}

