import { Layout, Menu, notification } from 'antd'
const { Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
import { Scrollbars } from 'react-custom-scrollbars'
import { useState } from 'react'
import { Link, connect } from 'umi'
import * as Icon from '@ant-design/icons'


const SidebarMenus = ({ menus, activeSubMenu, selectedMenuItem, theme,
     menuMode, menuCollapsed, collapsible,
     className, ...restProps }) => {
    // const { menus, theme, menuMode, menuCollapsed } = props;
    const [activeSubMenuId, setActiveSubMenuId] = useState()
    // const currentPath = location.pathname;
    // console.log('currentPath:', currentPath.split('/'));
    // const subMenuItem = 
    // console.log('IconX:', IconX)

    const getActiveSubmenu = () => {
        if (!activeSubMenu) {
            //如果没有活跃的值，根据当前路径找到活跃的值，并更新再获取
        }
    }

    return (
        <Sider collapsed={menuCollapsed} theme={theme} collapsible={collapsible} 
            className={className}>
            <Scrollbars>
                <Menu theme={theme} mode={menuMode}>
                    {menus.map((item, index) => {
                        // const Icon = await LoadOnDemand.loader(item.icon)
                        if (item.children) {
                            return (<SubMenu
                                key={item.id}
                                title={
                                    <span>{
                                        React.createElement(Icon[`${item.icon}Outlined`], {})
                                    }<span>{item.title}</span></span>
                                }>
                                {
                                    item.children.map(cItem => {
                                        return (
                                            <MenuItem
                                                key={cItem.id + "_" + cItem.nodeInfo}>
                                                {/* <Icon type={cItem.icon}></Icon> */}
                                                {/* <IconX name={cItem.icon} /> */}
                                                {
                                                    React.createElement(
                                                        Icon[`${cItem.icon}Outlined`], {

                                                    }
                                                    )
                                                }
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
                                {/* <Icon type={item.icon}></Icon> */}
                                {/* <IconX name={cItem.icon} /> */}
                                {
                                    React.createElement(
                                        Icon[`${cItem.icon}Outlined`], {

                                    }
                                    )
                                }
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

export default connect(({ menus }) => ({
    menus: menus.menus
}))(SidebarMenus);