export default {
    namespace: 'login',
    state:{
        loginState: false
    },
    reducers:{
        'login':()=>{
            console.log('UserModel.js reducers-login node_env:', {...process}, process.env);
            return {
                loginState: true
            }
        },
        'logout':()=>{
            return {
                loginState: false
            }
        }
    }
}