import React from 'react'
import { Table, Popconfirm, message, Modal, Button } from 'antd';
import AddNewModal from './AddNewModal'
import moment from 'moment'

const dateFormat = 'YYYY/MM/DD';
class Aladin extends React.Component {
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


        this.columns = [
            {
                title: '序号',
                dataIndex: 'RowNum',
                width: '2%',
                visible: false,
                editable: false
            },
            {
                title: '费用日期',
                dataIndex: 'ExpenseTime',
                editable: true,
                visible: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return (text && text.format) ? text.format('YYYY/MM/DD') : null;
                }
            },
            {
                title: '费用发生地',
                dataIndex: 'ExpenseAddress',
                editable: true,
                visible: true,
                width: '8.2%',
            },
            {
                title: '舱位',
                dataIndex: 'CabinType',
                editable: true,
                visible: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return this.CabinTypeCodes.find(item => item.key === text).text;
                }
            },
            {
                title: '航空/铁路',
                dataIndex: 'ExpenseTraffic',
                editable: false,
                visible: true,
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
                visible: true,
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
                visible: true,
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
                visible: true,
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
                visible: true,
                width: '8.2%',
                render: (text, record, index) => {
                    return this.TaxCodes.find(item => item.key === text).text
                }
            },
            {
                title: '餐费',
                dataIndex: 'ExpenseMeal',
                width: '5%',
                editable: true,
                visible: true,
            },
            {
                title: '其他',
                dataIndex: 'ExpenseOther',
                width: '5%',
                editable: true,
                visible: true,
            },
            {
                title: '费用合计',
                dataIndex: 'ExpenseSum',
                width: '8%',
                visible: true,
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
                visible: true,
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
                            <div>
                                <Popconfirm title='确定删除吗?'
                                    onConfirm={() => this.handleDelete(record.key)}>
                                    <a href='javascript:;'>删除</a>
                                    {/* <Button>删除</Button> */}
                                </Popconfirm>
                                |
                                <a href='javascript:;' onClick={() => this.EditClick(record)}>编辑</a>
                                {/* <Button onClick={() => this.EditClick(record)} type='primary'>编辑</Button> */}
                            </div>
                        ) : null

            }
        ]

        this.state = {
            dataSource: [
                {
                    key: '0',
                    RowNum: '1',
                    ExpenseTime: moment(new Date(), dateFormat),
                    ExpenseAddress: '北京',
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
                },
                {
                    key: '1',
                    RowNum: '2',
                    ExpenseTime: moment(new Date(), dateFormat),
                    ExpenseAddress: '上海',
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
            editingRecord: null,
            modalOpen: false,
            modalTitle: '添加新项目',
            form: null
        }
    }

    getNumberForInput(value) {
        return parseFloat(value) || 0
    }

    EditClick = (record) => {
        this.setState({
            editingRecord: record,
            modalOpen: true,
            modalTitle: '编辑项目'
        });
    }

    modalOkClick = () => {
        console.log('modalokclick-this.props', this.props);
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

    handleAdd = () => {
        const count = this.state.dataSource.length;
        const newData = {
            key: count,
            RowNum: count,
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
        };

        this.setState({
            modalOpen: true,
            editingRecord: newData
        })
    }

    render() {
        const { editingRecord } = this.state;

        const modalStyle = {
            // content: {

            // }
            height: '500px',
            // paddingTop: '10px',
            width: '500px'
        }
        return <div>
            <Table columns={this.columns}
                dataSource={this.state.dataSource}
                bordered>

            </Table>
            <Button type='primary' onClick={this.handleAdd}>添加新项目</Button>
            <Modal visible={this.state.modalOpen}
                title={this.state.modalTitle}
                onOk={this.modalOkClick}
                onCancel={this.modalCancelClick}
                destroyOnClose={true}
                maskClosable={false}
                style={{width: '1000px'}}
                bodyStyle={modalStyle}>
                {
                    editingRecord ?
                        (<AddNewModal
                            record={editingRecord}
                            columns={this.columns}
                            cabinTypeCodes={this.CabinTypeCodes}
                            taxCodes={this.TaxCodes}></AddNewModal>) : null
                }
            </Modal>
        </div>
    }
}

export default Aladin