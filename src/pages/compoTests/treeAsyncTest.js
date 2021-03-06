import React from 'react'
import { Tree, Modal, Button, message, Col, Row, List, Skeleton, Icon, Spin, Input, Form, Tooltip } from 'antd'

const { TreeNode, DirectoryTree } = Tree;

import { getPersonSelectFullData, getPersonSelectSearchData } from '../../utils/toserver/PersonSelectUtil'

import { Scrollbars } from 'react-custom-scrollbars'

import styles from './treeAsyncTest.css'
import ButtonGroup from 'antd/lib/button/button-group';

import { UserContext } from '../../pages/UserContextMock'

class TreeAsyncTest extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props)

        // var setselected = new Set([])

        this.state = {
            modalShow: false,
            loading: true,
            listItemMetaSelected: null,
            chosenOnes: [],
            // selectedItems: setselected,
            dataSource: [],
            defaultExpandAll: false
        }

        this.allData = [];
        this.loadedFullData = []

        this.loaded = false;

        this.placeholder = '可输入员工姓名、AD账号、分机号码、手机号码进行模糊查询';

        this.selectedChosenOnes = [];
        // this.Tree = ()

    }

    componentDidMount() {

    }

    btnClick = () => {
        if (!this.loaded)
            this.getFullOuUsersData();
        this.setState({
            modalShow: true
        })
    }

    getFullOuUsersData = () => {

        let dataSource = this.state.dataSource.filter(v => v.key !== 6798);
        this.setState({
            dataSource,
            defaultExpandAll: false
        }, () => {
            // this.allData = [];
            getPersonSelectFullData(6798, (data) => {
                // console.log(data);
                this.setState(data)
            }).then(response => {
                // console.log('get-response-data:', response.data);

                const { data, message: selfMessage } = response.data;

                // console.log('data:', data[0]);
                if (selfMessage === 'succeeded') {
                    message.success(selfMessage);
                    this.loaded = true;
                    // let dataSource = this.loadedFullData; //this.state.dataSource;// || [];
                    data[0].forEach((item, index) => {
                        const newItem = this.formatItem(item); // { title: item.name + (item.isleaf === 1 ? `(${item.userad})` : ''), key: item.id, isLeaf: (item.isleaf === 1), gender: item.sex, dataRef: item };
                        if (!this.loadedFullData.find(v => v.key === item.id))
                            this.loadedFullData.push(newItem);
                        if (!this.allData.find(v => v.key === item.id))
                            this.allData.push(newItem);
                    });

                    // console.log('initial load:', dataSource);

                    this.setState({
                        spinning: false,
                        loading: false,
                        dataSource: this.loadedFullData
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
                // console.log(err.message)
                this.setState({
                    spinning: false,
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

    onLoadData = treeNode => {
        // console.log('treeNode.props.dataRef:', treeNode);

        const orgID = treeNode ? treeNode.props.eventKey : 6798;
        return getPersonSelectFullData(orgID, () => { }).then(response => {
            // console.log('get-response-data:', response.data);

            const { data, message: selfMessage } = response.data;

            // console.log('data:', data[0]);
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
                        if (!this.allData.find(v => v.key === item.id))
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
            // console.log(err.message)
            this.setState({
                spinning: false,
                loading: false
            })

        });
    }

    onSearchData = () => {
        const { getFieldValue } = this.props.form;
        const filterValue = getFieldValue('userfilter_ps');
        if (filterValue === "" || filterValue === undefined) {
            message.info("请输入筛选条件！");
            return;
        }
        this.setState({
            loading: true
        }, () => {

            getPersonSelectSearchData({
                OrgID: 6798,
                UserFilter: getFieldValue('userfilter_ps') || '',
                UserID: this.context.userRow.UserAD,
                Plus: ''
            }).then(response => {
                const { data, message: selfMessage } = response.data;
                // console.log(selfMessage, data);
                let dataSource = [];
                let originalDataSource = data[0]
                if (selfMessage === 'succeeded') {

                    // 自顶向下
                    let root = originalDataSource.find(v => v.id === 6798);
                    if (root) {
                        root = this.findAllChildren(this.formatItem(root), originalDataSource);
                        dataSource.push(root);
                    }

                    this.setState({
                        dataSource,
                        defaultExpandAll: true,
                        loading: false
                    })

                } else {
                    message.error(selfMessage);
                }
            }).catch(err => {
                this.setState({
                    loading: false
                })
                message.error(err.message)
            })
        })
    }

    formatItem = (item) => {
        // 将原始数据行，按照树形node结构整理后返回。
        return {
            title: item.name + (item.isleaf === 1 ? `[${item.userad.replace('cofco\\', '')}]` : ''),
            key: item.id,
            isLeaf: item.isleaf === 1,
            gender: item.sex,
            parent: item.parentid,
            children: item.children || [],
            listItem: null,
            dataRef: item
        }
    }

    findAllChildren = (parentItem, dataSource) => {
        parentItem.children = dataSource.filter(v => v.parentid === parentItem.key).map(v => this.formatItem(v));
        if (parentItem.children && parentItem.children.length > 0) {
            for (let child of parentItem.children) {
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
            // console.log('typeof item.isleaf:', item.isLeaf);
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
        // message.info('Trigger Select:keys-' + keys + ";event-" + event);

        if (event.node.isLeaf()) {
            // 如果是叶子节点，加入到set对象中
            let setss = this.state.chosenOnes;

            let setExsits = setss.filter(item => item.propKey === keys[0]);
            if (!setExsits || setExsits.length == 0) {
                // 不存在的
                // console.log('event.node.props:', event.node.props)
                const dataRef = event.node.props.dataRef;
                setss.push({ propKey: keys[0], title: dataRef.name + `[${dataRef.userad}]`, selected: false, className: '' });
                this.setState({
                    chosenOnes: setss
                })
            }
            else {
                message.info('已选择过，请勿重复选择！');
            }
        }

    }

    onExpand = (expandedKeys, { expanded: bool, node }) => {
        // message.info('Trigger Expand:' + expandedKeys);
        // message.info(node)
        // console.log("node:", node.props.children)
    }

    clearChosenOnes = () => {
        this.selectedChosenOnes = [];
        this.setState({
            chosenOnes: []
        })
    }

    moveUp = () => {
        let chosenOnes = this.state.chosenOnes;
        this.selectedChosenOnes.forEach(key => {
            let index = chosenOnes.findIndex(item => item.propKey === key);
            if (index !== 0) {
                let toMoveItem = chosenOnes.find(item => item.propKey === key);
                let prevItem = chosenOnes[index - 1];
                if (this.selectedChosenOnes.indexOf(prevItem.propKey) < 0) {
                    chosenOnes[index - 1] = toMoveItem;
                    chosenOnes[index] = prevItem;
                }
            }
        })

        this.setState({
            chosenOnes
        })
    }

    moveDown = () => {
        let chosenOnes = this.state.chosenOnes;
        let reverseSelectedChosenOnes = [...this.selectedChosenOnes].reverse();
        reverseSelectedChosenOnes.forEach(key => {
            let index = chosenOnes.findIndex(item => item.propKey === key);
            if (index !== chosenOnes.length - 1) {
                let toMoveItem = chosenOnes.find(item => item.propKey === key);
                let nextItem = chosenOnes[index + 1];
                if (this.selectedChosenOnes.indexOf(nextItem.propKey) < 0) {
                    chosenOnes[index + 1] = toMoveItem;
                    chosenOnes[index] = nextItem;
                }
            }
        })

        this.setState({
            chosenOnes
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const modalFooter = (<div style={{ width: '100%', height: '35px', direction: 'flex' }}>
            <Button type="danger" style={{ float: 'left' }} onClick={this.clearChosenOnes}>清空已选</Button>
            {this.selectedChosenOnes.length > 0 ? (
                <ButtonGroup style={{ float: 'left', marginLeft: '5px' }}>
                    <Button type="default" onClick={() => this.moveUp()}><Icon type="up" />上移</Button>
                    <Button type="default" onClick={() => this.moveDown()}><Icon type="down" />下移</Button>
                </ButtonGroup>
            ) : null}
            <Button type="primary" style={{ float: 'right', marginLeft: '5px' }} onClick={this.modalConfirm}>确定</Button>
            <Button type="default" style={{ float: 'right' }} onClick={this.modalCancel}>取消</Button>
        </div>)

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
                footer={modalFooter}
                closable={true}>
                <Row style={{ height: '50px', marginBottom: '10px' }}>
                    <Col xs={14} className={styles.filterCol}>
                        {/* style={{ height: '100%', padding: '0 5px 0 5px', border:'1px solid blue'  }}> */}
                        <Tooltip title={this.placeholder}>
                            <Form>
                                <Form.Item>
                                    {getFieldDecorator('userfilter_ps')(
                                        <Input style={{ width: '100%' }} size="default"
                                            placeholder={this.placeholder}>

                                        </Input>
                                    )}
                                </Form.Item>
                            </Form>
                        </Tooltip>
                    </Col>
                    <Col xs={10} className={styles.buttonGroupCol}>
                        {/* style={{ height: '100%', padding: '0 7px 0 5px' }}> */}
                        <ButtonGroup className={styles.buttonGroup}>
                            {/* style={{ marginTop: '2px'}} */}
                            <Button size="default" type="primary"
                                onClick={() => { this.onSearchData() }}>
                                <Icon type="monitor"></Icon>查找</Button>
                            <Button size="default"
                                onClick={() => { this.getFullOuUsersData() }}>
                                <Icon type="redo"></Icon>全部</Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col xs={12} className={styles.treeCol}>
                        {/* style={{ height: '220px', borderRight: '1px dotted darkgray' }}> */}
                        {/* border: '1px solid darkgray', */}
                        <Skeleton title={false} active loading={this.state.loading}>
                            <Scrollbars>
                                <DirectoryTree
                                    multiple
                                    // style={{ }}
                                    className={styles.directoryTree}
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
                    <Col xs={12} className={styles.listCol}>
                        {/* style={{ height: '220px' }}> */}
                        <Scrollbars>
                            <List
                                locale={""}
                                itemLayout="horizontal"
                                size={"small"}
                                bordered={false}
                                dataSource={this.state.chosenOnes}
                                split={false}
                                renderItem={item => {
                                    let nodeIcon = <Icon type="delete"
                                        // style={{ cursor: 'pointer' }}
                                        className={styles.nodeIcon}
                                        data-item={item.propKey}
                                        key={item.propKey}
                                        onClick={(e) => {
                                            var key = e.currentTarget.getAttribute('data-item');
                                            // console.log(Object.entries(e))
                                            var chosenOnes = this.state.chosenOnes;
                                            this.selectedChosenOnes = this.selectedChosenOnes.filter(v => v !== key);
                                            chosenOnes = chosenOnes.filter(v => v.propKey !== key);
                                            this.setState({
                                                chosenOnes
                                            })
                                        }}></Icon>;
                                    return <List.Item
                                        actions={[nodeIcon]}
                                        style={{ padding: '0px' }}
                                        className={(item.selected ? styles.listItemSelected : styles.listItem)}
                                    >
                                        <List.Item.Meta //title={item.title}
                                            description={item.title}
                                            className={styles.listItemMeta}
                                            onClick={(e, i) => {
                                                console.log('lim-e,i, item:', e, i, item);
                                                if (!this.selectedChosenOnes.find(v => v === item.propKey)) {
                                                    this.selectedChosenOnes.push(item.propKey);
                                                } else {
                                                    this.selectedChosenOnes = this.selectedChosenOnes.filter(v => v !== item.propKey);
                                                }
                                                let chosenOnes = this.state.chosenOnes;

                                                chosenOnes.forEach(ite => {
                                                    if (this.selectedChosenOnes.find(v => v === ite.propKey)) {
                                                        ite.selected = true;
                                                        ite.className = 'listItemSelected';
                                                    } else {
                                                        ite.selected = false;
                                                        ite.className = '';
                                                    }
                                                })

                                                this.setState({
                                                    chosenOnes
                                                })

                                                // this.state.chosenOnes.find(v => v.propKey === item.propKey).selected =
                                                //     !this.state.chosenOnes.find(v => v.propKey === item.propKey).selected;
                                                // console.log(' this.state.chosenOnes.find(v => v.propKey === item.propKey).selected:',
                                                //     this.state.chosenOnes.find(v => v.propKey === item.propKey).selected);
                                                console.log("this.selectedChosenOnes:", this.selectedChosenOnes);
                                            }}
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
