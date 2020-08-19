import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

function getByPage(pageSize, startPage, condition, callback) {
    axios.get(baseURL + "/getVacationStandardMaintain", {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: { pageSize, startPage, condition },
        responseType: 'json'
    }).then(response => {
        const { data, message: selfMessage } = response.data;
        var results = data.recordsets[0];
        var number = data.recordsets[1][0].count
        results = results.map((item, index) => {
            return {
                key: item.new_id,
                RowNum: item.new_id,
                ...item
            }
        });
        if (callback)
        callback({
            PaginationTotal: parseInt(number)  || 0,
            dataSource: results,
            allCount: number,
            pagi_total: number,
            spinning: false
        })
        if (selfMessage === 'succeeded') {
            message.success('员工年假标准维护-加载成功')
        }
        else {
            message.error(selfMessage)
        }
    }).catch(err => {
        callback({
            // PaginationTotal: 0,
            // dataSource: [],
            // allCount: 0,//response.data.allCount,
            // pagi_total: 0,//response.data.allCount,
            spinning: false
        })
        message.error(err.message);
    })
}

export { getByPage }