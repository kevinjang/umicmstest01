/** 
 * ANCHOR: 20200914 kevinjang
 * TODO: 传入id，到model中获取指定数据后渲染到页面上，
 * NOTE: 所有修改只在本页面内执行，
 * 只有当点击确定以后才能推送到服务器端保存
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
    }

    componentDidMount() {
        // console.log('editing record:' , this.editingRecord)
        if (this.formRef.current) {
            _FORM = this.formRef.current;
        }
    }

    renderFormContent = () => {
        const record = this.editingRecord;
        return <Row gutter={12}>
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
        </Row>
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

export default connect(({ er_data, loading }) => ({
    editingRecord: er_data.editingRecord
}))(AddNewModal);