import React from 'react'
import { Form, Row, Input, Col, Radio, Modal } from 'antd'
const FORM_NAME = 'leaveauth_form'
class LeaveAuthorizationModal extends React.Component {
    constructor(props) {
        super(props);

        const { editingRecord, updateParentState, updateOkButtonAvailable, updateCancelButtonAvailable } = this.props;

        const {
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            valid,
            RowNum,
            key
        } = editingRecord;

        console.log('this.props:', this.props);

        this.updateParentState = updateParentState;
        this.updateOkButtonAvailable = updateOkButtonAvailable;
        this.updateCancelButtonAvailable = updateCancelButtonAvailable;

        this.state = {
            radioChecked: true,
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            valid,
            okAvailable: true,
            RowNum,
            key
        }
    };

    componentDidMount() {
        if (this.state.editingRecord) {
            this.setState({
                radioChecked: (this.state.valid === "valid")
            })
        }
    }

    componentWillUnmount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('did update prevState:', prevState);
        // console.log('did update state:', this.state);

    }

    radioClick = e => {
        console.log(e.target.value);
        this.setState({
            radioChecked: e.target.value === "valid"
        })
    }

    // ----------------------------------------------all blurs ---------------------------------------------------------------
    PersonalADOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        if (!!val && val.indexOf('cofco\\') !== 0) {
            val = "cofco\\" + val;
        }
        // var id = e.target.id.replace(FORM_NAME+"_","");
        const { form } = this.props;
        if (val !== "") {
            this.setState({
                userAD: val
            }, () => {
                form.setFieldsValue({
                    'leave_ad': this.state.userAD
                });

                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }
    quanxianPersonalADOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        if (!!val && val.indexOf('cofco\\') !== 0) {
            val = "cofco\\" + val;
        }
        if (val !== "") {
            this.setState({
                quanxianAD: val
            }, () => {
                const { form } = this.props;
                form.setFieldsValue({
                    'auth_ad': this.state.quanxianAD
                })
                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }

    PersonalIDOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        // if (!!val && val.indexOf('cofco\\') !== 0) {
        //     val = "cofco\\" + val;
        // }
        if (val !== "") {
            this.setState({
                PersonalID: val
            }, () => {
                const { form } = this.props;
                form.setFieldsValue({
                    'leave_id': this.state.PersonalID
                })
                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }
    quanxianPersonalIDOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        // if (!!val && val.indexOf('cofco\\') !== 0) {
        //     val = "cofco\\" + val;
        // }
        if (val !== "") {
            this.setState({
                quanxianPersonalID: val
            }, () => {
                const { form } = this.props;
                form.setFieldsValue({
                    'auth_id': this.state.quanxianPersonalID
                })
                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }
    UserCnameOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        // if (!!val && val.indexOf('cofco\\') !== 0) {
        //     val = "cofco\\" + val;
        // }
        if (val !== "") {
            this.setState({
                UserCname: val
            }, () => {
                const { form } = this.props;
                form.setFieldsValue({
                    'leave_name': this.state.UserCname
                })
                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }

    quanxianCnameOnBlur = (e) => {
        let val = (e.target.value || '').toString();
        if (val !== "") {
            this.setState({
                quanxianCname: val
            }, () => {
                const { form } = this.props;
                form.setFieldsValue({
                    'auth_name': this.state.quanxianCname
                })
                this.updateParentStateUni();
                this.setoffValidation();
            })
        } else {
            this.setoffValidation();
        }
    }

    setoffValidation = () => {
        const { form } = this.props;
        form.validateFields([
            'leave_id',
            'leave_ad',
            'leave_name',
            'auth_id',
            'auth_ad',
            'auth_name',
            // ''
        ], (err, values) => {
            if (err) {
                this.updateOkButtonAvailable(false);
                this.updateCancelButtonAvailable(false);
                console.error(err);
            }
            else {
                this.updateOkButtonAvailable(true);
                this.updateCancelButtonAvailable(true);
                console.log('setoffValidation-values:', values);
            }
        })
    }

    updateParentStateUni = () => {
        const { PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            valid,
            RowNum,
            key
        } = this.state;

        // console.log('updateParentState-before-state:', this.state);
        this.updateParentState({
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            valid,
            RowNum,
            key
        })
    }
    // ----------------------------------------------all blurs ---------------------------------------------------------------

    render() {

        const { getFieldDecorator } = this.props.form;

        const {
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            valid
        } = this.state;

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
                                initialValue: PersonalID || ''
                            })(<Input onBlur={this.PersonalIDOnBlur} />)}
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
                                initialValue: quanxianPersonalID || ''
                            })(<Input onBlur={this.quanxianPersonalIDOnBlur} />)}
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
                                initialValue: userAD || ''
                            })(<Input onBlur={this.PersonalADOnBlur} />)}
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
                                initialValue: quanxianAD || ''
                            })(<Input onBlur={this.quanxianPersonalADOnBlur} />)}
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
                                initialValue: UserCname || ''
                            })(<Input onBlur={this.UserCnameOnBlur} />)}
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
                                initialValue: quanxianCname || ''
                            })(<Input onBlur={this.quanxianCnameOnBlur} />)}
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

const LeaveAuthorizationModalForm = Form.create({ name: FORM_NAME })(LeaveAuthorizationModal);

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
            <LeaveAuthorizationModalForm editingRecord={this.state.editingRecord}
                updateParentState={this.props.updateParentState}
                updateOkButtonAvailable={this.props.updateOkButtonAvailable}
                updateCancelButtonAvailable={this.props.updateCancelButtonAvailable}></LeaveAuthorizationModalForm>
        );
    }
}

export default LeaveAuthorizationModalFormComp