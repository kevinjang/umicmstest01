import LoginContext from './LoginContext'
import { Tabs } from 'antd'

const { TabPane } = Tabs

const LoginTab = props => {
    console.log('logintab props:', props)
    return (
        <TabPane>
            {props.children}
        </TabPane>
    )
}

export default LoginTab;