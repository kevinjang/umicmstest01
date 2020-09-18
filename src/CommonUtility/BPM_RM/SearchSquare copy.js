import { Layout, Form, Button, Select, Input, Icon, Space } from 'antd'

const { Header } = Layout;


export default function (props) {
    return (
        <div>
            <Header style={{
                backgroundColor: 'whitesmoke',
                height: '40px'
            }}>
                <Form>
                    {props.items ?
                        props.items.map((item) => {
                            // const ObjCompo = item.obj;
                            return <Form.Item style={{ float: 'right', marginBottom: '0px', marginRight: '5px' }} name={item.name}>
                                {item.obj}
                            </Form.Item>
                        }) : null
                    }
                </Form>
            </Header>
        </div>
    );
}