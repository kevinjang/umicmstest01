import React from 'react'
const { Component } = React;

import { Upload, message, Icon, Table } from 'antd'

const { Dragger } = Upload;

class DragDropUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
        this.propsDragger = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: (info) => {
                console.log(info)
                const { status } = info.file;
                if (status !== "uploading") {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    // let item = thisf.formAItem(info)
                    // if (item) {
                    //     let { dataSource } = this.state;
                    // }
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed`);
                }
            },
            beforeUpload: (file, fileList) => {
                console.log('fileList:', fileList);
                let { dataSource } = this.state;

                dataSource = fileList.map((info, index) => {
                    let item = this.formAItem(info, dataSource)
                    if (item) {
                        item.key = index;
                        return item;
                    } else {

                    }
                });

                this.setState({
                    dataSource
                }, () => {
                    console.log('dataSource:', dataSource);
                })

            }
        };
    }

    formAItem = (info, dataSource) => {
        if (dataSource.find(v => v.fileName === info.name)) {
            message.info(`${info.name}已上传过！`);
            return false;
        }

        return {
            fileName: info.name,
            version: 0,
            type: info.type.split('/')[1],
            size: info.size + 'B',
            uploader: '张皓明',
            uploadTime: new Date().toLocaleString(),
            updateTime: new Date().toLocaleString(),
            operation: 'guess'
        }
    }


    render() {
        return (
            <div>
                <Dragger {...this.propsDragger} style={{ height: '10px' }}>
                    {/* <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p> */}
                    <p className="ant-upload-text">点击或拖拽文件到此处以上传文件</p>
                </Dragger>
                <Table
                    columns={
                        [
                            { title: 'fileName', key: 'fileName', dataIndex: 'fileName' }
                            , { title: 'version', key: 'version', dataIndex: 'version' }
                            , { title: 'type', key: 'type', dataIndex: 'type' }
                            , { title: 'size', key: 'size', dataIndex: 'size' }
                            , { title: 'uploader', key: 'uploader', dataIndex: 'uploader' }
                            , { title: 'uploadTime', key: 'uploadTime', dataIndex: 'uploadTime' }
                            , { title: 'updateTime', key: 'updateTime', dataIndex: 'updateTime' }
                            , { title: 'operation', key: 'operation', dataIndex: 'operation' }]}
                    dataSource={this.state.dataSource}>

                </Table></div>
        );
    }
}

export default DragDropUpload;