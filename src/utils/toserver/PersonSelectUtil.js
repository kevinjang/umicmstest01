import axios from 'axios'
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";
function getPersonSelectData(orgID, callback) {
    axios.get(baseURL + '/getPersonSelect', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/json'
        },
        params: {
            params: [{ name: "OrgID", value: orgID }],
            pcg_name: '[Brc_BPM_Oc].[dbo].[sp_OUUsers_Async]',
            responseType: 'json'
        }
    }).then(response => {
        console.log('get-response-data:', response.data);
        callback({
            spinning: false,
            loading: false
        })
    }).catch(err => {
        console.log({ ...err })
        callback({
            spinning: false,
            loading: false
        })
        message.error(err.message);

    })
}

export { getPersonSelectData }