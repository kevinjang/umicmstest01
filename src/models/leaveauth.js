import { getByPage } from '../utils/toserver/BasePeopleUtil'
import { queryLeaveAuthData } from '../services/leaveauth'
import { message as messageComp } from 'antd'
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
        *fetchData({ payload }, { call, put, select }) {
            const { pageSize, startPage, condition, callback } = payload

            // console.log('startpage:', startPage)
            const response = yield queryLeaveAuthData({
                pageSize,
                startPage,
                condition
            })

            /**
             * NOTE: data结构说明
             * output:{},
             * recordset:[], 返回的数据集合，实际请求到的数量为准
             * recordsets: [Array(N), Array(M)], 一次请求执行的操作返回的所有结果
             * rowsAffected: [N, M] 执行SQL影响的行的数量
            */
            const { data, message } = response

            if (message === "succeeded") {
                yield put({
                    type: 'saveDataWithRemoteResponse',
                    payload: { data, callback }
                })
            }
            else {
                messageComp.error("请求离职授权查询数据失败：" + message);
            }
        }
    },
    reducers: {
        'saveDataWithRemoteResponse': (state, { payload }) => {
            // console.log('pauload:', payload)

            const { data, callback } = payload
            callback({
                PaginationTotal: data.recordsets && data.recordsets[1][0].count,
                allCount: data.recordsets && data.recordsets[1][0].count,
                pagi_total: 10,
                spinning: false,
                dataSource: data.recordset
            })
            return {
                ...state,
                allCount: data.recordset && data.recordset.length,
                dataSource: data.recordset
                // pageSize: 
                // totalPageCount: 
            }

            // return {
            //     ...state,
            //     allCount: payload.allCount,
            //     spinning: payload.spinning,
            //     dataSource: [...payload.dataSource]
            // }
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