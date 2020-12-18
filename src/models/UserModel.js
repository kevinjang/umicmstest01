import {login} from '@/services/UserService'
export default {
    namespace: 'login',
    state:{
        loginState: false
    },
    reducers:{
        'login':()=>{
            // console.log('UserModel.js reducers-login node_env:', {...process}, process.env);
            return {
                loginState: true
            }
        },
        'logout':()=>{
            return {
                loginState: false
            }
        }
    },
    effects:{
        *loginAsync({username, pwd}, {call, put, select}){
            console.log('loginAsync payload:',...payload);
            yield call(login,{
                username, 
                pwd
            })
            yield put({
                type: 'login'
            })
        }
    }
}