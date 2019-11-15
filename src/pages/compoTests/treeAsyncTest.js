import React from 'react'
import { Tree, Modal, Button, message, Col, Row, List, Skeleton, Icon, Spin } from 'antd'

const { TreeNode, DirectoryTree } = Tree;

import { getPersonSelectData } from '../../utils/toserver/PersonSelectUtil'

import styles from './treeAsyncTest.css'

class TreeAsyncTest extends React.Component {
    constructor(props) {
        super(props)

        // var setss = new Set([]);

        var setselected = new Set([])

        this.state = {
            modalShow: false,
            loading: true,
            listItemMetaSelected: null,
            chosenOnes: [],
            selectedItems: setselected
        }

        // this.deleteItemRef = React.createRef();
    }

    btnClick = () => {
        this.setState({
            modalShow: true
        }, () => {
            // setTimeout(() => {
            //     this.setState({
            //         loading: false
            //     })
            // }, 1000)
            getPersonSelectData(6798, ()=>{
                this.setState({
                    loading: false
                })
            })
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

        // console.log('event:', event);
        if (event.node.isLeaf()) {
            // 如果是叶子节点，加入到set对象中
            let setss = this.state.chosenOnes;

            let setExsits = setss.filter(item => item.propKey === keys[0]);
            if (!setExsits || setExsits.length == 0) {
                // 不存在的
                setss.push({ propKey: keys[0], title: event.node.props.title });
                this.setState({
                    chosenOnes: setss
                }, () => {
                    console.log('chosenOnes:', this.state.chosenOnes)
                })
            }
            else {
                message.info('已选择过，请勿重复选择！');
            }
        }

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

                        <Skeleton title={false} active loading={this.state.loading}>
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
                        </Skeleton>
                    </Col>
                    <Col xs={4} style={{
                        border: '1px solid darkgray', height: '220px', alignContent: 'center',
                        verticalAlign: 'middle', margin: '0 auto', textAlign: 'center', lineHeight: '50px', paddingTop: '60px'
                    }}>
                        <Button size={"small"} type="default">
                            移除
                        </Button>
                        <Button size={"small"} type="danger">
                            清空
                        </Button>
                    </Col>
                    <Col xs={10} style={{ border: '1px solid darkgray', height: '220px' }}>
                        <List
                            locale={""}
                            itemLayout="horizontal"
                            size={"small"}
                            bordered={false}
                            dataSource={this.state.chosenOnes}
                            split={false}
                            renderItem={item => {
                                let nodeIcon = <Icon type="delete" style={{ cursor: 'pointer' }}
                                    data-item={item.propKey}
                                    key={item.propKey}
                                    onClick={(e) => {
                                        var key = e.currentTarget.getAttribute('data-item');
                                        // console.log(Object.entries(e))
                                        var chosenOnes = this.state.chosenOnes;
                                        chosenOnes = chosenOnes.filter(v => v.propKey !== key);
                                        this.setState({
                                            chosenOnes
                                        })
                                    }}></Icon>;
                                // Reflect.set(nodeIcon, 'dataItem', item);
                                // console.log('nodeIcon:', nodeIcon);
                                return <List.Item
                                    actions={[nodeIcon]}
                                    style={{ width: '100%' }}>
                                    <List.Item.Meta //title={item.title}
                                        description={item.title}
                                        className={styles.listItemMeta}
                                        onClick={(e, i) => {
                                            let { listItemMetaSelected: limsCurr } = this.state;
                                            console.log('limsCurr:', limsCurr);
                                            this.setState({
                                                listItemMetaSelected: limsCurr === styles.listItemMetaSelected ? '' : styles.listItemMetaSelected
                                            })
                                        }}>
                                    </List.Item.Meta>
                                </List.Item>
                            }}>

                        </List>
                    </Col>
                </Row>
            </Modal>
        </div>
    }
}

export default TreeAsyncTest