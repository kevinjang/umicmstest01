import request from '@/utils/realRequest'
import config from '../../../../config/custom_config'
const {serverUrl} = config
const baseUrl = serverUrl;

export async function queryMeetingRooms(){
    return request(baseUrl + '/getMeetingRoomInfo', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        params:{
            username,
            pwd
        },
        responseType: 'json'
    })
}