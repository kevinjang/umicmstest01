import { Layout, Menu, notification } from 'antd'
const { Sider } = Layout;
const MenuItem = Menu.Item;
const { SubMenu } = Menu;
import { Scrollbars } from 'react-custom-scrollbars'
import { useState } from 'react'
import { Link, connect, history } from 'umi'
import * as Icon from '@ant-design/icons'
import config from '../../../config/config'
import { flatMap, find } from 'lodash'

const SidebarMenus = ({ menus, activeSubMenu, selectedMenuItem, theme,
    menuMode, menuCollapsed, collapsible,
    className, ...restProps }) => {
    const [activeSubMenuId, setActiveSubMenuId] = useState()
    const [collapsed, setCollapsed] = useState(false)

    const getActiveSubmenu = () => {
        if (!activeSubMenu) {
            //如果没有活跃的值，根据当前路径找到活跃的值，并更新再获取
        }
    }

    const { routes } = config

    const flatRoutes = routes[1].routes  //flatten(routes);

    // console.log('flatRoutes:', flatRoutes);

    return (
        <Sider collapsed={collapsed} theme={theme} collapsible={collapsible} onCollapse={
            () => {
                setCollapsed(!collapsed)
            }
        }
            className={className}>
            <Scrollbars>
                <Menu theme={theme} mode={menuMode}>
                    {menus.map((item, index) => {
                        if (item.children) {
                            return (<SubMenu
                                key={item.id}
                                title={
                                    <span>{
                                        item.icon ? React.createElement(Icon[`${item.icon}Outlined`], {}) : null
                                    }<span>{item.title}</span></span>
                                }>
                                {
                                    item.children.map(cItem => {

                                        return (
                                            <MenuItem
                                                key={cItem.id + "_" + cItem.nodeInfo}>
                                                {
                                                    cItem.icon ? React.createElement(
                                                        Icon[`${cItem.icon}Outlined`], {

                                                    }
                                                    ) : null
                                                }
                                                <span>
                                                    <Link
                                                        style={{ color: 'white' }}
                                                        to={cItem.urlPath}
                                                        key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath}
                                                        onClick={(ev, rest) => {
                                                            // 应该可以打断跳转
                                                            const item = find(flatRoutes, (xItem) => {
                                                                return xItem.path === cItem.urlPath;
                                                            });
                                                            if (!item) {
                                                                ev.preventDefault();
                                                                history.push('/mainframe/404')
                                                            }
                                                        }}
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
                                {
                                    cItem.icon ? React.createElement(
                                        Icon[`${cItem.icon}Outlined`], {

                                    }
                                    ) : null
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