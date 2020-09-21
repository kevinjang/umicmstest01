import request from '../utils/realRequest'
const baseUrl = "http://localhost:3000";
export async function queryLeaveAuthData( { pageSize, startPage, condition }){
    return request(baseUrl+ "/getBasePeople",{
        pageSize, 
        startPage, 
        condition
    })
}