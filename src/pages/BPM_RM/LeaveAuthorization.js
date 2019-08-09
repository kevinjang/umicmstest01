import React from 'react'
import { Form, Input, Button, Select, Layout, Row, Col, Icon } from 'antd'

const { Header } = Layout;

// const { getFieldDecorator } = Form;

const { Option } = Select;

import styles from './LeaveAuthorization.css';

// const filterTextConfig = {
//     rules:[
//         {
//             required: true,
//             message: '请填写过滤内容或者取消选择过滤条件'
//         }
//     ]
// }

class LeaveAuthorization extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSearch = (e) => {
        e.preventDefault();
        // alert(e.target.value);
        const {getFieldValue} = this.props.form;
        console.log(getFieldValue('filter_text'));
        alert(getFieldValue('filter_text')||'');
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (<div className={styles.mainContainer}>
            <Layout>
                <Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Row gutter={1}>
                            <Col span={4}>
                                <Form.Item >
                                    {
                                        getFieldDecorator('headerToolBar', {
                                            initialValue: 'none'
                                        })(
                                            <Select style={{ width: '150px' }} value='none'>
                                                <Option value='none'>请选择过滤字段</Option>
                                                <Option value='PersonalID'>PersonalID</Option>
                                                <Option value='userAD'>userAD</Option>
                                                <Option value='UserCname'>UserCname</Option>
                                                <Option value='quanxianPersonalID'>quanxianPersonalID</Option>
                                                <Option value='quanxianAD'>quanxianAD</Option>
                                                <Option value='quanxianCname'>quanxianCname</Option>
                                            </Select>
                                        )}
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('filter_text')(
                                            <div style={{ display: 'flex' }}>
                                                <Input style={{ width: '120px' }} 
                                                    suffix={<a href="" onClick={this.handleSearch}><Icon type='search' /></a>} />
                                                {/* <Button><Icon type='search' /></Button> */}
                                            </div>
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Header>
            </Layout>
        </div>);
    }
}

const LeaveAuthorizationForm = Form.create({ name: 'leave_authorization' })(LeaveAuthorization);

class LeaveAuthorizationFormComp extends React.Component {
    render() {
        return (
            <LeaveAuthorizationForm></LeaveAuthorizationForm>
        );
    }
}

export default LeaveAuthorizationFormComp