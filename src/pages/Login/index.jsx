import { Login, } from 'ant-design-pro'
import { Tabs } from 'antd'
const { Tab } = Login

import LoginContext from './components/LoginContext'

const Login1 = (props) => {
    return (
        <LoginContext.Provider>
            <Form form={props.form}>
                <Tab tab={"hello"}>

                </Tab>
            </Form>
        </LoginContext.Provider>
    )
}

export default Login1
