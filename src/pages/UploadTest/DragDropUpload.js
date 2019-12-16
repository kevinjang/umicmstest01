import React from 'react'
const { Component } = React;

import { Upload, message, Icon, Table, Button, Popconfirm, Modal } from 'antd'

import { UserContext } from '../UserContextMock'

const { Dragger } = Upload;

import { upload } from '../../utils/toserver/FileUpload'
import { download } from '../../utils/toserver/DownloadFile'
import { deleteFileItem, deleteFileItems } from '../../utils/toserver/FileDelete'
import { getFilesByDocID } from '../../utils/toserver/FileObtain'

const BaseMB = Math.pow(1024, 2);
const BaseKB = Math.pow(1024, 1);

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        console.log('getbase64 file:', file)
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
    })
}
function getBase64FromBuffer(file) {
    var binary = '';
    var bytes = new Uint8Array(file.data);
    var len = bytes.length;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    console.log('getBase64FromBuffer binary:', window.btoa(binary));
    return window.btoa(binary);
}
class DragDropUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            selectedRowKeys: [],
            modalVisible: false,
            previewImage: ''
        }

        this.propsX = {
            name: 'file',
            multiple: false,
            showUploadList: false,
            accept: 'image/*',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: (info) => {
                console.log('onChange-info:', info)
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
                upload(file.file, this.context.UserAD, (res) => {
                    const { message: messageX, fileID } = res;
                    console.log('res', res);
                    if (messageX === "succeeded") {
                        let { dataSource } = this.state;

                        let item = dataSource.find(v => v.fileName === file.file.name)
                        if (item) {
                            let itemIndex = dataSource.findIndex(v => v.fileName === file.file.name);
                            dataSource[itemIndex].status = 'done';
                            dataSource[itemIndex].fileID = fileID;
                            dataSource[itemIndex].file = file;
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
            },
            // onPreview: async file => {
            //     console.log('onPreview file:', file)
            // }
        };
    }

    componentDidMount() {
        this.getFiles('x');
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

    handleDeleteItem = async (record) => {
        console.log('handleDeleteItem-record:', record);
        const { fileID } = record;
        const result = await deleteFileItem(fileID, (result) => {
            const { messageX } = result;
            if (messageX === 'succeeded') {
                message.success('删除成功');
            } else {
                message.error(messageX)
            }
            let { dataSource } = this.state;
            dataSource = dataSource.filter(v => v.fileName !== record.fileName);
            this.setState({
                dataSource
            })
        });

        // console.log(`handleDeleteItem-result:${result}`)
        // 删除文件数据记录成功后才能清掉表格里的数据
    }

    handlePreview = async (file, record) => {
        console.log('handlePreview - file:', file)
        if (!file.url && !file.preview) {
            if (file && file.type === 'Buffer') {
                file.preview = 'data:image/jpeg;base64,' + getBase64FromBuffer(file);
            } else {
                file.preview = await getBase64(file);
            }
        }

        console.log('file.preview:', file.preview);



        this.setState({
            modalVisible: true,
            previewImage: file.preview
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

        const fileIDs = selectedRowKeys.map(item => {
            return dataSource[item].fileID;
        });

        deleteFileItems(fileIDs, (result) => {
            console.log('deleteFileItems-callback-result:', result);
            // result is an array
            const succeeded = result.filter(item => item.dbDeleted);
            if (succeeded.length === fileIDs.length) {
                message.success("删除成功！");
                dataSource = dataSource.filter(v => selectedRowKeys.indexOf(v.key) < 0);
                selectedRowKeys = [];
                this.setState({
                    dataSource,
                    selectedRowKeys
                })
            } else {
                // 整理删除失败的条目
                const failed = result.filter(item => (!item.dbDeleted));
                var text = '';
                // failed.forEach((fa, index) => {

                // })
                for (var i = 0; i < failed.length; i++) {
                    var fa = failed[i];
                    var item = dataSource.find(w => w.fileID === fa.fileID);
                    if (item)
                        text += `${item.Filename} 删除失败；`;
                }

                if (text !== '')
                    message.error(text);

                for (var i = 0; i < succeeded.length; i++) {
                    var item = succeeded[i];
                    var index = dataSource.findIndex(w => w.fileID === item.fileID);
                    dataSource = dataSource.filter(w => w.fileID !== item.fileID);
                    selectedRowKeys = selectedRowKeys.filter(ind => ind !== index);
                    this.setState({
                        dataSource,
                        selectedRowKeys
                    })
                }

            }
        });
    }

    downloadFile = () => {
        download();
    }

    getFiles = (docID) => {
        docID = 'a23e2390-1f1f-11ea-b55c-af886f46fab6';
        getFilesByDocID(docID, ({ message: messageX, files }) => {
            if (messageX === 'succeeded') {
                var { dataSource } = this.state;
                if (files && files.length > 0) {
                    files.forEach((dbItem, index) => {
                        var item = dataSource.find(it => it.fileID === dbItem.ID);
                        var itemIndex = dataSource.findIndex(it => it.fileID === dbItem.ID);
                        if (item) {
                            item = {
                                ...item,
                                ...dbItem
                            }

                            dataSource[itemIndex] = item;
                        } else {
                            item = {
                                fileID: dbItem.Id,
                                fileName: dbItem.Filename,
                                key: dataSource.length,
                                version: dbItem.CurrentVersion,
                                type: dbItem.Extension,
                                size: dbItem.ContentLength,
                                uploader: dbItem.OperatorAD,
                                uploadTime: dbItem.RecordCreationTime,
                                updateTime: dbItem.LastUpdateTime,
                                file: {
                                    file: dbItem.file.file//new Blob([dbItem.file.file], {type:`application/octet-binary`})
                                },
                                filex: dbItem,
                                status: 'done'
                            }

                            dataSource.push(item);
                        }
                    })

                    this.setState({
                        dataSource
                    })
                }
            }
        })
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
                                                    style={{ margin: '0 5px' }}
                                                    onConfirm={() => this.handleDeleteItem(record)}
                                                    cancelText="取消">
                                                    <a href="javascript:;">
                                                        <Icon type="delete"></Icon>
                                                    </a>
                                                </Popconfirm>
                                                <a href="javascript:;" onClick={() => this.handlePreview(record.file.file, record)}
                                                    style={{ margin: '0 5px' }}>
                                                    <Icon type="eye"></Icon>
                                                </a>
                                                <a href="javascript:;" onClick={() => this.downloadFile()}
                                                    style={{ margin: '0 5px' }}>
                                                    <Icon type="download"></Icon>
                                                </a>
                                            </div>
                                    }
                                }
                                ]}>

                        </Table>
                        <Button type="primary" onClick={() => this.downloadFile()}>测试下载</Button>
                        <Button type="default" onClick={() => {
                            getFilesByDocID('1e6146c0-1ca3-11ea-b715-8d05801b9e23', ({ message, files }) => {
                                console.log('obtain files:', files)
                            })
                        }}>测试获取</Button>
                        <Modal visible={this.state.modalVisible}
                            onCancel={() => {
                                this.setState({
                                    modalVisible: false
                                })
                            }}
                            closable
                            destroyOnClose>
                            <img src={this.state.previewImage} style={{ width: '100%' }}></img>
                        </Modal>
                    </div>)
                }}
            </UserContext.Consumer>
        );
    }
}

export default DragDropUpload;
