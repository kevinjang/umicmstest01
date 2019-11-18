import React from 'react'
import { Tree, Modal, Button, message, Col, Row, List, Skeleton, Icon, Spin, Input, Form, Tooltip } from 'antd'

const { TreeNode, DirectoryTree } = Tree;

import { getPersonSelectFullData, getPersonSelectSearchData } from '../../utils/toserver/PersonSelectUtil'

import { Scrollbars } from 'react-custom-scrollbars'

import styles from './treeAsyncTest.css'
import ButtonGroup from 'antd/lib/button/button-group';

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
            selectedItems: setselected,
            dataSource: [],
            defaultExpandAll: false
        }

        this.allData = [];

        this.loaded = false;
    }

    btnClick = () => {
        if (!this.loaded)
            this.getFullOuUsersData();
        this.setState({
            modalShow: true
        })
    }

    getFullOuUsersData = () => {
        getPersonSelectFullData(6798, (data) => {
            console.log(data);
            this.setState(data)
        }).then(response => {
            console.log('get-response-data:', response.data);

            const { data, message: selfMessage } = response.data;

            // console.log('data:', data[0]);
            if (selfMessage === 'succeeded') {
                message.success(selfMessage);
                this.loaded = true;
                let dataSource = [];
                data[0].forEach((item, index) => {
                    const newItem = this.formatItem(item); // { title: item.name + (item.isleaf === 1 ? `(${item.userad})` : ''), key: item.id, isLeaf: (item.isleaf === 1), gender: item.sex, dataRef: item };
                    dataSource.push(newItem);
                    this.allData.push(newItem);
                });

                console.log('initial load:', dataSource);

                this.setState({
                    spinning: false,
                    loading: false,
                    dataSource
                })
            } else {
                message.error(selfMessage);
                this.setState({
                    spinning: false,
                    loading: false
                })
            }
        }).catch(err => {
            message.error(err.message);
            console.log(err.message)
            this.setState({
                spinning: false,
                loading: false
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

    onLoadData = treeNode => {
        console.log('treeNode.props.dataRef:', treeNode.props.dataRef);

        const orgID = treeNode ? treeNode.props.eventKey : 6798;
        return getPersonSelectFullData(orgID, () => { }).then(response => {
            console.log('get-response-data:', response.data);

            const { data, message: selfMessage } = response.data;

            console.log('data:', data[0]);
            if (selfMessage === 'succeeded') {
                let dataSource = this.state.dataSource || [];

                let filtered = this.allData.filter(f => f.key === Number(orgID));
                let filteredItem;
                if (filtered && filtered.length > 0) {
                    filteredItem = filtered[0];
                    filteredItem.children = [];
                    data[0].forEach((item) => {
                        const newItem = this.formatItem(item); // { title: item.name + (item.isleaf === 1 ? `(${item.userad})` : ''), key: item.id, isLeaf: (item.isleaf === 1), gender: item.sex, dataRef: item }
                        filteredItem.children.push(newItem);
                        this.allData.push(newItem);
                    })
                }
                message.success(selfMessage);
                this.setState({
                    spinning: false,
                    loading: false,
                    dataSource
                })
            } else {
                message.error(selfMessage);

                this.setState({
                    spinning: false,
                    loading: false
                })
            }
        }).catch(err => {
            message.error(err.message);
            console.log(err.message)
            this.setState({
                spinning: false,
                loading: false
            })

        });
    }

    onSearchData = () => {
        const { getFieldValue } = this.props.form;
        console.log(`getFieldValue('userfilter_ps'):`, getFieldValue('userfilter_ps'))
        getPersonSelectSearchData({
            OrgID: 6798,
            UserFilter: getFieldValue('userfilter_ps'),
            UserID: 'zhanghaoming',
            Plus: ''
        }).then(response => {
            const { data, message: selfMessage } = response.data;
            console.log(selfMessage, data);
            let dataSource = [];
            let originalDataSource = data[0]
            if (selfMessage === 'succeeded') {

                // for(let i =0; i < originalDataSource.filter(v => v.isleaf === 1).length; i++){

                //     let last = this.formatItem([0]);
                //     originalDataSource = originalDataSource.filter(v => v.id !== last.key)
                //     if (last) {
                //         while (originalDataSource.length > 0) {
                //             last = this.formATreeSack(last, originalDataSource);
                //             originalDataSource = originalDataSource.filter(v => v.id !== last.key)
                //         }
                //     }

                //     dataSource.push(last);
                // }
                // 麻蛋，还是得自顶向下
                let root = originalDataSource.find(v=>v.id === 6798);
                if(root){
                    root = this.findAllChildren(this.formatItem(root), originalDataSource);
                    dataSource.push(root);
                }

                this.setState({
                    dataSource,
                    defaultExpandAll: true
                })

            } else {
                message.error(selfMessage);
            }
        }).catch(err => {
            message.error(err.message)
        })
    }

    formatItem = (item) => {
        return {
            title: item.name + (item.isleaf === 1 ? `(${item.userad})` : ''),
            key: item.id,
            isLeaf: item.isleaf === 1,
            gender: item.sex,
            parent: item.parentid,
            children: item.children || [],
            dataRef: item
        }
    }

    // findOwnSon = (key, dataSource) => {
    //     return dataSource.find(item => item.parent === key);
    // }

    findAllChildren = (parentItem, dataSource)=>{
        parentItem.children = dataSource.filter(v=>v.parentid === parentItem.key).map(v=>this.formatItem(v));
        if(parentItem.children && parentItem.children.length>0){
            for(let child of parentItem.children){
                this.findAllChildren(child, dataSource);
            }
        }
        return parentItem;
    }

    formATreeSack = (son, dataSource) => {
        let parent = dataSource.filter(v => v.id === son.parent)[0];
        if (parent) {
            parent.children = [son]
        }
        return this.formatItem(parent)
    }

    renderTreeNodeItems = data => {
        // console.log(data);
        return data.map(item => {
            if (item.children && item.children.length > 0) {
                return (<TreeNode title={item.title} key={item.key} dataRef={item.dataRef} isLeaf={item.isLeaf}>
                    {this.renderTreeNodeItems(item.children)}
                </TreeNode>)
            }
            console.log('typeof item.isleaf:', item.isLeaf);
            return (
                <TreeNode title={
                    <Tooltip title={item.userad}>
                        {item.title}
                    </Tooltip>} key={item.key}
                    dataRef={item.dataRef} isLeaf={item.isLeaf}
                    icon={<Icon type={(item.isLeaf) ? "user" : 'folder'} style={{ color: (item.isLeaf) ? ((item.gender === "1") ? "rgb(32, 48, 187)" : "pink") : '' }} />}>
                    {/* {this.renderTreeNodeItems(this.state.dataSource)} */}
                </TreeNode>
            )
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

    onExpand = (expandedKeys, { expanded: bool, node }) => {
        message.info('Trigger Expand:' + expandedKeys);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return <div id="treeAsyncContainer">
            <Button onClick={this.btnClick} type="primary">打开</Button>
            <Modal
                visible={this.state.modalShow}
                maskClosable={false}
                title="人员选择"
                bodyStyle={{ height: '320px' }}
                onOk={this.modalConfirm}
                onCancel={this.modalCancel}
                centered
                // width={"400px"}
                closable={true}>
                <Row style={{ height: '50px', marginBottom: '10px' }}>
                    <Col xs={16} style={{ height: '100%', padding: '0 5px 0 5px' }}>
                        <Form>
                            <Form.Item>
                                {getFieldDecorator('userfilter_ps')(
                                    <Input style={{ width: '100%' }} size="default"></Input>
                                )}
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={8} style={{ height: '100%', padding: '0 5px 0 5px' }}>
                        <ButtonGroup>
                            <Button icon={<Icon type="scope"></Icon>} size="middle" type="primary" onClick={() => { this.onSearchData() }}>查找</Button>
                            <Button icon={<Icon type="scope"></Icon>} size="middle" onClick={() => { this.getFullOuUsersData() }}>全部</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col xs={12} style={{ height: '220px' }}>
                        {/* border: '1px solid darkgray', */}
                        <Skeleton title={false} active loading={this.state.loading}>
                            <Scrollbars>
                                <DirectoryTree
                                    multiple
                                    style={{ padding: '0 5px' }}
                                    defaultExpandAll={this.state.defaultExpandAll}
                                    onSelect={this.onSelect}
                                    onExpand={this.onExpand}
                                    loadData={this.onLoadData}
                                >
                                    {this.renderTreeNodeItems(this.state.dataSource)}
                                </DirectoryTree>
                            </Scrollbars>
                        </Skeleton>
                    </Col>
                    {/* <Col xs={4} style={{
                        border: '1px solid darkgray', height: '220px', alignContent: 'center',
                        verticalAlign: 'middle', margin: '0 auto', textAlign: 'center', lineHeight: '50px', paddingTop: '60px'
                    }}>
                        <Button size={"small"} type="default">
                            移除
                        </Button>
                        <Button size={"small"} type="danger" onClick={() => {
                            this.setState({
                                chosenOnes: []
                            })
                        }}>
                            清空
                        </Button>
                    </Col> */}
                    <Col xs={12} style={{ height: '220px' }}>
                        <Scrollbars>
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
                                        // onClick={(e, i) => {
                                        //     let { listItemMetaSelected: limsCurr } = this.state;
                                        //     console.log('limsCurr:', limsCurr);
                                        //     this.setState({
                                        //         listItemMetaSelected: limsCurr === styles.listItemMetaSelected ? '' : styles.listItemMetaSelected
                                        //     })
                                        // }}
                                        >
                                        </List.Item.Meta>
                                    </List.Item>
                                }}>

                            </List>
                        </Scrollbars>
                    </Col>
                </Row>
            </Modal>
        </div>
    }
}

const WrappedAsyncTest = Form.create({
    name: 'AsyncTreeTest'
})(TreeAsyncTest);

class WrappedAsyncTestCompForm extends React.Component {
    render() {
        return <WrappedAsyncTest></WrappedAsyncTest>
    }
}

export default WrappedAsyncTestCompForm
