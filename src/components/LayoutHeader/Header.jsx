import { Layout, Row, Col } from 'antd'
import styles from './Header.css'
import { ChromeFilled } from '@ant-design/icons'
const { Header } = Layout;

import GlobalHeaderDropdown from '../NoticeHeader/GlobalHeader/NoticeIconView'
import UserInfo from '../../pages/user/UserInfo'
import classNames from 'classnames'
import useSizeRef from 'use-size-ref'
import { UserContext } from '../../pages/UserContextMock'

const GlobalHeader = (props) => {
    const headerStyle = classNames(styles.header, {
        color: 'white'
    });
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

                console.log("header size info:", {width, height})
                return (
                    <div ref={headerContext}>
                        <Header className={headerStyle}>
                            <ChromeFilled />
                            <span>导航</span>
                            <div className={styles.userInfoNode}>
                                <div className={styles.innerContainer}>
                                    <Row gutter={8} justify="center">
                                        <Col span={8} className={styles.bannerDock}>
                                            <GlobalHeaderDropdown />
                                        </Col>
                                        <Col span={16} className={styles.bannerDock}>
                                            <UserInfo />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Header>
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}

export default GlobalHeader