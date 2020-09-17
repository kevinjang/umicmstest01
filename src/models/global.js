import {queryNotices} from '@/services/user'
const GlobalModel = {
    namespace:"global",
    state:{
        collapsed: false,
        notices:[]
    },
    effects:{
        *fetchNotices(_,{call, put}){
            const data = yield call(queryNotices);
            yield put({
                type: 'saveNotices',
                payload: data
            })
        }
    },
    reducers:{
        'saveNotices':(state,{payload})=>{
            return {
                collapsed:false,
                ...state,
                notices: payload
            }
        }
    }
}

export default GlobalModel