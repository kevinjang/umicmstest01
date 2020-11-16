import React from 'react'
import {
    Form, Button, Select, Layout, Modal, Table, Popconfirm, Spin, message
} from 'antd'
import LeaveAuthorizationModal from './LeaveAuthorizationModal'
import { FileOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons'

const { Option } = Select;

import styles from './LeaveAuthorization.css';
import { connect } from 'umi';

import SearchSquare from 'ksnlSearchSquare'

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            dataSource: props.dataSource,
            cancelButtonAvailable: false,
            selectedRowKeys: [],
            editingRecord: null,
            allCount: 0,
            pageSize: 10,
            current: 0,
            operation: '',
            filterCol: '-',
            notificationModalShow: false,
            okButtonAvailable: false,
            spinning: false
        };

        this.dispatch = props.dispatch;

        this.pagination = {
            pageSize: 10,
            total: 0,
            current: 1,
            showQuickJumper: true,
            onChange: (current, pageSize) => {
                this.pagination.current = current;
                this.pagination.pageSize = pageSize;
                this.setState({
                    pageSize,
                    current
                }, () => {
                    this.loadData();
                })
            },
            showTotal: function (total, range) {
                return `共计${total}条数据，当前显示${range.toString().replace(',', '~')}`
            }
        }

        this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: '3.3%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: false
            },
            {
                title: '离职人员ID',
                dataIndex: 'PersonalID',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '离职人员AD',
                dataIndex: 'userAD',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '离职人员姓名',
                dataIndex: 'UserCname',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '授权人员ID',
                dataIndex: 'quanxianPersonalID',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '授权人员AD',
                dataIndex: 'quanxianAD',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '授权人员姓名',
                dataIndex: 'quanxianCname',
                width: '15%',
                visible: true,
                editable: false,
                align: 'center',
                asQuery: true
            },
            {
                title: '操作',
                width: '5%',
                align: 'center',
                asQuery: false,
                render: (text, record) => {
                    return <div>
                        <a href='javascript:;' onClick={() => this.handleEditRecord(record)}>
                            {/* <Icon type='file'></Icon> */}
                            <FileOutlined />
                        </a>
                        <Popconfirm okText="确定删除" cancelText="取消" title='确定删除吗？' onConfirm={() => this.handleDeleteRecord(record)}>
                            <a href='javascript:;'>
                                {/* <Icon type='delete'>
                                </Icon> */}
                                <DeleteOutlined />
                            </a>
                        </Popconfirm>
                    </div>
                }
            }
        ];

        this.tableOptions = {
            pagination: this.pagination,
            columns: this.columns,
            style: {
                paddingBottom: '10px',
                width: '99%'
            },
            bordered: true
        }

        this.formRef = React.createRef();
        this.form = null;
    }

    componentDidMount() {
        this.form = this.formRef.current;
        this.loadData();
    }

    loadData = async () => {
        const { activeKey, selfID } = this.props;
        if (activeKey !== selfID) return false;

        this.setState({
            spinning: true,
            selectedRowKeys: []
        })

        // 此处调用查询函数
        const { pageSize, current } = this.state
        if (this.dispatch) {
            this.dispatch({
                type: 'LeaveAuthModel/fetchData',
                payload: {
                    pageSize,
                    startPage: current,
                    condition: null,
                    callback: this.queryCallBack
                }
            })
        }
    }

    queryCallBack = (e) => {
        const {
            dataSource,
            allCount,
            // spinning
        } = e;

        this.pagination.total = allCount;

        this.setState({
            dataSource,
            allCount,
            spinning: false
        })
    }

    handleDeleteSelectedRecords = () => {
        this.setState({
            notificationModalShow: false
        })

        const { selectedRowKeys } = this.state;

        if (!selectedRowKeys || selectedRowKeys.length === 0) {
            message.info('请选择要删除的记录！');
            return;
        }

        var toDeleteItemsIDs = [];
        var toDeleteItems = this.state.dataSource.filter(it => selectedRowKeys.includes(it.key));

        toDeleteItems.forEach(it => {
            toDeleteItemsIDs.push(it.ID);
        })

        Modal.confirm({
            centered: true,
            content: '确认删除已选中的行吗？',
            cancelText: '放弃删除',
            okText: '确认删除',
            onCancel:()=>{
                return ;
            },
            onOk:()=>{
                const { dispatch } = this.props
                if (dispatch) {
                    dispatch({
                        type: 'LeaveAuthModel/deleteItems',
                        payload: {
                            ids: toDeleteItemsIDs,
                            callback: this.loadData
                        }
                    })
                }
            }
        });        
    }

    handleDeleteRecord = (record) => {

        const item = this.state.dataSource.filter(it => it.ID === record.ID)[0] || null;
        if (!!item) {
            this.setState({
                selectedRowKeys: []
            })
            const ids = [item.ID];
            // console.log('ids:', ids)
            //NOTE: old version with the situation of  deleteItem(item.ID, this.loadData);
            const { dispatch } = this.props
            if (dispatch) {
                dispatch({
                    type: 'LeaveAuthModel/deleteItems',
                    payload: {
                        ids,
                        callback: this.loadData
                    }
                })
            }

        }
    }

    updateOkButtonAvailable = (value) => {
        this.setState({
            okButtonAvailable: value
        })
    }

    updateCancelButtonAvailable = (value) => {
        this.setState({
            cancelButtonAvailable: value
        })
    }

    getUpdateColumns = (record) => {
        // 获取需要更新的列信息
        const { remoteCurrentEditingRecord: editingRecord } = this.props
        const updateColumns = [];
        if (editingRecord["PersonalID"] !== record["PersonalID"]) {
            updateColumns.push({
                name: "PersonalID",
                value: record["PersonalID"]
            })
        }
        if (editingRecord["userAD"] !== record["userAD"]) {
            updateColumns.push({
                name: "userAD",
                value: record["userAD"]
            })
        }
        if (editingRecord["UserCname"] !== record["UserCname"]) {
            updateColumns.push({
                name: "UserCname",
                value: record["UserCname"]
            })
        }
        if (editingRecord["quanxianPersonalID"] !== record["quanxianPersonalID"]) {
            updateColumns.push({
                name: "quanxianPersonalID",
                value: record["quanxianPersonalID"]
            })
        }
        if (editingRecord["quanxianAD"] !== record["quanxianAD"]) {
            updateColumns.push({
                name: "quanxianAD",
                value: record["quanxianAD"]
            })
        }
        if (editingRecord["quanxianCname"] !== record["quanxianCname"]) {
            updateColumns.push({
                name: "quanxianCname",
                value: record["quanxianCname"]
            })
        }
        return updateColumns
    }

    handleOkModal = () => {
        this.setState({
            modalShow: false
        });

        let record = { ...this.state.editingRecord };
        const { dispatch } = this.props
        var methodName = "insertItem";

        const { operation } = this.state;
        if (operation === 'insert') {
            methodName = "insertItem";
            if (dispatch) {
                dispatch({
                    type: `LeaveAuthModel/${methodName}`,
                    payload: {
                        record,
                        callback: this.loadData
                    }
                })
            }
        }
        else if (operation === 'update') {
            const { ID } = record;
            const item = this.state.dataSource.filter(it => it.key === ID)[0] || null;

            // NOTE: 需要更新的列及新值
            const ucls = this.getUpdateColumns(record)

            if (!!item) {
                record["ID"] = item.ID;
            }
            methodName = "updateItem";
            if (dispatch) {
                dispatch({
                    type: `LeaveAuthModel/${methodName}`,
                    payload: {
                        record,
                        updates: ucls,
                        where: ` ID = '${record["ID"]}'`,
                        callback: this.loadData
                    }
                })
            }
        }
    };

    handleCancelModal = () => {
        this.setState({
            modalShow: false
        });
    };

    handleTableRowSelectedChange = (selectedRowKeys) => {

        this.setState({ selectedRowKeys }, () => {
            console.info(this.state.selectedRowKeys)
        })
    }

    handleFilterSelectChange = (e) => {
        this.setState({
            filterCol: e
        });
    }

    handleEditRecord = (record) => {
        this.setState({
            operation: 'update',
            editingRecord: record,
            modalShow: true
        })

        // const { dispatch } = this.props
        // if (dispatch) {
        //     dispatch({
        //         type: "LeaveAuthModel/setCurrentEditingRecord",
        //         payload: {
        //             record
        //         }
        //     })
        // }
    }

    handleAddRecord = () => {
        const newRecord = {
            key: (this.state.dataSource.length).toString(),
            RowNum: this.state.dataSource.length + 1,
            PersonalID: '',
            userAD: '',
            UserCname: '',
            quanxianPersonalID: '',
            quanxianAD: '',
            quanxianCname: '',
            valid: 'valid'
        };
        this.setState({
            editingRecord: newRecord,
            operation: 'insert',
            modalShow: true
        })
    }

    updateEditingRecordState = (record) => {
        this.setState({
            editingRecord: record
        })
    }

    render() {
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: this.handleTableRowSelectedChange,
            onClick: (e) => {
                console.log(this.state.selectedRowKeys)
            },
            onSelectInvert: (selectedRowKeys) => {

            }
        }

        const tableFooter = () => {
            return '';//`共计${this.state.allCount}条数据`
        }

        return (
            <Spin tip="加载中..." spinning={this.state.spinning}>
                <div className={styles.mainContainer}>
                    <Layout>
                        <div style={{ width: '100%', float: 'right' }}>
                            <SearchSquare dispatch={this.dispatch} modelType={"LeaveAuthModel"}
                                columns={this.columns} loadCallback={this.queryCallBack}
                                buttons={
                                    [
                                        <Button key="batch_del_btn" type="danger" icon={
                                            <DeleteOutlined />
                                        } onClick={
                                            this.handleDeleteSelectedRecords
                                        } >删除所选</Button>,
                                        <Button key="add_btn" type="primary" icon={
                                            <FileAddOutlined />
                                        } onClick={this.handleAddRecord}>新增</Button>
                                    ]
                                } />
                        </div>
                        <Layout>
                            <Form style={{ padding: '0 5px' }} ref={this.formRef}>
                                <Form.Item style={{ width: '100%' }}>
                                    <Table
                                        size="small"
                                        dataSource={this.state.dataSource}
                                        rowSelection={rowSelection}
                                        onRow={
                                            (record, index) => {
                                                return {
                                                    onDoubleClick: (event) => {
                                                        this.setState({
                                                            operation: 'update'
                                                        })
                                                        this.handleEditRecord(record);
                                                    },
                                                    onClick: (event) => {
                                                        const { selectedRowKeys } = this.state;
                                                        const { ID } = record

                                                        var newSelectedKeys = [];

                                                        if (selectedRowKeys.indexOf(ID.toString() > 0)) {
                                                            newSelectedKeys = selectedRowKeys.filter(id => id !== ID);
                                                        }
                                                        else {
                                                            newSelectedKeys = [...selectedRowKeys, ID.toString()]
                                                        }

                                                        this.setState({
                                                            selectedRowKeys: newSelectedKeys
                                                        })
                                                    }
                                                }
                                            }
                                        }
                                        footer={tableFooter}
                                        {...this.tableOptions}
                                    >

                                    </Table>
                                </Form.Item>
                            </Form>
                        </Layout>
                    </Layout>
                    <Modal visible={this.state.modalShow}
                        width="48%"
                        style={{
                            minWidth: '920px'
                        }}
                        title='编辑项目'
                        operation={this.state.operation}
                        okButtonProps={{ disabled: !this.state.okButtonAvailable }}
                        centered={true}
                        onOk={this.handleOkModal}
                        onCancel={this.handleCancelModal}
                        okText="保存"
                        cancelText="取消"
                        destroyOnClose={true}
                        forceRender={true}
                        maskClosable={false}
                        closable={false}>

                        <LeaveAuthorizationModal
                            editingRecord={this.state.editingRecord}
                            updateParentState={(record) => this.updateEditingRecordState(record)}
                            updateOkButtonAvailable={(value) => this.updateOkButtonAvailable(value)}
                            updateCancelButtonAvailable={(value) => this.updateCancelButtonAvailable(value)}>

                        </LeaveAuthorizationModal>
                    </Modal>
                    {/* <Modal title="确认提示"
                        okText="确认删除"
                        cancelText="不删除"
                        visible={this.state.notificationModalShow}
                        onOk={this.handleDeleteSelectedRecords}
                        onCancel={() => {
                            this.setState({
                                notificationModalShow: false
                            })
                        }}>
                        确认删除选中数据吗？
                    </Modal> */}
                </div >
            </Spin >);
    }
}

export default connect(({ LeaveAuthModel }) => {
    // console.log('LeaveAuthModel dataSource:', LeaveAuthModel.dataSource)
    return {
        LeaveAuthModel,
        dataSource: LeaveAuthModel.dataSource,
        searchCondition: LeaveAuthModel.searchCondition,
        remoteCurrentEditingRecord: LeaveAuthModel.currentEditingRecord
    }
})(LeaveAuthorization)