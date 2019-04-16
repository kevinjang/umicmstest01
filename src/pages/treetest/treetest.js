import React from 'react'
import { Table, Card, Button, Popconfirm, DatePicker, Form, Input, Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css'
import './treetest.css'

import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props}></tr>
    </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props) {
        super(props)
        this.CabinTypeCodes = [{
            key: '0',
            text: '--请选择--'
        },
        {
            key: '1',
            text: '无'
        },
        {
            key: '2',
            text: '火车，软卧'
        },
        {
            key: '3',
            text: '火车，硬卧'
        },
        {
            key: '4',
            text: '火车，硬座'
        },
        {
            key: '5',
            text: '火车，二等座'
        },
        {
            key: '6',
            text: '火车，一等座'
        },
        {
            key: '7',
            text: '火车，商务座'
        },
        {
            key: '8',
            text: '轮船，二等座'
        },
        {
            key: '9',
            text: '轮船，一等座'
        },
        {
            key: '10',
            text: '飞机，经济舱'
        },
        {
            key: '11',
            text: '飞机，商务舱'
        },
        {
            key: '12',
            text: '飞机，公务舱'
        },
        {
            key: '13',
            text: '飞机，头等舱'
        }]
        // let { record } = this.props;
        this.menu = (<Menu onClick={(e, v) => {
            
            const { record } = arguments[0]
            record.CabinType = e.key
        }}>
            {this.CabinTypeCodes.map((item, index) => {
                return <Menu.Item key={item.key}>
                    {item.text}
                </Menu.Item>
            })}
        </Menu>)
    }
    state = {
        editing: false
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({
            editing,
        }, () => {
            if (editing) {
                if (this.input)
                    this.input.focus()
            }
        })
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        })
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} 是必填项.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            (dataIndex === 'CabinType') ?
                                                <Dropdown overlay={this.menu} onBlur={this.save}>
                                                    <Button id={"record_drpBtn_" + index}>
                                                        {this.CabinTypeCodes[this.CabinTypeCodes.findIndex(p => p.key === record.CabinType)].text}
                                                        <Icon type='down'></Icon>
                                                    </Button>
                                                </Dropdown>
                                                :
                                                <Input
                                                    ref={node => (this.input = node)}
                                                    onPressEnter={this.save}
                                                    onBlur={this.save}
                                                />
                                        )}
                                    </FormItem>
                                ) : (
                                        <div
                                            className="editable-cell-value-wrap"
                                            style={{ paddingRight: 24, height: 30 }}
                                            onClick={this.toggleEdit}>
                                            {restProps.children}
                                        </div>
                                    )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class TreeTest extends React.Component {
    constructor(props) {
        super(props)
        this.currentRecord = null;

        this.CabinTypeCodes = [{
            key: '0',
            text: '--请选择--'
        },
        {
            key: '1',
            text: '无'
        },
        {
            key: '2',
            text: '火车，软卧'
        },
        {
            key: '3',
            text: '火车，硬卧'
        },
        {
            key: '4',
            text: '火车，硬座'
        },
        {
            key: '5',
            text: '火车，二等座'
        },
        {
            key: '6',
            text: '火车，一等座'
        },
        {
            key: '7',
            text: '火车，商务座'
        },
        {
            key: '8',
            text: '轮船，二等座'
        },
        {
            key: '9',
            text: '轮船，一等座'
        },
        {
            key: '10',
            text: '飞机，经济舱'
        },
        {
            key: '11',
            text: '飞机，商务舱'
        },
        {
            key: '12',
            text: '飞机，公务舱'
        },
        {
            key: '13',
            text: '飞机，头等舱'
        }]
        this.state = {
            username: 'hello u',
            columns: [
                {
                    key: 'RowNum',
                    title: '序号',
                    dataIndex: 'RowNum',
                    width: 50
                },
                {
                    key: 'ExpenseTime',
                    title: '日期',
                    dataIndex: 'ExpenseTime',
                    width: 200,
                    render: (text, record, index) => {
                        let currDate = new Date();
                        return <DatePicker
                            defaultValue={moment(currDate, dateFormat)}
                            format={dateFormat}
                            onConfirm={(e) => { console.log(e) }}>

                        </DatePicker>
                    }
                },
                {
                    key: 'ExpenseAddress',
                    title: '费用发生地',
                    dataIndex: 'ExpenseAddress',
                    width: 100,
                    editable: true,
                },
                {
                    key: 'CabinType',
                    title: '舱位',
                    dataIndex: 'CabinType',
                    editable: true,
                    width: 100,
                    render: (text, record, index) => {
                        return <div>
                            {this.CabinTypeCodes[this.CabinTypeCodes.findIndex(p => p.key === record.CabinType)].text}
                        </div>
                    }
                },
                {
                    key: 'ExpenseTraffic',
                    title: '航空/铁路',
                    dataIndex: 'ExpenseTraffic',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseBoat',
                    title: '公路/水路',
                    dataIndex: 'ExpenseBoat',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseBaggage',
                    title: '出租车/网约车/市内公交',
                    dataIndex: 'ExpenseBaggage',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseHotel',
                    title: '住宿',
                    dataIndex: 'ExpenseHotel',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseHotelTaxCode',
                    title: '税率',
                    dataIndex: 'ExpenseHotelTaxCode',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseMeal',
                    title: '餐费',
                    dataIndex: 'ExpenseMeal',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseOther',
                    title: '其他',
                    dataIndex: 'ExpenseOther',
                    editable: true,
                    width: 100
                },
                {
                    key: 'ExpenseSum',
                    title: '费用金额合计',
                    dataIndex: 'ExpenseSum',
                    editable: true,
                    width: 100
                },
                {
                    key: 'InvoiceNo',
                    title: '电子发票号',
                    dataIndex: 'InvoiceNo',
                    editable: true,
                    width: 100
                },
                {
                    key: 'Remark2',
                    title: '住宿天数',
                    dataIndex: 'Remark2',
                    editable: true,
                    width: 100,
                    type: 'int'
                },
                {
                    key: 'ExpenseDescription',
                    title: '备注',
                    dataIndex: 'ExpenseDescription',
                    editable: true,
                    width: 100
                },
                {
                    // key: 'remove',
                    title: '操作',
                    dataIndex: 'remove',
                    width: 100,
                    render: (text, record) => {
                        return this.state.dataSource.length > 0 ?
                            (<Popconfirm title='确定删除当前行？'
                                onConfirm={() => {
                                    this.handleDelete(record.RowNum)
                                }}>
                                <a href='javascript:;'>删除</a>
                            </Popconfirm>) :
                            null;
                    },
                    fixed: 'right'
                }
            ],
            editingKey: '',
            count: 0,
            dataSource: []
        }
    }

    componentDidMount() {
    }

    isEditing = record => record.RowNum === this.state.editingKey

    handleAdd = () => {
        const { count, dataSource } = this.state
        const newData = {
            RowNum: count + 1,
            ExpenseTime: '',
            ExpenseAddress: '',
            CabinType: '0',
            ExpenseTraffic: '',
            ExpenseBoat: '',
            ExpenseBaggage: '',
            ExpenseHotel: '',
            ExpenseHotelTaxCode: '',
            ExpenseMeal: '',
            ExpenseOther: '',
            ExpenseSum: '',
            InvoiceNo: '',
            Remark2: '',
            ExpenseDescription: ''
        }

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        })
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource].filter(item => item.RowNum !== key).map((item, index) => {
            return {
                ...item,
                RowNum: index + 1,
            }
        })
        this.setState({
            dataSource,//: dataSource.filter(item => item.RowNum !== key)
            count: dataSource.length
        })
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource]
        const index = newData.findIndex(item => row.RowNum === item.RowNum)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item, ...row
        })

        this.setState({
            dataSource: newData
        })
    }

    render() {
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        }
        const columns = this.state.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            }
        })
        return <div>
            <Card title='目的地费用'
                extra={<div style={{ color: 'red', fontWeight: 'bolder' }}>【电子发票号限定最长10位】</div>}
            >
                <Table
                    components={components}
                    scroll={{ x: '200%', y: 240 }}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowClassName={() => 'editable-row'}
                    bordered={true}
                    rowKey='RowNum'
                >

                </Table>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={this.handleAdd} type='primary'>添加新项目</Button>
                </div>
            </Card>
        </div>
    }
}

export default TreeTest