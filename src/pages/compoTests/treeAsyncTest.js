import React from 'react'
import { Tree, Modal, Button, message, Col, Row } from 'antd'

const { TreeNode, DirectoryTree } = Tree;

class TreeAsyncTest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            modalShow: false
        }
    }

    btnClick = () => {
        this.setState({
            modalShow: true
        })
    }

    modalCancel = () => {
        this.closeModal();
    }

    modalConfirm = () => {
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            modalShow: false
        })
    }


    onSelect = (keys, event) => {
        message.info('Trigger Select:keys-' + keys + ";event-" + event);
    }

    onExpand = () => {
        message.info('Trigger Expand');
    }

    render() {
        return <div id="treeAsyncContainer">
            <Button onClick={this.btnClick} type="primary">打开</Button>
            <Modal
                visible={this.state.modalShow}
                title="人员选择"
                bodyStyle={{ height: '250px' }}
                onOk={this.modalConfirm}
                onCancel={this.modalCancel}
                centered
                closable={true}>
                <Row gutter={8}>
                    <Col xs={10} style={{ border: '1px solid darkgray', height: '220px' }}>
                        <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                            <TreeNode title="parent 0" key="0-0">
                                <TreeNode title="leaf 0-0" key="0-0-0" isLeaf />
                                <TreeNode title="leaf 0-1" key="0-0-1" isLeaf />
                            </TreeNode>
                            <TreeNode title="parent 1" key="0-1">
                                <TreeNode title="leaf 1-0" key="0-1-0" isLeaf />
                                <TreeNode title="leaf 1-1" key="0-1-1" isLeaf />
                            </TreeNode>
                        </DirectoryTree>
                    </Col>
                    <Col xs={4} style={{ border: '1px solid darkgray', height: '220px' }}>sdfasdfasdfasdfasdfasdf</Col>
                    <Col xs={10} style={{ border: '1px solid darkgray', height: '220px' }}>已选fdsafasdfadsfasdfasdf
                </Col>
                </Row>
            </Modal>
        </div>
    }
}

export default TreeAsyncTest