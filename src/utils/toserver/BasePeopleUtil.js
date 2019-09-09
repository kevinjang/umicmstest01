import axios from 'axios'
import {message} from 'antd'
function insert(record) {
    axios.post('/insertBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { record },
        responseType: 'json'
    }).then((response) => {
        console.log('insert result:', response.data.result.message)
        if(response && response.data && response.data.result && response.data.result.message){
            message.success(response.data.result.message)
        }
        else {
            message.error(response.statusText);
        }
    }).catch(err => {
        if (err)
            console.log('insertBasePeople-error:', err);
    })
}

export { insert }