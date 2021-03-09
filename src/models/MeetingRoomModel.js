import {queryMeetingRooms} from '../services/Modules/Components/MeetingRoomManagementService'
const MeetingRoomModel = {
    namespace: 'meeting_room',
    state:{
        data:[],
    },
    reducers:{
        'saveData':(state, {payload})=>{
            return {
                ...state,
                data: payload
            }
        }
    },
    effects:{
        *getMeetingRoomInfo(_,{put, call}){
            const result = yield call(queryMeetingRooms);
            yield put({
                type: 'saveData',
                payload: result.meeting_room
            })
        }
    }
}