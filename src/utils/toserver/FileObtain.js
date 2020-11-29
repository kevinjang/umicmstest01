import axios from 'axios';

import config from '../../config/custom_config'
const { serverUrl } = config;
var baseURL = axios.defaults.baseURL = serverUrl.home;

async function getFilesByDocID(docID, callback) {
    return await axios.get('/getFilesByDocID', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'multipart/form-data'
        },
        params: {
            docID
        },
        responseType: 'json'
    }).then(response => {
        console.log('get files response:', response.data);
        const { message, files } = response.data;
        if (callback)
            callback({
                message,
                files
            })
    }).catch(error => {
        console.log('get files by docid error:', error)
    })
}

export { getFilesByDocID }