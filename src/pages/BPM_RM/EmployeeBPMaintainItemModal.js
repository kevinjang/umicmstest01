import React from 'react'
import { Form, Row, Col, Input } from 'antd'

const { Item: FItem } = Form;

class EmployeeBPMaintainItemModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingRecord: this.props.editingRecord
    }

    console.log('EmployeeBPMaintainItemModal-props:', props);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
        BPNo, 
        EmployeeName, 
        PriDept, 
        SecDept, 
        BankAccount,
        BankName,
        Email,
        Remark
      } = this.state.editingRecord;
    return (
      <div>
        <Form>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="BP号">
                {
                  getFieldDecorator('ebmi_modal_bpNo', {
                    rules: [
                      {
                        required: true,
                        message: 'BP号必填！'
                      }
                    ],
                    initialValue: BPNo || ''
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="姓名">
                {
                  getFieldDecorator('ebmi_modal_EmployeeName', {
                    rules: [
                      {
                        required: true,
                        message: '姓名必填！'
                      }
                    ],
                    initialValue: EmployeeName || ''
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="一级部门">
                {
                  getFieldDecorator('ebmi_modal_pridept', {
                    // rules:[
                    //   {
                    //     required: true,
                    //     message: '一级部门'
                    //   }
                    // ]
                    initialValue: PriDept
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="二级部门">
                {
                  getFieldDecorator('ebmi_modal_secdept', {
                    // rules:[
                    //   {
                    //     required: true,
                    //     message: '一级部门'
                    //   }
                    // ]
                    initialValue: SecDept
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FItem label="银行账号">
                {
                  getFieldDecorator('ebmi_modal_BankAccount',{
                    rules:[
                      {
                        required: true,
                        message: '银行账号必填！'
                      }
                    ],
                    initialValue: BankAccount
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
            <Col span={12}>
              <FItem label="开户行">
                {
                  getFieldDecorator('ebmi_modal_BankName',{
                    rules:[
                      {
                        required: true,
                        message: '开户行必填！'
                      }
                    ],
                    initialValue: BankName
                  })(
                    <Input />
                  )
                }
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="Email">
                {
                  getFieldDecorator('ebmi_modal_email',{
                    rules:[
                      {
                        required: true,
                        message: 'Email必填！'
                      },{
                        
                      }
                    ],
                    initialValue: Email
                  })(
                    <Input type="email" />)
                }
              </FItem>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={24}>
              <FItem label="备注">
                {
                  getFieldDecorator('ebmi_modal_email',{
                    // rules:[
                    //   {
                    //     required: true,
                    //     message: 'Email必填！'
                    //   },{
                        
                    //   }
                    // ],
                    initialValue: Remark
                  })(
                    <Input />)
                }
              </FItem>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const EmployeeBPMaintainItemModalForm = Form.create('ebmi_modal')(EmployeeBPMaintainItemModal);

class EmployeeBPMaintainItemModalFormComp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <EmployeeBPMaintainItemModalForm {...this.props}>

      </EmployeeBPMaintainItemModalForm>
    );
  }
}

export default EmployeeBPMaintainItemModalFormComp