import React from 'react'
const { Component } = React;

import { Upload, message, Icon, Table } from 'antd'

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,

    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed`);
        }
    },
};

class DragDropUpload extends Component {
    render() {
        return (
            <Table
                columns={
                    [
                        { title: 'fileName' }
                        , { title: 'version' }
                        , { title: 'type' }
                        , { title: 'size' }
                        , { title: 'uloader' }
                        , { title: 'upload time' }
                        , { title: 'update time' }
                        , { title: 'operation' }]}
                locale={
                    {
                        emptyText: <Dragger {...props} style={{ height: '55px' }}>
                            <p className="ant-upload-drag-icon">
                                <Icon type="inbox" />
                            </p>
                            <p className="ant-upload-text">点击或拖拽文件到此处以上传文件</p>
                            <div>
                            </div>
                        </Dragger>
                    }
                }>

            </Table>
        );
    }
}

export default DragDropUpload;