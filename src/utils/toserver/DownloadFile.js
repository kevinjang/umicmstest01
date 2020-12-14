import axios from 'axios';
import { message } from 'antd'
import config from '../../config/custom_config'
const { serverUrl } = config;
var baseURL = axios.defaults.baseURL = serverUrl//.home;

async function download(url) {
    // 20191129
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL + '/DownloadFile', true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        if (this.status == 200) {
            var content = this.response;
            console.log('this:', this);
            var a = document.createElement('a');
            var fileName = Date.now() + ".jpg";
            a.download = fileName;
            a.href = URL.createObjectURL(content);
            a.click();
            URL.revokeObjectURL(content);
            message.success('下载成功');
        }
    }
    xhr.onerror = () => {
        message.error(this.statusText);
    }
    xhr.send();
}

async function downloadAppointedFile(fileID, fileName) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL + `/DownloadFile`, true);
    xhr.responseType = 'blob';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        console.log('xhr-onload-this.response:', this.response);
        if (this.status == 200) {
            var content = this.response;
            var a = document.createElement('a');
            a.download = fileName;
            a.href = URL.createObjectURL(content);
            a.click();
            URL.revokeObjectURL(content);
            message.success('下载成功');
        }
    }
    xhr.onerror = () => {
        message.error(this.statusText)
    }
    xhr.send(`fileID=${fileID}`);
}

export { download, downloadAppointedFile }