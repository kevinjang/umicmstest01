import { Layout, Row, Col, Button, Menu } from 'antd'
import styles from './Header.css'
import { ChromeFilled, SettingFilled } from '@ant-design/icons'
const { Header } = Layout;

import GlobalHeaderDropdown from '../NoticeHeader/GlobalHeader/NoticeIconView'
import UserInfo from '../../pages/User/UserInfo'
import CustomDrawer from '../Drawer/index'
import useSizeRef from 'use-size-ref'
import { UserContext } from '../../pages/UserContextMock'

import BannerDocker from './BannerDocker'

const GlobalHeader = (props) => {
    const [headerContext, { width, height }] = useSizeRef();
    return (
        <UserContext.Consumer>
            {value => {
                value.sizeInfo = {
                    ...value.sizeInfo,
                    header: {
                        width,
                        height
                    }
                }

                return (
                    <div ref={headerContext} className={styles.bannerContent}>
                        <Header className={styles.header}>
                            <span> <ChromeFilled />导航</span>
                            <div style={{ width: '90%' }}>
                                <BannerDocker style={{ float: 'right', color: 'white', fontSize: '16px' }}>
                                    <CustomDrawer />
                                </BannerDocker>
                                <BannerDocker style={{ float: 'right' }}>
                                    <UserInfo />
                                </BannerDocker>
                                <BannerDocker mode="horizontal" style={{ float: 'right' }}>
                                    <GlobalHeaderDropdown />
                                </BannerDocker>
                            </div>
                        </Header>
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}

export default GlobalHeader