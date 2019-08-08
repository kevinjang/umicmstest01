import React from 'react'

// 三列栅格式的表单排列方式，常用于数据表格的高级搜索。

// 有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

import { Form, Row, Col, Input, Button, Icon } from 'antd'

import styles from './MultiConditionSearch.css'
class AdvancedSearchForm extends React.Component {
    state = {
        expand: false //展开状态
    };

    // 用于生成新的仿造的Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;

        const children = [];

        for (let i = 0; i < 10; i++) {
            children.push(<Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                <Form.Item label={`Field ${i}`}>
                    {getFieldDecorator(`field-${i}`, {
                        rules: [
                            {
                                required: true,
                                message: '请输入条件内容'
                            }
                        ]
                    })(<Input placeholder='placeholder' />)}
                </Form.Item>
            </Col>)
        }

        return children;
    }

    handleSearch = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            // 全部表单字段都要进行校验
            if (!err) {
                console.log('Received values of form: ', values);
            }
        })
    };

    handleReset = () => {
        this.props.form.resetFields();
    };

    toggle = () => {
        const { expand } = this.state;
        this.setState({
            expand: !expand
        });
    };

    render() {
        return (
            <Form className={styles.antAdvancedSearchForm} onSubmit={this.handleSearch}>
                <Row gutter={24}>
                    {this.getFields()}
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type='primary' htmlType='submit'>Search</Button>
                        <Button type='primary' style={{ marginLeft: 8 }} onClick={this.handleReset}>Clear</Button>
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                            折叠<Icon type={this.state.expand ? "up" : "down"}></Icon>
                        </a>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create({ name: 'advanced_search' })(AdvancedSearchForm);

class WrappedAdvancedSearchFormComp extends React.Component {
    render() {
        return (<div>
            <WrappedAdvancedSearchForm></WrappedAdvancedSearchForm>

            <div className={styles.searchResultList}>Search Result List</div>
        </div>);
    }
}

export default WrappedAdvancedSearchFormComp