import { Table } from 'antd'
import reqwest from 'reqwest';
import { useState, useEffect } from 'react'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
            { text: 'Male', value: 'male' },
            { text: 'Female', value: 'female' },
        ],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

const getRandomuserParams = params => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params
    }
}

const RemoteFetch = () => {
    const [data, setData] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })

    const [loading, setLoading] = useState(false)

    const handleTableChange = (pagination, filters, sorter) => {
        fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters
        })
    }

    useEffect(()=>{
        fetch({
            pagination
        })
    }, [])

    const fetch = (params = {}) => {
        setLoading(true)
        reqwest({
            url: 'https://randomuser.me/api',
            method: 'get',
            type: 'json',
            data: getRandomuserParams(params)
        }).then(data => {
            console.log(data)
            setLoading(false)
            setData(data.results)
            setPagination({
                ...params.pagination,
                total: 200
            })
        })
    }

    return (
        <Table columns={columns} rowKey={record => record.login.uuid} dataSource={data} loading={loading}
            onChange={handleTableChange}
        > </Table>
    )
}

export default RemoteFetch