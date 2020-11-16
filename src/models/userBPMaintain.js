
import { getByPage, insert, update, deleteItem, deleteItems } from '../utils/toserver/EmployeeBPUtil'
import { queryUserBP } from '../services/userbp'
import { message as messageComp } from 'antd'

const UserBPMaintain = {
    namespace: 'UserBPMaintainModel',
    state: {
        dataSource: [],
        allCount: 0,
        searchCondition: null
    },
    effects: {
        *fetchData({ payload }, { select, put }) {
            const { pageSize, current, callback } = payload
            const condition = yield select(state => state.UserBPMaintainModel.searchCondition);

            const response = yield queryUserBP({
                pageSize,
                startPage: current,
                condition
            })
            const { data, message } = response
            if (message === 'succeeded') {
                yield put({
                    type: 'saveDataWithRemoteResponse',
                    payload: {
                        data,
                        callback
                        // total: data.length
                    }
                })
                messageComp.success("查询成功");
            } else {
                messageComp.error("请求员工BP号查询数据失败：" + message)
            }
        }
    },
    reducers: {
        'saveDataWithRemoteResponse': (state, { payload }) => {
            const { data, callback } = payload;
            if (callback) {
                callback({
                    allCount: data.recordsets && data.recordsets[1][0].count,
                    dataSource: data.recordset
                })
            }

            return {
                ...state,
                allCount: data.recordset && data.recordset.length,
                dataSource: data.recordset
            }
        },
        'setCondition': (state, { payload }) => {
            return {
                ...state,
                searchCondition: { ...payload }
            }
        }
    }
}

export default UserBPMaintain;