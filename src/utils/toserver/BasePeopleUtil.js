import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";
function getByPage(pageSize, startPage, condition, callback) {
    axios.get(baseURL + '/getBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: { pageSize, startPage, condition },
        responseType: 'json'
    }).then((response) => {
        console.log('get-response-data:', response.data);
        const { data, message: selfMessage } = response.data;
        var results = data.recordsets[0];
        var number = data.recordsets[1][0].count
        results = results.map((item, index) => {
            return {
                key: item.new_id,
                RowNum: item.new_id,
                ...item,
                valid: 'valid'
            }
        });
        if (callback)
            callback({
                PaginationTotal: parseInt(number) || 0,
                dataSource: results,
                allCount: number,
                pagi_total: number,
                spinning: false
            })
        if (selfMessage === 'succeeded') {
            message.success('离职查询授权-加载成功')
        }
        else {
            message.error(selfMessage)
        }
    }).catch((err) => {
        console.log({ ...err })
        callback({
            spinning: false
        })
        message.error(err.message);
    });
}

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

function deleteItem(ID, callback) {
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

async function deleteItems(IDs, callback) {
    return axios.post('/deleteMultipleBasePeople', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: { IDs },
        responseType: 'json'
    });
}

export { getByPage, insert, update, deleteItem, deleteItems }