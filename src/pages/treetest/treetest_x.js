import React from 'react'
import {
    Table, Input, Button, Popconfirm, Form,
    DatePicker, Dropdown, Menu, Icon, message, InputNumber, Tooltip,
    Modal,
    Row, Col
} from 'antd';

import AddNewModal from './AddNewModal'
// import EditableCell from './EditableCell'
import moment from 'moment'

import 'antd/dist/antd.css'

const dateFormat = 'YYYY/MM/DD';;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props) {
        super(props);

        this.CabinTypeCodes = [
            {
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

        this.numberControls = ['ExpenseTraffic', 'ExpenseBoat'
            , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther']

        this.drpControls = ['ExpenseHotelTaxCode', 'CabinType']
    }
    state = {
        editing: false
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({
            editing
        }, () => {
            if (editing) {
                if (this.input) {
                    this.input.focus();
                }
            }
        })
    }

    save = e => {
        const { record, handleSave } = this.props;

        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            const { dataIndex } = this.props;

            if (dataIndex === 'ExpenseTime') {
                values.ExpenseTime = e
            }
            if (dataIndex === 'CabinType') {
                values.CabinType = e.key
            }

            if (dataIndex === 'ExpenseHotelTaxCode') {
                values.ExpenseHotelTaxCode = e.key
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        })
    }

    cabinTypeClick = (e) => {
        console.log('cabinTypeClick.e', e);
        console.log('cabinTypeClick.this.props', this.props);

        if (e.key === '0') {
            // 全部禁用
            // console.log()
        }
        this.save(e);
    }

    // taxCodeClick = (e)=>{
    //     this.save(e);
    // }

    setCellControl = (dataIndex, text) => {
        const { record, index, type } = this.props;
        if (dataIndex === 'ExpenseTime') {
            return <DatePicker
                autoFocus={true}
                format={dateFormat}
                onChange={this.save}
                initialValue={moment(record[dataIndex], dateFormat)}
            ></DatePicker>;
        }
        else if (this.drpControls.findIndex(item => item === dataIndex) >= 0) {
            if (dataIndex === 'CabinType') {
                const menu = (
                    <Menu onClick={this.cabinTypeClick}>
                        {this.CabinTypeCodes.map(item => {
                            return <Menu.Item key={item.key}>
                                {item.text}
                            </Menu.Item>
                        })}
                    </Menu>
                );

                return <Dropdown overlay={menu} >
                    <Button id={`record_drpBtn_${index}`}>
                        {
                            this.CabinTypeCodes.find(p => p.key == record.CabinType).text
                        }
                        <Icon type='down'> </Icon>
                    </Button>
                </Dropdown>
            } else if (dataIndex === 'ExpenseHotelTaxCode') {
                const menu = (
                    <Menu onClick={this.save}>
                        {this.TaxCodes.map(item => {
                            return <Menu.Item key={item.key}>
                                {item.text}
                            </Menu.Item>
                        })}
                    </Menu>
                )


                return <Dropdown overlay={menu} >
                    <Button id={`record_drpBtnTC_${index}`}>
                        {
                            this.TaxCodes.find(p => p.key == record.ExpenseHotelTaxCode).text
                        }
                        <Icon type='down'> </Icon>
                    </Button>
                </Dropdown>
            }
        } else {
            if (this.numberControls.findIndex(item => item === dataIndex) >= 0) {
                return <InputNumber defaultValue={record[dataIndex]} onBlur={this.save} onPressEnter={this.save}>
                </InputNumber>
            }
            return <Input
                ref={node => (this.input = node)}
                onPressEnter={this.save}
                onBlur={this.save} />
        }
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, title, record } = this.props;
        const { editing } = this.state;

        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} 是必填项.`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(this.setCellControl(dataIndex, record[dataIndex]))}
            </Form.Item>
        ) : (
                <div className="editable-cell-value-wrap"
                    style={{ width: '100%', paddingTop: 5, paddingBottom: 5 }}
                    onClick={this.toggleEdit}>
                    {children}
                </div>
            );
    }

    setIneditableTooltip = (content, restProps) => {
        let msg = 'test';
        const { dataIndex } = this.props;
        const { children } = this.props;
        if (typeof children[2] === 'object') {
            const { record } = children[2].props;
            if (record) {
                const record_x = JSON.parse(record);
                if (record_x) {
                    const cabinTypeValue = record_x['CabinType'];
                    if (cabinTypeValue === '0')
                        msg = '请选择舱位';
                    return <Tooltip title={msg}>
                        {content}
                    </Tooltip>
                }
                else {
                    return <Tooltip title={msg}>
                        {content}
                    </Tooltip>
                }
            }
            else {
                return <div>
                    {content}
                </div>
            }
        }
        else {
            return <div>
                {content}
            </div>
        }
    }

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editable ?
                    (<EditableContext.Consumer>
                        {this.renderCell}
                    </EditableContext.Consumer>)
                    : (
                        this.setIneditableTooltip(children, title)
                    )}
            </td>
        );
    }
}

const ModalEditor = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <div {...props}>
        </div>
    </EditableContext.Provider>
);

const Editor1 = Form.create({ name: 'ModalEditor' })(ModalEditor);

class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.numberControls = ['ExpenseTraffic', 'ExpenseBoat'
            , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther']

        this.CabinTypeCodes = [
            {
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

        this.columns = [
            {
                title: '序号',
                dataIndex: 'RowNum',
                width: '2%',
                editable: false
            },
            {
                title: '费用日期',
                dataIndex: 'ExpenseTime',
                editable: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return (text && text.format) ? text.format('YYYY/MM/DD') : null;
                }
            },
            {
                title: '费用发生地',
                dataIndex: 'ExpenseAddress',
                editable: true,
                width: '8.2%',
            },
            {
                title: '舱位',
                dataIndex: 'CabinType',
                editable: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return this.CabinTypeCodes.find(item => item.key === text).text;
                }
            },
            {
                title: '航空/铁路',
                dataIndex: 'ExpenseTraffic',
                editable: false,
                width: '8%',
                type: 'number',
                render: (text, record, index) => {
                    return <div record={JSON.stringify(record)}>
                        {text}
                    </div>
                }
            },
            {
                title: '公路/水路',
                dataIndex: 'ExpenseBoat',
                editable: false,
                width: '8%',
                render: (text, record, index) => {
                    return <div record={JSON.stringify(record)}>
                        {text}
                    </div>
                }

            },
            {
                title: '出租车/网约车/市内公交',
                dataIndex: 'ExpenseBaggage',
                width: '10%',
                editable: false,
                render: (text, record, index) => {
                    return <div record={JSON.stringify(record)}>
                        {text}
                    </div>
                }
            },
            {
                title: '住宿',
                dataIndex: 'ExpenseHotel',
                width: '5%',
                editable: false,
                render: (text, record, index) => {
                    return <div record={JSON.stringify(record)}>
                        {text}
                    </div>
                }
            },
            {
                title: '税率',
                dataIndex: 'ExpenseHotelTaxCode',
                editable: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return this.TaxCodes.find(item => item.key === text).text
                }
            },
            {
                title: '餐费',
                dataIndex: 'ExpenseMeal',
                width: '5%',
                editable: true
            },
            {
                title: '其他',
                dataIndex: 'ExpenseOther',
                width: '5%',
                editable: true
            },
            {
                title: '费用合计',
                dataIndex: 'ExpenseSum',
                width: '8%',
                render: (text, record, index) => {
                    let sum = 0;
                    this.numberControls.map(item => {
                        sum += this.getNumberForInput(record[item]);
                    })

                    return sum;
                }
            },
            {
                title: '电子发票号',
                dataIndex: 'InvoiceNo',
                editable: true,
                width: '8%',
                max: 10
            },
            {
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ?
                        (
                            <Popconfirm title='Sure to Delete?' onConfirm={() => this.handleDelete(record.key)}>
                                <a href='javascript:;'>删除</a>
                            </Popconfirm>
                        ) : null

            }
        ];
        this._moment = moment;
        this.state = {
            dataSource: [
                {
                    key: '0',
                    RowNum: '1',
                    ExpenseTime: moment(new Date(), dateFormat),
                    ExpenseAddress: '',
                    CabinType: '0',
                    ExpenseTraffic: 0,
                    ExpenseBoat: 0,
                    ExpenseBaggage: 0,
                    ExpenseHotel: 0,
                    ExpenseHotelTaxCode: '_',
                    ExpenseMeal: 0,
                    ExpenseOther: 0,
                    ExpenseSum: 0,
                    InvoiceNo: ''
                }
            ],
            count: 1,
            modalOpen: false,
            modalTitle: '添加新项目',
            editingRecord: null
        }
        // this.form = this.props.form;
        // console.log('editabletable.constructor.this.props', this.props)

    }

    getNumberForInput(value) {
        return parseFloat(value) || 0
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key).map((item, index) => {
                item.RowNum = index + 1;
                return item
            }),
            count: dataSource.length
        });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;

        const newData = {
            key: count,
            RowNum: count,
            ExpenseTime: this._moment(new Date(), dateFormat),
            ExpenseAddress: '0',
            CabinType: '0',
            ExpenseTraffic: 0,
            ExpenseBoat: 0,
            ExpenseBaggage: 0,
            ExpenseHotel: 0,
            ExpenseHotelTaxCode: '_',
            ExpenseMeal: 0,
            ExpenseOther: 0,
            ExpenseSum: 0,
            InvoiceNo: ''
        };

        this.setState({
            // dataSource: [...dataSource, newData],
            count: count + 1,
            modalOpen: true,
            // modalTitle: '添加新项目',
            // editingRecord: newData
        });

        
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => item.key === row.key);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...row
        });

        this.setState({
            dataSource: newData
        });
    }

    modalOKClick = (e) => {
        this.modalClose();
    }

    modalCancelClick = () => {
        this.modalClose();
    }

    modalClose = () => {
        this.setState({
            modalOpen: false
        })
    }

    ctMenuOnClick = (e) => {
        console.log('ctMenuOnClick.e', e);
        const { editingRecord } = this.state;
        editingRecord.CabinType = e.key;
        this.setState({
            editingRecord
        })
    }

    getCabinTypeMenu = () => {
        return <Menu onClick={this.ctMenuOnClick}>
            {this.CabinTypeCodes.map(item => {
                return <Menu.Item key={item.key}>
                    {item.text}
                </Menu.Item>
            })}
        </Menu>
    }

    renderOwnCell = (form) => {
        console.log('renderOwnCell.form', form)
        return <div>

            <Row>
                <Col >
                    <label>费用日期：</label>
                </Col>
                <Col>
                    <DatePicker
                        defaultValue={moment(new Date(), dateFormat)}
                        format={dateFormat}>
                    </DatePicker>
                </Col>
                <Col>
                    <label>费用发生地：</label>
                </Col>
                <Col>
                    <Form.Item>
                        {/* {
getFieldDecorator('ExpenseAddress', {
rules: [
{
required: true,
message: '费用发生地是必填项'
}
],
initialValue: (editingRecord ? editingRecord.ExpenseAddress : '')
})(
<Input defaultValue={editingRecord ? editingRecord.ExpenseAddress : ''}>

</Input>)
} */}
                        <Input defaultValue={editingRecord ? editingRecord.ExpenseAddress : ''}>

                        </Input>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>舱位</label>
                </Col>
                <Col>
                    <Dropdown overlay={this.getCabinTypeMenu}>
                        <Button id='ctDrpBtn'>
                            {
                                editingRecord ? this.CabinTypeCodes.find(p => p.key == editingRecord.CabinType).text : ''
                            }
                            <Icon type='down'> </Icon>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>

        </div>
    }

    render() {
        const { dataSource, editingRecord } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        }

        console.log('editabletable-render-this.props', this.props)
        const columns = this.columns.map(col => {
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
            };
        });

        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}>

                </Table>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加新项目
                </Button>
                {/* <Modal
                    visible={this.state.modalOpen}
                    title={'添加新项目'}
                    onOk={this.modalOKClick}
                    onCancel={this.modalCancelClick}
                >
                    <EditableContext.Consumer>
                        {this.renderOwnCell}
                    </EditableContext.Consumer>
                </Modal> */}
                <AddNewModal visible={this.state.modalOpen}>

                </AddNewModal>
            </div >
        )
    }
}

export default EditableTable