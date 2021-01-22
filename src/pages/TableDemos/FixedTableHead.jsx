import { Table } from 'antd'
import { UserContext } from '../UserContextMock'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        width: 150,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        width: 150,
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default () => {
    return (
        <UserContext.Consumer>
            {value => {
                const { sizeInfo } = value;
                if (sizeInfo) {
                    const { header, content, footer, full } = sizeInfo;
                    console.log('sizeInfo:', sizeInfo)

                }
                const y = (value && value.sizeInfo && value.sizeInfo.content && value.sizeInfo.content['height']) || 240;
                return (
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: `${y}px` }} />
                )
            }}
        </UserContext.Consumer>
    );
}