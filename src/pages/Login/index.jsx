
import { Tabs, Form, Input, Button, Space } from 'antd'
import LoginForm from './components'
import { UserOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

import styles from './index.less'
const { Tab } = LoginForm

import { withRouter } from 'umi'

const validateMessages = {
    required: '`${name}` is required!'
}

const Login1 = (props) => {
    const { history } = props;
    console.log('history:', history)
    return (
        <LoginForm style={{ margin: '0 40%', padding: '10% 0' }} key="loginFormRoot"
            onFinish={(values) => {
                console.log('on finish:', values)
            }}
            onValuesChange={(values, allValues) => {
                console.log('on values change allValues:', allValues)
            }}>
            <Tab tab="账号密码登录" key="passwordLogin">
                <Form.Item name="username" rules={[
                    {
                        required: true,
                        message: '请填写用户名！'
                    }
                ]}><Input placeholder="用户名" key="userName" size="large" prefix={<UserOutlined />} /></Form.Item>
                <Form.Item name="password" rules={[
                    {
                        required: true,
                        message: '请输入密码！'
                    }
                ]}>
                    <Input.Password placeholder="密码" size="large" key="pwd" prefix={<LockOutlined type="required" />} />
                </Form.Item>
                <Form.Item>
                    <Button
                        className={styles.submitBtn}
                        size="large"
                        key="submitbtn"
                        htmlType="submit"
                        type="primary"
                        onClick={() => {
                            history.push('/mainframe')
                        }}
                        onSubmit={() => {
                            history.push('/mainframe')
                        }}>登录</Button>
                </Form.Item>
            </Tab>
        </LoginForm>
    )
}

export default withRouter(Login1)
