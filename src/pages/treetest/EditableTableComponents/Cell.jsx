import { connect } from 'umi'
import { Form, Input, Menu } from 'antd'
import React, { useState } from 'react'
import { DownOutlined } from '@ant-design/icons'
import EditableContext from './TreeTestContext'
const Cell = ({ cabinTypeCodes, taxCodes, editable, dataIndex, title, record, index, handleSave, children, ...restProps }) => {
    const [editing, setEditing] = useState(false)
    const drpControls = ['CabinType', 'ExpenseHotelTaxCode'];
    const numberControls = ['ExpenseTraffic', 'ExpenseBoat', 'ExpenseBaggage', 'ExpenseHotel', 'ExpenseMeal', 'ExpenseOther', 'ExpenseSum', 'Remark2']
    const ctMenu = (<Menu onClick={(e, v) => {
        const { record } = props;
        record.CabinType = e.key
        const { handleSave } = props;
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
        const { record } = props;
        record.ExpenseHotelTaxCode = e.key

        const { handleSave } = props;
        toggleEdit();
        handleSave(record)
    }}>{taxCodes.map((item, index) => {
        return <Menu.Item key={item.key} > {item.text}
        </Menu.Item>
    })}</Menu>)

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
        const { record, handleSave } = props;
        form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            toggleEdit();
            handleSave({ ...record, ...values });
        })
    }

    const setControl = (dataIndex, that) => {
        if (drpControls.findIndex(item => item === dataIndex) > -1) {
            const { record, index } = props;
            return <Dropdown overlay={(dataIndex === 'CabinType') ? ctMenu : tcMenu}>
                {(dataIndex === 'CabinType') ?
                    <Button id={"record_drpBtn_" + index} >
                        {
                            cabinTypeCodes.findIndex(p => p.key === record.CabinType).text
                        }
                        <DownOutlined />
                    </Button> :
                    <Button id={"record_drpTaxCodeBtn_" + index} >
                        {
                            taxCodes.find(p => p.key === record.ExpenseHotelTaxCode).text
                        }
                        <DownOutlined />
                    </Button>
                } </Dropdown>
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
                ref={node => (input = node)}
                onPressEnter={save}
                onBlur={save} />
        }
    }


    const renderCell = form => {
        form = form;
        // setForm(form)
        // const { children, dataIndex, record, title } = props;
        // const { editing } = state;
        return editing ? (
            <Form.Item style={{ margin: 0 }} name={dataIndex} rules={[
                {
                    required: true,
                    message: `${title} is required`
                }
            ]} initialValue={record[dataIndex]}>
                <Input ref={node => (input = node)} onPressEnter={save} onBlur={save} />
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