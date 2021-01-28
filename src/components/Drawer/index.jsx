import { Drawer, Button, Card, message, List, Tag, Divider } from 'antd'
import { useState } from 'react'
import { NavLink } from 'umi';

import { UserContext } from '../../pages/UserContextMock'

import { SettingOutlined } from '@ant-design/icons'

export default (props) => {
    // const { drawerVisible } = props
    const [visible, setVisible] = useState(false);

    const showDrawer = (ev) => {
        ev.preventDefault();
        setVisible(true);
    }

    const handleClose = () => {
        setVisible(false);
    }

    return (
        <UserContext.Consumer>
            {/* <Button type="primary" onClick={showDrawer}>show</Button> */}
            {value => {
                return (
                    <div>
                        <NavLink to="/#" onClick={showDrawer} style={{ padding: '0 5px', fontSize: '16px', color: 'white' }}>
                            <SettingOutlined size={"large"} style={{ marginRight: '5px' }} />个人设置</NavLink>
                        <Drawer
                            title="Basic Drawer"
                            placement="right"
                            closable={false}
                            onClose={handleClose}
                            visible={visible}
                            width="500px"
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <Card title="card title" actions={[
                                <Button type="primary" onClick={()=>{
                                    message.info("card test button clicked")
                                }}>test</Button>,
                                <Button type="dashed" onClick={()=>{
                                    message.success("card test button success clicked")
                                }}>succeed</Button>,
                                <Button type="primary" danger onClick={()=>{
                                    message.error("card test button danger clicked")
                                }}>danger</Button>
                            ]}>
                                hello becky
                            </Card>
                            <Divider type="horizontal"/>
                            <List>
                                <List.Item extra={
                                    <Tag color="steelblue">tagged</Tag>
                                }>
                                    <List.Item.Meta title={"list item title"} description={
                                        <div>
                                            "list item meta description"
                                            <Button onClick={()=>{
                                                message.loading("list item meta description", 3, ()=>{
                                                    message.info('closed');
                                                })
                                            }}>test</Button>
                                        </div>
                                    }>

                                    </List.Item.Meta>
                                </List.Item>
                            </List>
                        </Drawer>
                    </div>
                )
            }}
        </UserContext.Consumer>
    )
}