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
    }

    cabinTypeClicked = (e) => {
        // console.log('cabinTypeClicked.e', e);
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
            {
                newCols.map((col, index) => {
                    return <FormItem key={col.dataIndex}>
                        <Row gutter={20}>
                            <Col span={10}>{col.title}</Col>
                            <Col span={10}>
                                {
                                    form.getFieldDecorator(col.dataIndex, {
                                        rules: [
                                            {
                                                required: true,
                                                message: `${col.title} 是必填项`
                                            }
                                        ],
                                        initialValue: record[col.dataIndex]
                                    })(
                                        this.getControl(col.dataIndex, record[col.dataIndex])
                                    )
                                }
                            </Col>
                        </Row>
                    </FormItem>
                })
            }
        </div>
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