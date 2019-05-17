import React from 'react'
import { Form } from 'antd'
import EditableCell from './EditableCell'

import { Card, Table, Button } from 'antd'
import 'antd/dist/antd.css'

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: 'hello u',
        dataSource: [],
        count: 0,
        columns: [{
            key: 'RowNum',
            title: '序号',
            dataIndex: 'RowNum',
            width: 50
        },
        // {
        //     key: 'ExpenseTime',
        //     title: '日期',
        //     editable: true,
        //     dataIndex: 'ExpenseTime',
        //     // width: 160,
        //     width: 160,
        //     align: 'center',
        //     render: (text, record, index) => {
        //         return <div> {text && text.format('YYYY/MM/DD')} </div>;
        //     }
        // },
        // {
        //     key: 'ExpenseAddress',
        //     title: '费用发生地',
        //     dataIndex: 'ExpenseAddress',
        //     align: 'center',
        //     width: 100,
        //     editable: true,
        // },
        // {
        //     key: 'CabinType',
        //     title: '舱位',
        //     align: 'center',
        //     dataIndex: 'CabinType',
        //     editable: true,
        //     // width: 100,
        //     render: (text, record, index) => {
        //         return <div > {this.CabinTypeCodes[this.CabinTypeCodes.findIndex(p => p.key === record.CabinType)].text} </div>
        //     }
        // },
        // {
        //     key: 'ExpenseTraffic',
        //     title: '航空/铁路',
        //     align: 'center',
        //     dataIndex: 'ExpenseTraffic',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseBoat',
        //     title: '公路/水路',
        //     align: 'center',
        //     dataIndex: 'ExpenseBoat',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseBaggage',
        //     title: '出租车/网约车/市内公交',
        //     align: 'center',
        //     dataIndex: 'ExpenseBaggage',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseHotel',
        //     title: '住宿',
        //     align: 'center',
        //     dataIndex: 'ExpenseHotel',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseHotelTaxCode',
        //     title: '税率',
        //     align: 'center',
        //     dataIndex: 'ExpenseHotelTaxCode',
        //     editable: true,
        //     // width: 100,
        //     render: (text, record, index) => {
        //         return <div > {this.TaxCodes[this.TaxCodes.findIndex(p => p.key === record.ExpenseHotelTaxCode)].text} </div>
        //     }
        // },
        // {
        //     key: 'ExpenseMeal',
        //     title: '餐费',
        //     align: 'center',
        //     dataIndex: 'ExpenseMeal',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseOther',
        //     title: '其他',
        //     align: 'center',
        //     dataIndex: 'ExpenseOther',
        //     editable: true,
        //     // width: 80
        // },
        // {
        //     key: 'ExpenseSum',
        //     title: '费用金额合计',
        //     dataIndex: 'ExpenseSum',
        //     align: 'center',
        //     editable: false,
        //     // width: 80,
        //     render: (text, record, index) => {
        //         return <div > {
        //             this.getNumberForInput(record.ExpenseTraffic) +
        //             this.getNumberForInput(record.ExpenseBoat) +
        //             this.getNumberForInput(record.ExpenseBaggage) +
        //             this.getNumberForInput(record.ExpenseHotel) +
        //             this.getNumberForInput(record.ExpenseMeal) +
        //             this.getNumberForInput(record.ExpenseOther)
        //         } </div>
        //     }
        // },
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
            key: 'Remark',
            title: '备注',
            align:'center',
            dataIndex: 'Remark',
            editable: true
        }
    ]
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;
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
                RowNum: index + 1
            }
        });

        this.setState({
            dataSource,
            count: dataSource.length
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];

        const index = newData.findIndex(item => item.RowNum === row.RowNum);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...row
        });

        this.setState({
            dataSource: newData
        });
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
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            }
        });

        return <div>
            <Card title='目的地费用' extra={<div style={{ color: 'red', fontWeight: 'bolder' }}>【电子发票号限定最长10位】</div>}>
                <Table
                    components={components}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowClassName={() => 'editable-row'}
                    bordered
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

export default EditableTable;