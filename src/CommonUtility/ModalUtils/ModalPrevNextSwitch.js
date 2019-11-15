import React from 'react'

import { Modal, message, Button, Icon } from 'antd'

class ModalWithPrevNext extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editingRecord: this.props.record,
            editingRecordIndex: this.props.currentIndex,
            dataSource: this.props.dataSource,
            showButtons: ''
        }
    }

    componentDidMount() {
        console.log('componentDidMount-props.record:', this.props.record)
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('Object.is(this.props.record, nextProps.record)', Object.is(this.props.record, nextProps.record));
    //     if (Object.is(this.props.record, nextProps.record))
    //         return false;
    //     else return true;
    // }

    // componentDidUpdate() {
    //     console.log('componentDidUpdate-props.record:', this.props.record)
    //     this.setState({
    //         showButtons: this.props.record === null ? 'none' : 'block'
    //     })
    // }

    previousRecord = () => {
        let editingRecordIndex = this.state.editingRecordIndex;
        if (editingRecordIndex === 0) {
            message.info('已经是第一条记录', 3);
            return false;
        }

        let index = editingRecordIndex - 1;
        let item = this.state.dataSource[index];

        this.setState({
            editingRecord: item,
            editingRecordIndex: index
        }, () => {
            this.props.updateRecord(this.state.editingRecord, this.state.editingRecordIndex)
        });
    }

    nextRecord = () => {
        let index = this.state.editingRecordIndex;
        let length = this.state.dataSource.length;

        // console.log('index length:', index, length);

        if (index === length - 1) {
            message.info('已经是最后一条记录', 3);
            return false
        }

        index += 1;
        let item = this.state.dataSource[index];
        // console.log('index+1, item:', index, item);

        this.setState({
            editingRecord: item,
            editingRecordIndex: index
        }, () => {
            this.props.updateRecord(this.state.editingRecord, this.state.editingRecordIndex)
        });
    }

    render() {
        // console.log('this.props.record:', this.props.record)
        return (<Modal {...this.props}>
            <div style={{ display: 'flex' }}>
                <div style={{
                    width: '50px', height: '370px',
                    paddingTop: '25%', position: 'relative',
                    marginRight: '15px'
                }}>
                    {this.props.record && this.props.record.key !== this.state.dataSource.length ?
                        <Button type='link' onClick={this.previousRecord}>
                            <Icon type='double-left' />
                        </Button>
                        : null}
                </div>
                {this.props.children}
                <div style={{
                    width: '50px', height: '370px',
                    paddingTop: '25%', position: 'relative',
                    marginLeft: '15px', display: this.state.showButtons
                }}>
                    {this.props.record && this.props.record.key !== this.state.dataSource.length ?
                        <Button type='link' onClick={this.nextRecord}>
                            <Icon type='double-right' />
                        </Button>
                        : null}
                </div>
            </div>
        </Modal>);
    }
}

export default ModalWithPrevNext