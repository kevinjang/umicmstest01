import { login } from '@/services/UserService'
export default {
    namespace: 'login',
    state: {
        loginState: false
    },
    reducers: {
        'login': () => {
            return {
                loginState: true
            }
        },
        'logout': () => {
            return {
                loginState: false
            }
        }
    },
    effects: {
        *loginAsync({ payload }, { call, put, select }) {
            const { username, pwd } = payload;
            // console.log('username, pwd', username, pwd)
            const response = yield call(login, {
                username,
                pwd
            })
            console.log('response:', response)
            yield put({
                type: 'login'
            })
        }
    }
}