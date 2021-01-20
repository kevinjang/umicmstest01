
import { groupBy } from 'lodash';
import { connect } from 'umi'
import moment from 'moment'
import { message, Tag } from 'antd'
import NoticeIcon from '../NoticeIcon/index'

class GlobalHeaderDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch({
                type: 'global/fetchNotices'
            })
        }
    }

    getNoticeData = () => {
        const { notices = [] } = this.props
        if (!notices || notices.length === 0 || !Array.isArray(notices)) {
            return {}
        }

        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }

            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold'
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                )
            }

            return newNotice;
        });

        return groupBy(newNotices, 'type');
    }

    getUnreadMsg = (noticeData) => {
        const unreadMsg = {};
        Object.keys(noticeData).forEach(key => {
            const value = noticeData[key];
            if (!unreadMsg[key]) {
                unreadMsg[key] = 0;
            }

            if (Array.isArray(value)) {
                unreadMsg[key] = value.filter(item => !item.read).length;
            }
        });

        return unreadMsg;
    }

    changeReadState = (item) => {
        const { id } = item;
        const { dispatch } = this.props;
        if (dispatch) {
            dispatch({
                type: 'global/changeNoticeReadState',
                payload: id
            })
        }
    }

    clearNotices = (title, key) => {
        const {dispatch} = this.props;
        if(dispatch){
            dispatch({
                type: 'global/clearNotices',
                payload: key
            })
            message.success(`清空了${title}`);
        }
    }

    render() {
        const noticeData = this.getNoticeData();
        const unreadMsg = this.getUnreadMsg(noticeData);

        return <NoticeIcon
            style={{ height: '500px' }}
            onClear={this.clearNotices}
            onItemClick={item => this.changeReadState(item)}>
            <NoticeIcon.Tab
                tabKey="notification"
                title="通知"
                list={noticeData.notification}
                count={unreadMsg.notification}
            >
            </NoticeIcon.Tab>
            <NoticeIcon.Tab
                tabKey={"message"}
                title="消息"
                list={noticeData.message}
                count={unreadMsg.message}
            ></NoticeIcon.Tab>
            <NoticeIcon.Tab
                tabKey="event"
                title="待办"
                list={noticeData.event}
                count={unreadMsg.event}
            ></NoticeIcon.Tab>
        </NoticeIcon>
    }
}

export default connect(({ global, loading }) => ({
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices
}))(GlobalHeaderDropdown);
