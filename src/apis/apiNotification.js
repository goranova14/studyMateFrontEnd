import request from "./utils/request";
import axios from "axios";

const baseURL = 'http://localhost:8080/notifications';
export default axios.create({
    baseURL
})
const token = localStorage.getItem('token')


export const apiNotification = {

    create: function (assignment) {
        const token = localStorage.getItem('token')
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(assignment)
        };

        return request(baseURL, options);
    },
    getNotifications: function (studentPcn) {
        const token = localStorage.getItem('token')
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            ,
        }

        return request(`${baseURL}/student/${studentPcn}`, options);
    },
    delete: function (notificationId) {
        const token = localStorage.getItem('token')

        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,

            }
        };

        return request(`${baseURL}/${notificationId}`, options);

    }

}


