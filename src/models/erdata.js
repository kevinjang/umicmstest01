import { queryERRemoData } from '../services/user'

const erDataModel = {
    namespace: 'er_data',
    state: {
        remoteDataSource: []
    },
    effects: {
        *fetchRemoteData(_, { call,put, select }) {
            const data = yield call(queryERRemoData);
            yield put({
                type:'saveDataSource',
                payload: data
            })
        }
    },
    reducers:{
        'saveDataSource':(state,{payload})=>{
            return {
                ...state,
                remoteDataSource: payload,
            }
        }
    }
}
export default erDataModel