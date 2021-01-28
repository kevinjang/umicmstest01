import { Table, Layout, Card } from 'antd'

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
        </div>
    )
}

export default UserManagement