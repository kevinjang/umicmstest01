import React from 'react'
import { Upload, Icon, Modal } from 'antd';
const { Component } = React;


function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}
class UploadMain extends Component {
    state = {
        previewVisible: false,
        previewImage:'',
        fileList: []
    }


    handleChange = ({ fileList }) => {
        console.log(fileList[0])
        this.setState({
            fileList
        })
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }

        this.setState({
            previewVisible: true,
            previewImage: file.url || file.preview
        })
    }

    handleCancel = () =>{
        this.setState({
            previewVisible: false
        })
    }


    render() {
        const { fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus"></Icon>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (<div className="clearfix">
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={this.handleChange}
                onPreview={this.handlePreview}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={this.state.previewVisible} footer={null}
                onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={this.state.previewImage} />
            </Modal>
        </div>);
    }
}

export default UploadMain