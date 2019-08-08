import React from 'react'
import { Button, Modal, Form, Input, Radio } from 'antd'

// class CollectionCreateForm extends React.Component {
//     render(){
//         return (<div></div>)
//     }
// }

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal visible={visible} title='创建一个新的集合'
                    okText='创建' onCancel={onCancel} onOk={onCreate}>
                    <Form layout='vertical'>
                        <Form.Item label='标题'>
                            {getFieldDecorator('title', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入集合的标题！'
                                    }
                                ]
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label='描述'>
                            {getFieldDecorator('description')(<Input.TextArea />)}
                        </Form.Item>
                        <Form.Item className='collection-create-form_last-form-item'>
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value='public'>Public</Radio>
                                    <Radio value='private'>Private</Radio>
                                </Radio.Group>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;// formRef.props?
        form.validateFields((err, values) => {
            if (err)
                return;

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false })
        })
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
        console.log('formRef',formRef)
    };

    render() {
        return (
            <div>
                <Button type='primary' onClick={this.showModal}>
                    创建新集合
                </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}>
                </CollectionCreateForm>
            </div>
        )
    }
}

class CollectionCreateFormComp extends React.Component {
    render() {
        return (<CollectionsPage></CollectionsPage>);
    }
}

export default CollectionCreateFormComp;