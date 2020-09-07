import NoticeList from './NoticeList'
import HeaderDropdown from '../HeaderDropdown/'
// import {spi} from 'umi'
import { Spin, Tabs, Badge } from 'antd'
const { TabPane } = Tabs
// import { BellOutlined } from '@antd-design/icons'
import {BellOutlined} from '@ant-design/icons'

const NoticeIcon = (props) => {
    const { children, bell } = props;
    const getNoticeListBox = () => {
        const panes = [];
        React.Children.forEach(children, child => {
            const {title} = child.props
            panes.push(
                <TabPane tab={title} key={title}>
                    <NoticeList title={title} />
                </TabPane>
            )
        })
        return (
            <Spin spinning={false}>
                <Tabs>
                    {panes}
                </Tabs>
            </Spin>
        );
    }
    const NoticeBellIcon = bell || <BellOutlined 
    // className={styles.icon}
     />
    const trigger = (
        <span >
            <Badge count={11}
                style={{
                    boxShadow: 'none',
                }}
            // className={styles.badge}
            >
                {NoticeBellIcon}
            </Badge>
        </span>
    )

    const overlay = getNoticeListBox();
    return (
        <HeaderDropdown overlay={overlay} trigger={['click']} >
            {trigger}
        </HeaderDropdown>
    );
}

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
