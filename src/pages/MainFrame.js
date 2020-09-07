import React from 'react'
import { Layout, Spin } from 'antd'
import { connect } from 'umi'
import styles from './MainFrame.css'
import UserInfo from './user/userInfo'
const { Header, Footer, Content } = Layout
import { UserContext, GetData, MyUserData } from './UserContextMock';
import { Scrollbars } from 'react-custom-scrollbars'
import GlobalHeaderDropdown from '../components/GlobalHeader/NoticeIconView'
import { CopyrightCircleOutlined, ChromeFilled } from '@ant-design/icons'
import moment from 'moment'
import SidebarMenu from '@/components/SidebarMenus/SidebarMenu'
import KBreadcrumbs from '@/components/Breadcrumbs/'

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
            pathname: './Index'
        }
    }

    componentWillMount() {
        if(window.location.pathname === '/'){
            history.go('/login')
        }
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
        console.log('menus:', this.props.menus)
        this.setState({
            breadcrumbs: this.props.breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'Chrome' }]
        })
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
                                {/* <Icon type="chrome" theme="filled" /> */}
                                <ChromeFilled />
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
                                    // menus={this.props.menus.menus}
                                    menuMode={'inline'}
                                    menuCollapsed={this.state.collapsed} />
                                <Layout className={styles.contentLayout}>
                                    <KBreadcrumbs />
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

const KLayoutX = connect(({ login, menus, ERColumns }) => ({
    login, menus, ERColumns
}))(KLayout)

export default KLayoutX;