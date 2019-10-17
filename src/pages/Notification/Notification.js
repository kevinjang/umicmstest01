import React from 'react'

import styles from './Notification.css'

import { Badge, Icon, Dropdown, Tabs, Menu, List, Avatar, Button } from 'antd'
// import { Button } from 'antd/lib/radio'

import ListItem from './ListItem'

class Notification extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ddVisible: false,
            activeTabKey: 'T1',
            notifications: [
                {
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'first notification',
                    description: 'first notification description'
                },
                {
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'second notification',
                    description: 'second notification description'
                }
            ],
            messages: [
                {
                    // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'first notification',
                    description: 'first notification description',
                    icon: 'user'
                },
                {
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'second notification',
                    description: 'second notification description'
                }],
            todoList: [
                {
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'first notification',
                    description: 'first notification description'
                },
                {
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                    title: 'second notification',
                    description: 'second notification description'
                }]
        }


    }

    handleVisibleChange = flag => {
        this.setState({
            ddVisible: flag
        })
    }

    handleTabChange = (e) => {
        this.setState({
            activeTabKey: e
        }, () => {
            console.log(e)
        })
    }

    render() {
        const tabs = (
            <Menu style={{ width: '330px', height: '500px', marginTop: '11px', marginRight: '1px' }}>
                <Tabs activeKey={this.state.activeTabKey}
                    style={{ margin: '0 10px' }}
                    // size='large'
                    // tabPosition=""
                    // tabBarGutter={24}
                    onChange={this.handleTabChange}>
                    <Tabs.TabPane tab="通知(4)" key="T1" style={{ width: '100%' }}>
                        <ListItem dataSource={this.state.notifications}>

                        </ListItem>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="消息(4)" key="T2">
                        {/* <List split={true} style={{ cursor: 'pointer' }}
                            loadMore={
                                <Button style={{ width: '100%', marginTop: '5px' }} type="default">
                                    加载更多
                                </Button>
                            }
                            itemLayout="horizontal"
                            dataSource={this.state.messages}
                            renderItem={(item) => {

                                console.log('listitem:', item)
                                return <List.Item>
                                    <List.Item.Meta avatar={<Avatar 
                                        src={item.avatar ? item.avatar : ''}
                                        icon={item.icon?item.icon:''}></Avatar>}
                                        title={item.title}
                                        description={item.description}>

                                    </List.Item.Meta>
                                </List.Item>
                            }}>

                        </List> */}
                        <ListItem dataSource={this.state.messages}></ListItem>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="待办(4)" key="T3">
                        {/* <List split={true} style={{ cursor: 'pointer' }}
                            loadMore={
                                <Button style={{ width: '100%', marginTop: '5px' }} type="default">
                                    加载更多
                                </Button>
                            }
                            itemLayout="horizontal"
                            dataSource={this.state.todoList}
                            renderItem={(item) => {

                                console.log('listitem:', item)
                                return <List.Item>
                                    <List.Item.Meta avatar={<Avatar src={item.avatar}></Avatar>}
                                        title={item.title}
                                        description={item.description}>

                                    </List.Item.Meta>
                                </List.Item>
                            }}>

                        </List> */}
                        <ListItem dataSource={this.state.todoList}>

                        </ListItem>
                    </Tabs.TabPane>
                </Tabs>
            </Menu>
        )
        return (<div style={{ float: 'left', marginTop: '-10px' }}>
            <Dropdown
                overlay={tabs} style={{ marginTop: '11px' }}
                trigger={['click']}
                visible={this.state.ddVisible}
                onVisibleChange={this.handleVisibleChange}>
                <Badge count={100} overflowCount={99} style={{ marginTop: '-10px' }}>
                    <Icon type="bell" className={styles.bellIcon}></Icon>
                </Badge>
            </Dropdown>
        </div>)
    }
}

export default Notification