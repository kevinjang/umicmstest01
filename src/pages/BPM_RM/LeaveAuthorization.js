import React from 'react'
import {
    Form, Input, Button, Select, Layout, Row,
    Col, Icon, Modal, Table, Popconfirm, message, Pagination, Spin
} from 'antd'

import LeaveAuthorizationModal from './LeaveAuthorizationModal'

import axios from 'axios'

const { Header } = Layout;

const { Option } = Select;

import {
    getByPage,
    insert, update, deleteItem,
    deleteItems
} from '../../utils/toserver/BasePeopleUtil'

import styles from './LeaveAuthorization.css';

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);

        console.log('la-props:', props);

        this.state = {
            modalShow: false,
            okButtonAvailable: false,
            cancelButtonAvailable: false,
            selectedRowKeys: [],
            editingRecord: null,
            dataSource: [],
            allCount: 0,
            pagi_pageSize: 10,
            pagi_total: 0,
            pagi_current: 0,
            spinning: false,
            operation: ''
        };

        this.pagination = {
            pageSize: 10,
            total: 0,
            current: 0,
            onChange: (page, pageSize) => {
                // console.log('pagination - page:', page);
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
                dataIndex: 'RowNum',
                width: '3.3%',
                visible: true,
                editable: false
            },
            // {
            //     // title: '序号',
            //     dataIndex: 'ID',
            //     width: 0,
            //     visible: false,
            //     editable: false,
            //     render:function(text, record){
            //         return <div style={{display:'none'}}>text</div>
            //     }
            // },
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
                    // console.log('render-this', this)
                    return <div>
                        <a href='javascript:;' onClick={() => this.handleEditRecord(record)}> <Icon type='file'></Icon></a>
                        <Popconfirm title='确定删除吗？' onConfirm={() => this.handleDeleteRecord(record)}>
                            <a href='javascript:;'>
                                <Icon type='delete'>
                                </Icon></a>
                        </Popconfirm>
                    </div>
                }
            }
        ]
    }

    handleDeleteRecord = (record) => {
        // this.setState({
        //     dataSource: this.state.dataSource.filter(item => item.key !== record.key)
        // })

        const item = this.state.dataSource.filter(it => it.key === record.key)[0] || null;
        if (!!item) {
            this.setState({
                selectedRowKeys:[]
            })
            deleteItem(item.ID, this.loadData);
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { getFieldValue } = this.props.form;
        var leaveauth_filterKeyWord = getFieldValue('leaveauth_filterKeyWord');
        var leaveauth_filter_text = getFieldValue('leaveauth_filter_text');
        const condition = leaveauth_filterKeyWord === 'none' ? null : {
            name: leaveauth_filterKeyWord,
            value: leaveauth_filter_text
        }

        const { activeKey, selfID } = this.props;
        if (activeKey !== selfID) return false;
        this.setState({
            spinning: true
        })
        // var baseURL = axios.defaults.baseURL = "http://localhost:3000";
        // console.log('condition:', condition)
        // 此处调用查询函数
        getByPage(this.state.pagi_pageSize, this.state.pagi_current, condition, this.queryCallBack);
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
        },()=>{
            console.log('dataSource:', this.state.dataSource)
        })
    }

    handleDeleteSelectedRecords = () => {
        const { selectedRowKeys } = this.state;
        console.log('selectedRowKeys:', selectedRowKeys);
        if (!selectedRowKeys || selectedRowKeys.length === 0) {
            message.info('请选择要删除的记录！');
            return;
        }

        var toDeleteItemsIDs = [];
        var toDeleteItems = this.state.dataSource.filter(it=> selectedRowKeys.includes(it.key));

        toDeleteItems.forEach(it=>{
            toDeleteItemsIDs.push(it.ID);
        })

        deleteItems(toDeleteItemsIDs, this.loadData).then((response) => {
            console.log('delete multiple item result:', response.data.result.message)
            if (response && response.data && response.data.result && response.data.result.message) {
                message.success(response.data.result.message)
                this.setState({
                    selectedRowKeys:[]
                })
            }
            else {
                message.error(response.statusText);
            }
    
            // if (callback) {
            //     callback();
            // }
            this.loadData();
        }).catch(err => {
            if (err)
                console.log('delete multiple item error:', err);
        });
    }

    handleSearch = (e) => {
        // 放大镜-加载按钮
        e.preventDefault();
        // alert(e.target.value);
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
            const item = this.state.dataSource.filter(it => it.new_id === RowNum)[0] || null;
            const toUpdateRecord = {
                ...record
            }
            console.log('update matched item:', item)
            if (!!item) {
                toUpdateRecord["ID"] = item.ID;
            }
            update(toUpdateRecord, this.loadData)
        }
        // ();
    };

    handleCancelModal = () => {
        this.setState({
            modalShow: false
        });
    };

    onTableRowSelectedChange = (selectedRowKeys) => {
        // console.log('onchange selectedrowkeys:', selectedRowKeys)
        this.setState({ selectedRowKeys })
    }

    handleEditRecord = (record) => {
        this.setState({
            operation: 'update',
            editingRecord: record,
            modalShow: true
        })
    }

    updateEditingRecordState = (record) => {
        console.log('updateEditingRecordState-record:', record);
        this.setState({
            editingRecord: record
        }, () => {
            console.log('parent-editingRecord:', this.state.editingRecord)
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onTableRowSelectedChange
        }

        const tableFooter = () => {
            return `共计${this.state.allCount}条数据`
        }

        return (
            <Spin tip="加载中..." spinning={this.state.spinning}>
                <div className={styles.mainContainer}>
                    <Layout>
                        <Header style={{ background: 'whitesmoke', }}>
                            <Form onSubmit={this.handleSubmit} style={{ paddingRight: '15px' }}>
                                <div style={{ float: 'right', width: '100%' }}>
                                    <Form.Item style={{ float: 'right' }}>
                                        {
                                            getFieldDecorator('leaveauth_add_button')(
                                                <Button type='primary' onClick={() => {

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
                                                }}>添加</Button>
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item style={{ float: 'right' }}>
                                        {
                                            getFieldDecorator('leaveauth_delete_button')(
                                                <Button type='danger' onClick={this.handleDeleteSelectedRecords}>删除所选</Button>
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item style={{ float: 'right' }}>
                                        {
                                            getFieldDecorator('leaveauth_filter_text')(
                                                <div style={{ display: 'flex', paddingTop: '3px' }}>
                                                    <Input style={{ width: '120px' }}
                                                        onPressEnter={this.handleSearch}
                                                        suffix={<a href="" onClick={this.handleSearch}><Icon type='search' /></a>} />
                                                    {/* <Button><Icon type='search' /></Button> */}
                                                </div>
                                            )
                                        }
                                    </Form.Item>
                                    <Form.Item style={{ float: 'right' }}>
                                        {
                                            getFieldDecorator('leaveauth_filterKeyWord', {
                                                initialValue: 'none'
                                            })(
                                                <Select style={{ width: '150px' }} >
                                                    <Option value='none'>请选择过滤字段</Option>
                                                    <Option value='PersonalID'>离职人员ID</Option>
                                                    <Option value='userAD'>离职人员AD</Option>
                                                    <Option value='UserCname'>离职人员姓名</Option>
                                                    <Option value='quanxianPersonalID'>授权人员ID</Option>
                                                    <Option value='quanxianAD'>授权人员AD</Option>
                                                    <Option value='quanxianCname'>授权人员姓名</Option>
                                                </Select>
                                            )}
                                    </Form.Item>
                                </div>
                            </Form>
                        </Header>
                        <Layout>
                            <Form style={{ padding: '0 5px' }}>
                                <Row gutter={8}>
                                    <Form.Item>
                                        <Table columns={this.columns}
                                            dataSource={this.state.dataSource}
                                            bordered style={{ paddingBottom: '10px' }}
                                            rowSelection={rowSelection}
                                            onRow={
                                                (record, index) => {
                                                    return {
                                                        onDoubleClick: (event) => {
                                                            this.setState({
                                                                operation: 'update'
                                                            })
                                                            console.log('dclick record:', record)
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
                        // okButtonDisabled={this.state.okButtonAvailable}
                        okButtonProps={{ disabled: !this.state.okButtonAvailable }}
                        // cancelButtonProps={{disabled: !this.state.cancelButtonAvailable}}
                        // okButtonProps={{}}
                        centered={true}
                        onOk={this.handleOkModal}
                        onCancel={this.handleCancelModal}
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
            </Spin>);
    }
}

const LeaveAuthorizationForm = Form.create({ name: 'leave_authorization' })(LeaveAuthorization);

class LeaveAuthorizationFormComp extends React.Component {
    constructor(props) {
        console.log('la-form-props:', props);
        super(props);
    }
    render() {
        return (
            <LeaveAuthorizationForm {...this.props}>

            </LeaveAuthorizationForm>
        );
    }
}

export default LeaveAuthorizationFormComp