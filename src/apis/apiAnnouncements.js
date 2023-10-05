import request from "./utils/request";
import axios from "axios";

const baseURL = 'http://localhost:8080/courses/{courseId}/announcements';
export default axios.create({
    baseURL

})
const token = localStorage.getItem('token')

export const apiAnnouncements = {



    create: function (courseId, announcement) {
        const token = localStorage.getItem('token')

        const url = baseURL.replace('{courseId}', courseId.course.id);
        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(announcement)
        };

        return request(url, options);
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
        console.log(token);

        return request(url, options);
    }, getAllByTitle: function (courseId, title) {
        const token = localStorage.getItem('token')

        const url = baseURL + '/title?courseId=' + courseId + '&title=' + encodeURIComponent(title);
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,

            }

        }
        console.log(token);

        return request(url, options);
    },
    update: function (courseId, announcement) {
        const token = localStorage.getItem('token')

        const newUrl = 'http://localhost:8080/courses/{courseId}/announcements/{announcementId}';
        newUrl.replace('{courseId}', courseId);
        const urlAnnouncement = newUrl.replace('{announcementId}', announcement.id);
        const options = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(announcement)

        };
        return request(urlAnnouncement, options);
    },
    delete: function (courseId, announcementId) {
        const token = localStorage.getItem('token')

        const newUrl = 'http://localhost:8080/courses/{courseId}/announcements/{announcementId}';
        newUrl.replace('{courseId}', courseId);
        const urlAnnouncement = newUrl.replace('{announcementId}', announcementId);
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,

            }
        };

        return request(urlAnnouncement, options);

    }


}


