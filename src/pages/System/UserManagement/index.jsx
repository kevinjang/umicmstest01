import { Table, Layout, Card, PageHeader, Avatar } from 'antd'
import {UserOutlined} from '@ant-design/icons'

const { Content } = Layout

const UserManagement = () => {
    const columns = [
        { key: 1, name: 'userName', width: '50px', title: '用户名' }
    ]
    return (
        <div>
            <Card title={"用户列表"} bordered={false} size={"small"}>
                <Table columns={columns} size={"small"}></Table>
            </Card>

            <PageHeader title={"用户列表"} avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>}>
                <Table columns={columns} size={"small"}></Table>
            </PageHeader>
        </div>
    )
}

export default UserManagement