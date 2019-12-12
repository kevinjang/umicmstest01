import axios from 'axios';

var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function getFilesByDocID(docID, callback) {
    return await axios.get('/getFilesByDocID', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
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