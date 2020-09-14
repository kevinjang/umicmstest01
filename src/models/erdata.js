import { queryERRemoData } from '../services/user'
import { find } from 'lodash'

const erDataModel = {
    namespace: 'er_data',
    state: {
        remoteDataSource: [],
        editingRecord: null
    },
    effects: {
        *fetchRemoteData(_, { call, put, select }) {
            const data = yield call(queryERRemoData);
            yield put({
                type: 'saveDataSource',
                payload: data
            })
        }
    },
    reducers: {
        'saveDataSource': (state, { payload }) => {
            return {
                ...state,
                remoteDataSource: payload,
            }
        },
        'setEditingRecord': (state, { payload }) => {
            const { id } = payload;
            const item = find(state.remoteDataSource, (it) => {
                return it.key === id;
            });
            
            return {
                ...state,
                editingRecord: { ...item }
            }            
        }
    }
}
export default erDataModel