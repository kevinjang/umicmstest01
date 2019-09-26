import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";
function getByPage(pageSize, startPage, condition, callback) {
    axios.get(baseURL + '/getEmployeeBP', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: { pageSize, startPage, condition },
        responseType: 'json'
    }).then((response) => {
        console.log('get-response-data:', response.data);
        var results = response.data.results;
        results = results.map((item, index) => {
            return {
                key: item.new_id,
                RowNum: item.new_id,
                ...item,
                valid: 'valid'
            }
        });

        // console.log(results[0]);

        callback({
            PaginationTotal: parseInt(response.data.allCount) || 0,
            dataSource: results,
            allCount: response.data.allCount,
            pagi_total: response.data.allCount,
            spinning: false
        })
        if (response.data.message === 'succeeded') {
            message.success('员工BP号-加载成功')
        }
        else {
            message.error(response.data.message)
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
    axios.post('/insertEmployeeBP', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            record
        },
        responseType: 'json'
    }).then(response => {
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
    axios.post('/updateEmployeeBP', {
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
    axios.post('/employeeBPDeleteSingle', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: { ID },
        responseType: 'json'
    }).then(response => {
        if (response &&
            response.data &&
            response.data.result &&
            response.data.result.message) {
            message.success(response.data.result.message);
        }
        else {
            message.error(response.statusText)
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
    return axios.post('/employeeBPDeleteMultiple', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params: {
            IDs
        },
        responseType: 'json'
    });
}

export { getByPage, insert, update, deleteItem, deleteItems }
// , insert, update, deleteItem, deleteItems