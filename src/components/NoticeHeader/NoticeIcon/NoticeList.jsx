import { List, Avatar } from 'antd'
import { MailOutlined, MailFilled, BorderTopOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import styles from './NoticeList.less'

const NoticeList = (props) => {
    const {
        list = [], // 数据
        title,
        showClear = true,
        onClick,
        onClear
    } = props;


    return <div>
        <List style={{ overflow: 'auto' }} className={styles.list}
            dataSource={list} renderItem={
                (item) => {
                    const itemCls = classNames(styles.item, {
                        [styles.read]: item.read
                    })

                    return (
                        <List.Item className={itemCls} onClick={() => onClick && onClick(item)}>
                            <List.Item.Meta className={styles.meta} avatar={item.avatar ? <Avatar src={item.avatar} className={styles.avatar} /> : null}
                                title={
                                    <div className={styles.title}>
                                        {item.title}
                                        <div className={styles.extra}>{item.extra}</div>
                                    </div>
                                }
                                description={
                                    <div>
                                        <div className={styles.description}>{item.description}</div>
                                        <div className={styles.datetime}>{item.datetime}</div>
                                    </div>
                                }>

                            </List.Item.Meta>
                        </List.Item>
                    )
                }
            }>
            {/* List.Item的点击事件来触发dispatch（effects）去修改数据然后dispatch（reducer）去更新数据源，数据修改后会触发List的renderItem事件，更新界面。 */}

        </List>
        <div className={styles.bottomBar}>
            {
                showClear ? <div onClick={onClear}>清空 {title}</div> : null
            }
            {/* style={{width: '50%', textAlign: 'center',padding:'10px', borderRight: '1px solid lightgray'}} */}
            <div >查看更多</div>
            {/* style={{width: '50%',padding:'10px',textAlign: 'center'}} */}
        </div>
    </div>
}

export default NoticeList;