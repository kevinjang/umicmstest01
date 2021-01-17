import { Dropdown } from 'antd'

const HeaderDropdown = (props) => {
    const { overlay } = props
    console.log('overlay:', overlay)
    return <Dropdown {...props} trigger={['click']}></Dropdown>
}

export default HeaderDropdown