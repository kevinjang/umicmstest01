export default {
    namespace: 'ERColumns',
    state:[
        {
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
            width: 120,
            align: 'center',
            render: (text, record, index) => {
                return <div>{text && text.format('YYYY/MM/DD')}</div>;
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
            width: 150,
            render: (text, record, index) => {
                return <div>
                    {this.CabinTypeCodes[this.CabinTypeCodes.findIndex(p => p.key === record.CabinType)].text}
                </div>
            }
        },
        {
            key: 'ExpenseTraffic',
            title: '航空/铁路',
            align: 'center',
            dataIndex: 'ExpenseTraffic',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseBoat',
            title: '公路/水路',
            align: 'center',
            dataIndex: 'ExpenseBoat',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseBaggage',
            title: '出租车/网约车/市内公交',
            align: 'center',
            dataIndex: 'ExpenseBaggage',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseHotel',
            title: '住宿',
            align: 'center',
            dataIndex: 'ExpenseHotel',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseHotelTaxCode',
            title: '税率',
            align: 'center',
            dataIndex: 'ExpenseHotelTaxCode',
            editable: true,
            width: 100,
            render: (text, record, index) => {
                return <div>
                    {this.TaxCodes[this.TaxCodes.findIndex(p => p.key === record.ExpenseHotelTaxCode)].text}
                </div>
            }
        },
        {
            key: 'ExpenseMeal',
            title: '餐费',
            align: 'center',
            dataIndex: 'ExpenseMeal',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseOther',
            title: '其他',
            align: 'center',
            dataIndex: 'ExpenseOther',
            editable: true,
            width: 80
        },
        {
            key: 'ExpenseSum',
            title: '费用金额合计',
            dataIndex: 'ExpenseSum',
            align: 'center',
            editable: false,
            width: 80,
            render: (text, record, index) => {
                return <div>
                    {
                        this.getNumberForInput(record.ExpenseTraffic) +
                        this.getNumberForInput(record.ExpenseBoat) +
                        this.getNumberForInput(record.ExpenseBaggage) +
                        this.getNumberForInput(record.ExpenseHotel) +
                        this.getNumberForInput(record.ExpenseMeal) +
                        this.getNumberForInput(record.ExpenseOther)
                    }
                </div>
            }
        },
        {
            key: 'InvoiceNo',
            title: '电子发票号',
            align: 'center',
            dataIndex: 'InvoiceNo',
            editable: true,
            width: 100,
            max: 10
        },
        {
            key: 'Remark2',
            title: '住宿天数',
            dataIndex: 'Remark2',
            align: 'center',
            editable: true,
            width: 100,
            type: 'number'
        },
        {
            key: 'ExpenseDescription',
            title: '备注',
            dataIndex: 'ExpenseDescription',
            align: 'center',
            editable: true,
            width: 100,
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
    ]
}