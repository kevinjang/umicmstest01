import { Login, } from 'ant-design-pro'
import { Tabs, Form } from 'antd'
const { Tab, UserName } = Login

import LoginContext from './components/LoginContext'
const { TabPane } = Tabs
const TabChildren = []




const Login1 = (props) => {
    return (
        <LoginContext.Provider value={{
            tabUtil: {
                addTab: (id) => {

                },
                removeTab: (id) => {

                }
            }
        }}>
            <Form form={props.form}>
                <Tabs>
                    <LoginContext.Consumer tab="密码登陆">
                        {value => (<TabPane tab="密码登陆"  //tabUtil={value.tabUtil}
                        >
                            <UserName name="userName" placeholder="用户名" />
                        </TabPane>)}
                    </LoginContext.Consumer>
                </Tabs>
            </Form>
        </LoginContext.Provider>
    )
}

export default Login1
