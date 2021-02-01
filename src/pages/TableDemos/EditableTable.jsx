import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import styles from './table.css'
// import {FormInstance} from 'antd/lib/form';

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
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex]
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });

        } catch (error) {
            console.log('Save failed:', error)
        }
    }

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{ margin: 0 }} name={dataIndex} rules={[{ required: true, message: `${title} is requried.` }]}>
                <Input ref={inputRef} onPressEnter={save} onBlur={save}></Input>
            </Form.Item>
        ) : (
                <div className={styles["editable-cell-value-wrap"]} style={{
                    paddingRight: 24
                }} onClick={toggleEdit}>
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>
};

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

    const [count, setCount] = useState(2);


    const handleDelete = (key) => {
        const ds = [...dataSource];
        setDataSource(ds.filter(item => item.key != key));
    }

    const handleAdd = () => {
        const newData = {
            key: count,
            name: `Edward King ${count}`,
            age: 32,
            address: `London, Park Lane no. ${count}`
        };

        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    }

    const handleSave = (row) => {
        const ds = [...dataSource];
        const index = ds.findIndex(item => row.key === item.key);
        const item = ds[index];

        ds.splice(index, 1, { ...item, ...row });
        setDataSource(ds);
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

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell
        }
    };

    const cols = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave
            })
        }
    });

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>Add a row</Button>
            <Table components={components} rowClassName={() => styles["editable-row"]} bordered dataSource={dataSource} columns={cols}></Table>
        </div>
    )
}