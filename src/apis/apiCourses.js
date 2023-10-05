import axios from "axios";
import request from "./utils/request";

const baseURL = 'http://localhost:8080/courses';
export default axios.create({
    baseURL
})
const token = localStorage.getItem('token')

export const CourseAPI = {



    create: function (course) {
const token = localStorage.getItem('token')

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(course)
        };

        return request(baseURL, options);
    },
    getAll: function () {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
        }

        return request(baseURL, options);
    },
    getAllStudents: function (id) {
const token = localStorage.getItem('token')

        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,

            },
        }

        return request(`${baseURL}/students/${id}`, options);
    },

    getByID: function (id) {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
        }
        return request(`${baseURL}/${id}`, options);
    },
    update: function (updatedCourse) {
const token = localStorage.getItem('token')

        const newUrl = 'http://localhost:8080/courses/{id}';
        const changedUrl = newUrl.replace('{id}', updatedCourse.id);
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,

            },
            body: JSON.stringify(updatedCourse)

        };
        return request(changedUrl, options);
    },
}