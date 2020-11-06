import { Layout, Form, Button, Select, Input, Icon, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { connect } from 'umi'

const { Header } = Layout;


const SearchSquare = (props) => {
    const { loadData, columns } = props

    const selectOptions = !!columns && Array.isArray(columns) ? columns.map((item, index)=>{
    return <Select.Option value={item.dataIndex} key={item.key}>{item.title}</Select.Option>
    }) : null;
    const formRef = React.createRef();
    const getConditions = () => {
        if (formRef && formRef.current) {
            const form = formRef.current;
            return {
                keyWord: form.getFieldValue("key_name"),
                keyText: form.getFieldValue("key_text")
            }
        }

        return null;
    }

    const setCondition = () => {
        const condition = getConditions();
        const { dispatch } = props
        if (condition && dispatch) {
            dispatch({
                type: 'LeaveAuthModel/setSearchCondition',
                payload: condition
            })
            if (loadData) {
                loadData();
            }
        }
    }

    return (
        <div>
            <Form style={{ display: 'flex' }} ref={formRef}>
                <Space>
                    <Form.Item name="key_name">
                        <Select style={{ width: '150px' }} >
                            {selectOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item name="key_text">
                        <Input style={{ width: '120px' }}
                            onPressEnter={() => {
                                // NOTE: dispatch更新searchCondition去
                                setCondition();
                            }}
                            onBlur={() => {
                                // NOTE: dispatch更新searchCondition去
                                setCondition();
                            }}
                            onChange={() => {
                                // NOTE: dispatch更新searchCondition去
                                setCondition();
                            }}
                        />
                    </Form.Item>
                </Space>
            </Form>
        </div>
    );
}

export default connect(({
    LeaveAuthModel
}) => ({
    LeaveAuthModel
}))(SearchSquare)