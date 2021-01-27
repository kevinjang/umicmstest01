import { Layout, Row, Col, Button, Menu } from 'antd'
import styles from './Header.css'
import { ChromeFilled, SettingFilled } from '@ant-design/icons'
const { Header } = Layout;

import GlobalHeaderDropdown from '../NoticeHeader/GlobalHeader/NoticeIconView'
import UserInfo from '../../pages/User/UserInfo'
import CustomDrawer from '../Drawer/index'
import classNames from 'classnames'
import useSizeRef from 'use-size-ref'
import { UserContext } from '../../pages/UserContextMock'
import antStyles from 'antd/dist/antd.css'

import BannerDocker from './BannerDocker'

const GlobalHeader = (props) => {
    const headerStyle = classNames(styles.headerRoot, {
        color: 'white'
    });
    const colClass = classNames(styles.bannerDock, antStyles["ant-col-8"])
    console.log('colClass:', colClass)
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

                // console.log("header size info:", {width, height})
                console.log('theme:', value.theme)
                return (
                    <div ref={headerContext} className={styles.bannerContent}>
                        <Header className={styles.header}>
                            <span> <ChromeFilled />导航</span>
                            {/* <Menu mode={"horizontal"} style={{ width: '90%' }} theme={value.theme} direction={"rtl"}>
                                <Menu.Item style={{ float: 'right',marginRight: '0' }}><CustomDrawer /> </Menu.Item>
                                <Menu.Item style={{ float: 'right' }}><UserInfo /></Menu.Item>
                                <Menu.Item style={{ padding: '0 15px', float: 'right' }}><GlobalHeaderDropdown /></Menu.Item>
                            </Menu> */}
                            <div style={{ width: '90%' }}>
                                <BannerDocker style={{ float: 'right' }}>
                                    <span style={{fontSize: '14px', color:'white'}}>
                                    <SettingFilled /> 个人设置
                                    </span>    
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