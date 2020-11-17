export default {
    namespace: 'login',
    state:{
        loginState: false
    },
    reducers:{
        'login':()=>{
            return {
                loginState: true
            }
        }
    }
}