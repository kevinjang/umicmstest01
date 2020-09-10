import { connect } from 'umi'
import { Table, Button, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { getNumberForInput } from '../../utils/utils'
import moment from 'moment'
var first = true
const Aladin = (props) => {
    var originalRecord = null;
    const [editingRecord, setEditingRecord] = useState();
    const [editingRecordIndex, setEditingRecordIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("添加新项目")
    const { cabinTypeCodes, taxCodes } = props;
    const numberControls = ['ExpenseTraffic', 'ExpenseBoat'
        , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther']
    const drpControls = ['ExpenseHotelTaxCode', 'CabinType']

    const EditClick = (record) => {
        originalRecord = { ...record }
        let index = dataSource.findIndex(item => item.key === record.key);
        setEditingRecord(record)
        setEditingRecordIndex(index)
        setModalOpen(true);
        setModalTitle("编辑项目")
    }

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
                return cabinTypeCodes.find(item => item.key === text).text;
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
                return taxCodes.find(item => item.key === text).text
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
                numberControls.map(item => {
                    sum += getNumberForInput(record[item]);
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
                dataSource.length >= 1 ?
                    (
                        <div>
                            <Popconfirm title='确定删除吗?'
                                onConfirm={() => this.handleDelete(record.key)}>
                                <a href='/#'>删除</a>
                                {/* <Button>删除</Button> */}
                            </Popconfirm>
                            |
                            <a href='javascript:;' onClick={() => EditClick(record)}>编辑</a>
                            {/* <Button onClick={() => this.EditClick(record)} type='primary'>编辑</Button> */}
                        </div>
                    ) : null

        }
    ];


    // const [dataSource, setDataSource] = useState(props.er_data);
    var dataSource = props.er_data;

    useEffect(() => {
        const { dispatch } = props;
        if (first && dispatch) {
            first = false;
            dispatch({
                type: 'er_data/fetchRemoteData'
            })
            // const { er_data } = props
            // console.log(er_data)
            // dataSource = props.er_data;
        }

    })

    // useEffect(() => {
    //     const { er_data } = props
    //     console.log(er_data)
    // })
    return (
        <div>
            {console.log(props.er_data)}
            <Table columns={columns} dataSource={dataSource}></Table>
            <Button type="primary" >添加新项目</Button>
        </div>
    );
}

export default connect(({ cabinTypeCodes, taxCodes, er_data, loading }) => ({
    cabinTypeCodes: cabinTypeCodes.values,
    taxCodes: taxCodes.values,
    er_data: er_data.remoteDataSource,
    fetchRemoteData: loading.effects["er_data/fetchRemoteData"]
}))(Aladin)