import LoginContext from './LoginContext'
import LoginTab from './LoginTab'
import { Form, Tabs } from 'antd'
import React, { useEffect } from 'react'
const { TabPane } = Tabs
const Login = props => {
    const { children } = props;
    const {formRef} = props;
    const TabChildren = [];
    var form = null;
    React.Children.forEach(children, child => {
        if (child.type.typeName === 'LoginTab') {
            console.log('child:', child)
            TabChildren.push(<TabPane key={"tp_m"} {...child.props}>{child.props.children}</TabPane>)
        }
    })
    useEffect(() => {
        form = formRef.current;
        console.log("props:", {...props})
    })

    return (
        <Form {...props} ref={formRef} >
            <Tabs centered>
                {TabChildren}
            </Tabs>
        </Form>
    )
}

Login.Tab = LoginTab;
Login.LoginContext = LoginContext;

export default Login