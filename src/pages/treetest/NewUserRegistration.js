import React from 'react'

import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
} from 'antd'
import { getFileItem } from 'antd/lib/upload/utils';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const residences = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
]

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: []
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;

        this.setState({
            // 有值即被染指过
            confirmDirty: this.state.confirmDirty || !!value
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            // 强制触发确认密码的校验，由确认密码的校验方法来确认一致性
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        }
        else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }

        this.setState({ autoCompleteResult });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: {
                    span: 16
                }
            }
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: 86,
        })(
            <Select style={{ width: 70 }}>
                <Option value='86'>+86</Option>
                <Option value='87'>+87</Option>
            </Select>
        );

        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>));

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label='E-mail'>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '您输入的邮箱地址不符合规范！'
                            },
                            {
                                required: true,
                                message: '请输入您的邮箱地址!'
                            }
                        ]
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item label='密码' hasFeedback>
                    {/**hasFeedBack: 用于给输入框添加反馈图标。 */}
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '请输入您的密码！'
                            },
                            {
                                // 跟一下，看看实现细节
                                validator: this.validateToNextPassword
                            }
                        ]
                    })(<Input.Password visibilityToggle={false} />)}
                    {/**
                    1、此处写法等同于 <Input type='password'> 
                    2、visibilityToggle 是否显示眼睛
                */}
                </Form.Item>
                <Form.Item label='确认密码' hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: '请再次输入您的密码以确认！'
                            },
                            {
                                validator: this.compareToFirstPassword
                            }
                        ]
                    })(
                        <Input.Password onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item 
                    label={
                        <span>
                            昵称&nbsp;
                            <Tooltip title="您希望别人如何称呼您？">
                                <Icon type='question-circle-o'></Icon>
                            </Tooltip>
                        </span>
                    }>
                    {/** Tooltip静态消息提示，很有用的小控件  */}
                        {
                            getFieldDecorator('nickname',{
                                rules:[
                                    {
                                        required: true,
                                        message: '请输入您的昵称！',
                                        whitespace: true
                                    }
                                ]
                            })(<Input />)
                        }
                </Form.Item>
                <Form.Item label='常住地'>
                    {
                        getFieldDecorator('residence',{
                            initialValue:['zhejiang', 'hangzhou', 'xihu'],
                            rules:[
                                {
                                    type:'array',
                                    required: true,
                                    message: '请选择您的常住地！'
                                }
                            ]
                        })(<Cascader options={residences} />)
                    }
                </Form.Item>
                <Form.Item label='个人网站'> 
                {getFieldDecorator('website',{
                    rules:[
                        {
                            required: true,
                            message: '请输入您的个人网站！'
                        }
                    ]
                })(
                    <AutoComplete dataSource={websiteOptions} onChange={this.handleWebsiteChange} placeholder='个人网站'>
                        <Input />
                    </AutoComplete>
                )}
                </Form.Item>
                <Form.Item label='验证码' extra='我们需要确保您不是机器人哦~'>
                    <Row gutter={8}>
                        <Col span={12}>
                            {
                                getFieldDecorator('captcha',{
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入验证码！'
                                        }
                                    ]
                                })(<Input />)
                            }
                        </Col>
                        <Col span={12}>
                            <Button >获取验证码</Button>
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    {
                        getFieldDecorator('agreement',{
                            valuePropName: 'checked'
                        })
                        (<Checkbox >
                            我已阅读并理解<a href=''>用户协议</a>
                        </Checkbox>)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}> 
                    <Button type='primary' htmlType='submit'>
                        注册
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);

class WrappedRegistrationFormComp extends React.Component {
    render() {
        return (
            <WrappedRegistrationForm></WrappedRegistrationForm>
        );
    }
}

export default WrappedRegistrationFormComp