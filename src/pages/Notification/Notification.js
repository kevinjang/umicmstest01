import React from 'react'

import styles from './Notification.css'

import { Badge, Icon, Dropdown, Tabs, Menu } from 'antd'

class Notification extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ddVisible: false,
            activeTabKey: 'T1'
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
        },()=>{
            console.log(e)
        })
    }

    render() {
        const tabs = (
            <Menu style={{width: '300px', height: '500px', marginTop: '11px', marginRight: '1px'}}>
                <Tabs activeKey={this.state.activeTabKey}
                    // style={{ marginRight: '1px' }}
                    // size='large'
                    // tabPosition=""
                    // tabBarGutter={24}
                    onChange={this.handleTabChange}>
                    <Tabs.TabPane tab="通知" key="T1" style={{width:'100%'}}>
                        通知
                </Tabs.TabPane>
                    <Tabs.TabPane tab="消息" key="T2">
                        消息
                </Tabs.TabPane>
                    <Tabs.TabPane tab="待办" key="T3">
                        待办
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