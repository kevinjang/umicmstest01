import { Table, Layout, Card, PageHeader, Avatar, Divider } from 'antd'
import { UserOutlined, OrderedListOutlined } from '@ant-design/icons'

const { Content } = Layout

const UserManagement = () => {
    const columns = [
        { key: 1, name: 'userName', width: '50px', title: '用户名' }
    ]
    return (
        <div>
            <Table columns={columns} size={"small"} title={(currentPageData)=>{
                return (
                    <div>
                        <OrderedListOutlined/>
                        <Divider type="vertical"/>
                        "用户列表"
                    </div>
                );
            }}></Table>
        </div>
    )
}

export default UserManagement