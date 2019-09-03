import React from 'react'
import { Layout, Menu, Icon, Tabs } from 'antd'
import { connect } from 'dva'
import { Route } from 'react-router';
import { asyncComponent } from '../utils/asyncComponent'
import styles from './MainFrame.css'

import UserInfo from './user/userInfo'

import { setAxios } from '../utils/setaxios'

const { Header, Footer, Sider, Content } = Layout
const { Item, SubMenu } = Menu
const { TabPane } = Tabs

@connect(
    state => ({ 
        menus: state.menus,
        ERColumns: state.ERColumns
     })
)
class KLayout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            selectedKeys: ['1'],
            openTabs: [],
            seletedTabKeys: [],
            activeTabKey: ''
        }
    }

    menuItemClick = (e) => {
        const id = e.key.split('_')[0]
        const blockUrl = e.key.split('_')[1]

        // 此处防止反复点击同一菜单时页面闪烁
        if (this.state.activeTabKey !== id)
            this.setState({
                activeTabKey: id
            })

        let allMenus = [].concat(...this.props.menus)
        this.props.menus.map(item => {
            if (item.children) {
                allMenus = allMenus.concat(...item.children)
            }
        })

        const selectedExists = this.state.openTabs.find(item => item.id === id)
        if (!selectedExists) {
            const selectedTab = allMenus.find(item => item.id === id);
            this.setState({
                openTabs: [...this.state.openTabs, selectedTab]
            })
        }
    }

    tabItemChange = (e) => {
        this.setState({
            activeTabKey: e
        })
    }

    tabItemEdit = (e) => {
        // 获取打开的倒数第二个id并设定activeTabKey
        if (this.state.openTabs.length > 1) {
            let id = this.state.openTabs[this.state.openTabs.length - 2].id
            this.setState({
                activeTabKey: id
            })
        }
        // 将当前活动的tab移除
        let openedtabs = this.state.openTabs;
        let itemIndex = openedtabs.findIndex(rc => rc.id === e);
        if (itemIndex > -1) {
            openedtabs.splice(itemIndex, 1)
            this.setState({
                openTabs: openedtabs
            })
        }
    }

    componentDidMount() {
        // setAxios();
    }

    loadTest = (e) => {
        const st = asyncComponent(() => import(e))
        return st
    };

    render() {
        return <Layout>
            <Header style={{ color: 'white', fontSize: '32px' }}>
                <Icon type="chrome" theme="filled" />
                <span>导航</span>
                <div style={{ float: 'right', marginTop: '-10px' }}> <UserInfo></UserInfo></div>
            </Header>

            <Layout style={{ maxHeight: 'calc(100vh - 64px)' }}>
                <Sider 
                    width={200} 
                    style={{ minHeight: '91.5vh', color: 'white', paddingTop: 16 }}
                    collapsible>
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={this.state.selectedKeys}
                        defaultOpenKeys={['sub1']}
                        mode='inline'
                        inlineCollapsed={this.state.collapsed}
                    >
                        {this.props.menus.map(item => {
                            if (item.children)
                                return <SubMenu key={item.id} title={<span><Icon type="mail" /><span>{item.title}</span></span>}>
                                    {item.children.map(cItem => {
                                        return <Item key={cItem.id + '_' + cItem.nodeInfo} onClick={this.menuItemClick}>
                                            <Icon type={cItem.icon}></Icon>
                                            <span>{cItem.title}</span>
                                        </Item>
                                    })}
                                </SubMenu>
                            else
                                return <Item key={item.id}>
                                    <Icon type={item.icon}></Icon>
                                    <span>{item.title}</span>
                                </Item>
                        })}
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ marginTop: '16px', marginLeft: '16px', marginRight: '16px', maxHeight: "90vh - 10px" }}>
                        <div style={{ padding: "5px", background: "#fff" }}>
                            {
                                this.state.openTabs.length > 0 &&
                                <Tabs
                                    activeKey={this.state.activeTabKey}
                                    onChange={this.tabItemChange}
                                    type="editable-card"
                                    hideAdd={true}
                                    onEdit={this.tabItemEdit}>
                                    {this.state.openTabs.map(item => {
                                        return <TabPane tab={<span><Icon type={item.icon}></Icon>{item.title}</span>}
                                            key={item.id}
                                            closable={true}>
                                            <Content>
                                                <Route component={this.loadTest(item.nodeInfo)}></Route>
                                            </Content>
                                        </TabPane>
                                    })}
                                </Tabs>
                            }
                        </div>
                    </Content>
                    <Footer className={styles.footer}>
                        <Icon type="copyright">  </Icon>KSNL
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    }
}

export default KLayout