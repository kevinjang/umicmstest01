import React from 'react'

import {
    Form, Input, Row, Col, DatePicker, Menu, Dropdown,
    Button, Icon, InputNumber
} from 'antd';

import moment from 'moment'

import 'antd/dist/antd.css'

const dateFormat = 'YYYY/MM/DD';

const FormItem = Form.Item;

const FormContext = React.createContext();

let timer1 = null;

const FormContent = ({ form, index, ...props }) => (
    <FormContext.Provider value={form}>
        <div {...props}></div>
    </FormContext.Provider>
);

const FormContextY = Form.create({ name: 'anm' })(FormContent);


let timeout = 200;
let editing = false;
const debounce = function (fn) {
    if (editing) {
        // 编辑中，不执行计算
        // return false;
        if (timer1)
            clearTimeout(timer1);

        timer1 = setTimeout(function () {
            // fn.call();
            clearTimeout(timer1);
            // timeout = false;
            editing = false;
            fn.call();
        }, timeout);
    }
    else {
        fn.call();
    }
}

const ctValidateF = function (key) {
    console.log('ctValidateF-key', key)
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

class AddNewModal extends React.Component {
    constructor(props) {
        super(props);

        const {
            record,
            buttonClicked
            // visible
        } = props;

        console.log('buttonClicked',buttonClicked);


        let ctValidateData = {
            validateStatus: '',// success, error, warning, validating
            message: '',
            value: ''
        }
        // this.visible = visible;
        this.state = {
            // visible: this.visible,
            record: record,
            ctValidateData,
            modalButtonClicked: buttonClicked
        }

        // this.setState({
        //     record
        // });
    }
    componentWillReceiveProps = (e) => {
        console.log('will receive props - e',e)
    }

    componentWillUnmount = () =>{
        // console.log('AddNewModal will unmount now!')
        // 此处触发校验
        console.log('this.state.modalButtonClicked',this.state.modalButtonClicked)
        if(this.state.modalButtonClicked === 'ok'){
            // 此处触发校验
            console.log('AddNewModal will unmount now!')
        }

    }

    

    cabinTypeClicked = (e) => {
        const ctValidateData = ctValidateF(e.key);

        this.setState({
            ctValidateData
        }, () => {
            console.log('ctValidateData', ctValidateData)
        })

        console.log('cabinTypeClicked.e', e);
        const { record } = this.state;
        record.CabinType = e.key;
        this.setState({
            record
        })
    }

    taxCodeClicked = (e) => {
        const { record } = this.state;
        record.ExpenseHotelTaxCode = e.key;

        this.setState({
            record
        })
    }

    showModal = () => {

    }

    renderContent = (form) => {
        const { record, columns, cabinTypeCodes, taxCodes } = this.props;


        const tcMenu = (
            <Menu onClick={this.cabinTypeClicked}>
                {
                    cabinTypeCodes.map((item, index) => {
                        return <Menu.Item key={item.key}>
                            {item.text}
                        </Menu.Item>
                    })
                }
            </Menu>
        );

        const tcTaxCode = (
            <Menu onClick={this.taxCodeClicked}>
                {
                    taxCodes.map((item, index) => {
                        return <Menu.Item key={item.key}>
                            {item.text}
                        </Menu.Item>
                    })
                }
            </Menu>
        );

        let { ctValidateData } = this.state;

        return <div>
            <Row gutter={10}>
                <Col span={4} >费用日期</Col>
                <Col span={8} >
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseTime', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: moment(record['ExpenseTime'], dateFormat)
                            })(
                                <DatePicker onChange={this.onDatePickerChange}>
                                    {moment(record['ExpenseTime'], dateFormat)}
                                </DatePicker>
                            )
                        }
                    </FormItem>
                </Col>
                <Col span={4} >费用发生地</Col>
                <Col span={8} >
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseAddress', {
                                rules: [
                                    {
                                        required: true,
                                        message: '费用发生地是必填项'
                                    }
                                ],
                                initialValue: record['ExpenseAddress']
                            })(
                                <Input></Input>
                            )
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={4}>舱位</Col>
                <Col span={8}>
                    <FormItem
                        validateStatus={ctValidateData.validateStatus}
                        help={ctValidateData.message}>
                        {/* {
                            form.getFieldDecorator('CabinType', {
                                rules: [
                                    {
                                        required: true,
                                        message: '舱位是必选项'
                                    }
                                ],
                                initialValue: record['CabinType']
                            })(
                                <Dropdown overlay={tcMenu} onChange={this.onCTChange}>
                                    <Button id='ctBtn'>
                                        {
                                            cabinTypeCodes.find(item1 => item1.key === record.CabinType).text
                                        }
                                        <Icon type='down'></Icon>
                                    </Button>
                                </Dropdown>
                            )
                        } */}

                        <Dropdown overlay={tcMenu} onChange={this.onCTChange}>
                            <Button id='ctBtn'>
                                {
                                    cabinTypeCodes.find(item1 => item1.key === record.CabinType).text
                                }
                                <Icon type='down'></Icon>
                            </Button>
                        </Dropdown>
                    </FormItem>
                </Col>
                {/* <Col span={6}></Col>
                    <Col span={6}></Col> */}

                <Col span={4}>税率</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseHotelTaxCode', {
                                rules: [
                                    {
                                        required: true,
                                        message: '税率必选'
                                    }
                                ],
                                initialValue: record['ExpenseHotelTaxCode']
                            })(
                                <Dropdown overlay={tcTaxCode} onChange={this.onTCChange}>
                                    <Button id='tcBtn'>
                                        {
                                            taxCodes.find(item1 => item1.key === record.ExpenseHotelTaxCode).text
                                        }
                                        <Icon type='down'></Icon>
                                    </Button>
                                </Dropdown>
                            )
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={4}>航空/铁路</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseTraffic', {
                                rules: [
                                    {
                                        required: true,
                                        message: '航空/铁路 必填！'
                                    }
                                ],
                                initialValue: record['ExpenseTraffic']
                            })(<InputNumber step='1' min={0}
                                onChange={this.onExpenseTrafficChange}
                            // width={'100%'}
                            // onBlur={this.onExpenseTrafficBlur}
                            >
                                {record['ExpenseTraffic']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
                <Col span={4}>公路/水路</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseBoat', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: record['ExpenseBoat']
                            })(<InputNumber step='1' min={0} onChange={this.onExpenseBoatChange} >
                                {record['ExpenseBoat']}
                            </InputNumber>)
                        }</FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={4}>出租车/网约车/市内公交</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseBaggage', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: record['ExpenseBaggage']
                            })(<InputNumber step='1' min={0} onChange={this.onExpenseBaggageChange}>
                                {record['ExpenseBaggage']}
                            </InputNumber>)
                        }</FormItem>
                </Col>
                <Col span={4}>住宿</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseHotel', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: record['ExpenseHotel']
                            })(<InputNumber step='1' min={0} onChange={this.onExpenseHotelChange}>
                                {record['ExpenseHotel']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={4}>餐费</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseMeal', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: record['ExpenseMeal']
                            })(<InputNumber step='1' min={0} onChange={this.onExpenseMealChange}>
                                {record['ExpenseMeal']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
                <Col span={4}>其他</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseOther', {
                                rules: [
                                    {
                                        required: true,
                                        message: ''
                                    }
                                ],
                                initialValue: record['ExpenseOther']
                            })(<InputNumber step='1' min={0} onChange={this.onExpenseOtherChange}>
                                {record['ExpenseOther']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={4}>费用合计</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseSum', {
                                initialValue: record['ExpenseSum']
                            })(<InputNumber contentEditable={false} disabled={true} >
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
                <Col span={4}>电子发票号</Col>
                <Col span={8}>
                    <FormItem>
                        {
                            form.getFieldDecorator('InvoiceNo', {
                                rules: [
                                    {
                                        max: 10,
                                        message: '电子发票号限定最长10位'
                                    }
                                ],
                                initialValue: record['InvoiceNo']
                            })(
                                <Input onChange={this.onInvoiceNoChange} >
                                </Input>
                            )
                        }
                    </FormItem>
                </Col>
            </Row>
        </div>
    }

    onDatePickerChange = (e) => {
        console.log('onDatePickerChange - e',e)
    }


    onExpenseTrafficChange = (value1) => {
        this.getRecordSum('ExpenseTraffic', value1);
    }

    onExpenseBoatChange = (value1) => {
        this.getRecordSum('ExpenseBoat', value1);
    }

    onExpenseBaggageChange = (value1) => {
        this.getRecordSum('ExpenseBaggage', value1);
    }

    onExpenseHotelChange = (value1) => {
        this.getRecordSum('ExpenseHotel', value1);
    }

    onExpenseMealChange = (value1) => {
        this.getRecordSum('ExpenseMeal', value1);
    }

    onExpenseOtherChange = (value1) =>{
        this.getRecordSum('ExpenseOther', value1);
    }

    getRecordSum = (colName, value) => {
        editing = true;

        debounce(() => {
            const { record } = this.state;
            // let recordNew = { ...record };
            record[colName] = value;

            // this.getRecordSum(record)
            let sum = 0;

            sum = (parseFloat(record['ExpenseTraffic']) || 0) + (parseFloat(record['ExpenseBoat']) || 0)
                + (parseFloat(record['ExpenseBaggage']) || 0) + (parseFloat(record['ExpenseHotel']) || 0)
                + (parseFloat(record['ExpenseMeal']) || 0) + (parseFloat(record['ExpenseOther']) || 0);

            record['ExpenseSum'] = sum;

            this.setState({
                record: record
            });
        })
    }

    onInvoiceNoChange = (e) => {
        console.log('onInvoiceNoChange-e.target.value',e.target.value)
        const {record} = this.state;
        record['InvoiceNo'] = e.target.value;

        this.setState({
            record
        })
    }

    onCTChange = (value1) => {
        // Cabin Type Change Event
        console.log(value1)

        ctValidateF(vallue1);
    }


    onTCChange = (value1) => {
        console.log(value1)
    }







    render() {
        return <div>
            <FormContextY>
                <FormContext.Consumer>
                    {this.renderContent}
                </FormContext.Consumer>
            </FormContextY>
        </div>
    }
}

export default AddNewModal