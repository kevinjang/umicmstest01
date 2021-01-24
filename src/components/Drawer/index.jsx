import { Drawer, Button } from 'antd'
import { useState } from 'react'
import { NavLink } from 'umi';

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
        <>
            {/* <Button type="primary" onClick={showDrawer}>show</Button> */}
            <NavLink to="/#" onClick={showDrawer} style={{padding: '0 5px'}}>
                <SettingOutlined size={"large"} style={{marginRight: '5px'}} />
                个人设置
            </NavLink>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={handleClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    )
}