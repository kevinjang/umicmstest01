import React from 'react'
import { Layout, Menu, Icon, Tabs } from 'antd'
import { connect } from 'dva'
import { Route } from 'react-router';
import {asyncComponent} from '../utils/asyncComponent'
// import path from 'path'
// const {path} = require('path')
import './MainFrame.css'

import {setAxios} from '../utils/setaxios'

const { Header, Footer, Sider, Content } = Layout
const { Item, SubMenu } = Menu
const { TabPane } = Tabs

@connect(
    state => ({ menus: state.menus })
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

        // console.log('ac', asyncComponent)
    }

    menuItemClick = (e) => {
        // console.log('menuItemClick', e)
        this.setState({
            // selectedTabKeys:[e.key]
            activeTabKey: e.key
        })

        // console.log('this.state.seletedTabKeys', this.state.seletedTabKeys)
        let allMenus = [].concat(...this.props.menus)
        this.props.menus.map(item => {
            if (item.children) {
                // console.log(item.children)
                allMenus = allMenus.concat(...item.children)
            }
        })

        // console.log(allMenus)
        const selectedExists = this.state.openTabs.find(item => item.id === e.key)
        if (!selectedExists) {
            const selectedTab = allMenus.find(item => item.id === e.key);
            // console.log(selectedTab)
            this.setState({
                openTabs: [...this.state.openTabs, selectedTab]
            })
        }
    }

    tabItemChange = (e) => {
        // console.log(e)
        this.setState({
            activeTabKey: e
        })
    }

    tabItemEdit = (e) => {
        // console.log('tabItemEdit', e)
        // 获取打开的倒数第二个id并设定activeTabKey
        if (this.state.openTabs.length > 1) {
            let id = this.state.openTabs[this.state.openTabs.length - 2].id
            this.setState({
                activeTabKey: id
            })
        }
        // 将当前活动的tab移除
        let openedtabs = this.state.openTabs;
        // console.log('openedtabs', openedtabs)
        let itemIndex = openedtabs.findIndex(rc => rc.id === e);
        if (itemIndex > -1) {
            // openedtabs.splice()
            openedtabs.splice(itemIndex, 1)
            // console.log('openedtabs', openedtabs)
            this.setState({
                openTabs: openedtabs
            })
        }
    }

    componentDidMount() {
        setAxios();
        // console.log('this.state.openTabs', this.state.openTabs)
    }

    loadTest = (e) => {
        const st = asyncComponent(()=>import(e))
        // console.log('st',st)
        return st
    }


    render() {
        return <Layout>
            <Header style={{ color: 'white', fontSize: '32px' }}>
                <Icon type="chrome" theme="filled" />
                <span>导航</span>
            </Header>

            <Layout>
                <Sider width={200} style={{ minHeight: '92.5vh', color: 'white', paddingTop: 16 }}>
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
                                        return <Item key={cItem.id} onClick={this.menuItemClick}>
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
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: "24px", background: "#fff" }}  
                            className="card-container">
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
                                                <Route component={this.loadTest('./dashboard/dashboard')}></Route>
                                            </Content>
                                            {/* {this.props.children} */}
                                        </TabPane>
                                    })}
                                </Tabs>
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'left', backgroundColor: 'whitesmoke' }}>
                        <Icon type="copyright">  </Icon>KSNL
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    }
}

export default KLayout