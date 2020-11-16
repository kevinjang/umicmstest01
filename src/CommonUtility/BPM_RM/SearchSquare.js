import { Form, Button, Select, Input, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchSquare = (props) => {
    const { dispatch, columns, modelType, buttons, searchMethod, loadCallback, ...restProps } = props

    const selectOptions = !!columns && Array.isArray(columns) ? columns.filter(col=>!!col.asQuery).map((item, index) => {
        return <Select.Option value={item.dataIndex} key={item.key}>{item.title}</Select.Option>
    }) : null;
    if(selectOptions){
        selectOptions.unshift(
            <Select.Option value={""} key="-"></Select.Option>
        )
    }
    const formRef = React.createRef();
    
    const loadData = async () => {
        if (!modelType) {
            message.info('modelType为空，无法加载数据');
            return false;
        }
        if (dispatch) {
            dispatch({
                type: modelType + '/fetchData',
                payload: {
                    callback: loadCallback || null
                }
            })
        } else {
            message.info('dispatch为空，无法加载数据');
        }
    }

    const setCondition = () => {
        const condition = composeConditions();
        if (condition && dispatch) {
            dispatch({
                type: modelType + '/setCondition',
                payload: condition
            })
        }
    }

    const composeConditions = () => {
        const form = formRef.current;
        const keyId = "keyName";
        const keyName = form.getFieldValue("key_name")
        const keyValue = form.getFieldValue("key_text") || '';

        return {
            keyId,
            name: keyName,
            value: keyValue
        }
    }

    return (
        <div {...restProps}>
            <Form style={{ display: 'flex', float: 'right', marginRight:'20px' }} ref={formRef}>
                <Space>
                    <Form.Item name="key_name">
                        <Select style={{ width: '150px' }} onChange={setCondition}>
                            {selectOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item name="key_text">
                        <Input allowClear={true} style={{ width: '120px' }}
                            onPressEnter={setCondition}
                            onBlur={setCondition}
                            
                        />
                    </Form.Item>
                    <Form.Item name="search_btn">
                        <Button type="primary" onClick={loadData} icon={<SearchOutlined />}>搜索</Button>
                    </Form.Item>
                    {buttons ?
                        buttons.map((button) => {
                            return <Form.Item name={button.name + "_btn_fitem"} key={button.name + "_btn_fitem"}>
                                {button}
                            </Form.Item>
                        }) : null
                    }
                </Space>
            </Form>
        </div>
    );
}

SearchSquare.dispatch = null

export default SearchSquare;