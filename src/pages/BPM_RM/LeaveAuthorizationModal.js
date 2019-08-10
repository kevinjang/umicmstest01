import React from 'react'
import { Form, Row, Input, Col, Radio, Modal } from 'antd'

class LeaveAuthorizationModal extends React.Component {
    constructor(props) {
        super(props);

        const { editingRecord } = this.props;

        this.state = {
            radioChecked: true,
            editingRecord
        }
    };

    componentDidMount() {
        if (this.state.editingRecord) {
            this.setState({
                radioChecked: this.state.editingRecord.valid
            })
        }
    }

    componentWillUnmount() {

    }

    radioClick = e => {
        console.log(e.target.value);
        this.setState({
            radioChecked: e.target.value
        })
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const { editingRecord } = this.state;

        return (<div>
            <Form>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员ID'>
                            {getFieldDecorator('leave_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['PersonalID'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员ID'>
                            {getFieldDecorator('auth_id', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['quanxianPersonalID'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员AD'>
                            {getFieldDecorator('leave_ad', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['userAD'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员AD'>
                            {getFieldDecorator('auth_ad', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['quanxianAD'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员姓名'>
                            {getFieldDecorator('leave_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['UserCname'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员姓名'>
                            {getFieldDecorator('auth_name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '必填！'
                                    }
                                ],
                                initialValue: editingRecord['quanxianCname'] || ''
                            })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24}>
                        <Radio.Group>
                            <Radio value='valid' checked={this.state.radioChecked} onClick={this.radioClick}>启用</Radio>
                            <Radio value='invalid' checked={!this.state.radioChecked} onClick={this.radioClick}>停用</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
            </Form>
        </div>)
    }
}

const LeaveAuthorizationModalForm = Form.create({ name: 'leaveauth_form' })(LeaveAuthorizationModal);

class LeaveAuthorizationModalFormComp extends React.Component {
    constructor(props) {
        super(props);

        const { editingRecord } = this.props;

        this.state = {
            editingRecord
        }
    }
    render() {
        return (
            <LeaveAuthorizationModalForm editingRecord={this.state.editingRecord}></LeaveAuthorizationModalForm>
        );
    }
}

export default LeaveAuthorizationModalFormComp