import React, {useState, useEffect} from 'react'
import { Layout, Row, Space, Spin, Col, ConfigProvider } from 'antd'
import { connect } from 'umi'
import styles from './MainFrame.css'
import UserInfo from './user/UserInfo'
const { Header, Footer, Content } = Layout
import { UserContext, GetData, MyUserData } from './UserContextMock';
import { Scrollbars } from 'react-custom-scrollbars'
// import GlobalHeaderDropdown from '../components/GlobalHeader/NoticeIconView'
import { CopyrightCircleOutlined, ChromeFilled } from '@ant-design/icons'
import moment from 'moment'
import SidebarMenu from '@/components/SidebarMenus/SidebarMenu'
import KBreadcrumbs from '@/components/Breadcrumbs/'
import config from '../../config/config'
import zhCN from 'antd/lib/locale/zh_CN'
import {useSize} from 'use-size-react'
import GlobalHeaderDropdown from '../components/NoticeHeader/GlobalHeader/NoticeIconView'

import GlobalHeader from '../components/LayoutHeader/Header'
import GlobalContainer from '../components/LayoutContianer/Container'

import classNames from 'classnames'

const KLayoutY = (props)=>{
    const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('1');
    const [theme, setTheme] = useState('dark');
    const [spinning, setSinning] = useState(false);
    const [textAlign, setTextAlign] = useState('center');
    const [paddingTop, setPaddingTop] = useState('25%');
    const [pathname, setPathname] = useState('./Index');
    const [MyUserData, setMyUserData] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState({});

    useEffect(()=>{
        if (window.location.pathname === '/') {
            history.go('/login')
        }
        setSinning(true);
        GetData("zhanghaoming").then(({UserContext, MyUserData}) => {
            setSinning(false);
            setTextAlign('initial');
            setPaddingTop('0');
            setMyUserData(MyUserData);
        });

        // const {routes} = config;
        const {breadcrumbs} = props;
        setBreadcrumbs(breadcrumbs ||  [{ title: 'KSNL', level: 0, icon: 'Chrome' }]);
    }, []);

    const root = classNames(styles.root, {
        'text-align': textAlign,
        'padding-top': paddingTop
    })

    return (
        <div className={root}>
            <ConfigProvider locale={zhCN}>
                <Spin spinning={spinning && !UserContext } size="large">
                    {UserContext && 
                        <UserContext.Provider value={MyUserData}>
                            <Layout style={{height:'100vh'}}>
                                <GlobalHeader MyUserData={MyUserData} />
                                <GlobalContainer {...props}/>
                            </Layout>
                        </UserContext.Provider>}
                </Spin>
            </ConfigProvider>
        </div>
    )
}


const KLayoutX = connect(({ login, menus }) => ({
    login, menus
}))(KLayoutY)

export default KLayoutX;