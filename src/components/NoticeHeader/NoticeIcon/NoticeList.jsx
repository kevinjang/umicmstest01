import { List, Avatar } from 'antd'
import { MailOutlined, MailFilled } from '@ant-design/icons'
import styles from './NoticeList.less'

const NoticeList = (props) => {
    const {
        list = [] // 数据
    } = props;

    console.log('styles:', styles)

    const avatar = 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
    return <div>
        <List style={{ overflow: 'auto' }} className={styles.list} >
            <List.Item className={styles.item}>
                <List.Item.Meta avatar={<Avatar src={avatar} />} title="test list item meta - title1" description="3 years ago">
                </List.Item.Meta>
            </List.Item>
            <List.Item className={styles.item}>
                <List.Item.Meta avatar={<Avatar src={avatar} />} title="test list item meta - title2" description="4 years ago">
                </List.Item.Meta>
            </List.Item>
        </List>
    </div>
}

export default NoticeList;