import React from 'react'
import { Form, Input } from 'antd'
import 'antd/dist/antd.css'

const FormItem = Form.Item;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
    constructor(props) {
        super(props);

    }

    state = {
        editing: false
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                if (this.input) {
                    this.input.focus();
                }
            }
        })
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            };

            // 校验通过，修改编辑状态
            this.toggleEdit();

            // 保存数据
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps// what is this?
        } = this.props;

        return (
            <td {...restProps}>
                {
                    editable ?
                        (<EditableContext.Consumer>
                            {(form) => {
                                this.form = form;
                                return (
                                    editing ?
                                        (<FormItem style={{ margin: 0 }}>
                                            {
                                                form.getFieldDecorator(dataIndex,{
                                                    rules:[{
                                                        required: true,
                                                        message: `${title} is required.`
                                                    }],
                                                    initialValue: record[dataIndex]
                                                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)
                                            }
                                        </FormItem>) :
                                        (
                                            <div
                                                className='editable-cell-value-wrap'
                                                style={{ padding: 0 }}
                                                onClick={this.toggleEdit}
                                            >
                                                {restProps.children}
                                            </div>
                                        )
                                );
                            }}
                        </EditableContext.Consumer>)
                        :
                        restProps.children
                }
            </td>
        )
    }
}

export default EditableCell


