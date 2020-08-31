import React from 'react'
import { Login } from 'ant-design-pro'

const { Tab, UserName, Password, Submit, Mobile, Captcha } = Login
import { validateUserInfo } from '../../utils/request'
import { connect, withRouter } from 'umi'
import { Alert } from 'antd'
import styles from './Login.css'
// import validatorRules from '../../models/validatorRules'

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
        this.history = props.history;
        // console.log(props);
    }
    componentDidMount(){

    }
    onLoginSubmit = (err, values) => {
        const info = { ...values, tabType: this.state.activeTab }
        validateUserInfo(info).then((ret) => {
            const data = ret.data

            this.setState({
                msg: data.message,
                msgType: data.code
            })

            if (!hasAliveCookie()) {
                // 如果没有
                dealCookie();
            }

            // console.log('onLoginSubmit-router', router)
            // router.push('/mainframe');
            this.history.push('/mainframe');
        }).catch(err => {

            if (!hasAliveCookie()) {
                // 如果没有
                dealCookie();
            }
            // router.push('/mainframe');
            this.history.push('/mainframe');
        });
    }

    onTabChange = (currentTab) => {
        // console.log(currentTab)
        this.setState({
            activeTab: currentTab
        })
    }

    getCaptcha = () => {
        // console.log('get Captcha')
    }



    render() {
        // console.log(this.props.rules)
        return <div style={{
            paddingTop: '25vh',
            marginLeft: '37.5vw',
            marginRight: '15vw',
            // paddingBottom: '37vh',
            maxWidth: '25vw',
            alignContent: 'middle'
        }}>
            <div className={styles.innerHeader} style={{ borderRadius: '4px' }}>
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
                    
                    <Submit>登录</Submit>
                </Login>
            </div>

            {
                this.state.msg ? <Alert
                    message={this.state.msg}
                    showIcon
                    type={this.state.msgType === '0' ? 'success' : 'error'}
                    closable></Alert> : ''
            }
        </div >
    }
}

const LoginX = connect(({vrules})=>{
    // console.log('vrules:', vrules)
    return {
        rules: vrules
    }
})(Login1)


function hasAliveCookie(username) {
    username = 'kevinjang'
    if (!localStorage.getItem(username)) return false;
    else {
        const cookie = JSON.parse(localStorage.getItem(username));
        if (parseInt(cookie.expires) > Date.now()) {
            return false;;
        }

        return true;
    }
}

function dealCookie(username) {
    username = 'kevinjang'
    const maxAge = 604800000;
    const expires = Date.now() + maxAge;
    localStorage.setItem(username, JSON.stringify({
        username,
        maxAge,
        expires
    }))
}

export default withRouter(({history})=>(<LoginX history={history} />))