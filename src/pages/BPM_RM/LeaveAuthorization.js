import React from 'react'
import { Form, Input, Button, Select, Layout, Row, Col, Icon, Modal } from 'antd'

import LeaveAuthorizationModal from './LeaveAuthorizationModal'

const { Header } = Layout;

// const { getFieldDecorator } = Form;

const { Option } = Select;

import styles from './LeaveAuthorization.css';

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        // alert(e.target.value);
        const {getFieldValue} = this.props.form;
        console.log(getFieldValue('leaveauth_filter_text'));
        alert(getFieldValue('leaveauth_filter_text')||'');
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<div className={styles.mainContainer}>
            <Layout>
                <Header style={{background: 'whitesmoke',}}>
                    <Form onSubmit={this.handleSubmit} style={{ paddingRight: '15px'}}>
                        <Row gutter={1}>
                            <Col span={4} >
                                <Form.Item >
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
                            </Col>
                            <Col span={2} >
                                <Form.Item>
                                    {
                                        getFieldDecorator('leaveauth_filter_text')(
                                            <div style={{ display: 'flex',paddingTop: '3px' }}>
                                                <Input style={{ width: '120px' }} 
                                                    suffix={<a href="" onClick={this.handleSearch}><Icon type='search' /></a>} />
                                                {/* <Button><Icon type='search' /></Button> */}
                                            </div>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={2} >
                                <Form.Item>
                                    {
                                        getFieldDecorator('leaveauth_delete_button')(
                                            <Button type='danger'>删除所选</Button>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={2} >
                                <Form.Item>
                                    {
                                        getFieldDecorator('leaveauth_add_button')(
                                            <Button type='primary' onClick={()=>{this.setState({modalShow: true})}}>添加</Button>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Header>
            </Layout>
            <Modal visible={this.state.modalShow}>
                <LeaveAuthorizationModal></LeaveAuthorizationModal>
            </Modal>
        </div>);
    }
}

const LeaveAuthorizationForm = Form.create({ name: 'leave_authorization' })(LeaveAuthorization);

class LeaveAuthorizationFormComp extends React.Component {
    render() {
        return (
            <LeaveAuthorizationForm></LeaveAuthorizationForm>
        );
    }
}

export default LeaveAuthorizationFormComp