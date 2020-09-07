import { connect } from 'umi'
import { Form, Input, Menu, DatePicker, InputNumber, Dropdown, Button } from 'antd'
import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import EditableContext from './TreeTestContext'
import { indexOf, find } from 'lodash'

const dateFormat = 'YYYY/MM/DD';
const Cell = ({ cabinTypeCodes, taxCodes, editable, dataIndex, title, record, index, handleSave, children, ...restProps }) => {
    const [editing, setEditing] = useState(false)
    const numberControls = ['ExpenseTraffic', 'ExpenseBoat', 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther', 'ExpenseSum', 'Remark2']
    const ctMenu = (<Menu onClick={(e, v) => {
        // const { record } = props;
        record.CabinType = e.key
        // const { handleSave } = props;
        toggleEdit();
        handleSave(record)
    }}>{cabinTypeCodes.map((item, index) => {
        return <Menu.Item key={item.key} > {item.text}
        </Menu.Item>
    })}
    </Menu>)
    // const [form, setForm] = useState()
    var form = null;
    const tcMenu = (<Menu onClick={(e, v) => {
        // const { record } = props;
        record.ExpenseHotelTaxCode = e.key

        // const { handleSave } = props;
        toggleEdit();
        handleSave(record)
    }}>{taxCodes.map((item, index) => {
        return <Menu.Item key={item.key} > {item.text}
        </Menu.Item>
    })}</Menu>);


    // const drpControls = [{
    //     name: 'CabinType',
    //     component: ctMenu
    // }, {
    //     name: 'ExpenseHotelTaxCode',
    //     component: tcMenu
    // }];
    const drpControls = ['CabinType', 'ExpenseHotelTaxCode',]

    const toggleEdit = () => {
        // const editing = !state.editing;
        // setState({
        //     editing,
        // }, () => {
        //     if (editing) {
        //         if (input)
        //             input.focus()
        //     }
        // })
        setEditing(!editing)
    }

    const save = (e) => {
        // const { record, handleSave } = props;
        console.log('save form:', form)
        form.validateFields().then(values => {
            toggleEdit();
            handleSave({ ...record, ...values });
        }).catch(error => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
        })
    }

    const setControl = (dataIndex, that) => {
        if (drpControls.findIndex(item => item === dataIndex) > -1) {
            // const { record, index } = props;
            return <Dropdown overlay={(dataIndex === 'CabinType') ? ctMenu : tcMenu} trigger={['click']}>
                {(dataIndex === 'CabinType') ?
                    <div className={"editable-cell-value-wrap"}>
                        {cabinTypeCodes.find(p => p.key === record.CabinType).text} 
                        <DownOutlined />
                    </div> :
                    <div id={"record_drpTaxCodeBtn_" + index} >
                        {
                            taxCodes.find(p => p.key === record.ExpenseHotelTaxCode).text
                        }
                        <DownOutlined />
                    </div>
                }
            </Dropdown>
        } else if (numberControls.findIndex(item => item === dataIndex) > -1) {
            return <InputNumber autoFocus={true} onBlur={save} >
            </InputNumber>
        } else if (dataIndex === 'ExpenseTime') {
            let currDate = new Date();
            return <DatePicker
                format={dateFormat}
                onChange={save} >
            </DatePicker>
        } else {
            return <Input
                // ref={node => (input = node)}
                onPressEnter={save}
                onBlur={save} />
        }
    }


    const renderCell = formx => {
        form = formx;
        // setForm(form)
        // const { children, dataIndex, record, title } = props;
        // const { editing } = state;
        // console.log(`drpControls.indexOf(${dataIndex}):`, drpControls.indexOf(dataIndex))
        // const compo = find(drpControls, control => control.name === dataIndex);
        return editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[
                {
                    required: true,
                    message: `${title}必填`
                }
            ]} initialValue={record[dataIndex]}>
                {setControl(dataIndex)}
            </Form.Item>
        ) :
            (<div className='editable-cell-value-wrap' style={{ paddingRight: 24 }} onClick={toggleEdit}>
                {children}
            </div>);
    }

    return (
        <td {...restProps}>
            {editable ?
                (<EditableContext.Consumer>
                    {value => renderCell(value.form)}
                </EditableContext.Consumer>)
                : (children)
            }
        </td>
    )
}

export default connect(({ cabinTypeCodes, taxCodes }) => ({
    cabinTypeCodes: cabinTypeCodes.values,
    taxCodes: taxCodes.values
}))(Cell)