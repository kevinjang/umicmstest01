import axios from 'axios'
import qs from 'querystring'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function upload(file, userAD, callback) {
    let formData = new FormData();
    formData.append('avatar', file, file.name);
    console.log('qs:', qs)
    return await axios.post('/fileupload', formData, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'multipart/form-data'
        },
        params:{
            userAD
        },
        responseType: 'json'
    }).then(response => {
        console.log('file upload response:', response)
        const message = response.data.message;
        callback({
            message
        });
    }).catch(error => {
        console.log('upload error:', error)
    })
}

export { upload }