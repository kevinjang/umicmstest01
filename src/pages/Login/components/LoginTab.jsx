import LoginContext from './LoginContext'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const LoginTab = props => {
    console.log('logintab props:', props)
    return (
        <TabPane {...props}>
            {props.children}
        </TabPane>
    )
}

LoginTab.typeName = "LoginTab";

export default LoginTab;