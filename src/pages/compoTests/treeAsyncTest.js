import React from 'react'
import { Tree, Modal, Button } from 'antd'

const { TreeNode } = Tree;

class TreeAsyncTest extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            modalShow: false
        }
    }

    btnClick = () =>{
        this.setState({
            modalShow: true
        })
    }

    modalCancel = () =>{
        this.closeModal();
    }

    modalConfirm = () =>{        
        this.closeModal();
    }

    closeModal = () => {
        this.setState({
            modalShow: false
        })
    }

    render(){
        return <div id="treeAsyncContainer">
            <Button onClick={this.btnClick} type="primary">打开</Button>
            <Modal
                visible={this.state.modalShow}
                title="人员选择"
                onOk={this.modalConfirm}
                onCancel={this.modalCancel}
                closable={true}>
                    <Tree>
                        
                    </Tree>
            </Modal>
        </div>
    }
}

export default TreeAsyncTest