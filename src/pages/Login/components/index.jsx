import LoginContext from './LoginContext'
import LoginTab from './LoginTab'
import { Form, Tabs } from 'antd'
const { TabPane } = Tabs
const Login = props => {
    console.log('Login props:', props)
    const { children } = props;
    const TabChildren = [];
    React.Children.forEach(children, child => {
        // const props = child.props;
        if (child.type.typeName === 'LoginTab') {
            console.log('child:', child)
            TabChildren.push(<TabPane {...child.props}>{child.props.children}</TabPane>)
        }
    })
    return (
        <Form {...props}>
            <Tabs centered>
                {TabChildren}
            </Tabs>
        </Form>
    )
}

Login.Tab = LoginTab;
Login.LoginContext = LoginContext;

export default Login