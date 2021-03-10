import { message } from 'antd'
import { queryMeetingRooms } from '../services/Modules/Components/MeetingRoomManagementService'
const MeetingRoomModel = {
    namespace: 'meeting_room',
    state: {
        data: [],
    },
    reducers: {
        'saveData': (state, { payload }) => {
            return {
                ...state,
                data: payload
            }
        }
    },
    effects: {
        *getMeetingRoomInfo({callback}, { put, call }) {
            const result = yield call(queryMeetingRooms);
            // console.log(result)
            // console.log('props:', props)
            const { data, message: messageX } = result;
            if (messageX === 'succeeded') {
                const datanew = data.recordsets[0];
                const count = data.recordsets[1];
                yield put({
                    type: 'saveData',
                    payload: datanew
                })
            } else {
                message.error(messageX);
            }
        }
    }
}

export default MeetingRoomModel