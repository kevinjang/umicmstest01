import React from 'react'
import { DownOutlined, DollarOutlined } from '@ant-design/icons'
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

const _ZERO = 0;

let _FORM;

// const FormContent = ({ form, index, ...props }) => (
//     <FormContext.Provider value={form}>
//         <div {...props}></div>
//     </FormContext.Provider>
// );

// const FormContextY = Form.create({ name: 'anm' })(FormContent);


let timeout = 200;
let editing = false;
const debounce = function (fn) {
    if (editing) {
        // 编辑中，重新开始计时，不执行计算
        if (timer1)
            clearTimeout(timer1);

        timer1 = setTimeout(function () {
            clearTimeout(timer1);
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
            currentIndex,
            buttonClicked,
            cabinTypeCodes,
            taxCodes
        } = props;

        this.TaxCodes = taxCodes;
        let ctValidateData = {
            validateStatus: '',// success, error, warning, validating
            message: '',
            value: ''
        }
        this.oldRecord = record
        // this.visible = visible;

        let newTaxCodes = this.TaxCodes.map(item => {
            return {
                ...item
            }
        });

        this.formRef = React.createRef();
        this.state = {
            // visible: this.visible,
            record,
            currentIndex,
            ctValidateData,
            cabinTypeCodes,
            taxCodes: newTaxCodes,
            modalButtonClicked: buttonClicked,
            trafficControlDisabled: false,
            boatControlDisabled: false,
            baggageControlDisabled: false,
            hotelControlDisabled: false,
            expenseSum: record["ExpenseSum"]
        }
    }

    componentDidMount = (e) => {
        this.onControlChange();
        _FORM = this.formRef.current
    }

    componentWillReceiveProps = (e) => {
        const { record } = e;
        this.setState({
            record,
            taxCodes: this.TaxCodes
        }, () => {
            this.onControlChange();
        })
    }

    cabinTypeClicked = (e) => {

        const ctValidateData = ctValidateF(e.key);

        const {
            record
        } = this.state;
        record.CabinType = e.key;

        this.setState({
            record,
            ctValidateData
        }, () => {
            this.onControlChange();
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
        const { record, taxCodes, expenseSum } = this.state;
        const { columns, cabinTypeCodes } = this.props;

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
            <Row gutter={12}>
                <Col span={4} >费用日期</Col>
                <Col span={8} >
                    <FormItem name={'ExpenseTime'} rules={[
                        {
                            required: true,
                            message: ''
                        }
                    ]} initialValue={moment(record['ExpenseTime'], dateFormat)}>
                        <DatePicker onChange={this.onDatePickerChange}>
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
                        <Input onChange={this.onExpenseAddressChange}></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={4}>舱位</Col>
                <Col span={8}>
                    <FormItem
                        validateStatus={ctValidateData.validateStatus}
                        help={ctValidateData.message}>

                        <Dropdown.Button overlay={tcMenu} onChange={this.onCTChange} icon={<DownOutlined />}>
                            {/* <Button id='ctBtn'>
                                
                                <Icon type="down" />
                            </Button> */}
                            {
                                cabinTypeCodes.find(item1 => item1.key === record.CabinType).text
                            }
                        </Dropdown.Button>
                    </FormItem>
                </Col>
                <Col span={4}>税率</Col>
                <Col span={8}>
                    <FormItem name="ExpenseHotelTaxCode" rules={[
                        {
                            required: true,
                            message: '税率必选'
                        }
                    ]} initialValue={record['ExpenseHotelTaxCode']}>
                        <Dropdown.Button overlay={tcTaxCode} onChange={this.onTCChange} icon={<DownOutlined />}>
                            {/* <Button id='tcBtn'>
                                
                                <Icon type='down'></Icon>
                            </Button> */}
                            {
                                taxCodes.find(item1 => item1.key === record.ExpenseHotelTaxCode).text
                                // console.log('taxCodes.find(item1 => item1.key === record.ExpenseHotelTaxCode)', taxCodes.find(item1 => item1.key === record.ExpenseHotelTaxCode))
                            }
                        </Dropdown.Button>
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={4}>航空/铁路</Col>
                <Col span={8}>
                    <FormItem name="ExpenseTraffic" rules={[
                        {
                            required: true,
                            message: '航空/铁路 必填！'
                        }
                    ]} initialValue={record['ExpenseTraffic']}>
                        <InputNumber step='1' min={0}
                            onChange={this.onExpenseTrafficChange}
                            disabled={this.state.trafficControlDisabled}
                            formatter={value => `￥ ${value}`}
                        // value={record['ExpenseTraffic']}
                        >
                            {/* {record['ExpenseTraffic']} */}
                        </InputNumber>
                    </FormItem>
                </Col>
                <Col span={4}>公路/水路</Col>
                <Col span={8}>
                    <FormItem name="ExpenseBoat" rules={[
                        {
                            required: true,
                            message: '公路/水路 必填！'
                        }
                    ]} initialValue={record['ExpenseBoat']} >
                        <InputNumber step='1' min={0}
                            onChange={this.onExpenseBoatChange}
                            disabled={this.state.boatControlDisabled}
                            formatter={value => `￥ ${value}`}
                        >
                            {record['ExpenseBoat']}
                        </InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={4}>出租车/网约车/市内公交</Col>
                <Col span={8}>
                    <FormItem name="ExpenseBaggage" rules={[
                        {
                            required: true,
                            message: '出租车/网约车/市内公交 必填！'
                        }
                    ]} initialValue={record['ExpenseBaggage']}>
                        <InputNumber step='1' min={0}
                            onChange={this.onExpenseBaggageChange}
                            disabled={this.state.baggageControlDisabled}
                            formatter={value => `￥ ${value}`}>
                            {record['ExpenseBaggage']}
                        </InputNumber>
                    </FormItem>
                </Col>
                <Col span={4}>住宿</Col>
                <Col span={8}>
                    <FormItem name="ExpenseHotel" rules={[
                        {
                            required: true,
                            message: '住宿 必填！'
                        }
                    ]} initialValue={record['ExpenseHotel']}>
                        <InputNumber step='1' min={0}
                            onChange={this.onExpenseHotelChange}
                            disabled={this.state.hotelControlDisabled}
                            formatter={value => `￥ ${value}`}>
                            {record['ExpenseHotel']}
                        </InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={4}>餐费</Col>
                <Col span={8}>
                    <FormItem name="ExpenseMeal" rules={[
                        {
                            required: true,
                            message: '餐费 必填！'
                        }
                    ]} initialValue={record['ExpenseMeal']}>
                        <InputNumber step='1' min={0} onChange={this.onExpenseMealChange}
                            formatter={value => `￥ ${value}`}>
                            {record['ExpenseMeal']}
                        </InputNumber>
                    </FormItem>
                </Col>
                <Col span={4}>其他</Col>
                <Col span={8}>
                    <FormItem name="ExpenseOther" rules={[
                        {
                            required: true,
                            message: '其他 必填！'
                        }
                    ]} initialValue={record['ExpenseOther']}>
                        <InputNumber step='1' min={0} onChange={this.onExpenseOtherChange}
                            formatter={value => `￥ ${value}`}>
                            {record['ExpenseOther']}
                        </InputNumber>
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={4}>费用合计</Col>
                <Col span={8}>
                    <FormItem name={"ExpenseSum"} initialValue={expenseSum} >
                        <InputNumber min={0} readOnly={true} formatter={value=>`￥ ${value}`}>
                            {expenseSum}
                        </InputNumber>
                    </FormItem>
                </Col>
                <Col span={4}>电子发票号</Col>
                <Col span={8}>
                    <FormItem name={"InvoiceNo"} rules={[
                        {
                            max: 10,
                            message: '电子发票号限定最长10位'
                        }
                    ]} initialValue={record['InvoiceNo']}>

                        <Input onChange={this.onInvoiceNoChange} >
                        </Input>
                    </FormItem>
                </Col>
            </Row>
        </div>
    }

    onDatePickerChange = (e) => {
        // console.log('onDatePickerChange - e', e)
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
        // 公路水路

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
            record[colName] = value;

            let sum = 0;

            sum = (parseFloat(record['ExpenseTraffic']) || 0) + (parseFloat(record['ExpenseBoat']) || 0)
                + (parseFloat(record['ExpenseBaggage']) || 0) + (parseFloat(record['ExpenseHotel']) || 0)
                + (parseFloat(record['ExpenseMeal']) || 0) + (parseFloat(record['ExpenseOther']) || 0);

            record['ExpenseSum'] = sum;

            this.setState({
                record: record,
                expenseSum: sum
            }, () => {
                // console.log('expenseSum:', this.state.expenseSum)
                this.onControlChange();
            });

            // 
        })
    }

    onInvoiceNoChange = (e) => {
        // console.log('onInvoiceNoChange-e.target.value', e.target.value)
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
        console.log('form:', _FORM)
        // 税改联动逻辑
        const { record } = this.state;
        // = 0 ，全部禁用并清零
        if (record.CabinType === '0') {
            record.ExpenseSum -= (record.ExpenseTraffic + record.ExpenseBoat +
                record.ExpenseBaggage + record.ExpenseHotel);
            record.ExpenseTraffic = 0;
            record.ExpenseBoat = 0;
            record.ExpenseBaggage = 0;
            record.ExpenseHotel = 0;

            this.setState({
                record,
                trafficControlDisabled: true,
                boatControlDisabled: true,
                baggageControlDisabled: true,
                hotelControlDisabled: true
            }, () => {
                //手动更新界面控件内容
                _FORM.setFieldsValue({
                    ExpenseTraffic: _ZERO,
                    ExpenseBoat: _ZERO,
                    ExpenseBaggage: _ZERO,
                    ExpenseHotel: _ZERO,
                    ExpenseSum: record.ExpenseSum
                });

                // 全部重置后，税率全部加载
                this.setState({
                    taxCodes: this.TaxCodes
                })
            })
        }
        else if (record.CabinType === '1') {
            // 无 航空火车禁用并清零 其它可用但互斥
            record.ExpenseSum -= (record.ExpenseTraffic);
            // const {form} = this.props;
            record.ExpenseTraffic = 0;
            _FORM.setFieldsValue({
                ExpenseTraffic: _ZERO,
                ExpenseSum: record.ExpenseSum
            })
            if (parseFloat(record['ExpenseBoat']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBaggage + record.ExpenseHotel);
                record.ExpenseBaggage = 0;
                record.ExpenseHotel = 0;
                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: false,
                    baggageControlDisabled: true,
                    hotelControlDisabled: true
                }, () => {
                    _FORM.setFieldsValue({
                        // ExpenseTraffic: 0,
                        ExpenseBaggage: _ZERO,
                        ExpenseHotel: _ZERO,
                        ExpenseSum: record.ExpenseSum
                    });

                    // 只要3%的行
                    let newTaxCodes = [];
                    this.TaxCodes.forEach((e, i) => {
                        // console.log('index', i)
                        if (e.key === 'J6')
                            newTaxCodes.push({
                                ...e
                            })
                    });


                    if (!this.compareArray(this.state.taxCodes, newTaxCodes)) {

                        // 还要重新设定记录的taxcode是新数组中的第一条，否则会报错！！！
                        record.ExpenseHotelTaxCode = newTaxCodes[0].key;
                        this.setState({
                            record,
                            taxCodes: newTaxCodes
                        })
                    }

                })
            }
            else if (parseFloat(record['ExpenseBaggage']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBoat + record.ExpenseHotel);
                record.ExpenseBoat = 0;
                record.ExpenseHotel = 0;
                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: true,
                    baggageControlDisabled: false,
                    hotelControlDisabled: true
                }, () => {

                    _FORM.setFieldsValue({
                        // ExpenseTraffic: 0,
                        ExpenseBoat: _ZERO,
                        ExpenseHotel: _ZERO,
                        ExpenseSum: record.ExpenseSum
                    });
                    // 出租车 税率需要0、3、6、9的
                    const neededTCs = ['J0', 'J6', 'J5', 'JK'];
                    let newTaxCodes = [];
                    neededTCs.forEach((e, i) => {
                        let item = this.TaxCodes.find(itemx => itemx.key === e);
                        newTaxCodes.push({
                            ...item
                        });
                    })

                    if (!this.compareArray(this.state.taxCodes, newTaxCodes)) {

                        // 还要重新设定记录的taxcode是新数组中的第一条，否则会报错！！！
                        record.ExpenseHotelTaxCode = newTaxCodes[0].key;
                        this.setState({
                            record,
                            taxCodes: newTaxCodes
                        })
                    }

                })
            }
            else if (parseFloat(record['ExpenseHotel']) !== 0) {
                // 如果有值且不为零，其他两项禁用并清零
                record.ExpenseSum -= (record.ExpenseBoat + record.ExpenseBaggage);
                record.ExpenseBoat = 0;
                record.ExpenseBaggage = 0;

                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: true,
                    baggageControlDisabled: true,
                    hotelControlDisabled: false
                }, () => {
                    // console.log('form',_FORM);
                    _FORM.setFieldsValue({
                        // ExpenseTraffic: 0,
                        ExpenseBaggage: _ZERO,
                        ExpenseBoat: _ZERO,
                        ExpenseSum: record.ExpenseSum
                    })

                    // 住宿 0、3、6
                    const neededTCs = ['J0', 'J6', 'J5'];
                    let newTaxCodes = [];
                    neededTCs.forEach((e, i) => {
                        let item = this.TaxCodes.find(itemx => itemx.key === e);
                        newTaxCodes.push({
                            ...item
                        });
                    })

                    if (!this.compareArray(this.state.taxCodes, newTaxCodes)) {

                        // 还要重新设定记录的taxcode是新数组中的第一条，否则会报错！！！
                        record.ExpenseHotelTaxCode = newTaxCodes[0].key;
                        this.setState({
                            record,
                            taxCodes: newTaxCodes
                        })
                    }
                })
            }
            else {
                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: false,
                    baggageControlDisabled: false,
                    hotelControlDisabled: false
                })
            }
        }
        else {
            const cabinTypeText = this.state.cabinTypeCodes.find(item => item.key === record.CabinType).text;

            if (cabinTypeText.startsWith('火车') ||
                cabinTypeText.startsWith('飞机')) {
                // 航空火车可用， 其他禁用并清零
                record.ExpenseSum -= (record.ExpenseBoat +
                    record.ExpenseBaggage +
                    record.ExpenseHotel);

                record.ExpenseBoat = _ZERO;//.toString();
                record['ExpenseBaggage'] = _ZERO;
                record['ExpenseHotel'] = _ZERO;
                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: false,
                    boatControlDisabled: true,
                    baggageControlDisabled: true,
                    hotelControlDisabled: true
                }, () => {
                    //手动更新界面控件内容
                    _FORM.setFieldsValue({
                        ExpenseBoat: _ZERO,
                        ExpenseBaggage: _ZERO,
                        ExpenseHotel: _ZERO,
                        ExpenseSum: record["ExpenseSum"]
                    });


                    // 只要9%的行
                    let newTaxCodes = [];
                    this.TaxCodes.forEach((e, i) => {
                        // console.log('index', i)
                        if (e.key === 'JK')
                            newTaxCodes.push({
                                ...e
                            })
                    });

                    if (!this.compareArray(this.state.taxCodes, newTaxCodes)) {

                        // 还要重新设定记录的taxcode是新数组中的第一条，否则会报错！！！
                        record.ExpenseHotelTaxCode = newTaxCodes[0].key;
                        this.setState({
                            record,
                            taxCodes: newTaxCodes
                        })
                    }
                });
            }
            else if (cabinTypeText.startsWith('轮船')) {
                // 公路水路可用， 其他禁用并清零
                // console.log('starts with train or flight')
                record.ExpenseSum -= (record.ExpenseTraffic +
                    record.ExpenseBaggage +
                    record.ExpenseHotel);

                record.ExpenseTraffic = _ZERO;
                record['ExpenseBaggage'] = _ZERO;
                record['ExpenseHotel'] = _ZERO;
                this.setState({
                    record,
                    // ctValidateData,
                    trafficControlDisabled: true,
                    boatControlDisabled: false,
                    baggageControlDisabled: true,
                    hotelControlDisabled: true
                }, () => {
                    //手动更新界面控件内容
                    _FORM.setFieldsValue({
                        ExpenseTraffic: _ZERO,
                        ExpenseBaggage: _ZERO,
                        ExpenseHotel: _ZERO,
                        ExpenseSum: record.ExpenseSum
                    });
                    // 只要3%的行
                    let newTaxCodes = [];
                    this.TaxCodes.forEach((e, i) => {
                        // console.log('index', i)
                        if (e.key === 'J6')
                            newTaxCodes.push({
                                ...e
                            })
                    });

                    if (!this.compareArray(this.state.taxCodes, newTaxCodes)) {

                        // 还要重新设定记录的taxcode是新数组中的第一条，否则会报错！！！
                        record.ExpenseHotelTaxCode = newTaxCodes[0].key;
                        this.setState({
                            record,
                            taxCodes: newTaxCodes
                        })
                    }
                });
            }
        }
    }


    compareArray = (arr1, arr2) => {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            else {
                arr1.forEach((e, i) => {
                    let item = arr2.find(itemx => itemx.key === e.key && itemx.text === e.text);
                    if (!item) {
                        return false;
                    }
                })

                return true;
            }
        }
        else {
            return false;
        }
    }


    render() {
        return <div>
            <Form ref={this.formRef}>
                {this.renderContent}
            </Form>
        </div>
    }
}

export default AddNewModal