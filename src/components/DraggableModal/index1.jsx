import Draggable from 'react-draggable'
import { Modal } from 'antd'
import { useState, createRef, Component } from 'react'

class DraggableModal extends Component {
    constructor(props) {
        super(props)
        const {
            title,
            // handleOK,
            // handleCancel,
            children,
            visible,
            ...restProps
        } = props

        this.state = {
            visible: visible,
            disabled: true,
            bounds: { left: 0, top: 0, bottom: 0, right: 0 },
            title
        }
        this.draggableRef = createRef();

    }

    selfHandleOk = () => {
        const { handleOK } = this.props
        handleOK();
    }

    selfHandleCancel = () => {
        const { hanelCancel } = this.props;
        hanelCancel();
    }

    handleStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement
        const targetRect = draggableRef?.current?.getBoundingClientRect();
        // setBounds()
        this.setState({
            bounds: {
                left: -targetRect?.left + uiData?.x,
                right: clientWidth - (targetRect?.right - uiData?.x),
                top: -targetRect?.top + uiData?.y,
                bottom: clientHeight - (targetRect?.bottom - uiData?.y)
            }
        })
    }

    render() {
        const { bounds, disabled, visible, title } = this.state;

        return (
            <Modal visible={visible}
                title={
                    <div style={{
                        width: '100%',
                        cursor: 'move'
                    }} onMouseOver={() => {
                        if (disabled) {
                            this.setState({
                                disabled: false
                            })
                        }
                    }}
                        onMouseOut={() => {
                            this.setState({
                                disabled: true
                            })
                        }}
                        onFocus={() => { }}
                        onBlur={() => { }}>
                        {title}
                    </div>
                }
                onOk={() => {
                    this.setState({
                        visible: false
                    })

                    this.selfHandleOk();
                }}
                onCancel={() => {
                    this.setState({
                        visible: true
                    })
                    this.selfHandleCancel();
                }}
                closable={true}
                maskClosable={false}
                modalRender={modal => (
                    <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => this.handleStart(event, uiData)}>
                        <div ref={this.draggableRef}>
                            {modal}
                        </div>
                    </Draggable>
                )}
            >
                {/* {this.props.children} */}
            </Modal>
        )
    }
}

export default DraggableModal