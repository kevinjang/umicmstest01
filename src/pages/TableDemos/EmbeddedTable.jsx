import { Table, Badge, Menu, Dropdown, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const menu = (
    <Menu>
        <Menu.Item >Action 1</Menu.Item>
        <Menu.Item >Action 2</Menu.Item>
    </Menu>
);

function NestedTable() {
    const expandedRowRender = () => {
        const columns = [
            {
                title: 'Date', dataIndex: 'date', key: 'date'
            },
            {
                title: 'Name', dataIndex: 'name', key: 'name'
            },
            {
                title: 'Status',
                key: 'status',
                render: (record, x, index) => {
                    // console.log('record:',record,',index:', index, ',x:', x)
                    return <span>
                        <Badge status={index%2 === 0?"success": "processing"}>
                            {index%2 === 0?"Finished": <span style={{color: 'lightsteelblue', fontStyle: 'underline'}}>Processing</span> }
                        </Badge>
                    </span>
                }
            },
            {
                title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum'
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => {
                    return <Space size="middle">
                        <a >Pause</a>
                        <a >Stop</a>
                        <Dropdown overlay={menu}>
                            <a>
                                More <DownOutlined />
                            </a>
                        </Dropdown>
                    </Space>
                }
            }
        ];

        const data = [];
        for (let i = 0; i < 3; i++) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56'
            });
        }

        return <Table columns={columns} dataSource={data} pagination={false}></Table>
    }

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Platform', dataIndex: 'platform', key: 'platform' },
        { title: 'Version', dataIndex: 'version', key: 'version' },
        { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
        { title: 'Creator', dataIndex: 'creator', key: 'creator' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        { title: 'Action', key: 'operation', render: () => <a>Publish</a> }
    ];

    const data = [];
    for (let i = 0; i < 3; i++) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00'
        });
    }

    return <Table columns={columns} dataSource={data} expandable={{
        expandedRowRender
    }}></Table>
}

export default NestedTable;