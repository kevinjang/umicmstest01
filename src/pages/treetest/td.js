{editable ? (
    <EditableContext.Consumer>
        {(form) => {
            this.form = form;
            return (
                editing ? (
                    <FormItem style={{ margin: 0 }}>
                        {(dataIndex !== 'InvoiceNo') ?
                            form.getFieldDecorator(dataIndex, {
                                rules: [{
                                    required: true,
                                    message: `${title} 是必填项.`,
                                }],
                                initialValue: (dataIndex === 'ExpenseTime' ? moment(new Date(), dateFormat) : record[dataIndex] || 0),
                            })(this.setControl(dataIndex, this))
                            : form.getFieldDecorator(dataIndex, {
                                rules: [{
                                    required: true,
                                    message: `${title} 是必填项.`,
                                }, {
                                    max: 10,
                                    message: '长度不符合标准'
                                }],
                                initialValue: (dataIndex === 'ExpenseTime' ? moment(new Date(), dateFormat) : record[dataIndex] || 0),
                            })(this.setControl(dataIndex, this))
                        }
                    </FormItem>
                ) : (
                        <div
                            className="editable-cell-value-wrap"
                            style={{ paddingRight: (dataIndex === 'InvoiceNo' ? 0 : 24), height: 30 }}
                            onClick={this.toggleEdit}>
                            {restProps.children}                                            
                        </div>
                    )
            );
        }}
    </EditableContext.Consumer>
) : restProps.children}