import React from 'react'
const { Component } = React;

import { Upload, message, Icon, Table, Button, Popconfirm } from 'antd'

import { UserContext } from '../UserContextMock'

const { Dragger } = Upload;

import { upload } from '../../utils/toserver/FileUpload'
import { download } from '../../utils/toserver/DownloadFile'
const BaseMB = Math.pow(1024, 2);
const BaseKB = Math.pow(1024, 1);

class DragDropUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            selectedRowKeys: []
        }

        this.propsX = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            accept: 'image/*',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: (info) => {
                console.log('onChange-info.status:', info.status)
                const { status } = info.file;
                if (status !== "uploading") {
                    console.log('status:', status);
                }
                if (status === 'done') {
                    let { dataSource } = this.state;

                    let item = dataSource.find(v => v.fileName === info.file.name)
                    if (item) {
                        let itemIndex = dataSource.findIndex(v => v.fileName === info.file.name);
                        dataSource[itemIndex].status = 'done';
                    }

                    this.setState({
                        dataSource
                    })
                    // message.success(`${info.file.name} file uploaded successfully`);
                } else if (status === 'error') {
                    let { dataSource } = this.state;

                    let item = dataSource.find(v => v.fileName === info.file.name)
                    if (item) {
                        let itemIndex = dataSource.findIndex(v => v.fileName === info.file.name);
                        dataSource[itemIndex].status = 'error';
                    }

                    this.setState({
                        dataSource
                    })
                    message.error(`${info.file.name} file upload failed`);
                }
            },
            beforeUpload: (file, fileList) => {
                // console.log('file:', file);
                let { dataSource } = this.state;
                if (dataSource.find(v => v.fileName === file.name)) {
                    return false;
                }
                this.formAllItem(file, fileList)
            },
            customRequest: (file, fileList) => {
                upload(file.file, (res) => {
                    const { message } = res;
                    console.log('res', res);
                    if (res.message === "succeeded") {
                        let { dataSource } = this.state;

                        let item = dataSource.find(v => v.fileName === file.file.name)
                        if (item) {
                            let itemIndex = dataSource.findIndex(v => v.fileName === file.file.name);
                            dataSource[itemIndex].status = 'done';
                        }

                        this.setState({
                            dataSource
                        })
                    } else {
                        let { dataSource } = this.state;

                        let item = dataSource.find(v => v.fileName === file.file.name)
                        if (item) {
                            let itemIndex = dataSource.findIndex(v => v.fileName === file.file.name);
                            dataSource[itemIndex].status = 'error';
                        }

                        this.setState({
                            dataSource
                        })
                    }
                });
                console.log('customRequest:', file, fileList);
            },
            onDownload: (file) => {
                console.log('onDownload-file:', file)
            }
        };
    }

    formAllItem = (info, fileList) => {
        let { dataSource } = this.state;
        let userName = this.context.Username + ` [${this.context.UserAD}]`
        dataSource.push({
            fileName: info.name,
            key: dataSource.length,
            version: '0',
            type: info.type.split('/')[1],
            size: info.size,
            uploader: userName,
            uploadTime: (new Date()).toLocaleString(),
            updateTime: (new Date()).toLocaleString(),
            operation: 'guess',
            status: 'uploading'
        });

        console.log('context:', this.context);
        this.setState({
            dataSource
        })
    }

    handleDeleteItem = (record) => {
        let { dataSource } = this.state;
        dataSource = dataSource.filter(v => v.fileName !== record.fileName);
        this.setState({
            dataSource
        })
    }

    getCalculatedSize = (size) => {
        if (size > 50 * BaseMB) {
            return false;
        }

        if (Number((size / BaseMB).toFixed(2)) > 1) {
            // 大于0M即
            return (size / BaseMB).toFixed(2) + 'MB';
        }
        else if (Number((size / BaseKB).toFixed(2)) > 0) {
            return (size / BaseKB).toFixed(2) + 'KB';
        }
        else {
            return size + 'B';
        }
    }

    deleteSelectedRowKeys = () => {
        let { selectedRowKeys, dataSource } = this.state;

        dataSource = dataSource.filter(v => selectedRowKeys.indexOf(v.key) < 0);

        selectedRowKeys = [];
        this.setState({
            dataSource,
            selectedRowKeys
        })

        console.log("selectedRowKeys:", selectedRowKeys);
    }

    downloadFile = () => {
        download();
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({
                    selectedRowKeys
                })
            }
        }

        const tableFooter = () => {
            return <div>
                <Button type="default" size="small" onClick={() => this.deleteSelectedRowKeys()}>删除已选</Button>
            </div>;
        }
        return (
            <UserContext.Consumer>
                {value => {
                    this.context = value.userRow;
                    return (<div>
                        <Dragger {...this.propsX} style={{ height: '55px' }}>
                            <p className="ant-upload-text"><Icon type="inbox" style={{ color: '#1890ff' }} />点击或拖拽文件到此处以上传文件</p>
                        </Dragger>
                        <Table
                            dataSource={this.state.dataSource}
                            bordered
                            footer={tableFooter}
                            size="small"
                            rowSelection={rowSelection}
                            columns={
                                [{
                                    title: '文件名', key: 0, dataIndex: 'fileName',
                                    align: 'center',

                                    render: (text, record, index) => {
                                        return <div style={{ textAlign: 'left' }}>{text}</div>
                                    }
                                },
                                {
                                    title: '最新版本', key: 1, dataIndex: 'version',
                                    align: 'center'
                                },
                                {
                                    title: '文件类型', key: 2, dataIndex: 'type',
                                    align: 'center'
                                },
                                {
                                    title: '文件大小', key: 3, dataIndex: 'size',
                                    align: 'center',
                                    render: (text, record, index) => {
                                        console.log('size:', text);
                                        let length = Number(text);
                                        return this.getCalculatedSize(length);
                                    }
                                },
                                {
                                    title: '上传者', key: 4, dataIndex: 'uploader',
                                    align: 'center'
                                },
                                {
                                    title: '上传时间', key: 5, dataIndex: 'uploadTime',
                                    align: 'center'
                                },
                                {
                                    title: '更新时间', key: 6, dataIndex: 'updateTime',
                                    align: 'center'
                                },
                                {
                                    title: '操作', key: 7, dataIndex: 'operation',
                                    align: 'center',
                                    render: (text, record, index) => {
                                        if (record.status === 'uploading') {
                                            return <Icon type="loading"></Icon>
                                        }
                                        else if (record.status === 'error')
                                            return <Icon type="facebook"></Icon>
                                        else
                                            return <div>
                                                <Popconfirm title="确定删除吗？"
                                                    okText="确定"
                                                    onConfirm={() => this.handleDeleteItem(record)}
                                                    cancelText="取消">
                                                    <a href="javascript:;">
                                                        <Icon type="delete"></Icon>
                                                    </a>
                                                </Popconfirm>
                                                <a href="javascript:;" onClick={() => this.downloadFile()}>
                                                    <Icon type="download"></Icon>
                                                </a>
                                            </div>
                                    }
                                }
                                ]}>

                        </Table>
                        <Button type="primary" onClick={()=>this.downloadFile()}>测试下载</Button>
                    </div>)
                }}
            </UserContext.Consumer>
        );
    }
}

export default DragDropUpload;
