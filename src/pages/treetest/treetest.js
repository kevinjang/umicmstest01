// export default () => {
//     return <div>
//         tree test
//     </div>
// }

import React, { View } from 'react'
import { Table, Card, Button, Popconfirm, DatePicker, Form } from 'antd';
import 'antd/dist/antd.css'
import extraInfo from './extraInfo'
// import {getUserName} from '../../utils/request'

import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY','DD/MM/YY']

const EditableContext  = React.createContext();

const EditableRow = ({form, index, ...props})=>{
    <EditableContext.Provider value={form}>
        <tr {...props}></tr>
    </EditableContext.Provider>
}

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component{
    state = {
        editing: false
    }
    
    toggleEdit = ()=>{
        const editing = !this.state.editing;
        this.setState({
            editing,
        },()=>{
            if(editing){
                this.input.focus();
            }
        })
    }

    save = (e)=>{
        const { record, handleSave } = this.props;
        this.form.validateFields((error,values)=>{
            if(error && error[e.currentTarget.id]){
                return ;
            }
            this.toggleEdit();
            handleSave({...record, ...values});
        })
    }

    render(){
        const {editing} = this.state;
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
              {editable ? (
                <EditableContext.Consumer>
                  {(form) => {
                    this.form = form;
                    return (
                      editing ? (
                        <FormItem style={{ margin: 0 }}>
                          {form.getFieldDecorator(dataIndex, {
                            rules: [{
                              required: true,
                              message: `${title} is required.`,
                            }],
                            initialValue: record[dataIndex],
                          })(
                            <Input
                              ref={node => (this.input = node)}
                              onPressEnter={this.save}
                              onBlur={this.save}
                            />
                          )}
                        </FormItem>
                      ) : (
                        <div
                          className="editable-cell-value-wrap"
                          style={{ paddingRight: 24 }}
                          onClick={this.toggleEdit}
                        >
                          {restProps.children}
                        </div>
                      )
                    );
                  }}
                </EditableContext.Consumer>
              ) : restProps.children}
            </td>
          );
    }
}

class TreeTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'hello u',
            // tableDataSource: [],
            columns: [
                {
                    key: 'RowNum',
                    title: '序号',
                    dataIndex: 'RowNum',
                    width: 50
                },
                {
                    key: 'ExpenseTime',
                    title: '日期',
                    dataIndex: 'ExpenseTime',
                    width: 200,
                    render: (text,record,index)=>{
                        let currDate = new Date();
                        return <DatePicker 
                                    defaultValue={moment(currDate,dateFormat)} 
                                    format={dateFormat} 
                                    onConfirm={(e)=>{console.log(e)}}>

                        </DatePicker>
                    }
                },
                {
                    key: 'ExpenseAddress',
                    title: '费用发生地',
                    dataIndex: 'ExpenseAddress',
                    width: 100,
                    editable: true,
                    render:(text,record,index)=>{
                        return (<EditableCell>

                        </EditableCell>)
                    }
                },
                {
                    key: 'CabinType',
                    title: '舱位',
                    dataIndex: 'CabinType',
                    width: 100
                },
                {
                    key: 'ExpenseTraffic',
                    title: '航空/铁路',
                    dataIndex: 'ExpenseTraffic',
                    width: 100
                },
                {
                    key: 'ExpenseBoat',
                    title: '公路/水路',
                    dataIndex: 'ExpenseBoat',
                    width: 100
                },
                {
                    key: 'ExpenseBaggage',
                    title: '出租车/网约车/市内公交',
                    dataIndex: 'ExpenseBaggage',
                    width: 100
                },
                {
                    key: 'ExpenseHotel',
                    title: '住宿',
                    dataIndex: 'ExpenseHotel',
                    width: 100
                },
                {
                    key: 'ExpenseHotelTaxCode',
                    title: '税率',
                    dataIndex: 'ExpenseHotelTaxCode',
                    width: 100
                },
                {
                    key: 'ExpenseMeal',
                    title: '餐费',
                    dataIndex: 'ExpenseMeal',
                    width: 100
                },
                {
                    key: 'ExpenseOther',
                    title: '其他',
                    dataIndex: 'ExpenseOther',
                    width: 100
                },
                {
                    key: 'ExpenseSum',
                    title: '费用金额合计',
                    dataIndex: 'ExpenseSum',
                    width: 100
                },
                {
                    key: 'InvoiceNo',
                    title: '电子发票号',
                    dataIndex: 'InvoiceNo',
                    width: 100
                },
                {
                    key: 'Remark2',
                    title: '住宿天数',
                    dataIndex: 'Remark2',
                    width: 100
                },
                {
                    key: 'ExpenseDescription',
                    title: '备注',
                    dataIndex: 'ExpenseDescription',
                    width: 100
                },
                {
                    // key: 'remove',
                    title: '操作',
                    dataIndex: 'remove',
                    width: 100,
                    render:(text, record)=>{
                        return this.state.dataSource.length>0?
                            (<Popconfirm title='确定删除当前行？'
                                onConfirm={()=>{
                                    this.handleDelete(record.key)
                                }}>
                                <a href='javascript:;'>删除</a>
                            </Popconfirm>):
                            (null);
                    },
                    fixed: 'right'
                }
            ],
            editingKey: '',
            count: 0,
            dataSource: []
        }
    }

    componentDidMount() {
    }

    isEditing = record => record.key === this.state.editingKey

    handleAdd = () => {
        const {count, dataSource} = this.state
        const newData = {
            RowNum: count+1,
            ExpenseTime: '',
            ExpenseAddress: '',
            CabinType:'',
            ExpenseTraffic: '',
            ExpenseBoat: '',
            ExpenseBaggage: '',
            ExpenseHotel: '',
            ExpenseHotelTaxCode: '',
            ExpenseMeal: '',
            ExpenseOther: '',
            ExpenseSum: '',
            InvoiceNo: '',
            Remark2: '',
            ExpenseDescription: ''
        }

        this.setState({
            dataSource: [...dataSource, newData],
            count: count+1
        })
    }

    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource]
        this.setState({
            dataSource: dataSource.filter(item => item.key !== key)
        })
    }

    render() {
        return <div>
            <Card title='目的地费用'
                extra={<div style={{ color: 'red', fontWeight: 'bolder' }}>【电子发票号限定最长10位】</div>}
            >
                <Table
                    scroll={{ x: '200%', y: 240 }}
                    dataSource={this.state.dataSource}
                    columns={this.state.columns}
                    bordered={true}
                    rowKey='RowNum'>

                </Table>
                <div style={{ marginTop: '10px' }}>
                    <Button onClick={this.handleAdd} type='primary'>添加新项目</Button>
                </div>
            </Card>
        </div>
    }
}

export default TreeTest