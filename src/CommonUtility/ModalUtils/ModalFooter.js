import React from 'react'

import { Layout, Col, Row, Button, Icon } from 'antd'
const { Content } = Layout;


class ModalFooter extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Content>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Button.Group size="normal" style={{float:'left'}}>
                                    <Button type="primary">
                                        <Icon type="left" />
                                        上一条
                                 </Button>
                                    <Button type="default">
                                        <Icon type="right" />
                                        下一条
                                 </Button>
                                </Button.Group>
                            </Col>
                            <Col span={12}>
                                <Button.Group size="normal">
                                    <Button type="primary">
                                        <Icon type="left" />
                                        取消
                                 </Button>
                                    <Button type="default">
                                        <Icon type="right" />
                                        确定
                                 </Button>
                                </Button.Group>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        );
    }
}

export default ModalFooter