import {queryNotices} from '@/services/UserService'
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
        },
        *changeNoticeReadState({payload}, {put, select}){
            const notices = yield select(state=>state.global.notices.map(item=>{
                const notice = {...item};
                if(notice.id === payload){
                    notice.read = true;
                }

                return notice;
            }));

            yield put({
                type: 'saveNotices',
                payload: notices
            })
        },
        *clearNotices({payload}, {put}){
            yield put({
                type: 'saveClearedNotices',
                payload
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
        },
        'saveClearedNotices':(state = {notices:[], collapsed: true},{payload})=>{
            return {
                ...state,
                collapsed: false,
                notices: state.notices.filter(item=>item.type !== payload)
            }
        }
    }
}

export default GlobalModel