import axios from 'axios'
import { message } from 'antd'
import config from '../../../config/custom_config'
const { serverUrl } = config;
var baseURL = axios.defaults.baseURL = serverUrl//.home;

async function getUserBaseInfoByAD(userAD, callback) {
    axios.get(baseURL + '/getUserBaseInfoByAD', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'application/json'
        },
        params: { userAD },
        responseType: 'json'
    }).then((response) => {
        const { data, message: selfMessage } = response.data;
        var row = {}
        row = data.recordsets[0][0];

        // console.log('row:', row);

        callback({
            userRow: row,
            spinning: false
        })
        if (selfMessage === 'succeeded') {
            message.success('人员加载成功')
        }
        else {
            message.error(selfMessage)
        }
    }).catch((err) => {
        // console.log({ ...err })
        callback({
            spinning: false
        })
        message.error(err.message);
    });
}

async function getOULongNameUserBaseInfoByAD(userAD, callback){
    axios.get(baseURL + '/getOULongNameUserBaseInfoByAD', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'application/json'
        },
        params: { userAD },
        responseType: 'json'
    }).then((response) => {
        const { data, message: selfMessage } = response.data;
        var row = {}
        row = data.recordsets[0][0];

        // console.log('row:', row);

        callback({
            userRow: row,
            spinning: false
        })
        if (selfMessage === 'succeeded') {
            message.success('人员加载成功')
        }
        else {
            message.error(selfMessage)
        }
    }).catch((err) => {
        // console.log({ ...err })
        callback({
            spinning: false
        })
        message.error(err.message);
    });
}

export { getUserBaseInfoByAD, getOULongNameUserBaseInfoByAD }