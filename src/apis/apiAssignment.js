import request from "./utils/request";
import axios from "axios";

const baseURL = 'http://localhost:8080/courses/{courseId}/assignments';
export default axios.create({
    baseURL
})
const token = localStorage.getItem('token')


export const apiAssignments = {

    create: function (courseId, assignment) {
        const token = localStorage.getItem('token')

        const url = baseURL.replace('{courseId}', courseId.id);

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(assignment)
        };

        return request(url, options);
    },
    uploadAssignment: function (assignmentId, file, userId, courseId) {
        const token = localStorage.getItem('token')

        const url = baseURL.replace('{courseId}', courseId);
        const formData = new FormData();
        formData.append('assignment', file);
        console.log(assignmentId);
        console.log(userId);
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        };
        return request(`${url}/uploadAssignment/${userId}/${assignmentId}`, options);

    },
    getAll: function (courseId) {
        const token = localStorage.getItem('token')

        const url = baseURL.replace('{courseId}', courseId.id);

        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }

        return request(url, options);
    },
    getAllDeadlineDESC: function (courseId) {
        const token = localStorage.getItem('token')
        const url = baseURL.replace('{courseId}', courseId);


        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }

        return request(`${url}/deadlineDESC`, options);
    }, getAllDeadlineASC: function (courseId) {

        const token = localStorage.getItem('token')
        const url = baseURL.replace('{courseId}', courseId);
        const options = {
            method: 'GET',
            headers: {

                'Authorization': `Bearer ${token}`,
            }

        }

        return request(`${url}/deadlineASC`, options);
    },
    getSubmittedUrl: function (requestUrl) {
        const token = localStorage.getItem('token')

        console.log(requestUrl);
        const url = baseURL.replace('{courseId}', requestUrl.requestData.course);
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }

        return request(`${url}/${requestUrl.requestData.assignmentId}/${requestUrl.requestData.studentPcn}`, options);
    },

    update: function (courseId, assignment) {
        const token = localStorage.getItem('token')

        const newUrl = 'http://localhost:8080/courses/{courseId}/assignments/{assignmentId}';
        newUrl.replace('{courseId}', courseId);
        const urlAssignment = newUrl.replace('{assignmentId}', assignment.id);
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignment)

        };
        return request(urlAssignment, options);
    },
    delete: function (courseId, assignmentId) {
        const token = localStorage.getItem('token')

        const newUrl = 'http://localhost:8080/courses/{courseId}/assignments/{assignmentId}';
        newUrl.replace('{courseId}', courseId);
        const urlAssignment = newUrl.replace('{assignmentId}', assignmentId);
        const options = {

            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'
            },

        };

        return request(urlAssignment, options);

    }


}


