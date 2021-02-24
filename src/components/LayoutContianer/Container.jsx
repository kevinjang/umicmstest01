import { useState } from 'react'
import { Layout } from 'antd'
import SidebarMenu from '../SidebarMenus/SidebarMenu'
import KBreadcrumbs from '../Breadcrumbs/index'
import { Scrollbars } from 'react-custom-scrollbars'
import { CopyrightCircleOutlined } from '@ant-design/icons'
import moment from 'moment'
import useSizeRef from 'use-size-ref'
// import styles from './Container.css'
import styles from './Container.scss'
import { UserContext } from '../../pages/UserContextMock'

const { Content, Footer } = Layout

export default (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');

    const [contentRef, { width, height }] = useSizeRef();
    const [footerRef, { width: footerWidth, height: footerHeight }] = useSizeRef();

    return (
        <UserContext.Consumer>
            {value => {
                value.sizeInfo = {
                    ...value.sizeInfo,
                    content: {
                        width,
                        height
                    },
                    footer: {
                        width: footerWidth,
                        height: footerHeight
                    }
                }
                // console.log('Container Context value & width & height:', value, width, height);

                return (
                    <Layout className={styles.sidebarLayout}>
                        <SidebarMenu
                            className={styles.sidebar}
                            theme={theme}
                            menuCollapsed={collapsed}
                            menuMode={'inline'}
                            collapsible={true} />
                        <Layout className={styles.contentLayout}>
                            <KBreadcrumbs />
                            <Scrollbars >
                                <div ref={contentRef}>
                                    <Content className={styles.content}>
                                        {props.children}
                                    </Content>
                                </div>
                            </Scrollbars>

                            <div ref={footerRef}>
                                <Footer style={{padding: '15px 50px 20px'}} className={styles.footer}>
                                    <CopyrightCircleOutlined />KSNL {moment().year()}
                                </Footer>
                            </div>
                        </Layout>
                    </Layout>
                )
            }}
        </UserContext.Consumer>
    );
}