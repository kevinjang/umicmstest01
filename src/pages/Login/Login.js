import React from 'react'
import { Login } from 'ant-design-pro'
import './Login.css'
const { Tab, UserName, Password, Submit, Mobile, Captcha } = Login
import { validateUserInfo } from '../../utils/request'
import { connect } from 'dva'
import { Alert } from 'antd'
import router from 'umi/router'

// const userNameRules = [
//     {
//         required: true,
//         message:'用户名必填'
//     },
//     {
//         min:3,
//         message: '用户名长度至少为3'
//     },
//     {
//         max: 15,
//         message: '用户名长度最长为15'
//     }
// ]

// const pwRules = [
//     {
//         required: true,
//         message: '请输入密码'
//     }
// ]

@connect(
    state => ({rules: state.vrules})
)
class Login1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            passWord: '',
            msg: '',
            msgType: '',
            activeTab: 'tab1'
        }
    }
    onLoginSubmit = (err, values) => {
        // console.log('login submit', values);
        // console.log('this.props.dispatch',this.props.dispatch)
        // const ret = 
        console.log(this.props.rules)

        // console.log('validateUserLoginByAccount',validateUserLoginByAccount);
        const info = { ...values, tabType: this.state.activeTab }
        validateUserInfo(info).then((ret) => {
            // console.log('ret',ret)
            const data = ret.data
            // if(data.code === '0'){
            //     msgType = ''
            // }

            this.setState({
                msg: data.message,
                msgType: data.code
            })

            console.log('onLoginSubmit-router', router)
            router.push('/mainframe')
        }).catch(err=>{

        });
        // this.props.dispatch({

        // })

    }

    onTabChange = (currentTab) => {
        console.log(currentTab)
        this.setState({
            activeTab: currentTab
        })
    }

    // componentWillMount() {
    //     console.log('componentWillMount', this.props.rules)
    // }
    // componentDidMount() {
    //     console.log('componentDidMount', this.props.rules)
    // }

    getCaptcha = () => {
        console.log('get Captcha')
    }

    render() {
        return <div style={{ paddingTop: '25vh', marginLeft: '15vw', marginRight: '15vw', maxWidth: '70vw', alignContent: 'middle' }}>
            <Login
                defaultActiveKey="tab1"
                onSubmit={this.onLoginSubmit}
                onTabChange={this.onTabChange}>
                <Tab key="tab1" tab="账号登录">
                    <UserName
                        name="username"
                        placeholder="请输入用户名"
                        rules={this.props.rules[0].userNameRules}

                    ></UserName>
                    <Password name="pw" placeholder="请输入密码" rules={this.props.rules[0].pwRules}></Password>
                </Tab>
                <Tab key="tab2" tab="手机验证码登录">
                    <Mobile name="mobile" placeholder="请输入手机号" rules={this.props.rules[0].mobileRules}></Mobile>
                    <Captcha name="captcha" placeholder="验证码" buttontext='获取验证码'
                        onGetCaptcha={() => this.getCaptcha()}>
                        {/* <buttonText></buttonText>     */}
                    </Captcha>
                </Tab>
                <Submit>登录</Submit>
            </Login>
            {this.state.msg ? <Alert
                message={this.state.msg}
                showIcon
                type={this.state.msgType === '0' ? 'success' : 'error'}
                closable></Alert> : ''}
        </div>
    }
}

export default Login1