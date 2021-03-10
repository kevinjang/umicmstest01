import Draggable from 'react-draggable'
import { Modal } from 'antd'
import { useState, createRef } from 'react'

export default (props) => {
    const {
        title,
        // visible,
        onOk,
        onCancel,
        children,
        ...restProps
    } = props

    const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 })
    const [disabled, setDisabled] = useState(true)
    const draggableRef = createRef();
    const [visible, setVisible] = useState(false)

    const handleStart = (event, uiData) => {
        const { clientWidth, clientHeight } = window?.document?.documentElement
        const targetRect = draggableRef?.current?.getBoundingClientRect();
        setBounds({
            left: -targetRect?.left + uiData?.x,
            right: clientWidth - (targetRect?.right - uiData?.x),
            top: -targetRect?.top + uiData?.y,
            bottom: clientHeight - (targetRect?.bottom - uiData?.y)
        })
    }

    return (<Modal
        visible={visible}
        onOk={() => {
            setVisible(false)
            if (onOk)
                onOk();
        }}
        onCancel={() => {
            setVisible(false)
            if (onCancel)
                onCancel();
        }}
        closable={true}
        maskClosable={false}
        title={
            <div style={{
                width: '100%',
                cursor: 'move',
            }}
                onMouseOver={() => {
                    if (disabled) {
                        setDisabled(false);
                    }
                }}
                onMouseOut={() => {
                    setDisabled(true);
                }}
                onFocus={() => { }}
                onBlur={() => { }}
            >
                {title}
            </div>
        }
        modalRender={modal => {
            return (
                <Draggable disabled={disabled} bounds={bounds} onStart={(event, uiData) => {
                    handleStart(event, uiData)
                }}>
                    <div ref={draggableRef}>
                        {modal}
                    </div>
                </Draggable>
            )
        }}
        {...restProps}
    >
        {children}
    </Modal>)
}