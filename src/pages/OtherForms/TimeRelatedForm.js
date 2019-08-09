import React from 'react'
import moment from 'moment'

import { Form, DatePicker, TimePicker, Button } from 'antd'

const { MonthPicker, RangePicker } = DatePicker;

import styles from './TimeRelatedForm.css'

class TimeRelatedForm extends React.Component {
    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            // should format date value before submit.
            const rangeValue = fieldsValue['range-picker'];
            const rangeTimeValue = fieldsValue['range-time-value'];
            const values = {
                ...fieldsValue,
                'date-picker': fieldsValue['date-pciker'].format('YYYY-MM-DD'),
                'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
                'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
                'range-picker': [
                    rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
                    rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss')
                ],
                'time-picker': fieldsValue['time-picker'].format('HH:mm:ss')
            };

            console.log('Received values of form: ', values);
        })
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const config = {
            rules: [
                {
                    type: 'object',
                    // 因为是moment对象，所以应该是object类型就对了
                    required: true,
                    message: '请选择时间！'
                }
            ]
        };

        const rangeConfig = {
            rules: [
                {
                    type: 'array',
                    // moment对象数组
                    required: true,
                    message: '请选择时间！'
                }
            ]
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='DatePicker'>
                    {getFieldDecorator('date-picker', config)(<DatePicker />)}
                </Form.Item>
                <Form.Item label='DatePicker[showTime]' >
                    {getFieldDecorator('date-time-picker', config)(
                        <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'></DatePicker>
                    )}
                </Form.Item>
                <Form.Item label='MonthPicker'>
                    {
                        getFieldDecorator('month-picker', config)(
                            <MonthPicker />
                        )
                    }
                </Form.Item>
                <Form.Item label='RangePicker'>
                    {
                        getFieldDecorator('range-picker', rangeConfig)(
                            <RangePicker />
                        )
                    }
                </Form.Item>
                <Form.Item label='RangePicker[showTime]'>
                    {getFieldDecorator('range-time-picker', rangeConfig)(
                        <RangePicker showTime format='YYYY-MM-DD HH:mm:ss'></RangePicker>
                    )}
                </Form.Item>
                <Form.Item label='TimePicker'>
                    {getFieldDecorator('time-picker', config)(
                        <TimePicker ></TimePicker>
                    )}
                </Form.Item>
                <Form.Item wrapperCol={{
                    xs: { span: 24, offset: 0 },
                    sm: { span: 16, offset: 8 },
                }}>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(TimeRelatedForm);

class WrappedDynamicFieldSetComp extends React.Component {
    render() {
        return (
            <WrappedDynamicFieldSet></WrappedDynamicFieldSet>
        );
    }
}

export default WrappedDynamicFieldSetComp