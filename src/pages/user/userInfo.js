import React from 'react'
import { Avatar, Badge, Dropdown, Menu, Icon } from 'antd'
// import '../../../antd/dist/antd.min.css'
import 'antd/lib/avatar/style/index.css'
import 'antd/lib/badge/style/index.css'

import { UserContext, MyUserData } from '../UserContextMock'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        // this.
        this.menus = (
            <Menu style={{ marginTop: '45px', width: '150px', marginLeft: '120px' }}>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        设置
                    </a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    <a><Icon type="lock"></Icon>注销</a>
                </Menu.Item>
            </Menu>
        )
    }
    // static contextType = UserContext;// this.context;
    render() {
        // let userContext = this.context;
        // console.log('userContext:', userContext);
        // return (
        //     <div>
        //         <Dropdown overlay={this.menus}>
        //             <div>
        //                 <p style={{ color: 'white', float: 'right', marginTop: '-15px', fontSize: '20px', marginLeft: '5px' }}>
        //                     {/* User Name */}
        //                     {console.log('UserContext:', UserContext)}
        //                     {userContext.userRow.Username} 
        //                     {//let value = this.context; 
        //                         console.log('userContext:', userContext)}
        //                 </p>
        //                 <Avatar
        //                     style={{ float: 'right' }}
        //                     size='normal'
        //                     // shape='square'
        //                     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>

        //             </div>
        //         </Dropdown>
        //     </div>
        // );

        return (<UserContext.Consumer>
            {value => {
                return (
                    <div>
                        <Dropdown overlay={this.menus}>
                            <div>
                                <p style={{ color: 'white', float: 'right', marginTop: '-15px', fontSize: '20px', marginLeft: '5px' }}>
                                    {/* User Name */}
                                    {/* {console.log('UserContext:', UserContext)} */}
                                    {value.userRow.Username}
                                    {/* {let value = this.context; console.log('usercontext-consumer-value:', value)} */}
                                </p>
                                <Avatar
                                    style={{ float: 'right' }}
                                    size='normal'
                                    // shape='square'
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>

                            </div>
                        </Dropdown>
                    </div>
                );
            }}
        </UserContext.Consumer>);
    }
}

// UserInfo.contextType = UserContext

export default UserInfo