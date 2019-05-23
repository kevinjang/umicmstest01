import React from 'react'

import {Modal} from 'antd';

import 'antd/dist/antd.css'

class AddNewModal extends React.Component{
    constructor(props){
        super(props);

        const {
            record,
            visible
        } = props;

        this.visible = visible;
        this.state = {
            visible: this.visible
        }
    }

    showModal = () => {

    }

    render(){
        return <div>
            <Modal 
                title='hahaha'
                visible={this.state.visible}
                cancelText='放弃添加' 
                // onCancel={}
                okText='确定添加'
                // onOk={}
                >
                    <p>test</p>
            </Modal>
        </div>
    }
}

export default AddNewModal