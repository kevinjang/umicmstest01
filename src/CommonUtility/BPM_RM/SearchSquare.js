import { Layout, Form, Button, Select, Input, Icon } from 'antd'

const { Header } = Layout;


export default function (props) {

    // function handleAddRecord(){

    // }

    const { getFieldDecorator } = props.form;

    // const {FormItems} = props.items;
    return (
        <div>
            <Header style={{
                backgroundColor: 'whitesmoke'
                // , padding: '-10px 0'
                // , border: '1px solid black'
                ,height: '40px'
            }}>
                <Form>
                    {props.items ?
                        props.items.map((item) => {
                            return <Form.Item style={{ float: 'right', marginBottom: '0px' }}>
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