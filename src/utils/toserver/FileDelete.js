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
        console.log('filedelete response data:', data)
        const { message: messageX } = data;

        if (cb) {
            cb({
                messageX
            })
        }
        // return {}

    }).catch(error => {
        console.log(`deleting file ${fileID} failed, error:${error.message}`)
    })
}

async function deleteFileItems(fileIDs, cb) {
    axios.post('/deleteFilesByID', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'multipart/form-data'
        },
        params: {
            fileIDs
        },
        responseType: 'json'
    }).then(response => {
        const { data } = response;
        console.log('files delete response data:', data)
        const { message: messageX } = data;
        if (cb) {
            cb({
                messageX
            })
        }
    }).catch(error=>{
        console.log(`deleting files ${fileIDs} failed, error:${error.message}`)
    })
}

export { deleteFileItem, deleteFileItems }