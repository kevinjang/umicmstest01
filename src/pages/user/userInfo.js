import React from 'react'
import {Avatar, Badge} from 'antd'
// import '../../../antd/dist/antd.min.css'
import 'antd/lib/avatar/style/index.css'
import 'antd/lib/badge/style/index.css'

class UserInfo extends React.Component{
    render(){
        return <Badge dot>
            <Avatar 
                size='large'
                // shape='square'
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
        </Badge>
    }
}

export default UserInfo