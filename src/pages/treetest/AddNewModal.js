import React from 'react'

import {
    Form, Input, Row, Col, DatePicker, Menu, Dropdown,
    Button, Icon, InputNumber
} from 'antd';

import moment from 'moment'

import 'antd/dist/antd.css'
import cabinTypeCodes from '../../models/cabinTypeCodes';

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

class AddNewModal extends React.Component {
    constructor(props) {
        super(props);

        const {
            record,
            buttonClicked,
            cabinTypeCodes
            // visible
        } = props;

        this.CabinTypeCodes = cabinTypeCodes;

        // console.log('buttonClicked',buttonClicked);


        let ctValidateData = {
            validateStatus: '',// success, error, warning, validating
            message: '',
            value: ''
        }
        // this.visible = visible;
        this.state = {
            // visible: this.visible,
            record,
            ctValidateData,
            modalButtonClicked: buttonClicked,
            trafficControlDisabled: false,
            boatControlDisabled: false,
            baggageControlDisabled: false,
            hotelControlDisabled: false
        }
    }

    componentDidMount = () => {
        // this.onControlChange();
    }

    componentWillReceiveProps = (e) => {
        // console.log('will receive props - e',e)
    }

    componentWillUnmount = () => {
        // console.log('AddNewModal will unmount now!')
        // 此处触发校验
        // console.log('this.state.modalButtonClicked',this.state.modalButtonClicked)
        if (this.state.modalButtonClicked === 'ok') {
            // 此处触发校验
            console.log('AddNewModal will unmount now!')
        }

    }

    cabinTypeClicked = (e) => {
        const ctValidateData = ctValidateF(e.key);

        const {
            record
        } = this.state;
        record.CabinType = e.key;

        // = 0 ，全部禁用并清零
        if (record.CabinType === '0') {
            record.ExpenseSum -= (record.ExpenseTraffic + record.ExpenseBoat +
                record.ExpenseBaggage + record.ExpenseHotel);
            record.ExpenseTraffic =
                record.ExpenseBoat =
                record.ExpenseBaggage =
                record.ExpenseHotel = 0;

            this.setState({
                record,
                ctValidateData,
                trafficControlDisabled: true,
                boatControlDisabled: true,
                baggageControlDisabled: true,
                hotelControlDisabled: true
            })
        }
        else if (record.CabinType === '1') {
            // 无 航空火车禁用并清零 其它可用但互斥
            record.ExpenseSum -= (record.ExpenseTraffic);

            record.ExpenseTraffic = 0;
            if (parseFloat(record['ExpenseBoat']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBaggage + record.ExpenseHotel);
                record.ExpenseBaggage = 0;
                record.ExpenseHotel = 0;
                this.setState({
                    record,
                    ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: false,
                    baggageControlDisabled: true,
                    hotelControlDisabled: true
                })
            }
            else if (parseFloat(record['ExpenseBaggage']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBoat + record.ExpenseHotel);
                record.ExpenseBoat = 0;
                record.ExpenseHotel = 0;
                this.setState({
                    record,
                    ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: true,
                    baggageControlDisabled: false,
                    hotelControlDisabled: true
                })
            }
            else if (parseFloat(record['ExpenseHotel']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBoat + record.ExpenseBaggage);
                record.ExpenseBoat = 0;
                record.ExpenseBaggage = 0;
                this.setState({
                    record,
                    ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: true,
                    baggageControlDisabled: true,
                    hotelControlDisabled: false
                })
            }
            else {
                this.setState({
                    record,
                    ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: false,
                    baggageControlDisabled: false,
                    hotelControlDisabled: false
                })
            }
        }
        else {
            const cabinTypeText = this.CabinTypeCodes.find(item => item.key === record.CabinType).text;

            if (cabinTypeText.startsWith('火车') || cabinTypeText.startsWith('飞机')) {
                // 航空火车可用， 其他禁用并清零
                // console.log('starts with train or flight')
                record.ExpenseSum -= (record.ExpenseBoat +
                    record.ExpenseBaggage +
                    record.ExpenseHotel);
                record.ExpenseBoat -= record.ExpenseBoat;
                record.ExpenseBaggage = 0;
                record.ExpenseHotel = 0;
                this.setState({
                    record,
                    ctValidateData,
                }, () => {
                    this.setState({
                        trafficControlDisabled: false,
                        boatControlDisabled: true,
                        baggageControlDisabled: true,
                        hotelControlDisabled: true
                    })
                })
            }
        }


        // this.setState({
        //     record,
        //     ctValidateData
        // }, () => {
        //     // this.onControlChange();
        // })


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
                                <Input onChange={this.onExpenseAddressChange}></Input>
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
                                disabled={this.state.trafficControlDisabled}
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
                            })(<InputNumber step='1' min={0}
                                onChange={this.onExpenseBoatChange}
                                disabled={this.state.boatControlDisabled}>
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
                            })(<InputNumber step='1' min={0}
                                onChange={this.onExpenseBaggageChange}
                                disabled={this.state.baggageControlDisabled}>
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
                            })(<InputNumber step='1' min={0}
                                onChange={this.onExpenseHotelChange}
                                disabled={this.state.hotelControlDisabled}>
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
        console.log('onDatePickerChange - e', e)
        const { record } = this.state;
        record['ExpenseTime'] = e;

        this.setState({
            record
        }, () => {
            console.log('time', record['ExpenseTime'])
        })
    }

    onExpenseAddressChange = (e) => {
        // console.log('onExpenseAddressChange', e.target.value);
        const { record } = this.state;
        record['ExpenseAddress'] = e.target.value;

        this.setState({
            record
        }, () => {
            console.log('ExpenseAddress', record['ExpenseAddress'])
        })
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

    onExpenseOtherChange = (value1) => {
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
            }, () => {
                // this.onControlChange();
            });

            // this.onControlChange();
        })
    }

    onInvoiceNoChange = (e) => {
        console.log('onInvoiceNoChange-e.target.value', e.target.value)
        const { record } = this.state;
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

    onControlChange = () => {
        // 税改联动逻辑
        const {
            record,
            // trafficControlDisabled,
            // boatControlDisabled,
            // baggageControlDisabled,
            // hotelControlDisabled
        } = this.state;

        // let disabled = false;

        const cabinType = record.CabinType;
        console.log('after select cabin type :', cabinType);
        if (cabinType === '0') {
            // disabled = true;
            let recordNew = {
                ...record,
                ExpenseTraffic: 0
            }
            this.setState({
                record: recordNew,
                trafficControlDisabled: true,
                boatControlDisabled: true,
                baggageControlDisabled: true,
                hotelControlDisabled: true
            })
        }
        else {
            if (cabinType === '1') {
                // 舱位选择了无，航空禁用并清零
                // 公路和出租车和住宿可用，但是互斥（填了非零数字，禁用另一个控件；填了0，都恢复可用）

                // 全为零，全可用
                // 某个不为零，其他不可用
                if (parseFloat(record['ExpenseBoat']) === 0 &&
                    parseFloat(record['ExpenseBaggage']) === 0 &&
                    parseFloat(record['ExpenseHotel']) === 0) {

                    this.setState({
                        trafficControlDisabled: true,
                        boatControlDisabled: false,
                        baggageControlDisabled: false,
                        hotelControlDisabled: false
                    })
                }
                else if (parseFloat(record['ExpenseBoat']) !== 0) {
                    this.setState({
                        trafficControlDisabled: true,
                        boatControlDisabled: false,
                        baggageControlDisabled: true,
                        hotelControlDisabled: true
                    })
                }
                else if (parseFloat(record['ExpenseBaggage']) !== 0) {
                    this.setState({
                        trafficControlDisabled: true,
                        boatControlDisabled: true,
                        baggageControlDisabled: false,
                        hotelControlDisabled: true
                    })
                }
                else if (parseFloat(record['ExpenseHotel']) !== 0) {
                    this.setState({
                        trafficControlDisabled: true,
                        boatControlDisabled: true,
                        baggageControlDisabled: true,
                        hotelControlDisabled: false
                    })
                }
            }
            else {
                const { cabinTypeCodes } = this.props;


                let cabinTypeText = cabinTypeCodes.find(item => item.key === cabinType).text;
                // disabled =false;
                // console.log('cabinTypeText', cabinTypeText)
                if (cabinTypeText.startsWith('火车') || cabinTypeText.startsWith('飞机')) {
                    // console.log('ok');
                    let {
                        ExpenseBoat,
                        ExpenseBaggage,
                        ExpenseHotel,
                        ExpenseSum
                    } = record;

                    ExpenseSum = (ExpenseSum - ExpenseBoat - ExpenseBaggage - ExpenseHotel);

                    // let recordNew = {
                    //     ...record,
                    //     ExpenseBoat: 0,
                    //     ExpenseBaggage: 0,
                    //     ExpenseHotel: 0,
                    //     ExpenseSum
                    // }

                    record.ExpenseBoat =
                        record.ExpenseBaggage =
                        record.ExpenseHotel = 0;
                    record.ExpenseSum = ExpenseSum;


                    console.log('after change cabin type record:', record);
                    console.log('after change cabin type recordNew:', record);

                    this.setState({
                        record: record,
                        trafficControlDisabled: false,
                        boatControlDisabled: true,
                        baggageControlDisabled: true,
                        hotelControlDisabled: true
                    }, () => {
                        console.log('oncontrolchange state.record:', this.state.record);
                    })
                }
            }
        }
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