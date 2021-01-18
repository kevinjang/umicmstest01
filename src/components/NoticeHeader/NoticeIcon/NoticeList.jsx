import { List, Avatar } from 'antd'
import { MailOutlined, MailFilled } from '@ant-design/icons'

const NoticeList = (props) => {
    const {
        list = [] // 数据
    } = props

    const avatar = 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
    return <div>
        <List style={{ overflow: 'auto' }}>
            <List.Item >
                <List.Item.Meta avatar={<Avatar src={avatar} />} title="test list item meta - title" description="test list item meta - description">
                </List.Item.Meta>
            </List.Item>
        </List>
    </div>
}

export default NoticeList;