import { Table, Layout, Card, PageHeader, Avatar, Divider } from 'antd'
import { UserOutlined, OrderedListOutlined } from '@ant-design/icons'
import styles from './index.css'

const { Content } = Layout

const UserManagement = () => {
    const columns = [
        {
            key: 1, dataIndex: 'loginUserName', width: '50px', title: () => {
                return <div className={styles.headerTitle}>
                    登录用户名
            </div>
            }
        },
        {
            key: 2, dataIndex: 'userName', width: '50px', title: () => {
                return <div className={styles.headerTitle}>
                    姓名
            </div>
            }
        },
        {
            key: 3, dataIndex: 'gender', width: '25px', title: () => {
                return <div className={styles.headerTitle}>
                    性别
                </div>
            }, render: (value) => {
                return value;
            }
        }
    ];

    const data = [
        {
            key: 1,
            dataIndex: 1,
            loginUserName: 'user1',
            userName: '第一位用户',
            gender: 'male'
        }
    ]

    return (
        <div>
            <Table columns={columns} size={"small"} dataSource={data}
                title={(currentPageData) => {
                    return (
                        <div>
                            <OrderedListOutlined />
                            <Divider type="vertical" />
                        "用户列表"
                        </div>
                    );
                }} footer={() => {
                    return 'footer'
                }}></Table>
        </div>
    )
}

export default UserManagement