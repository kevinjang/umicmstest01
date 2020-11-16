import React from 'react'
import { Form, Row, Col, Input } from 'antd'

const { Item: FItem } = Form;

class EmployeeBPMaintainItemModal extends React.Component {
  constructor(props) {
    super(props);

    const {
      BPNo,
      EmployeeName,
      PriDept,
      SecDept,
      BankAccount,
      BankName,
      Email,
      Remark,
      ID
    } = this.props.editingRecord;
    this.formRef = React.createRef();
    this.form = null;

    this.state = {
      editingRecord: this.props.editingRecord,
      BPNo,
      EmployeeName,
      PriDept,
      SecDept,
      BankAccount,
      BankName,
      Email,
      Remark,
      ID
    }
  }

  componentDidMount() {
    this.form = this.formRef.current;
  }

  onBPNoBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        BPNo: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_bpNo': val
        });
      })
    }
    else {
      this.setoffValidation();
    }
  }

  onEmployeeNameBlur = (e) => {
    let val = (e.target.value || '').toString();
    // const { form } = this.props;
    if (val !== '') {
      this.setState({
        EmployeeName: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_EmployeeName': val
        });
      })
    }
    else {
      this.setoffValidation();
    }
  }

  setoffValidation = () => {
    // const { form } = this.props;
    this.form.validateFields().then().catch(info=>{

    })
  }


  render() {
    const {
      BPNo,
      EmployeeName,
      PriDept,
      SecDept,
      BankAccount,
      BankName,
      Email,
      Remark
    } = this.state;
    return (
      <div>
        <Form ref={this.formRef}>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="BP号" labelCol={{
                span: '6'
              }} name="ebmi_modal_bpNo" rules={[
                {
                  required: true,
                  message: 'BP号必填！'
                }
              ]} initialValue={BPNo || ''}>
                <Input onBlur={this.onBPNoBlur} />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="姓名" labelCol={{
                span: '6'
              }} name="ebmi_modal_EmployeeName" rules={[
                {
                  required: true,
                  message: '姓名必填！'
                }
              ]} initialValue={EmployeeName || ''}>
                <Input onBlur={this.onEmployeeNameBlur} />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="一级部门" labelCol={{
                span: '6'
              }} name="ebmi_modal_pridept" initialValue={PriDept}>
                <Input />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="二级部门" labelCol={{
                span: '6'
              }} name="ebmi_modal_secdept" initialValue={SecDept}>
                <Input />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="银行账号" labelCol={{
                span: '6'
              }} name="ebmi_modal_BankAccount" rules={[
                {
                  required: true,
                  message: '银行账号必填！'
                }
              ]} initialValue={BankAccount}>
                <Input />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="开户行" labelCol={{
                span: '6'
              }} name="ebmi_modal_BankName" rules={[
                {
                  required: true,
                  message: '开户行必填！'
                }
              ]} initialValue={BankName}>
                <Input />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="Email" labelCol={{
                span: '3'
              }} name="ebmi_modal_email" rules={[
                {
                  required: true,
                  message: 'Email必填！'
                }
              ]} initialValue={Email}>
                <Input type="email" />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="备注" labelCol={{
                span: '3'
              }} name="ebmi_modal_remark" initialValue={Remark}>
                <Input />
              </FItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default EmployeeBPMaintainItemModal