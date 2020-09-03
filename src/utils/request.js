import axios from 'axios'
const qs = require('qs')
const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://localhost/TMPCC';

let validateUserInfo = async (info) => {
    const tabType = info.tabType;

    console.log('tabType',tabType);

    if(tabType === 'tab1'){
        // 账号登录
        const userInfo = {
            userName: info.username,// 'zhm',
            passWord: info.pw
        }
    
        const ui = qs.stringify(userInfo)
    
        return await axios.get('/api/ValidateUserInfoByAccount', {
            params: ui
        })
    }
    else{
        // 手机号和验证码登录
        const userInfo = {
            mobile: info.mobile,
            captcha: info.captcha
        }
        return await axios.get('/api/ValidateUserInfoByMobile',{
            params:qs.stringify(userInfo)
        })
    }
}

let getOUBaseInfoAll = async ({parentid,pageSize, currentPage}) =>{

    return await axios.get(baseUrl+'/api/getOUBaseInfoAll',{
        params:{
            parentid,
            pageSize,
            currentPage
        }
    })
}

let getUserName = async () =>{
    return await axios.get(baseUrl + '/Home/About',{

    })
}

export { validateUserInfo, getOUBaseInfoAll,getUserName }