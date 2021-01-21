import { useState } from 'react'
import { Layout } from 'antd'
import SidebarMenu from '../SidebarMenus/SidebarMenu'
import KBreadcrumbs from '../Breadcrumbs/index'
import { Scrollbars } from 'react-custom-scrollbars'
import {CopyrightCircleOutlined} from '@ant-design/icons'
import moment from 'moment'
import styles from './Container.css'

const { Content, Footer } = Layout

export default (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [theme, setTheme] = useState('dark');
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
                    <div>
                        <Content className={styles.content}>
                            {props.children}
                        </Content>
                    </div>
                </Scrollbars>
                <Footer className={styles.footer}>
                    <CopyrightCircleOutlined />KSNL {moment().year()}
                </Footer>
            </Layout>
        </Layout>
    );
}