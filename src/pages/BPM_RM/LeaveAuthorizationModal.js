import React from 'react'
import { Form, Row, Input, Col, Radio } from 'antd'
const FORM_NAME = 'leaveauth_form'
class LeaveAuthorizationModal extends React.Component {
    constructor(props) {
        super(props);

        const { editingRecord, updateParentState, updateOkButtonAvailable, updateCancelButtonAvailable, operation } = this.props;

        this.operation = operation;
        const {
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            // valid = "valid",
            RowNum,
            key,
            ID
        } = editingRecord;
        this.formRef = React.createRef();
        this.form = null;
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
            // valid,
            okAvailable: true,
            RowNum,
            key,
            ID
        }
    };

    componentDidMount() {
        this.form = this.formRef.current;
        // this.setState({
        //     radioChecked: (this.state.valid === "valid")
        // }, () => {
        //     this.form.setFieldsValue({
        //         radioValid: this.state.radioChecked,
        //         radioInvalid: !this.state.radioChecked
        //     })
        //     // if (this.operation === "update")
        //     this.setoffValidation();
        // })
        this.setoffValidation();
    }

    radioClick = e => {
        // console.log(e.target.value);
        this.setState({
            valid: e.target.value
        })
    }

    // NOTE: ----------------------------------------------all blurs ---------------------------------------------------------------
    PersonalADOnBlur = (e) => {
        // const {editingRecord} = this.props
        // console.log('editingRecord value:', editingRecord.userAD)

        let val = (e.target.value || '').toString();
        if (!!val && val.indexOf('cofco\\') !== 0) {
            val = "cofco\\" + val;
        }
        if (val !== "") {
            this.setState({
                userAD: val
            }, () => {
                this.form.setFieldsValue({
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
                // const { form } = this.props;
                this.form.setFieldsValue({
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
                // const { form } = this.props;
                this.form.setFieldsValue({
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
                // const { form } = this.props;
                this.form.setFieldsValue({
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
                // const { form } = this.props;
                this.form.setFieldsValue({
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
                // const { form } = this.props;
                this.form.setFieldsValue({
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
        // const { form } = this.props;
        // NOTE: antd v4 不支持了
        // this.form.validateFields([
        //     'leave_id',
        //     'leave_ad',
        //     'leave_name',
        //     'auth_id',
        //     'auth_ad',
        //     'auth_name',
        //     // ''
        // ], (err, values) => {
        //     if (err) {
        //         this.updateOkButtonAvailable(false);
        //         this.updateCancelButtonAvailable(false);
        //         // console.error(err);
        //     }
        //     else {
        //         this.updateOkButtonAvailable(true);
        //         this.updateCancelButtonAvailable(true);
        //         // console.log('setoffValidation-values:', values);
        //     }
        // })
        this.form.validateFields()
            .then(values => {
                console.log('validateFields values:', values)
                this.updateOkButtonAvailable(true);
                this.updateCancelButtonAvailable(true);
            })
            .catch(info => {
                console.log('validateFields error info:', info)
                if (info && info.errorFields && info.errorFields.length > 0) {
                    this.updateOkButtonAvailable(false);
                    this.updateCancelButtonAvailable(false);
                }
                else {

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
            // valid,
            RowNum,
            key,
            ID
        } = this.state;

        this.updateParentState({
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            // valid,
            RowNum,
            key,
            ID
        })
    }
    // ----------------------------------------------all blurs ---------------------------------------------------------------

    render() {
        const {
            PersonalID,
            userAD,
            UserCname,
            quanxianPersonalID,
            quanxianAD,
            quanxianCname,
            // valid
        } = this.state;

        return (<div>
            <Form name={FORM_NAME} ref={this.formRef} labelAlign="left" style={{ width: '100%' }}>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员ID' name="leave_id" rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} labelCol={{
                            span: '6'
                        }}
                            initialValue={PersonalID || ''}>
                            <Input onBlur={this.PersonalIDOnBlur} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员ID' name="auth_id" rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} labelCol={{
                            span: '6'
                        }} initialValue={quanxianPersonalID || ''}>
                            <Input onBlur={this.quanxianPersonalIDOnBlur} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员AD' name="leave_ad" labelCol={{
                            span: '6'
                        }} rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} initialValue={userAD || ''}>
                            <Input onBlur={this.PersonalADOnBlur} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员AD' labelCol={{
                            span: '6'
                        }} name="auth_ad" rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} initialValue={quanxianAD || ''}>
                            <Input onBlur={this.quanxianPersonalADOnBlur} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={12}>
                        <Form.Item label='离职人员姓名' labelCol={{
                            span: '6'
                        }} name="leave_name" rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} initialValue={UserCname || ''}>
                            <Input onBlur={this.UserCnameOnBlur} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label='授权人员姓名' labelCol={{
                            span: '6'
                        }} name="auth_name" rules={[
                            {
                                required: true,
                                message: '必填！'
                            }
                        ]} initialValue={quanxianCname || ''}>
                            <Input onBlur={this.quanxianCnameOnBlur} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* <Row gutter={24}>
                    <Col span={24}>
                        <Form.Item>
                            <Radio.Group value={this.state.valid} onChange={this.radioClick}>
                                <Radio value='valid' >启用</Radio>
                                <Radio value='invalid' >停用</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row> */}
            </Form>
        </div>)
    }
}

export default LeaveAuthorizationModal