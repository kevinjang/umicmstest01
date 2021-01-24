import React from 'react'
import { Avatar, Dropdown, Menu, Space } from 'antd'
import { Link } from 'umi'
import { SettingFilled, LockFilled } from '@ant-design/icons'
import 'antd/lib/avatar/style/index.css'
import 'antd/lib/badge/style/index.css'

import { UserContext } from '../UserContextMock'
import SettingDrawer from '../../components/Drawer'
import UserMenu from './UserMenu'
import { NavLink } from 'umi'
const Menus = (props) => {
    const {theme} = props
    return (
        <Menu style={{ width: '150px' }} >
            <Menu.Item>
                <Space><SettingDrawer /></Space>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                {/* <a><Icon type="lock"></Icon>注销</a> */}
                <Space><UserMenu /></Space>
            </Menu.Item>
        </Menu>
    );
}

const UserInfo = (props) => {


    return (<UserContext.Consumer>
        {value => {
            return (
                <Dropdown overlay={<Menus theme={value.theme} ></Menus>} trigger={['click']}>
                    <div style={{ height: 'fit-content', display: 'flex', textAlign: 'center', color: 'whitesmoke' }}>
                        <div style={{ fontSize: '16px', marginLeft: '5px' }}>
                            <Avatar
                                // style={{ float: 'right' }}
                                style={{ border: '1px solid white', marginRight: '5px' }}
                                size='normal'
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                            {value && value.userRow && value.userRow.Username}
                        </div>

                    </div>
                </Dropdown>
            );
        }}
    </UserContext.Consumer>);
}



class UserInfo1 extends React.Component {

    constructor(props) {
        super(props);

        this.menus = (
            <Menu style={{ width: '150px' }}>
                <Menu.Item>
                    {/* <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        设置
                    </a> */}
                    {/* <Link to={"http://www.alipay.com"}><Space><SettingFilled></SettingFilled><span>设置</span></Space></Link> */}
                    <Space><SettingDrawer /></Space>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    {/* <a><Icon type="lock"></Icon>注销</a> */}
                    <Space><UserMenu /></Space>
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
                                    style={{ border: '1px solid white', marginRight: '5px' }}
                                    size='normal'
                                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                                {value && value.userRow && value.userRow.Username}
                            </div>

                        </div>
                    </Dropdown>
                );
            }}
        </UserContext.Consumer>);
    }
}

export default UserInfo