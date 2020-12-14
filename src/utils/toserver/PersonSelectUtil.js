import axios from 'axios'
import { message } from 'antd'
import config from '../../config/custom_config'
const { serverUrl } = config;
var baseURL = axios.defaults.baseURL = serverUrl//.home;
function getPersonSelectFullData(orgID, callback) {
    return axios.get(baseURL + '/getPersonSelect', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'application/json'
        },
        params: {
            params: [{ name: "OrgID", value: orgID }],
            pcg_name: '[Brc_BPM_Oc].[dbo].[sp_OUUsers_Async]',
            responseType: 'json'
        }
    })
}

function getPersonSelectSearchData({ OrgID, UserFilter, UserID, Plus }) {
    return axios.get(baseURL + '/getPersonSelect', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000, http://192.168.3.2:3000",
            'Content-Type': 'application/json'
        },
        params: {
            params: [
                { name: "OrgID", value: OrgID },
                { name: 'UserFilter', value: UserFilter },
                { name: 'UserID', value: UserID },
                { name: 'Plus', value: Plus }
            ],
            pcg_name: '[Brc_BPM_Oc].[dbo].[sp_OUUsers_Search]',
            responseType: 'json'
        }
    })
}

export { getPersonSelectFullData, getPersonSelectSearchData }
