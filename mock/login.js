const qs = require('qs')
export default {
    'get /api/ValidateUserInfoByAccount'(req,res,next){
        const params = req.query[0]
        // console.log('params',params)
        const {userName, passWord} = qs.parse(params)
        let ret 
        if(userName === 'zhm'){
            ret = {
                code: '0',
                message: '登陆成功'
            }
        }else{
            ret = {
                code: '-1',
                message: '没有该用户'
            }
        }

        res.json(ret)
    },
    'get /api/ValidateUserInfoByMobile'(req,res,next){
        const params = req.query[0];
        const {mobile,captcha} = qs.parse(params);
        let ret ;
        if(mobile === '18910046386'){
            ret = {
                code: '0',
                message: '登陆成功'
            }
        }
        else{
            ret = {
                code : '-1',
                message: '手机号尚未注册'
            }
        }

        res.json(ret)
    },
    'get /api/getOUBaseInfoAll'(req,res,next){

    }
}