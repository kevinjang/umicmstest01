import { Dropdown } from 'antd'

const HeaderDropdown = (props) => {
    const { overlay } = props
    console.log('overlay:', overlay)
    return <Dropdown {...props} ></Dropdown>
}

export default HeaderDropdown