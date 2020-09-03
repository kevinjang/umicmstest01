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

    // console.log('EmployeeBPMaintainItemModal-props:', props);
  }
  onBPNoBlur = (e) => {
    let val = (e.target.value || '').toString();
    const { form } = this.props;
    if (val !== '') {
      this.setState({
        BPNo: val
      }, () => {
        form.setFieldsValue({
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
    const { form } = this.props;
    if (val !== '') {
      this.setState({
        EmployeeName: val
      }, () => {
        form.setFieldsValue({
          'ebmi_modal_EmployeeName': val
        });


      })
    }
    else {
      this.setoffValidation();
    }
  }

  setoffValidation = () => {
    const { form } = this.props;
    form.validateFields([
      'ebmi_modal_bpNo',
      'ebmi_modal_EmployeeName'
    ], (err, values) => {

    })
  }


  render() {
    // const { getFieldDecorator } = this.props.form;
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
        <Form>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="BP号" name="ebmi_modal_bpNo" rules={[
                {
                  required: true,
                  message: 'BP号必填！'
                }
              ]} initialValue={BPNo || ''}>
                <Input onBlur={this.onBPNoBlur} />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="姓名" name="ebmi_modal_EmployeeName" rules={[
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
              <FItem label="一级部门" name="ebmi_modal_pridept" initialValue={PriDept}>
                <Input />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="二级部门" name="ebmi_modal_secdept" initialValue={SecDept}>
                <Input />
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="银行账号" name="ebmi_modal_BankAccount" rules={[
                {
                  required: true,
                  message: '银行账号必填！'
                }
              ]} initialValue={BankAccount}>
                <Input />
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="开户行" name="ebmi_modal_BankName" rules={[
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
              <FItem label="Email" name="ebmi_modal_email" rules={[
                {
                  required: true,
                  message: 'Email必填！'
                }
              ]} initialValue={Email}>
                <Input type="email" />)
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="备注" name="ebmi_modal_email" initialValue={Remark}>
                <Input />)
              </FItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

// const EmployeeBPMaintainItemModalForm = Form.create('ebmi_modal')(EmployeeBPMaintainItemModal);

// class EmployeeBPMaintainItemModalFormComp extends React.Component {
//   constructor(props) {
//     super(props);
//     console.log('EmployeeBPMaintainItemModalFormComp-props:', this.props);
//   }
//   render() {
//     return (
//       <EmployeeBPMaintainItemModalForm {...this.props}>

//       </EmployeeBPMaintainItemModalForm>
//     );
//   }
// }

export default EmployeeBPMaintainItemModal