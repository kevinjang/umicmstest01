import { connect } from 'umi'
import { Table, Button, Popconfirm } from 'antd'
import { useEffect, useState } from 'react'
import { getNumberForInput } from '../../utils/utils'
import moment from 'moment'
import ModalWithPrevNext from '../../CommonUtility/ModalUtils/ModalPrevNextSwitch'
// NOTE: original with all sorts of problems, 
import AddNewModal from '../treetest/AddNewModal'
// import AddNewModal from './AddNewModal'
import { update, updateWith, orderBy, find } from 'lodash'

var first = true
const dateFormat = 'YYYY/MM/DD';
const Aladin = (props) => {
    var originalRecord = null;
    var originalDataSource = null;
    const [editingRecord, setEditingRecord] = useState();
    const [editingRecordIndex, setEditingRecordIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("添加新项目");
    const [modalButtonClicked, setModalButtonClicked] = useState("")


    const { cabinTypeCodes, taxCodes } = props;
    const numberControls = ['ExpenseTraffic', 'ExpenseBoat'
        , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther']
    const drpControls = ['ExpenseHotelTaxCode', 'CabinType']

    const handleDelete = (index) => {
        let currentItem = dataSource[index];


        index = parseInt(index);

        if (index !== dataSource.length - 1) {

            // 不是最后一行，将其之后的行的RowNum刷新
            for (let ind = index; ind < dataSource.length - 1; ind++) {
                let item = dataSource[ind + 1];
                item.RowNum = index + 1;
                dataSource[ind] = item; //dataSource[ind+1];
            }
        }
        //  如果是最后一行，不需要刷新其他行RowNum
        // 删除最后一行即可
        dataSource.length -= 1;
    }

    const handleAdd = () => {
        const count = dataSource.length;
        const newData = {
            key: count,
            RowNum: count + 1,
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

        setModalOpen(true)
        setEditingRecordIndex(count);
        setEditingRecord(newData);
    }

    const EditClick = (record) => {
        originalRecord = { ...record }
        console.log('edit click originalRecord: ', originalRecord)
        let index = dataSource.findIndex(item => item.key === record.key);
        const { key } = record;
        const { dispatch } = props;
        if (dispatch) {
            dispatch({
                type: 'er_data/setEditingRecordById',
                payload: { id: key }
            })
        }
        setEditingRecord(record)
        setEditingRecordIndex(index)
        setModalOpen(true);
        setModalTitle("编辑项目")
    }

    const updateRecord = (record, index) => {
        setEditingRecord(record);
        setEditingRecordIndex(index)
    }
    const modalClose = () => {
        setModalOpen(false)
    }

    const modalOkClick = () => {
        //NOTE: 想在这里实现点击校验，校验内容的方法又不在这里实现，有点尴尬，学习去了
        modalClose();

        updateDataSource();
    }

    const modalCancelClick = () => {
        modalClose();

        // console.log('modal cancel click:', originalRecord)

        if (originalDataSource) {
            setModalButtonClicked('cancel')
        } else {
            setModalButtonClicked('cancel')
        }
    }

    const updateDataSource = () => {
        //NOTE: 点击ok时才会调用的方法，用于更新数据源

        const { editingRecord } = props;
        // console.log('updateDataSource editingRecord:', editingRecord)
        // let item = dataSource.find(item1 => item1.key === editingRecord.key);
        // if (!item) {
        //     dataSource[dataSource.length] = editingRecord;
        // } else {
        //     let index = dataSource.findIndex(item1 => item1.key === editingRecord.key)
        //     item = { ...editingRecord }
        //     dataSource[index] = item;
        // }

        // originalDataSource = dataSource;

        //NOTE: 用editingRecord更新dataSource
        var item = find(dataSource, (it) => { return it.key === editingRecord.key });
        if (item) {
            item = {
                ...editingRecord
            }
            // NOTE: 更新数据
            dataSource = [...dataSource.filter(it => it.key !== item.key)];
            dataSource.push(item);

            dataSource = orderBy(dataSource, "key");
        }
        else {
            // NOTE: 新增数据
            item = {
                ...editingRecord
            }
            dataSource.push(item)
        }
        //NOTE: 更新数据集合，然后再说
        const { dispatch } = props
        if (dispatch) {
            dispatch({
                type: 'er_data/saveDataSource',
                payload: dataSource
            })
        }

        setModalButtonClicked('ok')
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
                console.log('费用日期：', moment(text, dateFormat))
                return moment(text).format(dateFormat) || null;
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
                                onConfirm={() => handleDelete(record.key)}>
                                <a href='/#'>删除</a>
                                {/* <Button>删除</Button> */}
                            </Popconfirm>
                            |
                            <a href='javascript:;' onClick={() => EditClick(record)}>编辑</a>
                        </div>
                    ) : null

        }
    ];

    const modalStyle = {
        height: '400px',
        width: '100%'
    }

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
    return (
        <div>
            {console.log(props.er_data)}
            <Table columns={columns} dataSource={dataSource}></Table>
            <Button type="primary" onClick={() => handleAdd()} >添加新项目</Button>
            <ModalWithPrevNext visible={modalOpen}
                title={modalTitle}
                onOk={modalOkClick}
                onCancel={modalCancelClick}
                destroyOnClose={true}
                maskClosable={false}
                // style={{ width: '1000px' }}
                width='700px'
                bodyStyle={modalStyle}
                forceRender={true}
                updateRecord={updateRecord}
                // record={editingRecord}
                currentIndex={editingRecordIndex}
                dataSource={dataSource}

                buttonClicked={modalButtonClicked}>
                <AddNewModal
                    record={editingRecord}
                    currentIndex={editingRecordIndex}
                    columns={columns}
                    cabinTypeCodes={cabinTypeCodes}
                    taxCodes={taxCodes}></AddNewModal>
            </ModalWithPrevNext>
        </div>
    );
}

export default connect(({ cabinTypeCodes, taxCodes, er_data, loading }) => ({
    cabinTypeCodes: cabinTypeCodes.values,
    taxCodes: taxCodes.values,
    er_data: er_data.remoteDataSource,
    editingRecord: er_data.editingRecord,
    fetchRemoteData: loading.effects["er_data/fetchRemoteData"]
}))(Aladin)