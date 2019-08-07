import React from 'react'
// import ReactDOM from 'react-router-dom'
import { Form, Icon, Input, Button } from 'antd'

function hasErrors(fieldsError) {
    // 数组的some 一真全真
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');

        return (
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {
                        getFieldDecorator('username', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your username!'
                                }
                            ]
                        })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='Username' />)
                    }
                </Form.Item>
                <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {
                        getFieldDecorator('password',{
                            rules:[
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                }
                            ]
                        })(<Input prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}} />} 
                            type='password' placeholder='Password'/>)
                    }
                </Form.Item>
                <Form.Item >
                    <Button type='primary' htmlType='submit' disabled={hasErrors(getFieldsError())}>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );

    }
}
// Form.create()创建了表单上下文，传入定义好的表单，完成了一个表单上下文对象，此中已经包含了form实例？
const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);

class WrappedHorizontalComp extends React.Component {
    render(){
        return <WrappedHorizontalLoginForm >

        </WrappedHorizontalLoginForm>;
    }
}

export default WrappedHorizontalComp