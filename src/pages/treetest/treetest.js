import React from 'react'
import { Table, Card, Button, Popconfirm, DatePicker, Form, Input, Menu, Dropdown, Icon, InputNumber } from 'antd';

import 'antd/dist/antd.css';
import './treetest.css'

import moment from 'moment';

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        {console.log('props',props)}
        <tr {...props}> </tr>
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
        }
        ]
        this.TaxCodes = [
            {
                key: '_',
                text: '--请选择--'
            }, {
                key: 'J0',
                text: '0%应交税费-进项税'
            }, {
                key: 'JC',
                text: '1.5%应交税费-进项税'
            }, {
                key: 'J6',
                text: '3%应交税费-进项税'
            }, {
                key: 'J8',
                text: '4%应交税费-进项税'
            }, {
                key: 'J7',
                text: '5%应交税费-进项税'
            }, {
                key: 'J5',
                text: '6%应交税费-进项税'
            }, {
                key: 'J9',
                text: '7%应交税费-进项税'
            }, {
                key: 'JK',
                text: '9%应交税费-进项税'
            }, {
                key: 'JG',
                text: '10%应交税费-进项税'
            }, {
                key: 'J4',
                text: '11%应交税费-进项税'
            }, {
                key: 'J2',
                text: '13%应交税费-进项税'
            }, {
                key: 'JF',
                text: '16%应交税费-进项税'
            }, {
                key: 'JJ',
                text: '19%应交税费-进项税'
            }];
        this.drpControls = ['CabinType', 'ExpenseHotelTaxCode']
        this.numberControls = ['ExpenseTraffic', 'ExpenseBoat', 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther', 'ExpenseSum', 'Remark2']
        this.ctMenu = (<Menu onClick={(e, v) => {
            const { record } = this.props;
            record.CabinType = e.key
            const { handleSave } = this.props;
            this.toggleEdit();
            handleSave(record)
        }}>{this.CabinTypeCodes.map((item, index) => {
            return <Menu.Item key={item.key} > {item.text}
            </Menu.Item>
        })}
        </Menu>)

        this.tcMenu = (<Menu onClick={(e, v) => {
            const { record } = this.props;
            record.ExpenseHotelTaxCode = e.key

            const { handleSave } = this.props;
            this.toggleEdit();
            handleSave(record)
        }}>{this.TaxCodes.map((item, index) => {
            return <Menu.Item key={item.key} > {item.text}
            </Menu.Item>
        })}</Menu>)
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

    setControl = (dataIndex, that) => {
        if (this.drpControls.findIndex(item => item === dataIndex) > -1) {
            const { record, index } = that.props;
            return <Dropdown overlay={(dataIndex === 'CabinType') ? this.ctMenu : this.tcMenu}>
                {(dataIndex === 'CabinType') ?
                    <Button id={"record_drpBtn_" + index} >
                        {
                            this.CabinTypeCodes.findIndex(p => p.key === record.CabinType).text
                        }
                        <Icon type='down'> </Icon>
                    </Button> :
                    <Button id={"record_drpTaxCodeBtn_" + index} >
                        {
                            this.TaxCodes.find(p => p.key === record.ExpenseHotelTaxCode).text
                        }<Icon type='down'> </Icon>
                    </Button>
                } </Dropdown>
        } else if (this.numberControls.findIndex(item => item === dataIndex) > -1) {
            return <InputNumber autoFocus={true} onBlur={that.save} >
            </InputNumber>
        } else if (dataIndex === 'ExpenseTime') {
            let currDate = new Date();
            return <DatePicker
                format={dateFormat}
                onChange={that.save} >
            </DatePicker>
        } else {
            return <Input
                ref={node => (that.input = node)}
                onPressEnter={that.save}
                onBlur={that.save} />
        }
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
        console.log('...restProps',...restProps)

        return (<td {...restProps}>
            {editable ? (<EditableContext.Consumer>
                {(form) => {
                    this.form = form;
                    // console.log('form.getFieldDecorator',form.getFieldDecorator)
                    return (
                        editing ? (<FormItem style={{ margin: 0 }} > {
                            (dataIndex !== 'InvoiceNo') ?
                                form.getFieldDecorator(dataIndex, {
                                    rules: [{
                                        required: true,
                                        message: `${title} 是必填项.`,
                                    }],
                                    initialValue: (dataIndex === 'ExpenseTime' ? moment(new Date(), dateFormat) : record[dataIndex] || 0),
                                })(this.setControl(dataIndex, this)) :
                                form.getFieldDecorator(dataIndex, {
                                    rules: [{
                                        required: true,
                                        message: `${title} 是必填项.`,
                                    }, {
                                        max: 10,
                                        message: '长度不符合标准'
                                    }],
                                    initialValue: (dataIndex === 'ExpenseTime' ? moment(new Date(), dateFormat) : record[dataIndex] || 0),
                                })(this.setControl(dataIndex, this))
                        } </FormItem>
                        ) : (<div className="editable-cell-value-wrap"
                            style={{ paddingRight: 0, height: 30 }}
                            //, overflowWrap: 'break-word' 
                            //(dataIndex === 'InvoiceNo' ? 0 : 24)
                            onClick={this.toggleEdit} > {restProps.children}
                        </div>)
                    );
                }}
            </EditableContext.Consumer>)
                : restProps.children}
        </td>);
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
        }
        ]

        this.TaxCodes = [
            {
                key: '_',
                text: '--请选择--'
            }, {
                key: 'J0',
                text: '0%应交税费-进项税'
            }, {
                key: 'JC',
                text: '1.5%应交税费-进项税'
            }, {
                key: 'J6',
                text: '3%应交税费-进项税'
            }, {
                key: 'J8',
                text: '4%应交税费-进项税'
            }, {
                key: 'J7',
                text: '5%应交税费-进项税'
            }, {
                key: 'J5',
                text: '6%应交税费-进项税'
            }, {
                key: 'J9',
                text: '7%应交税费-进项税'
            }, {
                key: 'JK',
                text: '9%应交税费-进项税'
            }, {
                key: 'JG',
                text: '10%应交税费-进项税'
            }, {
                key: 'J4',
                text: '11%应交税费-进项税'
            }, {
                key: 'J2',
                text: '13%应交税费-进项税'
            }, {
                key: 'JF',
                text: '16%应交税费-进项税'
            }, {
                key: 'JJ',
                text: '19%应交税费-进项税'
            }];

        this.state = {
            username: 'hello u',
            columns: [{
                key: 'RowNum',
                title: '序号',
                dataIndex: 'RowNum',
                width: 50
            },
            {
                key: 'ExpenseTime',
                title: '日期',
                editable: true,
                dataIndex: 'ExpenseTime',
                // width: 160,
                width: 160,
                align: 'center',
                render: (text, record, index) => {
                    return <div> {text && text.format('YYYY/MM/DD')} </div>;
                }
            },
            {
                key: 'ExpenseAddress',
                title: '费用发生地',
                dataIndex: 'ExpenseAddress',
                align: 'center',
                width: 100,
                editable: true,
            },
            {
                key: 'CabinType',
                title: '舱位',
                align: 'center',
                dataIndex: 'CabinType',
                editable: true,
                // width: 100,
                render: (text, record, index) => {
                    return <div > {this.CabinTypeCodes[this.CabinTypeCodes.findIndex(p => p.key === record.CabinType)].text} </div>
                }
            },
            {
                key: 'ExpenseTraffic',
                title: '航空/铁路',
                align: 'center',
                dataIndex: 'ExpenseTraffic',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseBoat',
                title: '公路/水路',
                align: 'center',
                dataIndex: 'ExpenseBoat',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseBaggage',
                title: '出租车/网约车/市内公交',
                align: 'center',
                dataIndex: 'ExpenseBaggage',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseHotel',
                title: '住宿',
                align: 'center',
                dataIndex: 'ExpenseHotel',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseHotelTaxCode',
                title: '税率',
                align: 'center',
                dataIndex: 'ExpenseHotelTaxCode',
                editable: true,
                // width: 100,
                render: (text, record, index) => {
                    return <div > {this.TaxCodes[this.TaxCodes.findIndex(p => p.key === record.ExpenseHotelTaxCode)].text} </div>
                }
            },
            {
                key: 'ExpenseMeal',
                title: '餐费',
                align: 'center',
                dataIndex: 'ExpenseMeal',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseOther',
                title: '其他',
                align: 'center',
                dataIndex: 'ExpenseOther',
                editable: true,
                // width: 80
            },
            {
                key: 'ExpenseSum',
                title: '费用金额合计',
                dataIndex: 'ExpenseSum',
                align: 'center',
                editable: false,
                // width: 80,
                render: (text, record, index) => {
                    return <div > {
                        this.getNumberForInput(record.ExpenseTraffic) +
                        this.getNumberForInput(record.ExpenseBoat) +
                        this.getNumberForInput(record.ExpenseBaggage) +
                        this.getNumberForInput(record.ExpenseHotel) +
                        this.getNumberForInput(record.ExpenseMeal) +
                        this.getNumberForInput(record.ExpenseOther)
                    } </div>
                }
            },
            {
                key: 'InvoiceNo',
                title: '电子发票号',
                align: 'center',
                dataIndex: 'InvoiceNo',
                editable: true,
                // width: 100,
                max: 10
            },
            {
                key: 'Remark2',
                title: '住宿天数',
                dataIndex: 'Remark2',
                align: 'center',
                editable: true,
                // width: 100,
                type: 'number'
            },
            {
                key: 'ExpenseDescription',
                title: '备注',
                dataIndex: 'ExpenseDescription',
                align: 'center',
                editable: true,
                // width: 100,
                // render:(text,record)=>{
                //     return <div style={{width: 100, overflowWrap: 'break-word' }}>
                //     {text}
                //     </div>
                // }
            },
            {
                title: '操作',
                dataIndex: 'remove',
                align: 'center',
                // width: 100,
                render: (text, record) => {
                    return this.state.dataSource.length > 0 ?
                        (<Popconfirm title='确定删除当前行？'
                            onConfirm={
                                () => {
                                    this.handleDelete(record.RowNum)
                                }
                            } >
                            <a href='javascript:;' > 删除 </a> </Popconfirm >) :
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

    componentDidMount() { }

    getNumberForInput(value) {
        return parseFloat(value) || 0
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
            ExpenseHotelTaxCode: '_',
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
            dataSource,
            count: dataSource.length
        })
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource]
        const index = newData.findIndex(item => row.RowNum === item.RowNum)
        const item = newData[index]
        newData.splice(index, 1, {
            ...item,
            ...row
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
        return <div >
            <Card title='目的地费用' extra={<div style={{ color: 'red', fontWeight: 'bolder' }}>【电子发票号限定最长10位】</div>}>
                <Table components={components}
                    scroll={{ x: '100%', y: 240 }}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowClassName={() => 'editable-row'}
                    bordered={true}
                    rowKey='RowNum' >
                </Table>
                <div style={{ marginTop: '10px' }} >
                    <Button onClick={this.handleAdd} type='primary' > 添加新项目 </Button>
                </div>
            </Card>
        </div>
    }
}

export default TreeTest