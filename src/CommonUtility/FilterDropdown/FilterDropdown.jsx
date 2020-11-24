import { Button, Dropdown, Input, Form } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ButtonGroup from 'antd/lib/button/button-group'
// import Form from 'antd/lib/form/Form'

const FilterDropdown = () => {
    return (
        <div>
            {/* <div>
                <Button style={{ width: '100%' }} >升序</Button>
            </div>
            <div>
                <Button style={{ width: '100%' }} >降序</Button>
            </div> */}
            <Form>
                <Form.Item>
                    <Input prefix={<SearchOutlined />} onPressEnter={(e) => {
                        console.log(e.target.value)
                    }}></Input>
                </Form.Item>
                <Form.Item>
                    <Button type="link">重置</Button>
                    <Button type="link">确定</Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FilterDropdown;