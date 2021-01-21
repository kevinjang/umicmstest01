import request from '../../utils/realRequest'
import config from '../../../config/custom_config'
const {serverUrl: baseURL} = config;

export async function getOULongNameUserBaseInfoByAD(userAD){
    return request(baseURL+'/getOULongNameUserBaseInfoByAD',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:{
            userAD
        },
        responseType: 'json'
    })
}