import LoginContext from './LoginContext'
import LoginTab from './LoginTab'
import { Form, Tabs } from 'antd'
const Login = props => {
    return (
        <Form>
            <Tabs>
                {props.children}
            </Tabs>
        </Form>
    )
}

Login.Tab = LoginTab;
Login.LoginContext = LoginContext;

export default Login