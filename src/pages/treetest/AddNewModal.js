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

const FormContent = ({ form, index, ...props }) => (
    <FormContext.Provider value={form}>
        <div {...props}></div>
    </FormContext.Provider>
);

const FormContextY = Form.create({ name: 'anm' })(FormContent);

class AddNewModal extends React.Component {
    constructor(props) {
        super(props);



        const {
            record,
            // visible
        } = props;


        this.state = {
            // visible: this.visible,
            record: record
        }

        // this.setState({
        //     record
        // });
    }

    cabinTypeClicked = (e) => {
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

    getControl = (dataIndex, value) => {
        // console.log('getControl.dataIndex, value', dataIndex, value)
        const { cabinTypeCodes, taxCodes } = this.props;
        const ctMenu = (
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


        const tcMenu = (
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

        const dataset = dataIndex === 'CabinType' ? ctMenu : tcMenu;

        switch (dataIndex) {
            case 'ExpenseTraffic':
            case 'ExpenseBoat':
            case 'ExpenseBaggage':
            case 'ExpenseHotel':
            case 'ExpenseMeal':
            case 'ExpenseOther':
                return <InputNumber />
            case 'CabinType':
                return <Dropdown overlay={dataset}>
                    <Button>
                        {cabinTypeCodes.find(item1 => item1.key === value).text}
                        <Icon type='down'></Icon>
                    </Button>
                </Dropdown>
            case 'ExpenseHotelTaxCode':
                return <Dropdown overlay={dataset}>
                    <Button>
                        {taxCodes.find(item1 => item1.key === value).text}
                        <Icon type='down'></Icon>
                    </Button>
                </Dropdown>
            case 'ExpenseTime':
                return <DatePicker format={dateFormat}>

                </DatePicker>
            default:
                return <Input />
        }
    }

    renderContent = (form) => {
        const { record, columns, } = this.props;

        const {
            ExpenseTime,
            ExpenseAddress,
            ExpenseTraffic,
            ExpenseBoat
        } = record;

        const newCols = columns.filter(item => item.visible);
        return <div>
            <Row gutter={10}>
                <Col span={6} >费用日期</Col>
                <Col span={6} >
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
                                <DatePicker>
                                    {moment(record['ExpenseTime'], dateFormat)}
                                </DatePicker>
                            )
                        }
                    </FormItem>
                </Col>
                <Col span={6} >费用发生地</Col>
                <Col span={6} >
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
                <Col span={6}>舱位</Col>
                <Col span={6}>
                    <FormItem>
                        {
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
                        }
                    </FormItem>
                </Col>
                {/* <Col span={6}></Col>
                    <Col span={6}></Col> */}
            </Row>
            <Row gutter={10}>
                <Col span={6}>航空/铁路</Col>
                <Col span={6}>
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
                                // onBlur={this.onExpenseTrafficBlur}
                                >
                                {record['ExpenseTraffic']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
                <Col span={6}>公路/水路</Col>
                <Col span={6}>
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
                            })(<InputNumber step='1' min={0} >
                                {record['ExpenseBoat']}
                            </InputNumber>)
                        }</FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={6}>出租车/网约车/市内公交</Col>
                <Col span={6}>
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
                            })(<InputNumber step='1'  min={0}>
                                {record['ExpenseBaggage']}
                            </InputNumber>)
                        }</FormItem>
                </Col>
                <Col span={6}>住宿</Col>
                <Col span={6}>
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
                            })(<InputNumber step='1' min={0} >
                                {record['ExpenseHotel']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={6}>税率</Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
            </Row>
            <Row gutter={10}>
                <Col span={6}>餐费</Col>
                <Col span={6}>
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
                            })(<InputNumber step='1' min={0} >
                                {record['ExpenseMeal']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
                <Col span={6}>其他</Col>
                <Col span={6}>
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
                            })(<InputNumber step='1'  min={0}>
                                {record['ExpenseOther']}
                            </InputNumber>)
                        }
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={10}>
                <Col span={6}>费用合计</Col>
                <Col span={6}>
                    <FormItem>
                        {
                            form.getFieldDecorator('ExpenseSum',{
                                initialValue: record['ExpenseSum']
                            })(<Input contentEditable={false} value={record['ExpenseSum']}>
                            </Input>)
                        }
                    </FormItem>
                </Col>
                <Col span={6}>电子发票号</Col>
                <Col span={6}></Col>
            </Row>
        </div>
    }

    onExpenseTrafficChange = (value1) => {
        console.log('value1:' + value1);

        const {record} = this.state;
        let recordNew = {...record};
        recordNew['ExpenseTraffic'] = value1;

        let sum = parseFloat(record['ExpenseSum']) || 0;

        sum += value1;

        recordNew['ExpenseSum'] =sum;

        this.setState({
            record: recordNew
        });

        console.log('recordNew:'+recordNew.ExpenseSum)
    }

    onCTChange = (value1)=>{
        // Cabin Type Change Event
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
