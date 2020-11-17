import request from '../utils/realRequest'
import qs from 'qs'
const baseUrl = 'http://localhost:3000';

export async function queryUserBP({ pageSize, startPage, condition }) {
    return request(baseUrl + "/getEmployeeBP", {
        method: 'GET',
        params: {
            pageSize,
            startPage,
            condition
        }
    })
}

export async function insert(record) {
    return request(baseUrl + '/insertEmployeeBP', {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(record),
        responseType: 'json'
    })
}

export async function update({ updates, where }) {
    return request(baseUrl+"/updateEmployeeBP",{        
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify({
            updates,
            where
        }),
        responseType: 'json'
    })
}

export async function deleteUserBP({ IDs }) {
    return request(baseUrl + '/employeeBPDeleteMultiple', {
        method: 'POST',
        params: {
            IDs
        },
        responseType: 'json'
    })
}