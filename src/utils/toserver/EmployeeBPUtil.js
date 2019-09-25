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
            message.info('员工BP号-加载成功')
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


export { getByPage }
// , insert, update, deleteItem, deleteItems