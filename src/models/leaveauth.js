import { getByPage } from '../utils/toserver/BasePeopleUtil'
const LeaveAuth = {
    namespace: 'LeaveAuthModel',
    state: {
        dataSource: [],
        // NOTE: 所有数据行数
        allCount: 0,
        // NOTE: 每页行数
        pageSize: 10,
        // NOTE: 当前页
        currentPage: 0,
        // NOTE: 总页数
        totalPageCount: 0,
        // NOTE: 查询条件
        searchCondition: null,
        // NOTE: 加载中
        spinning: false
    },
    effects: {
        *fetchData(_, { call, put, select }) {
            const d = yield select(state=>({
                pageSize:state.LeaveAuthModel.pageSize,
                startPage: state.LeaveAuthModel.currentPage,
                condition: state.LeaveAuthModel.searchCondition,                
            }))
            yield call(()=>{
                getByPage(d.pageSize, d.startPage, d.condition,(e)=>{
                    console.log('great e:', e);
                    put({
                        type: 'saveData',
                        payload: e
                    })
                })
            })
        }
    },
    reducers: {
        'saveData': (state, { payload }) => {
            return {
                ...state,
                allCount: payload.allCount,
                spinning: payload.spinning,
                dataSource: [...payload.dataSource]
            }
        },
        'setSearchCondition': (state, { payload }) => {
            return {
                ...state,
                searchCondition: {
                    ...payload
                }
            }
        }
    }
}

export default LeaveAuth;