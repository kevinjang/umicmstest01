import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function deleteFileItem(fileID, cb) {
    await axios.post('/deleteFileByID', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'multipart/form-data'
        },
        params: {
            fileID
        },
        responseType: 'json'
    }).then(response => {
        const { data } = response;
        const { message: messageX } = data;
        
        if(cb){
            cb({
                messageX
            })
        }
        // return {}

    }).catch(error => {
        console.log(`deleting file ${fileID} failed, error:${error.message}`)
    })
}

export { deleteFileItem }