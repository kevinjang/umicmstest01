import { Layout, Form, Button, Select, Input, Icon } from 'antd'

const { Header } = Layout;


export default function (props) {

    // function handleAddRecord(){

    // }

    const { getFieldDecorator } = props.form;

    // const {FormItems} = props.items;
    return (
        <div>
            <Header style={{ backgroundColor: 'whitesmoke' }}>
                <Form>
                    {props.items ?
                        props.items.map((item) => {
                            return <Form.Item style={{ float: 'right' }}>
                                {
                                    getFieldDecorator(item.name)(item.obj)
                                }
                            </Form.Item>
                        }) : null
                    }
                </Form>
            </Header>
        </div>
    );
}