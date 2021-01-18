import { List } from 'antd'
import { MailOutlined, MailFilled } from '@ant-design/icons'

const NoticeList = (props) => {
    const {
        list = [] // 数据
    } = props

    return <div>
        <List style={{ overflow: 'auto' }}>
            <List.Item >
                <List.Item.Meta avatar={<MailOutlined />} title="test list item meta - title" description="test list item meta - description">
                </List.Item.Meta>
            </List.Item>
        </List>
    </div>
}

export default NoticeList;