import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function getUserBaseInfoByAD(userAD, callback) {
    axios.get(baseURL + '/getUserBaseInfoByAD', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: { userAD },
        responseType: 'json'
    }).then((response) => {
        console.log('get-response-data:', response.data);
        var row = response.data.row;
        // results = results.map((item, index) => {
        //     return {
        //         key: item.new_id,
        //         RowNum: item.new_id,
        //         ...item,
        //         valid: 'valid'
        //     }
        // });

        callback({
            // PaginationTotal: parseInt(response.data.allCount) || 0,
            // dataSource: results,
            // allCount: response.data.allCount,
            // pagi_total: response.data.allCount,
            userRow: row,
            spinning: false
        })
        if (response.data.message === 'succeeded') {
            // message.success('离职查询授权-加载成功')
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

export { getUserBaseInfoByAD }