import axios from 'axios'
const qs = require('qs')
const baseUrl = 'http://localhost:3000'

let validateUserInfo = async (info) => {
    const tabType = info.tabType;
    // switch (tabType) {
    //     case "tab1":
    //         return await validateUserLoginByAccount(info);
    //     case "tab2":
    //         return await validateUserLoginByMobile(info);
    // }

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

let getOUBaseInfoAll = async () =>{
    return await axios.get(baseUrl+'/api/getOUBaseInfoAll')
}

export { validateUserInfo, getOUBaseInfoAll }