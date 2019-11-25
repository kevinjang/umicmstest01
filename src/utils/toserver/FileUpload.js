import axios from 'axios'
import qs from 'querystring'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function upload(file) {
    let formData = new FormData();
    formData.append('avatar', file);
    console.log('qs:', qs)
    return await axios.post('/fileupload', formData, {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'multipart/form-data'
        },
        // params:{
        //     fileData: file
        // },
        responseType: 'json'
    }).then(response => {
        console.log('file upload response:', response)
    }).catch(error => {
        console.log('upload error:', error)
    })
}

export { upload }