import React from 'react'
import { Avatar, Dropdown, Menu, Space } from 'antd'
import { Link } from 'umi'
import { SettingFilled, LockFilled } from '@ant-design/icons'
import 'antd/lib/avatar/style/index.css'
import 'antd/lib/badge/style/index.css'

import { UserContext } from '../UserContextMock'

class UserInfo extends React.Component {

    constructor(props) {
        super(props);

        this.menus = (
            <Menu style={{ width: '150px' }}>
                <Menu.Item>
                    {/* <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        设置
                    </a> */}
                    <Link ><Space><SettingFilled></SettingFilled><span>设置</span></Space></Link>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    {/* <a><Icon type="lock"></Icon>注销</a> */}
                    <Link to="/"><Space><LockFilled></LockFilled><span>注销</span></Space> </Link>
                </Menu.Item>
            </Menu>
        )
    }
    render() {
        return (<UserContext.Consumer>
            {value => {
                return (
                    <Dropdown overlay={this.menus}>
                        <div style={{ height: 'fit-content', display: 'flex', textAlign: 'center', color: 'whitesmoke' }}>
                            <div style={{ fontSize: '16px', marginLeft: '5px' }}>
                                <Avatar
                                    // style={{ float: 'right' }}
                                    size='normal'
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                                {value && value.userRow &&value.userRow.Username}
                            </div>

                        </div>
                    </Dropdown>
                );
            }}
        </UserContext.Consumer>);
    }
}

export default UserInfo