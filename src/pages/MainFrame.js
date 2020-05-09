import React from 'react'
import { Layout, Menu, Icon, Spin, Breadcrumb } from 'antd'
import { connect } from 'dva';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { asyncComponent } from '../utils/asyncComponent'
import styles from './MainFrame.css'

import UserInfo from './user/userInfo'

const { Header, Footer, Sider, Content } = Layout
const { Item, SubMenu } = Menu

import Notification from './Notification/Notification'

import { UserContext, GetData, MyUserData } from './UserContextMock';

import { Scrollbars } from 'react-custom-scrollbars'

import Loadable from 'react-loadable';

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
            paddingTop: '25%',
            pathname: './Index'
        }
    }

    // menuItemClick = (e,x) => {
    //     console.log('menuItemClick-x:', x);

    //     const id = e.key.split('_')[0]

    //     // const blockUrl = e.key.split('_')[1]

    //     // 此处防止反复点击同一菜单时页面闪烁
    //     if (this.state.activeTabKey !== id)
    //         this.setState({
    //             activeTabKey: id
    //         })

    //     let allMenus = [].concat(...this.props.menus)
    //     this.props.menus.map(item => {
    //         if (item.children) {
    //             allMenus = allMenus.concat(...item.children)
    //         }
    //     })

    //     const selectedExists = this.state.openTabs.find(item => item.id === id)
    //     if (!selectedExists) {
    //         const selectedTab = allMenus.find(item => item.id === id);
    //         this.setState({
    //             openTabs: [...this.state.openTabs, selectedTab]
    //         })
    //     }
    // }

    menuItemClick = (item) => {
        console.log('menuItemClick-item:', item);

        // const id = item.id; //e.key.split('_')[0]

        // const blockUrl = e.key.split('_')[1]

        // 此处防止反复点击同一菜单时页面闪烁
        // if (this.state.activeTabKey !== id)
        //     this.setState({
        //         activeTabKey: id
        //     })

        // let allMenus = [].concat(...this.props.menus)
        // this.props.menus.map(item => {
        //     if (item.children) {
        //         allMenus = allMenus.concat(...item.children)
        //     }
        // })

        // const selectedExists = this.state.openTabs.find(item => item.id === id)
        // if (!selectedExists) {
        //     const selectedTab = allMenus.find(item => item.id === id);
        //     this.setState({
        //         openTabs: [...this.state.openTabs, selectedTab]
        //     })
        // }

        const pathname = item.nodeInfo;

        this.setState({
            pathname
        })
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


        const LoadableComponent = Loadable({
            loader: () => import(`${this.state.pathname}`),
            loading: () => <div>{'loading'}</div>
        })

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
                            <Header className={styles.bannerHeader}>
                                <Icon type="chrome" theme="filled" />
                                <span>导航</span>
                                <div className={styles.userInfoNode}>
                                    <Notification></Notification>
                                    <UserInfo className={styles.bannerHeaderUserInfo}></UserInfo>
                                </div>
                            </Header>

                            <Layout className={styles.sidebarLayout}>
                                <Sider
                                    width={200}
                                    className={styles.siderbar}
                                    theme={this.state.theme}
                                    collapsible>
                                    <Scrollbars>
                                        <BrowserRouter>
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
                                                                return <Item key={cItem.id + '_' + cItem.nodeInfo}>
                                                                    <Icon type={cItem.icon}></Icon>
                                                                    {/* {console.log(cItem.urlPath+ '_' + cItem.id)} */}
                                                                    <span><Link style={{color: 'white'}} to={cItem.urlPath} key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath} onClick={()=>this.menuItemClick(cItem)}> {cItem.title}</Link></span>
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
                                        </BrowserRouter>
                                    </Scrollbars>
                                </Sider>
                                <Layout className={styles.contentLayout}>
                                    <Scrollbars>
                                        <Content className={styles.content}>
                                            <div>
                                                <LoadableComponent />
                                            </div>
                                        </Content>
                                    </Scrollbars>
                                    <Footer className={styles.footer}>
                                        <Icon type="copyright">  </Icon>KSNL
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

function Home() {
    return <h2>Home</h2>;
}
function About() {
    return <h2>About</h2>;
}
export default KLayout