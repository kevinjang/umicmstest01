import React from 'react'
import { Table, Card, Button, Popconfirm, DatePicker, Form, Input, Menu, Dropdown, Icon, InputNumber } from 'antd';
import 'antd/dist/antd.css'
import './treetest.css'
import moment from 'moment';
const dateFormat = 'YYYY/MM/DD';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        {console.log('props', props)}
        <tr {...props}> </tr>
    </EditableContext.Provider>
)

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props) {
        super(props)
        this.CabinTypeCodes = [{
            key: '0',
            text: '--请选择--'
        },
        {
            key: '1',
            text: '无'
        },
        {
            key: '2',
            text: '火车，软卧'
        },
        {
            key: '3',
            text: '火车，硬卧'
        },
        {
            key: '4',
            text: '火车，硬座'
        },
        {
            key: '5',
            text: '火车，二等座'
        },
        {
            key: '6',
            text: '火车，一等座'
        },
        {
            key: '7',
            text: '火车，商务座'
        },
        {
            key: '8',
            text: '轮船，二等座'
        },
        {
            key: '9',
            text: '轮船，一等座'
        },
        {
            key: '10',
            text: '飞机，经济舱'
        },
        {
            key: '11',
            text: '飞机，商务舱'
        },
        {
            key: '12',
            text: '飞机，公务舱'
        },
        {
            key: '13',
            text: '飞机，头等舱'
        }
        ]

        this.TaxCodes = [
            {
                key: '_',
                text: '--请选择--'
            }, {
                key: 'J0',
                text: '0%应交税费-进项税'
            }, {
                key: 'JC',
                text: '1.5%应交税费-进项税'
            }, {
                key: 'J6',
                text: '3%应交税费-进项税'
            }, {
                key: 'J8',
                text: '4%应交税费-进项税'
            }, {
                key: 'J7',
                text: '5%应交税费-进项税'
            }, {
                key: 'J5',
                text: '6%应交税费-进项税'
            }, {
                key: 'J9',
                text: '7%应交税费-进项税'
            }, {
                key: 'JK',
                text: '9%应交税费-进项税'
            }, {
                key: 'JG',
                text: '10%应交税费-进项税'
            }, {
                key: 'J4',
                text: '11%应交税费-进项税'
            }, {
                key: 'J2',
                text: '13%应交税费-进项税'
            }, {
                key: 'JF',
                text: '16%应交税费-进项税'
            }, {
                key: 'JJ',
                text: '19%应交税费-进项税'
            }];
        this.drpControls = ['CabinType', 'ExpenseHotelTaxCode']
        this.numberControls = ['ExpenseTraffic', 'ExpenseBoat', 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther', 'ExpenseSum', 'Remark2']
        this.ctMenu = (<Menu onClick={(e, v) => {
            const { record } = this.props;
            record.CabinType = e.key
            const { handleSave } = this.props;
            this.toggleEdit();
            handleSave(record)
        }}>{this.CabinTypeCodes.map((item, index) => {
            return <Menu.Item key={item.key} > {item.text}
            </Menu.Item>
        })}
        </Menu>)

        this.tcMenu = (<Menu onClick={(e, v) => {
            const { record } = this.props;
            record.ExpenseHotelTaxCode = e.key

            const { handleSave } = this.props;
            this.toggleEdit();
            handleSave(record)
        }}>{this.TaxCodes.map((item, index) => {
            return <Menu.Item key={item.key} > {item.text}
            </Menu.Item>
        })}</Menu>)
    }

    state = {
        editing: false
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({
            editing,
        }, () => {
            if (editing) {
                if (this.input)
                    this.input.focus()
            }
        })
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        })
    }

    setControl = (dataIndex, that) => {
        if (this.drpControls.findIndex(item => item === dataIndex) > -1) {
            const { record, index } = that.props;
            return <Dropdown overlay={(dataIndex === 'CabinType') ? this.ctMenu : this.tcMenu}>
                {(dataIndex === 'CabinType') ?
                    <Button id={"record_drpBtn_" + index} >
                        {
                            this.CabinTypeCodes.findIndex(p => p.key === record.CabinType).text
                        }
                        <Icon type='down'> </Icon>
                    </Button> :
                    <Button id={"record_drpTaxCodeBtn_" + index} >
                        {
                            this.TaxCodes.find(p => p.key === record.ExpenseHotelTaxCode).text
                        }<Icon type='down'> </Icon>
                    </Button>
                } </Dropdown>
        } else if (this.numberControls.findIndex(item => item === dataIndex) > -1) {
            return <InputNumber autoFocus={true} onBlur={that.save} >
            </InputNumber>
        } else if (dataIndex === 'ExpenseTime') {
            let currDate = new Date();
            return <DatePicker
                format={dateFormat}
                onChange={that.save} >
            </DatePicker>
        } else {
            return <Input
                ref={node => (that.input = node)}
                onPressEnter={that.save}
                onBlur={that.save} />
        }
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) :
            (<div className='editable-cell-value-wrap' style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
                {children}
            </div>);
    }

    render() {
        // const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editable ?
                    (<EditableContext.Consumer>
                        {this.renderCell}
                    </EditableContext.Consumer>)
                    : (children)
                }
            </td>
        );
    }
}

class TreeTest extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <div  >
            treetest
            {/* <Table ></Table> */}
        </div>
    }
}

export default TreeTest
