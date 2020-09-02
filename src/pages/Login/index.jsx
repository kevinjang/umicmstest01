
import { Tabs, Form, Input, Button, Space } from 'antd'
import LoginForm from './components'
import { UserOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'

const { Tab } = LoginForm

const validateMessages = {
    required: '`${name}` is required!'
}

const Login1 = (props) => {

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
                ]}><Input.Password placeholder="密码" size="large" key="pwd" prefix={<LockOutlined type="required" />} /></Form.Item>
                <Form.Item><Button style={{ width: '100%' }} size="large" key="submitbtn" htmlType="submit" type="primary" >登录</Button></Form.Item>
            </Tab>
        </LoginForm>
    )
}

export default Login1
