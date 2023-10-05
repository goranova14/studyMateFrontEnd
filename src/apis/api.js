import axios from "axios";
import request from "./utils/request";

const baseURL = 'http://localhost:8080/students';
export default axios.create({
    baseURL
})
const token = localStorage.getItem('token')


export const UserAPI = {


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
    getAvgGradeForUser: function (studentPcn) {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            ,
        }

        return request(`${baseURL}/statistics/${studentPcn}`, options);
    },
    getAllGradesForUser: function (studentPcn) {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            ,
        }

        return request(`${baseURL}/grades/statistics/${studentPcn}`, options);
    },
    create: function (user) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        return request(baseURL, options);
    }, createTeacher: function (user) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        return request(`${baseURL}/registerTeacher`, options);
    },


    getByPCN: function (userPCN) {
        const token = localStorage.getItem('token');
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }
        return request(`${baseURL}/${userPCN}`, options);
    },


    login: function (user) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }
        return request(`${baseURL}/login`, options);
    },

    update: function (userPCN, user) {
        const token = localStorage.getItem('token');
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)

        };

        return request(`${baseURL}/settings/${userPCN}`, options);

    },
    delete: function (userPCN) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        };

        return request(`${baseURL}/${userPCN}`, options);

    }



}