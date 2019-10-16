import React from 'react'
import { Avatar, Badge, Dropdown, Menu, Icon } from 'antd'
// import '../../../antd/dist/antd.min.css'
import 'antd/lib/avatar/style/index.css'
import 'antd/lib/badge/style/index.css'

import { UserContext } from '../UserContextMock'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        // this.
        this.menus = (
            <Menu style={{ marginTop: '15px', width: '150px' }}>
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
    static contextType = UserContext;// this.context;
    render() {
        return (<div>
            <p style={{ color: 'white', float: 'right', marginTop: '-15px', fontSize: '20px', marginLeft: '5px' }}>
                {/* User Name */}
                {this.context.FirstName} {this.context.SurName}
                {console.log('this.context:', this.context)}
            </p>
            <Dropdown overlay={this.menus}>
                <Avatar
                    style={{ float: 'right' }}
                    size='normal'
                    // shape='square'
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
            </Dropdown>
        </div>);
    }
}

// UserInfo.contextType = UserContext

export default UserInfo