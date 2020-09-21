import React from 'react'
import {
    Form, Input, Button, Select, Layout, Row,
    Col, Icon, Modal, Table, Popconfirm, message, Pagination, Spin, Space
} from 'antd'
import LeaveAuthorizationModal from './LeaveAuthorizationModal'
import { FileOutlined, DeleteOutlined, SearchOutlined, FileAddOutlined } from '@ant-design/icons'
const { Header } = Layout;

const { Option } = Select;

import {
    getByPage,
    insert, update, deleteItem,
    deleteItems
} from '../../utils/toserver/BasePeopleUtil';

import SearchSquare from '../../CommonUtility/BPM_RM/SearchSquare'

import styles from './LeaveAuthorization.css';
import { connect } from 'umi';

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);

        this.dataSource = props.dataSource;
        this.spinning = props.spinning;

        this.state = {
            modalShow: false,
            okButtonAvailable: false,
            cancelButtonAvailable: false,
            selectedRowKeys: [],
            editingRecord: null,
            dataSource: this.dataSource,
            allCount: 0,
            pagi_pageSize: 10,
            // pagi_total: 0,
            pagi_current: 0,
            // spinning,
            operation: '',
            filterCol: '-'
        };

        this.pagination = {
            pageSize: 10,
            total: 0,
            current: 1,
            onChange: (page, pageSize) => {
                this.pagination.current = page;
                this.setState({
                    pagi_pageSize: pageSize,
                    pagi_current: page
                }, () => {
                    this.loadData();
                })
            }
        }

        this.columns = [
            {
                title: '序号',
                dataIndex: 'key',
                width: '3.3%',
                visible: true,
                editable: false
            },
            {
                title: '离职人员ID',
                dataIndex: 'PersonalID',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '离职人员AD',
                dataIndex: 'userAD',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '离职人员姓名',
                dataIndex: 'UserCname',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '授权人员ID',
                dataIndex: 'quanxianPersonalID',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '授权人员AD',
                dataIndex: 'quanxianAD',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '授权人员姓名',
                dataIndex: 'quanxianCname',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '操作',
                width: '5%',
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

        this.options = [
            <Option value='none'>请选择过滤字段</Option>,
            <Option value='PersonalID'>离职人员ID</Option>,
            <Option value='userAD'>离职人员AD</Option>,
            <Option value='UserCname'>离职人员姓名</Option>,
            <Option value='quanxianPersonalID'>授权人员ID</Option>,
            <Option value='quanxianAD'>授权人员AD</Option>,
            <Option value='quanxianCname'>授权人员姓名</Option>
        ]

        this.formRef = React.createRef();

        this.formRefSearch = React.createRef();

        this.form = null;
        this.formSearch = null;
    }

    handleDeleteRecord = (record) => {

        const item = this.state.dataSource.filter(it => it.key === record.key)[0] || null;
        if (!!item) {
            this.setState({
                selectedRowKeys: []
            })
            deleteItem(item.ID, this.loadData);
        }
    }

    componentDidMount() {
        this.form = this.formRef.current;
        this.formSearch = this.formRefSearch.current;
        this.loadData();
    }

    loadData = async () => {
        // const { searchCondition } = this.props;
        // const condition = searchCondition ? {
        //     name: searchCondition.keyWord,
        //     value: searchCondition.keyText
        // } : null;

        const condition = {
            name: this.formSearch.getFieldValue("condition_select"),
            value: this.formSearch.getFieldValue("condition_input")
        }


        const { activeKey, selfID } = this.props;
        if (activeKey !== selfID) return false;
        this.setState({
            spinning: true
        })
        console.log('this.state.pagi_current:', this.state.pagi_current)
        // 此处调用查询函数
        // getByPage(this.state.pagi_pageSize, this.state.pagi_current, condition, this.queryCallBack);
        const { dispatch } = this.props
        if (dispatch) {
            console.log('typeof dispatch:', typeof dispatch)
            dispatch({
                type: 'LeaveAuthModel/fetchData',
                payload: {
                    pageSize: this.state.pagi_pageSize,
                    startPage: this.state.pagi_current,
                    condition,
                    callback: this.queryCallBack
                }
            })


        }
    }

    queryCallBack = (e) => {
        const {
            PaginationTotal,
            dataSource,
            allCount,
            pagi_total,
            spinning
        } = e;

        this.pagination.total = PaginationTotal;

        this.setState({
            dataSource,
            allCount,
            pagi_total,
            spinning
        }, () => {
            // console.log('dataSource:', this.state.dataSource)
        })
    }

    handleDeleteSelectedRecords = () => {
        const { selectedRowKeys } = this.state;
        // console.log('selectedRowKeys:', selectedRowKeys);
        if (!selectedRowKeys || selectedRowKeys.length === 0) {
            message.info('请选择要删除的记录！');
            return;
        }

        var toDeleteItemsIDs = [];
        var toDeleteItems = this.state.dataSource.filter(it => selectedRowKeys.includes(it.key));

        toDeleteItems.forEach(it => {
            toDeleteItemsIDs.push(it.ID);
        })

        deleteItems(toDeleteItemsIDs, this.loadData).then((response) => {
            // console.log('delete multiple item result:', response.data.result.message)
            if (response && response.data && response.data.result && response.data.result.message) {
                message.success(response.data.result.message)
                this.setState({
                    selectedRowKeys: []
                })
            }
            else {
                message.error(response.statusText);
            }

            this.loadData();
        }).catch(err => {
            if (err)
                console.log('delete multiple item error:', err);
        });
    }

    handleSearch = (e) => {
        // 放大镜-加载按钮
        e.preventDefault();
        this.loadData();
    }

    handleSubmit = (e) => {
        e.preventDefault();
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

    handleOkModal = () => {
        this.setState({
            modalShow: false
        });

        let record = this.state.editingRecord;
        const { operation } = this.state;
        if (operation === 'insert')
            insert(record, this.loadData);
        else if (operation === 'update') {
            const { RowNum } = record;
            const item = this.state.dataSource.filter(it => it.key === RowNum)[0] || null;
            const toUpdateRecord = {
                ...record
            }
            // console.log('update matched item:', item)
            if (!!item) {
                toUpdateRecord["ID"] = item.ID;
            }
            update(toUpdateRecord, this.loadData)
        }
    };

    handleCancelModal = () => {
        this.setState({
            modalShow: false
        });
    };

    onTableRowSelectedChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys })
    }

    onFilterSelectChange = (e) => {
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
        // console.log('updateEditingRecordState-record:', record);
        this.setState({
            editingRecord: record
        }, () => {
            // console.log('parent-editingRecord:', this.state.editingRecord)
        })
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onTableRowSelectedChange
        }

        const tableFooter = () => {
            return `共计${this.state.allCount}条数据`
        }

        return (
            <Spin tip="加载中..." spinning={this.spinning}>
                <div className={styles.mainContainer}>
                    <Layout>
                        <div style={{ width: '100%', float: 'right' }}>
                            {/* <SearchSquare selectOptions={this.options} loadData={this.loadData}></SearchSquare> */}
                            <Form ref={this.formRefSearch}>
                                <Space style={{ float: 'right', marginRight: '50px' }}>
                                    <Form.Item name="condition_select">
                                        <Select style={{ width: '150px' }} >
                                            {this.options}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="condition_input">
                                        <Input style={{ width: '120px' }}
                                            onPressEnter={() => {
                                                // NOTE: dispatch更新searchCondition去
                                                // setCondition();
                                            }}
                                            onBlur={() => {
                                                // NOTE: dispatch更新searchCondition去
                                                // setCondition();
                                            }}
                                            onChange={() => {
                                                // NOTE: dispatch更新searchCondition去
                                                // setCondition();
                                            }}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button icon={<SearchOutlined />} onClick={() => {
                                            const { dataSource } = this.props
                                            console.log('dataSource newest:', dataSource)
                                        }}>搜索</Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type='danger' onClick={this.handleDeleteSelectedRecords} icon={<DeleteOutlined />}>删除所选</Button>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" onClick={this.handleAddRecord} icon={<FileAddOutlined />}>添加</Button>
                                    </Form.Item>
                                </Space>
                            </Form>
                        </div>
                        <Layout>
                            <Form style={{ padding: '0 5px' }} ref={this.formRef}>
                                <Row gutter={12}>
                                    <Form.Item style={{ width: '100%' }}>
                                        <Table columns={this.columns}
                                            dataSource={this.state.dataSource}
                                            bordered style={{ paddingBottom: '10px', width: '99%' }}
                                            rowSelection={rowSelection}
                                            onRow={
                                                (record, index) => {
                                                    return {
                                                        onDoubleClick: (event) => {
                                                            this.setState({
                                                                operation: 'update'
                                                            })
                                                            // console.log('dclick record:', record)
                                                            this.handleEditRecord(record);
                                                        }
                                                    }
                                                }
                                            }
                                            pagination={this.pagination}
                                            footer={tableFooter}
                                        >

                                        </Table>
                                    </Form.Item>
                                </Row>
                            </Form>
                        </Layout>
                    </Layout>
                    <Modal visible={this.state.modalShow}
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
                </div >
            </Spin >);
    }
}

export default connect(({ LeaveAuthModel }) => ({
    LeaveAuthModel,
    dataSource: LeaveAuthModel.dataSource,
    spinning: LeaveAuthModel.spinning,
    searchCondition: LeaveAuthModel.searchCondition
}))(LeaveAuthorization)