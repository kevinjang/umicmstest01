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
            message.success('离职查询授权-加载成功')
        }
        else {
            message.error(response.data.message)
        }
    }).catch((err) => {
        console.log({ ...err })
        callback({
            // PaginationTotal: 0,
            // dataSource: [],
            // allCount: 0,//response.data.allCount,
            // pagi_total: 0,//response.data.allCount,
            spinning: false
        })
        message.error(err.message);
    });
    // .finally(() => {
    //     // this.setState({
    //     //     spinning: false
    //     // })
    //     callback({
    //         // PaginationTotal: 0,
    //         // dataSource: [],
    //         // allCount: 0,//response.data.allCount,
    //         // pagi_total: 0,//response.data.allCount,
    //         spinning: false
    //     })
    // })
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