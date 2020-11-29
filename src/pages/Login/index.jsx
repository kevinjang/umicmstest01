
import { Tabs, Form, Input, Button, notification, message } from 'antd'
import LoginForm from './components'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { checkBackEndRunning } from '../../utils/request'
import { setCookie } from '../../utils/utils'
import React, { useEffect } from 'react'
import styles from './index.less'
// NOTE: deleted import { useEffect } from 'react'
const { Tab } = LoginForm

import { withRouter, connect } from 'umi'

const Login1 = (props) => {
    const formRef = React.createRef();
    var form = null;
    const { history, loginState } = props;
    useEffect(()=>{
        form = formRef.current;
        console.log('login form:', form)
    })
    return (
        <LoginForm style={{ margin: '0 40%', padding: '10% 0' }} key="loginFormRoot" ref={formRef}>
            <Tab tab="账号密码登录" key="passwordLogin">
                <Form.Item name="username" rules={[
                    {
                        required: true,
                        message: '请填写用户名！'
                    }
                ]} key={"fi_un"}>
                    <Input placeholder="用户名" key="userName" size="large" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item name="password" rules={[
                    {
                        required: true,
                        message: '请输入密码！'
                    }
                ]} key={"fi_pw"}>
                    <Input.Password placeholder="密码" size="large" key="pwd" prefix={<LockOutlined type="required" />} />
                </Form.Item>
                <Form.Item key={"fi_submit"}>
                    <Button
                        className={styles.submitBtn}
                        size="large"
                        key="submitbtn"
                        htmlType="submit"
                        type="primary"
                        onClick={() => {
                            const promiseRet = checkBackEndRunning();
                            const { dispatch } = props;
                            if (dispatch) {
                                dispatch({
                                    type: 'login/login'
                                })
                            }
                            promiseRet.then(data => {
                                const running = data.data.running;
                                if (!!running) {
                                    history.push('/mainframe')
                                }
                                else {
                                    notification.error({
                                        message: '服务器端异常，请稍后重试！',
                                        description: '服务器端异常'
                                    })
                                }
                            }).catch(err => {
                                notification.error({
                                    message: '服务器端异常，请稍后重试！',
                                    description: err.message
                                })

                                // console.log(err)
                                // message.info(err.description)
                            });
                        }}
                    >登录</Button>
                </Form.Item>
            </Tab>
        </LoginForm>
    )
}

export default connect(({ login }) => ({
    loginState: login.loginState
}))(withRouter(Login1));
