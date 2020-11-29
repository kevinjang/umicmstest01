import axios from 'axios'
import { message } from 'antd'
import config from '../../config/custom_config'
const { serverUrl } = config;
var baseURL = axios.defaults.baseURL = serverUrl.home;

function getByPage(pageSize, startPage, condition, callback) {
    axios.get(baseURL + "/getVacationStandardMaintain", {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'application/json'
        },
        params: { pageSize, startPage, condition },
        responseType: 'json'
    }).then(response => {
        var results = response.data.results;
        results = results.map((item, index) => {
            return {
                key: item.new_id,
                RowNum: item.new_id,
                ...item
            }
        });

        callback({
            PaginationTotal: parseInt(response.data.allCount) || 0,
            dataSource: results,
            allCount: response.data.allCount,
            pagi_total: response.data.allCount,
            spinning: false
        })
        if (response.data.message === 'succeeded') {
            message.success('员工年假标准维护-加载成功')
        }
        else {
            message.error(response.data.message)
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