import { Layout, Menu, Icon, notification } from 'antd'
const { Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
import { Scrollbars } from 'react-custom-scrollbars'

import { Link } from 'umi'

const SidebarMenus = ({ menus, theme, menuMode, menuCollapsed, ...restProps }) => {
    // const { menus, theme, menuMode, menuCollapsed } = props;
    return (
        <Sider collapsed={menuCollapsed} {...restProps}>
            <Scrollbars>
                <Menu theme={theme} mode={menuMode}>
                    {menus.map((item, index) => {
                        if (item.children) {
                            return (<SubMenu
                                key={item.id}
                                title={
                                    <span><Icon type={item.icon} /><span>{item.title}</span></span>
                                }>
                                {
                                    item.children.map(cItem => {
                                        return (
                                            <MenuItem
                                                key={cItem.id + "_" + cItem.nodeInfo}>
                                                <Icon type={cItem.icon}></Icon>
                                                <span>
                                                    <Link
                                                        style={{ color: 'white' }}
                                                        to={cItem.urlPath}
                                                        key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath}
                                                        onClick={() => notification.info({
                                                            message: 'test',
                                                            description: 'test'
                                                        })}
                                                    >
                                                        {cItem.title}
                                                    </Link>
                                                </span>
                                            </MenuItem>
                                        )
                                    })
                                }
                            </SubMenu>)
                        }
                        else
                            return <MenuItem key={item.id}>
                                <Icon type={item.icon}></Icon>
                                <span>
                                    <Link style={{ color: 'white' }} to={cItem.urlPath} key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath}
                                        onClick={() => notification.info({
                                            message: 'test',
                                            description: 'test'
                                        })}> {cItem.title}</Link>
                                </span>
                            </MenuItem>
                    })}
                </Menu>
            </Scrollbars>
        </Sider>
    )
}

export default SidebarMenus;