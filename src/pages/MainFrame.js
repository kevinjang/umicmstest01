import React, { Suspense } from 'react'
import { Layout, Menu, Icon, Tabs, Badge, Button, Spin } from 'antd'
import { connect } from 'dva'
import { Route } from 'react-router';
import { asyncComponent } from '../utils/asyncComponent'
import styles from './MainFrame.css'

import UserInfo from './user/userInfo'

import { CopyrightOutline } from '@ant-design/icons'

const { Header, Footer, Sider, Content } = Layout
const { Item, SubMenu } = Menu
const { TabPane } = Tabs

import Notification from './Notification/Notification'

import { UserContext, GetData, MyUserData } from './UserContextMock';

import { Scrollbars } from 'react-custom-scrollbars'


import moment from 'moment'

// const UserContextMock = UserContext

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
            activeTabKey: '',
            theme: 'dark',
            spinning: false,
            textAlign: 'center',
            paddingTop: '25%'
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

    componentWillMount() {
        // setAxios();
        this.setState({
            spinning: true
        }, () => {
            GetData("zhanghaoming", () => {
                this.setState({
                    spinning: false,
                    textAlign: 'initial',
                    paddingTop: '0'
                })
            });
        })
    }

    componentDidMount() {
    }

    loadTest = (e, opts) => {
        const st = asyncComponent(() => import(e), opts)
        return st
    };

    render() {
        document.title = 'KSNL';
        return <div style={{
            width: '100%', height: 'calc(100vh - 0px)'
            , textAlign: `${this.state.textAlign}`, paddingTop: `${this.state.paddingTop}`
        }}>
            <Spin spinning={this.state.spinning && !UserContext}
                size="large" >
                {UserContext ?
                    <UserContext.Provider value={MyUserData}>
                        {/* {console.log('mf-MyUserData:', MyUserData)} */}
                        <Layout>
                            <Header style={{ color: 'white', fontSize: '32px' }}>
                                <Icon type="chrome" theme="filled" />
                                <span>导航</span>
                                <div className={styles.userInfoNode}>
                                    <Notification></Notification>
                                    <UserInfo style={{ marginTop: '30px', left: '1000px' }}></UserInfo>
                                </div>
                            </Header>

                            <Layout style={{ maxHeight: 'calc(100vh - 64px)', height: 'calc(100vh - 64px)' }}>
                                <Sider
                                    width={200}
                                    style={{ minHeight: '91.5vh', color: 'white', paddingTop: 16 }}
                                    theme={this.state.theme}
                                    collapsible>
                                    <Scrollbars>
                                        <Menu
                                            theme={this.state.theme}
                                            defaultSelectedKeys={this.state.selectedKeys}
                                            defaultOpenKeys={['sub1']}
                                            mode='inline'
                                            inlineCollapsed={this.state.collapsed}
                                        >
                                            {this.props.menus.map(item => {
                                                if (item.children)
                                                    return <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
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
                                    </Scrollbars>
                                </Sider>
                                <Layout style={{ backgroundColor: '#f0f2f5' }}>
                                    <Scrollbars>
                                        <Content style={{ marginTop: '16px', marginLeft: '16px', marginRight: '16px', maxHeight: "90vh - 10px", overflow: 'overlay' }}>

                                            <div >
                                                {/* style={{ padding: "5px", background: "#fff" }} */}
                                                {
                                                    this.state.openTabs.length > 0 &&
                                                    <Tabs
                                                        activeKey={this.state.activeTabKey}
                                                        onChange={this.tabItemChange}
                                                        type="editable-card"
                                                        hideAdd={true}
                                                        onEdit={this.tabItemEdit}>
                                                        {this.state.openTabs.map(item => {
                                                            return <TabPane
                                                                tab={<span><Icon type={item.icon}></Icon>{item.title}</span>}
                                                                key={item.id}
                                                                forceRender={false}
                                                                closable={true}>
                                                                <Content >
                                                                    {/* {console.log('item.nodeInfo:', item.nodeInfo)} */}
                                                                    <Route component={this.loadTest(item.nodeInfo, {
                                                                        activeKey: this.state.activeTabKey,
                                                                        selfID: item.id
                                                                    })}></Route>
                                                                </Content>
                                                            </TabPane>
                                                        })}
                                                    </Tabs>
                                                }
                                            </div>
                                        </Content>
                                    </Scrollbars>
                                    <Footer style={{ backgroundColor: 'white', height: '48px', padding: '10px 50px' }}>
                                        <Icon type="copyright" />KSNL {moment().year()}
                                </Footer>
                                </Layout>
                            </Layout>
                        </Layout>
                    </UserContext.Provider>
                    : ''}
            </Spin>
        </div>
    }
}

export default KLayout