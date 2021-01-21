import { Layout, Row, Col } from 'antd'
import styles from './Header.css'
import { ChromeFilled } from '@ant-design/icons'
const { Header } = Layout;

import GlobalHeaderDropdown from '../NoticeHeader/GlobalHeader/NoticeIconView'
import UserInfo from '../../pages/user/UserInfo'
import classNames from 'classnames'

const GlobalHeader = (props) => {
    const headerStyle = classNames(styles.header, {
        color: 'white'
    });
    return (
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
    )
}

export default GlobalHeader