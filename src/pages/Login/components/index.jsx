import LoginContext from './LoginContext'
import LoginTab from './LoginTab'
import { Form, Tabs } from 'antd'
import {useEffect} from 'react'
const { TabPane } = Tabs
const Login = props => {
    console.log('Login props:', props)
    const { children } = props;
    const TabChildren = [];
    React.Children.forEach(children, child => {
        // const props = child.props;
        if (child.type.typeName === 'LoginTab') {
            console.log('child:', child)
            TabChildren.push(<TabPane key={"tp_m"} {...child.props}>{child.props.children}</TabPane>)
        }
    })
    useEffect(()=>{
        console.log("ref:", {...props})
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