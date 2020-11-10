
import { getByPage, insert, update, deleteItem, deleteItems } from '../utils/toserver/EmployeeBPUtil'
import { queryUserBP } from '../services/userbp'

const UserBPMaintain = {
    namespace: 'UserBPMaintainModel',
    state: {
        data: [],
        // pagination: {
        //     current: 1,
        //     pageSize: 10,
        //     total: 0
        // },
        searchCondition: {
            // id: '',
            // property: '',
            // value: ''
            // bak
        },
        total: 0,
        loading: true

    },
    effects: {
        *fetchData({ pageSize, current }, { call, put, select }) {
            const condition = yield select(state => state.UserBPMaintainModel.searchCondition);

            yield put({
                type: 'setLoading',
                payload: {
                    loading: true
                }
            })
            const result = yield queryUserBP({
                pageSize,
                current,
                condition
            })
            console.log('query result:', result)
            const data = result.data.recordsets;
            yield put({
                type: 'setData',
                payload: {
                    data: data[0],
                    total: data[1][0].count
                }
            })

            // yield put({
            //     type: 'setLoading',
            //     payload: {
            //         loading: false
            //     }
            // })
        }
    },
    reducers: {
        'getCondition': (state, action) => {
            return {
                ...state
            }
        },
        'setCondition': (state, { payload }) => {
            return {
                ...state,
                searchCondition: payload
            }
        },
        'setData': (state, { payload }) => {
            const { data, total } = payload
            return {
                ...state,
                data,
                total,
                loading: false
            }
        },
        'setPagination': (state, { payload }) => {
            const { current, pageSize, total } = payload
            console.log('model setPagination pageSize:', pageSize)
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current,
                    pageSize,
                    total
                }
            }
        },
        'setLoading': (state, { payload }) => {
            const { loading } = payload;
            return {
                ...state,
                loading
            }
        }
    }
}

export default UserBPMaintain;