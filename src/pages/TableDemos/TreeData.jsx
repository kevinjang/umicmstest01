import { Table, Switch, Space, message } from 'antd'
import {useState} from 'react'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        width: '12%',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        width: '30%',
        key: 'address',
    },
];

const data = [
    {
        key: 1,
        name: 'John Brown sr.',
        age: 60,
        address: 'New York No. 1 Lake Park',
        children: [
            {
                key: 11,
                name: 'John Brown',
                age: 42,
                address: 'New York No. 2 Lake Park'
            },
            {
                key: 12,
                name: 'John Brown jr.',
                age: 30,
                address: 'New York No. 3 Lake Park',
                children: [
                    {
                        key: 121,
                        name: 'Jimmy Brown',
                        age: 16,
                        address: 'New York No. 3 Lake Park',
                    },
                ],
            },
            {
                key: 13,
                name: 'Jim Green sr.',
                age: 72,
                address: 'London No. 1 Lake Park',
                children: [
                    {
                        key: 131,
                        name: 'Jim Green',
                        age: 42,
                        address: 'London No. 2 Lake Park',
                        children: [
                            {
                                key: 1311,
                                name: 'Jim Green jr.',
                                age: 25,
                                address: 'London No. 3 Lake Park',
                            },
                            {
                                key: 1312,
                                name: 'Jimmy Green sr.',
                                age: 18,
                                address: 'London No. 4 Lake Park',
                            },
                        ],
                    },
                ],
            },
        ]
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows)=>{
        message.info(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect:(record, selected, selectedRows)=>{
        message.info(record, selected, selectedRows);
    },
    onSelectAll:(selected, selectedRows, changeRows)=>{
        message.info(selected, selectedRows, changeRows);
    }
}

function TreeData() {
    const [checkStrictly,setCheckStrictly] = useState(false);
    return (
        <>
            <Space align="center" style={{marginBottom: '16px'}}>
                CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly}></Switch>
            </Space>
            <Table 
                columns={columns}
                rowSelection={{...rowSelection, checkStrictly}}
                dataSource={data}>

            </Table>
        </>
    )
}

export default ()=>{
    return (
        <TreeData />
    )
}