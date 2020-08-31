import React from 'react'
import { Layout, Icon, Spin, Breadcrumb } from 'antd'
import { connect } from 'dva';
import { BrowserRouter, Switch } from 'react-router-dom'
import { asyncComponent } from '../utils/asyncComponent'
import styles from './MainFrame.css'

import UserInfo from './user/userInfo'

const { Header, Footer, Content } = Layout
// const { Item, SubMenu } = Menu

import Notification from './Notification/Notification'

import { UserContext, GetData, MyUserData } from './UserContextMock';

import { Scrollbars } from 'react-custom-scrollbars'

// import Loadable from 'react-loadable';

import GlobalHeaderDropdown from '../components/GlobalHeader/NoticeIconView'

import { CopyrightCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
// const UserContextMock = UserContext

import SidebarMenu from '@/components/SidebarMenus/SidebarMenu'

import { Route, Link, useRouteMatch, Router } from 'umi'

import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { find, flatMapDeep } from 'lodash'

import { createBrowserHistory } from 'history'

@connect(
    state => ({
        menus: state.menus,
        ERColumns: state.ERColumns
    })
)
class KLayout extends React.Component {
    constructor(props) {
        super(props)
        // this.breadcrumbs = props.breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'chrome' }];
        this.state = {
            collapsed: false,
            selectedKeys: ['1'],
            theme: 'dark',
            spinning: false,
            textAlign: 'center',
            paddingTop: '25%',
            pathname: './Index',
            breadcrumbs: props.breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'chrome' }]
            // linkArrForBreadCrumb: [{ title: 'KSNL', level: 0, icon: 'chrome' }]
        }
    }

    menuItemClick = (item) => {
        const pathname = item.nodeInfo;

        this.setState({
            pathname
        })
    }

    componentWillMount() {
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

    componentDidMount(){
        this.setState({
            breadcrumbs: this.props.breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'chrome' }]
        })
    }

    getBreadcrumbs = (item) => {
        let path = item.match.path;
        if (path === '/') {
            return <Breadcrumb.Item>
                <Icon type='chrome' />KSNL
            </Breadcrumb.Item>
        }

        if (path === '/mainframe') {
            return <Breadcrumb.Item>
                <Icon type="mail" />主页
            </Breadcrumb.Item>
        }

        const matchArr = path.split('/');
        const lastMatch = matchArr[matchArr.length - 1];

        const itemY = find(flatMapDeep(this.props.menus, 'children'), (xItem) => {
            return xItem.urlPath === lastMatch;
        })

        return <Breadcrumb.Item>
            <Icon type={itemY.icon} />{itemY.title}
        </Breadcrumb.Item>
    }

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
                        <Layout style={{ height: '100vh' }}>
                            <Header className={styles.bannerHeader}>
                                <Icon type="chrome" theme="filled" />
                                <span>导航</span>
                                <div className={styles.userInfoNode}>
                                    <div style={{ float: 'left', marginTop: '-10px' }}>
                                        <GlobalHeaderDropdown />
                                    </div>
                                    <UserInfo className={styles.bannerHeaderUserInfo}></UserInfo>
                                </div>
                            </Header>

                            <Layout className={styles.sidebarLayout}>
                                <SidebarMenu width={200}
                                    className={styles.siderbar}
                                    theme={this.state.theme}
                                    collapsible
                                    menus={this.props.menus}
                                    menuMode={'inline'}
                                    menuCollapsed={this.state.collapsed} />
                                <Layout className={styles.contentLayout}>
                                    <Breadcrumb separator={"/"} style={{ paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                        {
                                            this.state.breadcrumbs.map(item => {
                                                return this.getBreadcrumbs(item);
                                            })
                                        }
                                    </Breadcrumb>
                                    <Scrollbars>
                                        <Content className={styles.content} style={{ minHeight: 'calc(100vh - 153px)' }}>
                                            {this.props.children}
                                        </Content>
                                    </Scrollbars>
                                    <Footer className={styles.footer}>
                                        <CopyrightCircleOutlined />KSNL {moment().year()}
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
export default withBreadcrumbs()(KLayout);