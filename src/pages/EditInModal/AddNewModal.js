/** 
 * ANCHOR: 20200914 kevinjang
 * TODO: 传入id，到model中获取指定数据后渲染到页面上，
 * NOTE: 所有修改只在本页面内执行，
 * NOTE: 只有当点击确定以后才能推送到服务器端保存
 * REVIEW: 因目前都是mock的数据
 * TODO: 所以推送到服务器端的操作留待后续实现
*/

import React from 'react'
import { debounce } from '../../utils/utils'
import { connect } from 'umi'
import {
    Form, Input, Row, Col, DatePicker, Menu, Dropdown,
    Button, Icon, InputNumber
} from 'antd';
import moment from 'moment'
import {DownOutlined} from '@ant-design/icons'

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;

const _ZERO = 0;

let _FORM;

let timeout = 200;
let editing = false;

class AddNewModal extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
        this.editingRecord = props.editingRecord
        this.originalRecord = {
            ...this.editingRecord
        }
        this.state = {
            expenseSum: this.editingRecord["ExpenseSum"]
        }
        this.cabinTypeCodes = props.cabinTypeCodes;
        this.taxCodes = props.taxCodes;
    }

    componentDidMount() {
        // console.log('editing record:' , this.editingRecord)
        if (this.formRef.current) {
            _FORM = this.formRef.current;
        }
    }

    renderFormContent = () => {
        const record = this.editingRecord;

        const tcMenu = (
            <Menu >
                {
                    this.cabinTypeCodes.map(item => (
                        <Menu.Item key={item.key}>
                            {item.text}
                        </Menu.Item>
                    ))
                }
            </Menu>
        )
        const tcTaxCode = (
            <Menu onClick={this.taxCodeClicked}>
                {
                    this.taxCodes.map((item, index) => {
                        return <Menu.Item key={item.key}>
                            {item.text}
                        </Menu.Item>
                    })
                }
            </Menu>
        );


        return (
            <div>
                <Row gutter={12}>
                    <Col span={4}>费用日期</Col>
                    <Col span={8}>
                        <FormItem name={"ExpenseTime"} rules={[{
                            required: true,
                            message: ''
                        }]} initialValue={moment(record["ExpenseTime"], dateFormat)} >
                            <DatePicker //NOTE: onChange={this.onDatePickerChange}
                            >
                                {moment(record['ExpenseTime'], dateFormat)}
                            </DatePicker>
                        </FormItem>
                    </Col>
                    <Col span={4} >费用发生地</Col>
                    <Col span={8} >
                        <FormItem name="ExpenseAddress" rules={[
                            {
                                required: true,
                                message: '费用发生地是必填项'
                            }
                        ]} initialValue={record['ExpenseAddress']}>
                            <Input
                            // FIXME: onChange={this.onExpenseAddressChange}
                            ></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={4}>舱位</Col>
                    <Col span={8}>
                        <FormItem>
                            <Dropdown.Button overlay={tcMenu} icon={<DownOutlined />}>
                                {
                                    this.cabinTypeCodes.find(item1 => item1.key === this.editingRecord.key).text
                                }
                            </Dropdown.Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <div>
                <Form ref={this.formRef}>
                    {this.renderFormContent}
                </Form>
            </div>
        )
    }
}

export default connect(({ er_data, cabinTypeCodes, taxCodes, loading }) => ({
    editingRecord: er_data.editingRecord,
    cabinTypeCodes: cabinTypeCodes.values,
    taxCodes: taxCodes.values
}))(AddNewModal);