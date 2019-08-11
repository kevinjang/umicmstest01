import React from 'react'
import { Form, Input, Button, Select, Layout, Row, Col, Icon, Modal, Table, Popconfirm, message } from 'antd'

import LeaveAuthorizationModal from './LeaveAuthorizationModal'

const { Header } = Layout;

// const { getFieldDecorator } = Form;

const { Option } = Select;

import styles from './LeaveAuthorization.css';

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            selectedRowKeys: [],
            editingRecord: null,
            dataSource: [
                {
                    key: '0',
                    RowNum: 1,
                    // checked: false,
                    PersonalID: 'cofco\\zoumeili',
                    userAD: 'cofco\\zoumeili',
                    UserCname: '邹美丽',
                    quanxianPersonalID: 'cofco\\zoumeili1',
                    quanxianAD: 'cofco\\zoumeili1',
                    quanxianCname: '邹美丽',
                    valid: true
                },
                {
                    key: '1',
                    RowNum: 2,
                    // checked: false,
                    PersonalID: 'cofco\\zhuxi',
                    userAD: 'cofco\\zhuxi',
                    UserCname: '朱希',
                    quanxianPersonalID: 'cofco\\xinyujing',
                    quanxianAD: 'cofco\\xinyujing',
                    quanxianCname: '辛玉婧',
                    valid: true
                }
            ]
        };

        this.columns = [
            {
                title: '序号',
                dataIndex: 'RowNum',
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
                title: '离职人员ID',
                dataIndex: 'quanxianPersonalID',
                width: '15%',
                visible: true,
                editable: false
            },
            {
                title: '离职人员AD',
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
                width: '3.3%',
                render: (text, record) => {
                    console.log('render-this', this)
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
        this.setState({
            dataSource: this.state.dataSource.filter(item => item.key !== record.key)
        })
    }

    handleDeleteSelectedRecords = () => {
        const {selectedRowKeys} = this.state.selectedRowKeys;
        if(!selectedRowKeys || selectedRowKeys.length ===0){
            message.info('请选择要删除的记录！');
            return;
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        // alert(e.target.value);
        const { getFieldValue } = this.props.form;
        console.log(getFieldValue('leaveauth_filter_text'));
        alert(getFieldValue('leaveauth_filter_text') || '请输入值');
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleOkModal = () => {
        this.setState({
            modalShow: false
        });
    };

    handleCancelModal = () => {
        this.setState({
            modalShow: false
        });
    };

    onTableRowSelectedChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }

    handleEditRecord = (record) => {
        this.setState({
            editingRecord: record,
            modalShow: true
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onTableRowSelectedChange
        }

        const tableFooter = () =>{
            return `共计${this.state.dataSource.length}条数据`
        }

        return (<div className={styles.mainContainer}>
            <Layout>
                <Header style={{ background: 'whitesmoke', }}>
                    <Form onSubmit={this.handleSubmit} style={{ paddingRight: '15px' }}>
                        <Row gutter={10} style={{ paddingBottom: '20px', paddingTop: '20px', float: 'right', width: '100%' }}>
                            <Form.Item style={{ float: 'right' }}>
                                {
                                    getFieldDecorator('leaveauth_add_button')(
                                        <Button type='primary' onClick={() => {
                                            
                                            const newRecord = {
                                                key: (this.state.dataSource.length).toString(),
                                                RowNum: this.state.dataSource.length+1,
                                                PersonalID: 'x',
                                                userAD: 'x',
                                                UserCname: 'x',
                                                quanxianPersonalID: 'y',
                                                quanxianAD: 'y',
                                                quanxianCname: 'y',
                                                valid: true
                                            }; 
                                            this.setState({
                                                editingRecord: newRecord,
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
                                        <Select style={{ width: '150px' }} value='none'>
                                            <Option value='none'>请选择过滤字段</Option>
                                            <Option value='PersonalID'>PersonalID</Option>
                                            <Option value='userAD'>userAD</Option>
                                            <Option value='UserCname'>UserCname</Option>
                                            <Option value='quanxianPersonalID'>quanxianPersonalID</Option>
                                            <Option value='quanxianAD'>quanxianAD</Option>
                                            <Option value='quanxianCname'>quanxianCname</Option>
                                        </Select>
                                    )}
                            </Form.Item>
                        </Row>
                    </Form>
                </Header>
                <Layout>
                    <Form style={{ padding: '0 15px' }}>
                        <Row gutter={8}>
                            <Form.Item label='离职员工发起申请授权管理'>
                                <Table columns={this.columns}
                                    dataSource={this.state.dataSource}
                                    bordered style={{ paddingBottom: '10px' }}
                                    rowSelection={rowSelection}
                                    onRow={
                                        (record) => {
                                            return {
                                                onDoubleClick: (event) => {
                                                    this.handleEditRecord(record);
                                                }
                                            }
                                        }
                                    }
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
                centered={true}
                onOk={this.handleOkModal}
                onCancel={this.handleCancelModal}
                destroyOnClose={true}
                forceRender={true}
                maskClosable={false}>

                <LeaveAuthorizationModal editingRecord={this.state.editingRecord}>

                </LeaveAuthorizationModal>
            </Modal>
        </div>);
    }
}

const LeaveAuthorizationForm = Form.create({ name: 'leave_authorization' })(LeaveAuthorization);

class LeaveAuthorizationFormComp extends React.Component {
    render() {
        return (
            <LeaveAuthorizationForm >

            </LeaveAuthorizationForm>
        );
    }
}

export default LeaveAuthorizationFormComp