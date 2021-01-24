import {Space} from 'antd'
import {NavLink} from 'umi'
import {LockOutlined} from '@ant-design/icons'

export default ()=>{
    return (
        <NavLink to="/" style={{padding: '0 5px'}}><LockOutlined  size={"large"} style={{marginRight: '5px'}}  />注销</NavLink>
    )
}