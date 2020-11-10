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