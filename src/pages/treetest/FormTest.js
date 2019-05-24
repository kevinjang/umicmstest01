import React from 'react';
import { Form, Input } from 'antd'

const FormItem = Form.Item;

const FormContext = React.createContext();

const FormContent = ({ form, index, ...props }) => (
    <FormContext.Provider value={form}>
        <div  {...props}>

        </div>
    </FormContext.Provider>
);

const FormContentX = Form.create({ name: 'testX' })(FormContent);

class FormTest extends React.Component {
    constructor(props) {
        super(props);
    }

    renderContent = form => {
        console.log('renderContent.form', form);
        return <div>
            <FormItem>
                {form.getFieldDecorator('test1', {
                    rules: [
                        {
                            required: true,
                            message: '必填项'
                        }
                    ]
                })(
                    <Input defaultValue={'test1'}></Input>
                )}
            </FormItem>
        </div>
    }

    render() {
        return <div>
            <FormContentX>
                <FormContext.Consumer>
                    {this.renderContent}
                </FormContext.Consumer>
            </FormContentX>
        </div>
    }
}

export default FormTest