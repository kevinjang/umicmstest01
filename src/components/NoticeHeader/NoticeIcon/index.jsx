import { Spin, Tabs, Badge } from 'antd';

const {TabPane} = Tabs;

import { BellOutlined } from '@ant-design/icons';
import classnames from 'classnames'

import useMergeValue from 'use-merge-value';
import HeaderDropdow from '../HeaderDropdown/index'

const NoticeIcon = (props)=>{
    const { loading, className, onItemClick, bell, clearText } = props;
    const getNotificationBox = () => {
        const {children, onClear, viewMoreText, onViewMore } = props;
        const panes = [];

    }

    return <HeaderDropdow {...props}>
    </HeaderDropdow>
}

export default NoticeIcon;