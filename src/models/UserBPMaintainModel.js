import { queryUserBP, deleteUserBP, insert, update } from '../services/UserBPService'
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
                    }
                })
                messageComp.success("查询成功");
            } else {
                messageComp.error("请求员工BP号查询数据失败：" + message)
            }
        },
        *insertItem({ payload }) {
            const { record, callback } = payload;
            // console.log('insert record & callback:', record, callback)
            try {
                const response = yield insert(record)
                // response.then(data=>{
                console.log('response :', response)
                if (response && response.result) {
                    messageComp.info(response.result.message)
                }
                if (callback) callback()
            }
            catch (err) {
                console.log('insert item outer catch:', err)
                messageComp.error("插入数据失败：" + err.message)
            }
        },
        *updateItem({ payload }) {
            const { record, updates, where, callback } = payload;
            try {
                const response = yield update({ updates, where })
                // response.then(data=>{
                console.log('response :', response)
                if (response && response.result) {
                    messageComp.info(response.result.message)
                }
                if (callback) callback()
            }
            catch (err) {
                console.log('update item outer catch:', err)
                messageComp.error("更新数据失败：" + err.message)
            }
        },
        *deleteItem({ payload }) {
            const { ids, callback } = payload
            try {
                const response = yield deleteUserBP({
                    IDs: ids
                });

                if (response && response.result) {
                    messageComp.info(response.result.message)
                }

                if (callback) callback()
            } catch (error) {
                messageComp.error("删除数据失败：" + err.message)
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