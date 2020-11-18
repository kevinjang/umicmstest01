import { Table } from 'antd'
import { useState } from 'react'

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
}];

const RowClickSelect = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const selectRow = (record)=>{
        const newSelectedRowKeys = [...selectedRowKeys];
        if(newSelectedRowKeys.indexOf(record.key)>=0){
            newSelectedRowKeys.splice(newSelectedRowKeys.indexOf(record.key), 1);
        }
        else{
            newSelectedRowKeys.push(record.key);
        }

        setSelectedRowKeys(newSelectedRowKeys);
    }

    const onSelectedRowKeysChange = (selectedrowkeys)=>{
        setSelectedRowKeys(selectedrowkeys);
    }

    const rowSelecttion = {
        selectedRowKeys,
        onChange: onSelectedRowKeysChange
    }

    return (
        <Table rowSelection={rowSelecttion} columns={columns} dataSource={data} 
            onRow={(record)=>({
                onClick: ()=>{
                    selectRow(record)
                }
            })}
        ></Table>
    )
}

export default RowClickSelect;