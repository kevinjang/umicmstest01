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
            theme: 'dark',
            spinning: false,
            textAlign: 'center',
            paddingTop: '25%',
            pathname: './Index',
            linkArrForBreadCrumb: [{ title: 'KSNL', level: 0, icon: 'chrome' }]
        }
    }

    getTrace = (item) => {
        // console.log('getTrace item:', item)
        let parentItem = null;
        let { linkArrForBreadCrumb } = this.state;
        // console.log('getTrace linkArrForBreadCrumb:', linkArrForBreadCrumb)
        const menus = this.props.menus;
        let dealed = false;
        for (let i = 0; i < menus.length; i++) {
            parentItem = menus[i];

            // console.log('getTrace parentItem:', parentItem);

            if (parentItem.children) {
                for (let j = 0; j < parentItem.children.length; j++) {
                    if (parentItem.children[j].id === item.id) {
                        let secondLink = {
                            title: parentItem.title,
                            level: 1,
                            icon: parentItem.icon
                        };

                        // console.log('parentItem.children[j].id:', parentItem.children[j]);
                        // console.log('linkArrForBreadCrumb.slice(0):', linkArrForBreadCrumb.slice(0));

                        linkArrForBreadCrumb = linkArrForBreadCrumb.slice(0, 1);
                        linkArrForBreadCrumb.push(secondLink);

                        let thirdLink = {
                            title: item.title,
                            level: 2,
                            icon: item.icon
                        }

                        linkArrForBreadCrumb.push(thirdLink);

                        dealed = true;

                        this.setState({
                            linkArrForBreadCrumb
                        });

                        break;
                    }
                }
            }

            if (dealed) {
                break;
            }
        }
    }

    menuItemClick = (item) => {
        const pathname = item.nodeInfo;

        this.getTrace(item);

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

    render() {
        document.title = 'KSNL';
        // const linkss = [
        //     { text: 'KSNL',level: 0 },
        //     { text: 'HaHa', level: 1 },
        //     { text: 'MainFrame', level: 2 }
        // ]
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
                                                {/* {console.log('this.props.menus:', this.props.menus)} */}
                                                {this.props.menus.map(item => {
                                                    if (item.children)
                                                        return <SubMenu key={item.id} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                                                            {item.children.map(cItem => {
                                                                return <Item key={cItem.id + '_' + cItem.nodeInfo}>
                                                                    <Icon type={cItem.icon}></Icon>
                                                                    <span><Link style={{ color: 'white' }} to={cItem.urlPath} key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath} onClick={() => this.menuItemClick(cItem)}> {cItem.title}</Link></span>
                                                                </Item>
                                                            })}
                                                        </SubMenu>
                                                    else
                                                        return <Item key={item.id}>
                                                            <Icon type={item.icon}></Icon>
                                                            <span><Link style={{ color: 'white' }} to={cItem.urlPath} key={cItem.id + '_' + cItem.nodeInfo + '_' + cItem.urlPath} onClick={() => this.menuItemClick(cItem)}> {cItem.title}</Link></span>
                                                        </Item>
                                                })}
                                            </Menu>
                                        </BrowserRouter>
                                    </Scrollbars>
                                </Sider>
                                <Layout className={styles.contentLayout}>
                                    <Breadcrumb style={{ paddingLeft: '10px', paddingTop: '10px', paddingBottom: '10px' }}>
                                        {this.state.linkArrForBreadCrumb.map((item) => {
                                            return <Breadcrumb.Item>{<Icon type={item.icon} />} {item.title}</Breadcrumb.Item>
                                        })}
                                    </Breadcrumb>
                                    <Scrollbars>
                                        <Content className={styles.content} style={{minHeight: 'calc(100vh - 153px)'}}>
                                            {/**Content的style必须这么写，不然就会被css的优先级干掉，无法正常显示高度 */}
                                            <LoadableComponent />
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
export default KLayout