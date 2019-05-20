import React from 'react'
import { Table, Input, Button, Popconfirm, Form, DatePicker, Dropdown, Menu, Icon } from 'antd'
// import EditableCell from './EditableCell'
import moment from 'moment'

const dateFormat = 'YYYY/MM/DD';;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props){
        super(props);
        
        this.CabinTypeCodes = [
            {
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

    }
    state = {
        editing: false
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({
            editing
        }, () => {
            if (editing) {
                if (this.input) {
                    this.input.focus();
                }
            }
        })
    }

    save = e => {
        const { record, handleSave } = this.props;

        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            const { dataIndex } = this.props;

            if (dataIndex === 'ExpenseTime') {
                values.ExpenseTime = e
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        })
    }

    setCellControl = (dataIndex,text) => {
        if(dataIndex === 'ExpenseTime'){
            return <DatePicker
            autoFocus={true}
            format={dateFormat}
            onChange={this.save}
            // onBlur={this.save}
            defaultValue={moment(record[dataIndex], dateFormat)}></DatePicker>;
        }
        else if(dataIndex === 'CabinType'){
            const menu = (
                <Menu onClick={this.save}>
                    {this.CabinTypeCodes.map(item=>{
                        return <Menu.Item key={item.key}>
                            {item.text}
                        </Menu.Item>
                    })}
                </Menu>
            );

            const {record, index} = this.props;

            return <Dropdown overlay={menu} >
                <Button id={`record_drpBtn_${index}`}>
                    {
                        this.CabinTypeCodes.findIndex(p=>p.key == record.CabinType).text
                    }
                    <Icon type='down'> </Icon>
                </Button>
            </Dropdown>
        }else{
            return <Input
            ref={node => (this.input = node)}
            onPressEnter={this.save}
            onBlur={this.save} />
        }
    }

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, title, record } = this.props;
        const { editing } = this.state;

        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is requried.`
                        }
                    ],
                    initialValue: record[dataIndex]
                })(this.setCellControl(dataIndex, record[dataIndex]))}
            </Form.Item>
        ) : (
                <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={this.toggleEdit}>
                    {children}
                </div>
            );
    }

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editable ?
                    (<EditableContext.Consumer>
                        {this.renderCell}
                    </EditableContext.Consumer>)
                    : (children)}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        // console.log('editabletable-props', props)
        
        this.CabinTypeCodes = [
            {
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

        this.columns = [
            {
                title: '序号',
                dataIndex: 'RowNum',
                width: '30%',
                editable: false
            },
            {
                title: '费用日期',
                dataIndex: 'ExpenseTime',
                editable: true,
                render: (text, record, index) => {
                    // console.log(text)
                    // return <div>{text && text.format('YYYY/MM/DD')}</div>;
                    return (text && text.format) ? text.format('YYYY/MM/DD') : null;
                }
            },
            {
                title: '舱位',
                dataIndex: 'CabinType',
                editable: true,
                render: (text, record, index) => {
                    return this.CabinTypeCodes.find(item=>item.key === text).text;
                }
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ?
                        (
                            <Popconfirm title='Sure to Delete?' onConfirm={() => this.handleDelete(record.key)}>
                                <a href='javascript:;'>删除</a>
                            </Popconfirm>
                        ) : null

            }
        ];
        this._moment = moment;
        this.state = {
            dataSource: [
                {
                    key: '0',
                    RowNum: '1',
                    ExpenseTime: moment(new Date(), dateFormat),
                    CabinType: '0'
                }
            ],
            count: 1
        }
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key).map((item, index) => {
                item.RowNum = index + 1;
                return item
            }),
            count: dataSource.length
        });
    }

    handleAdd = () => {
        const { count, dataSource } = this.state;

        const newData = {
            key: count,
            RowNum: count,
            ExpenseTime: this._moment(new Date(), dateFormat),
            CabinType: '0'
        };

        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        });
    }

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => item.key === row.key);
        const item = newData[index];

        newData.splice(index, 1, {
            ...item,
            ...row
        });

        this.setState({
            dataSource: newData
        });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell
            }
        }

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave
                })
            };
        });

        return (
            <div>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}>

                </Table>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    添加新项目
                </Button>
            </div>
        )
    }
}

export default EditableTable