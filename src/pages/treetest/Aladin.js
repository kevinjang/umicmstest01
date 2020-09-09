import React from 'react'
import { Table, Popconfirm, message, Modal, Button, Icon } from 'antd';
import AddNewModal from './AddNewModal'
import moment from 'moment'
import { connect } from 'umi'
import { updateWith, update } from 'lodash'

const dateFormat = 'YYYY/MM/DD';

import ModalWithPrevNext from '../../CommonUtility/ModalUtils/ModalPrevNextSwitch'
import { find } from 'lodash';

class Aladin extends React.Component {
    constructor(props) {
        super(props);


        this.CabinTypeCodes = props.cabinTypeCodes

        this.TaxCodes = props.taxCodes

        this.numberControls = ['ExpenseTraffic', 'ExpenseBoat'
            , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther']

        this.drpControls = ['ExpenseHotelTaxCode', 'CabinType']

        this.allUpdateColumns = ['ExpenseTraffic', 'ExpenseBoat'
            , 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther', 'ExpenseHotelTaxCode', 'CabinType', 'ExpenseTime', 'ExpenseAddress', 'ExpenseSum']

        this.originalRecord = null;

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

        this.originalDataSource = [{
            key: '0',
            RowNum: '1',
            ExpenseTime: moment(new Date(), dateFormat),
            ExpenseAddress: '北京',
            CabinType: '2',
            ExpenseTraffic: 123,
            ExpenseBoat: 0,
            ExpenseBaggage: 0,
            ExpenseHotel: 0,
            ExpenseHotelTaxCode: '_',
            ExpenseMeal: 0,
            ExpenseOther: 0,
            ExpenseSum: 123,
            InvoiceNo: '123123123'
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
        }]
        this.state = {
            dataSource: [...this.originalDataSource],
            editingRecord: null,
            editingRecordIndex: 0,
            modalOpen: false,
            modalTitle: '添加新项目',
            form: null,
            modalButtonClicked: ''
        }
    }

    getNumberForInput(value) {
        return parseFloat(value) || 0
    }

    EditClick = (record) => {
        this.originalRecord = { ...record }
        let index = this.state.dataSource.findIndex(item => item.key === record.key);
        this.setState({
            editingRecord: record,
            editingRecordIndex: index,
            modalOpen: true,
            modalTitle: '编辑项目'
        });

        // const modal = Modal.success();
        // console.log('modal',modal);
    }

    modalOkClick = () => {
        // 想在这里实现点击校验，校验内容的方法又不在这里实现，有点尴尬，学习去了
        this.modalClose();

        this.updateDataSource();
    }

    updateDataSource = () => {
        // 点击ok时才会调用的方法，用于更新数据源
        let { dataSource, editingRecord } = this.state;

        let item = dataSource.find(item1 => item1.key === editingRecord.key);
        if (!item) {
            // item = editingRecord;
            dataSource[dataSource.length] = editingRecord;
        } else {
            let index = dataSource.findIndex(item1 => item1.key === editingRecord.key)
            item = { ...editingRecord }
            dataSource[index] = item;
        }

        this.originalDataSource = dataSource;

        this.setState({
            dataSource,
            modalButtonClicked: 'ok'
        })
    }

    modalCancelClick = () => {
        this.modalClose();

        // if (this.originalRecord) {
        //     const data = [...this.state.dataSource];
        //     var item = find(data, item => item.id === this.originalRecord.id);
        //     // updateWith()
        //     if (item) {
        //         // updateWith(item, this.allUpdateColumns, (nsValue, key,nsObject)=>{
        //         //     return this.originalRecord[key]
        //         // })
        //         item = this.originalRecord;


        //         this.setState({
        //             dataSource: data,
        //             modalButtonClicked: 'cancel'
        //         })
        //     }
        //     else {
        //         this.setState({
        //             // dataSource: [...this.state.dataSource, this.originalRecord],
        //             modalButtonClicked: 'cancel'
        //         })
        //     }
        // }
        if (this.originalDataSource) {
            this.setState({
                dataSource: this.originalDataSource,
                modalButtonClicked: 'cancel'
            })
        } else {
            this.setState({
                // dataSource: [...this.state.dataSource, this.originalRecord],
                modalButtonClicked: 'cancel'
            })
        }
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

        this.setState({
            modalOpen: true,
            editingRecordIndex: count,
            editingRecord: newData
        })
    }

    handleDelete = (index) => {
        // console.log('handleDelete-index',index);

        // 删除当前行项目，刷新各记录RowNum
        let { dataSource } = this.state;

        let currentItem = dataSource[index];

        // let rightIndex = dataSource.length-1;
        // dataSource.reduceRight(() => {

        // })

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

        this.setState({
            dataSource
        })
    }

    previousRecord = () => {
        // 
        if (this.state.editingRecordIndex === 0) {
            message.info('已经是第一条记录', 3)
            return false;
        }

        let index = this.state.editingRecordIndex - 1;
        let item = this.state.dataSource[index];
        this.setState({
            editingRecord: item,
            editingRecordIndex: index
        })
    }

    nextRecord = () => {
        if (this.state.editingRecordIndex === this.state.dataSource.length - 1) {
            message.info('已经是最后一条记录', 3);
            return false;
        }

        let index = this.state.editingRecordIndex + 1;
        let item = this.state.dataSource[index];
        this.setState({
            editingRecord: item,
            editingRecordIndex: index
        })

    }

    updateRecord = (record, index) => {
        this.setState({
            editingRecord: record,
            editingRecordIndex: index
        })
    }

    render() {
        const modalStyle = {
            height: '400px',
            width: '100%'
        }
        return <div>
            <Table columns={this.columns}
                dataSource={this.state.dataSource}
                bordered
                onRow={
                    record => {
                        return {
                            onDoubleClick: event => {
                                let index = this.state.dataSource.findIndex(item => item.key === record.key);
                                this.originalRecord = { ...record }
                                this.setState({
                                    editingRecord: record,
                                    editingRecordIndex: index,
                                    modalOpen: true,
                                    modalTitle: '编辑项目'
                                });
                            }
                        }
                    }
                }>

            </Table>
            <Button type='primary' onClick={this.handleAdd}>添加新项目</Button>
            <ModalWithPrevNext visible={this.state.modalOpen}
                title={this.state.modalTitle}
                onOk={this.modalOkClick}
                onCancel={this.modalCancelClick}
                destroyOnClose={true}
                maskClosable={false}
                // style={{ width: '1000px' }}
                width='700px'
                bodyStyle={modalStyle}
                forceRender={true}

                updateRecord={this.updateRecord}
                record={this.state.editingRecord}
                currentIndex={this.state.editingRecordIndex}
                dataSource={this.state.dataSource}

                buttonClicked={this.state.modalButtonClicked}>
                <AddNewModal
                    record={this.state.editingRecord}
                    currentIndex={this.state.editingRecordIndex}
                    columns={this.columns}
                    cabinTypeCodes={this.CabinTypeCodes}
                    taxCodes={this.TaxCodes}></AddNewModal>
            </ModalWithPrevNext>


        </div>
    }
}

export default connect(({ cabinTypeCodes, taxCodes }) => ({
    cabinTypeCodes: cabinTypeCodes.values
    , taxCodes: taxCodes.values
}))(Aladin)