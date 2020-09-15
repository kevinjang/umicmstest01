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
import { DownOutlined } from '@ant-design/icons'

const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;

const _ZERO = 0;

let _FORM;

let timeout = 200;
let editing = false;

const ctValidateF = function (key) {
    // console.log('ctValidateF-key', key)
    let ctValidateData;
    if (key === '0') {
        ctValidateData = {
            validateStatus: 'error',
            message: '请选择舱位信息',
            value: key
        }
    }
    else {
        ctValidateData = {
            validateStatus: 'success',
            message: null,
            value: key
        }
    }

    return ctValidateData;

}

// NOTE: 只有点击确定按钮的时候才需要把数据推送到Model中去，否则所有的修改都只针对当前数据行发生

class AddNewModal extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef();
        this.editingRecord = { ...props.editingRecord }
        this.originalRecord = {
            ...this.editingRecord
        }
        let ctValidateData = {
            // NOTE: 验证结果
            validateStatus: '',//NOTE: 结果状态 success, error, warning, validating
            message: '',
            value: ''
        }
        this.state = {
            expenseSum: this.editingRecord["ExpenseSum"],
            ctValidateData,
            record: {
                ...props.editingRecord
            }
        }
        this.cabinTypeCodes = props.cabinTypeCodes;
        this.taxCodes = props.taxCodes;
    }

    cabinTypeClicked = (e) => {

        const ctValidateData = ctValidateF(e.key);

        this.editingRecord.CabinType = e.key

        const { dispatch } = this.props;
        if (dispatch) {
            console.log('dispatch:', dispatch)
            dispatch({
                type: 'er_data/setEditingRecordByContent',
                payload: { ...this.editingRecord }
            })

            console.log('editingRecord after:', this.editingRecord)
        }

        this.setState({
            // record,
            ctValidateData
        }, () => {
            // this.onControlChange();
        })
    }

    onCTChange = (value1) => {
        // NOTE: Cabin Type Change Event

        ctValidateF(vallue1);
    }

    componentDidMount() {
        // console.log('editing record:' , this.editingRecord)
        if (this.formRef.current) {
            _FORM = this.formRef.current;
        }
    }

    renderFormContent = () => {
        const { record } = this.state;

        const ctMenu = (
            <Menu onClick={this.cabinTypeClicked}>
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
                            <DatePicker //FIXME: onChange={this.onDatePickerChange}
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
                        <FormItem >
                            <Dropdown overlay={ctMenu}  >
                                <Button>
                                    {
                                        this.cabinTypeCodes.find(item1 => item1.key === this.editingRecord.key).text
                                    }
                                    <DownOutlined />
                                </Button>
                            </Dropdown>
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