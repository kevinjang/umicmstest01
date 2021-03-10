import React from 'react'
import { Form, Row, Col, Input } from 'antd'

const { Item: FItem } = Form;

class EmployeeBPMaintainItemModal extends React.Component {
  constructor(props) {
    super(props);

    const { editingRecord, updateParentState, updateOkButtonAvailable } = props
    console.log('editingRecord:', editingRecord)
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
    } = editingRecord;
    this.formRef = React.createRef();
    this.form = null;
    this.updateParentState = updateParentState;
    this.updateOkButtonAvailable = updateOkButtonAvailable;
    // this.updateCancelButtonAvailable = updateCancelButtonAvailable;

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

  /* NOTE: All Blurs **************************************************************/
  onBPNoBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        BPNo: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_bpNo': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
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

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handlePriDeptNameBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        PriDept: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_pridept': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handleSecDeptNameBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        SecDept: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_secdept': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handleBankAccountBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        BankAccount: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_BankAccount': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handleBankNameBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        BankName: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_BankName': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handleEmailBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        Email: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_email': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  handleRemarkBlur = (e) => {
    let val = (e.target.value || '').toString();
    if (val !== '') {
      this.setState({
        Remark: val
      }, () => {
        this.form.setFieldsValue({
          'ebmi_modal_remark': val
        });

        this.updateParentStateUni();
        this.setoffValidation();
      })
    }
    else {
      this.setoffValidation();
    }
  }

  /* NOTE: All Blurs End **************************************************************/

  setoffValidation = () => {
    this.form.validateFields().then(values => {
      this.updateOkButtonAvailable(true);
    }).catch(info => {
      console.log('validateFields error info:', info)
      if (info && info.errorFields && info.errorFields.length > 0) {
        this.updateOkButtonAvailable(false);
      }
      else {

      }
    })
  }

  updateParentStateUni = () => {
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
    } = this.state;

    this.updateParentState({
      BPNo,
      EmployeeName,
      PriDept,
      SecDept,
      BankAccount,
      BankName,
      Email,
      Remark,
      ID
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
                <Input onBlur={this.handlePriDeptNameBlur} />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="二级部门" labelCol={{
                span: '6'
              }} name="ebmi_modal_secdept" initialValue={SecDept}>
                <Input onBlur={this.handleSecDeptNameBlur} />
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
                <Input onBlur={this.handleBankAccountBlur} />
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
                <Input onBlur={this.handleBankNameBlur} />
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
                <Input type="email" onBlur={this.handleEmailBlur} />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="备注" labelCol={{
                span: '3'
              }} name="ebmi_modal_remark" initialValue={Remark}>
                <Input onBlur={this.handleRemarkBlur} />
              </FItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default EmployeeBPMaintainItemModal