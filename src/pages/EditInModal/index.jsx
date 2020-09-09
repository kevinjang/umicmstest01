import { connect } from 'umi'
import { Table, Button } from 'antd'
const Aladin = (props) => {
    const columns = [
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
    return (
        <div>
            <Table columns={columns}></Table>
            <Button type="primary" >添加新项目</Button>
        </div>
    );
}

export default connect(({ cabinTypeCodes, taxCodes }) => ({
    cabinTypeCodes: cabinTypeCodes.values
    , taxCodes: taxCodes.values
}))(Aladin)