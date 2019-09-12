import axios from 'axios'
import { message } from 'antd'
function insert(record, callback) {
    axios.post('/insertBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { record },
        responseType: 'json'
    }).then((response) => {
        console.log('insert result:', response.data.result.message)
        if (response && response.data && response.data.result && response.data.result.message) {
            message.success(response.data.result.message)
        }
        else {
            message.error(response.statusText);
        }

        if (callback) {
            callback();
        }
    }).catch(err => {
        if (err)
            console.log('insertBasePeople-error:', err);
    })
}

function update(record, callback) {
    axios.post('/updateBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { record },
        responseType: 'json'
    }).then((response) => {
        console.log('update result:', response.data.result.message)
        if (response && response.data && response.data.result && response.data.result.message) {
            message.success(response.data.result.message)
        }
        else {
            message.error(response.statusText);
        }

        if (callback) {
            callback();
        }
    }).catch(err => {
        if (err)
            console.log('insertBasePeople-error:', err);
    })
}

function deleteItem(ID, callback){
    axios.post('/deleteSingleBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { ID },
        responseType: 'json'
    }).then((response) => {
        console.log('delete single item result:', response.data.result.message)
        if (response && response.data && response.data.result && response.data.result.message) {
            message.success(response.data.result.message)
        }
        else {
            message.error(response.statusText);
        }

        if (callback) {
            callback();
        }
    }).catch(err => {
        if (err)
            console.log('delete single item error:', err);
    })
}

export { insert, update, deleteItem }