// columns[n] 可以内嵌 children，以渲染分组表头。

import { Table } from 'antd'

const columns = [
    {
        title: 'Name', 
        dataIndex: 'name',
        key: 'name', 
        width: 100, 
        fixed: 'left', 
        filters: [{ text: 'Joe', value: 'Joe' }, { text: 'John', value: 'John' }],
        onFilter:(value, record)=>{
            return record.name.indexOf(value) === 0
        }
    },
    {
        title: 'Other',
        children: [
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 150,
                sorter:(a, b)=>a.age - b.age,
            },
            {
                title: 'Address',
                children: [
                    {
                        title: 'Street',
                        dataIndex: 'street',
                        key: 'street',
                        width: 150,
                    },
                    {
                        title: 'Block',
                        dataIndex: 'block',
                        key: 'block',
                        width: 100,
                    },
                    {
                        title: 'Door No.',
                        dataIndex: 'number',
                        key: 'number',
                        width: 100,
                    }
                ]
            }
        ]
    },
    {
        title: 'Company',
        children: [
            {
                title: 'Company Address',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
                width: 200,
            },
            {
                title: 'Company Name',
                dataIndex: 'companyName',
                key: 'companyName'
            }
        ]
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        width: 80,
        fixed: 'right'
    }
];
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

export default ()=>{
    return (
        <div>
            <Table columns={columns} dataSource={data} bordered scroll={{x: 'calc(700px + 50%)', y: 240}}></Table>
        </div>
    )
}