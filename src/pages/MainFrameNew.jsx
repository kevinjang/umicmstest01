import React, { useState, useEffect } from 'react'
import { Layout, Row, Space, Spin, Col, ConfigProvider } from 'antd'
import { connect } from 'umi'
import styles from './MainFrame.css'
import { UserContext, GetData } from './UserContextMock';
import zhCN from 'antd/lib/locale/zh_CN'
import GlobalHeader from '../components/LayoutHeader/Header'
import GlobalContainer from '../components/LayoutContianer/Container'
import useSizeRef from 'use-size-ref'

import classNames from 'classnames'

const KLayoutY = (props) => {
    // const [collapsed, setCollapsed] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState('1');
    // const [theme, setTheme] = useState('dark');
    const [spinning, setSinning] = useState(false);
    const [textAlign, setTextAlign] = useState('center');
    const [paddingTop, setPaddingTop] = useState('25%');
    const [pathname, setPathname] = useState('./Index');
    const [MyUserData, setMyUserData] = useState({});
    const [breadcrumbs, setBreadcrumbs] = useState({});

    const [fullRef, { width, height }] = useSizeRef();

    useEffect(() => {
        if (window.location.pathname === '/') {
            history.go('/login')
        }
        setSinning(true);
        GetData("zhanghaoming").then(({ UserContext, MyUserData }) => {
            setSinning(false);
            setTextAlign('initial');
            setPaddingTop('0');
            setMyUserData(MyUserData);
        });

        // const {routes} = config;
        const { breadcrumbs } = props;
        setBreadcrumbs(breadcrumbs || [{ title: 'KSNL', level: 0, icon: 'Chrome' }]);
    }, []);

    const root = classNames(styles.root, {
        'text-align': textAlign,
        'padding-top': paddingTop
    })

    return (
        <div className={root} ref={fullRef}>
            <ConfigProvider locale={zhCN} >
                <Spin spinning={spinning && !UserContext} size="large">
                    {UserContext &&
                        <UserContext.Provider value={MyUserData}>
                            <Layout id={"right-part"} style={{ height: '100vh', backgroundColor: 'lightgreen' }}>
                                <GlobalHeader MyUserData={MyUserData} />
                                <GlobalContainer {...props} />
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