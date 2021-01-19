import { Spin, Tabs, Badge } from 'antd';

const { TabPane } = Tabs;

import { BellOutlined } from '@ant-design/icons';
import classnames from 'classnames'

import useMergeValue from 'use-merge-value';
import HeaderDropdown from '../HeaderDropdown/index'
import NoticeList from './NoticeList'

const NoticeIcon = (props) => {
    // console.log({...props})
    const { loading, className, onItemClick, bell, clearText } = props;
    const getNotificationBox = () => {
        const { children, onClear, viewMoreText, onViewMore } = props;
        const panes = [];
        React.Children.forEach(children, child => {
            if (child) {
                const { unread = 4,title } = child.props;
                panes.push(<TabPane tab={`${title}(${unread})`} key={"1"} style={{ width: '300px' }}>
                    <NoticeList style={{ height: '500px', width: '500px' }} {...child.props}>

                    </NoticeList>
                </TabPane>)
            }
        })

        return <Spin delay={300} spinning={false}>
            <Tabs style={{ backgroundColor: 'white', marginTop: '15px' }} centered>
                {panes}
            </Tabs>
        </Spin>
    }

    const [visible, setVisible] = useMergeValue(false,{
        value: undefined,
        onChange: null
    })

    const overlay = getNotificationBox();

    return <HeaderDropdown overlay={overlay} visible={visible} onVisibleChange={setVisible} trigger={['click']} {...props}>
        <span>
            <Badge count={11} size={"small"}>
                <BellOutlined size={"middle"} />
            </Badge>
        </span>
    </HeaderDropdown>
}
NoticeIcon.defaultProps = {
    emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};
NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
