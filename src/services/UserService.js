import request from '@/utils/realRequest'
import qs from 'qs'
import config from '../../config/custom_config'
const { serverUrl } = config
const baseUrl = serverUrl;

export async function queryNotices() {
    return request('/api/notices');
}

export async function queryERRemoData() {
    return request('/api/erdata');
}

export async function login({username, pwd}) {
    // console.log('userservice username, pwd', username, pwd)
    return request(baseUrl + '/ldaptest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // data: qs.stringify({
        //     username,
        //     pwd
        // }),
        params:{
            username,
            pwd
        },
        responseType: 'json'
    })
}