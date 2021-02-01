import { Table, Form, Input, Button,Popconfirm } from 'antd'
import FormList from 'antd/lib/form/FormList';

import React, { useContext, useState, useEffect, useRef } from 'react'

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props}></tr>
            </EditableContext.Provider>
        </Form>
    )
}

const EditableCell = ({
    title, dataIndex, children, editable, record, handleSave, ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing])

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex]
        });
    }

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values })
        } catch (errInfo) {

        }
    }

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item name={dataIndex}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save}>

                </Input>
            </Form.Item>
        ) : (
                <div onClick={toggleEdit}>
                    {children}
                </div>
            )
    }

    return <td {...restProps}>{childNode}</td>
}

export default () => {
    const [dataSource, setDataSource] = useState([{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
    },
    {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
    },]);

    const [count, setCount] = useState(2)

    const handleAdd = () => {
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`
        }

        const ds = [...dataSource, newData];
        setDataSource(ds)
        setCount(count+1);
    }

    const handleDelete = (key)=>{
        const ds = dataSource.filter(item=> item.key !== key);
        setDataSource(ds)
        setCount(count - 1)
        
    }

    const handleSave = (row)=>{
        const ds = [...dataSource]
        const index = ds.findIndex(item=>item.key === row.key);
        const item = ds[index];

        ds.splice(index, 1, {...item, ...row});
        setDataSource(ds);
    }


    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    }

    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        },
        {
            title: 'age',
            dataIndex: 'age',
        },
        {
            title: 'address',
            dataIndex: 'address',
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return dataSource.length >= 1 ?
                    (
                        <Popconfirm title={"Sure to delete?"} onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null
            }
        }
    ];


    const cols = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => {
                return {
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: handleSave
                }

            }
        }
    })

    return (
        <div>
            <Button type="primary" onClick={handleAdd}>Add a row</Button>
            <Table components={components} columns={cols} dataSource={dataSource}></Table>
        </div>
    )
}