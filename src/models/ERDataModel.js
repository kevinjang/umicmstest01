import { queryERRemoData } from '../services/UserService'
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
        },
        *updateRemoteData({ dataSource }, { call, put }) {
            return {
                ...state,
                remoteDataSource: [...dataSource]
            }
        }
    },
    reducers: {
        'saveDataSource': (state, { payload }) => {
            return {
                ...state,
                remoteDataSource: payload,
            }
        },
        'setEditingRecordById': (state, { payload }) => {
            const { id } = payload;
            const item = find(state.remoteDataSource, (it) => {
                return it.key === id;
            });

            return {
                ...state,
                editingRecord: { ...item }
            }
        },
        'setEditingRecordByContent': (state, { payload }) => {
            // console.log('setEditingRecordByContent:', payload)
            return {
                ...state,
                editingRecord: { ...payload }
            }
        }
    }
}
export default erDataModel