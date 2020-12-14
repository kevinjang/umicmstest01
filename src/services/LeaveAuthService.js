import request from '../utils/realRequest'
import qs from 'qs'
import config from '../../config/custom_config'
const {serverUrl} = config
// console.log('NODE_ENV:', process.env);
const baseUrl = serverUrl;
export async function queryLeaveAuthData({ pageSize, startPage, condition }) {
    return request(baseUrl + "/getBasePeople", {
        method: 'GET',
        params: {
            pageSize,
            startPage,
            condition
        }
    })
}

// NOTE: 插入新的数据
// NOTE: post数据时，其中的参数使用data项，然后将数据字符串化，
// NOTE: 在远程服务器端收到的参数通过直接解析req.body就可以获取，如下：
// NOTE: const { PersonalID, userAD, UserCname, quanxianPersonalID, quanxianAD, quanxianCname } = req.body;
export async function insertNewLeaveAuthData(record) {
    return request(baseUrl + "/insertBasePeople", {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: qs.stringify(record),
        responseType: 'json'
    })
}

export async function updateLeaveAuthDataItem({ updates, where }) {
    return request(baseUrl + "/updateBasePeople", {
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

export async function deleteLeaveAuthDataItems(ids) {
    // NOTE: 不考虑单删or复删的情况了，以后都一样，反正选中的都是key数组
    return request(baseUrl + "/deleteMultipleBasePeople", {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify({
            ids
        }),
        responseType: 'json'
    })
}