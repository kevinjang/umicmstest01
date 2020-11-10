import { Form, Button, Select, Input, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import {useEffect} from 'react'

const SearchSquare = (props) => {
    const { dispatch, columns, setSearchConditionType, modelType, ...restProps } = props

    const selectOptions = !!columns && Array.isArray(columns) ? columns.map((item, index) => {
        return <Select.Option value={item.dataIndex} key={item.key}>{item.title}</Select.Option>
    }) : null;
    const formRef = React.createRef();
    const getCondition = () => {
        if(!dispatch){
            message.warn("dispatch为null，通过connect获取数据模型，然后走起~~");
            return ;
        }

        const condition = dispatch({
            type: modelType+ '/getCondition'
        })

        message.warn(condition)
    }

    const loadData = async () => {
        if (dispatch) {
            dispatch({
                type: modelType + '/fetchData',
                payload: {}
            })
        }
    }

    const setCondition = () => {
        const condition = composeConditions(); //getConditions();
        console.log('condition:', condition)
        // const { dispatch } = props
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

    // useEffect(()=>{
    //     getCondition();
    // })

    return (
        <div {...restProps}>
            <Form style={{ display: 'flex' }} ref={formRef}>
                <Space>
                    <Form.Item name="key_name">
                        <Select style={{ width: '150px' }} onChange={setCondition}>
                            {selectOptions}
                        </Select>
                    </Form.Item>
                    <Form.Item name="key_text">
                        <Input style={{ width: '120px' }}
                            onPressEnter={setCondition}
                            onBlur={setCondition}
                        />
                    </Form.Item>
                    <Form.Item name="search_btn">
                        <Button type="primary" onClick={loadData} icon={<SearchOutlined />}>搜索</Button>
                    </Form.Item>
                </Space>
            </Form>
        </div>
    );
}

export default SearchSquare;