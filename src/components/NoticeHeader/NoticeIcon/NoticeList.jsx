import { List, Avatar } from 'antd'
import { MailOutlined, MailFilled } from '@ant-design/icons'
import classNames from 'classnames'
import styles from './NoticeList.less'

const NoticeList = (props) => {
    const {
        list = [], // 数据
    } = props;

    const changeRead = (item) => {
        // console.log('before read:', itemCls)
        item.read = true;
        // console.log('after read:', itemCls)
    }

    const avatar = 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png'
    const data = [
        {
            key: 1,
            avatar,
            title: 'test list item meta - title1',
            description: '3 years ago',
            read: false
        },
        {
            key: 2,
            avatar,
            title: 'test list item meta - title2',
            description: '4 years ago',
            read: true
        }
    ]

    return <div>
        <List style={{ overflow: 'auto' }} className={styles.list}
            dataSource={data} renderItem={
                (item) => {
                    const itemCls = classNames(styles.item, {
                        [styles.read]: item.read
                    })

                    return (
                        <List.Item className={itemCls} onClick={changeRead}>
                            <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description}>

                            </List.Item.Meta>
                        </List.Item>
                    )
                }
            }>
            {/* List.Item的点击事件来触发dispatch（effects）去修改数据然后dispatch（reducer）去更新数据源，数据修改后会触发List的renderItem事件，更新界面。 */}
            
        </List>
    </div>
}

export default NoticeList;