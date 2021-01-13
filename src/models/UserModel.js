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
    effects:{
        *loginAsync({username, pwd}, {call, put, select}){
            // console.log('loginAsync payload:',...payload);
            yield call(login,{
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
