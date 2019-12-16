import axios from 'axios';
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function download(url) {
    // 20191129
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseURL + '/DownloadFile', true);
    // xhr.open('GET', 'http://e.hiphotos.baidu.com/image/pic/item/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg', true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        if (this.status == 200) {
            var content = this.response;
            console.log('this:', this);
            var a = document.createElement('a');
            // var blob = new Blob([content]);
            // var headerName = xhr.getResponseHeader('Content-Disposition');
            var fileName = Date.now() + ".jpg";// decodeURIComponent(headerName).substring(20);
            // console.log('fileName:', fileName);
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

    // axios.post('/DownloadFile', {
    //     headers: {
    //         "Access-Control-Allow-Origin": "http://localhost:3000",
    //         'Content-Type': 'application/json'
    //     },
    //     responseType: 'arraybuffer'
    // }).then(response => {
    //     console.log('response.data:', response.data);//btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')));
    //     var content = btoa(new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));// btoa(response.data.reduce((data, byte) => data + String.fromCharCode(byte), ''));

    //     console.log('content:', content)
    //     var a = document.createElement('a');
    //     // var img  = document.createElement('img');
    //     var blob = new Blob([content]);
    //     // img.src = content;
    //     console.log('blob:', blob)
    //     // var headerName = xhr.getResponseHeader('Content-Disposition');
    //     var fileName = Date.now() + ".jpg";// decodeURIComponent(headerName).substring(20);
    //     // console.log('fileName:', fileName);
    //     a.download = fileName;
    //     a.href = URL.createObjectURL(blob);
    //     a.click();
    //     URL.revokeObjectURL(blob);
    //     // document.body.appendChild(img);
    //     message.success('下载成功');
    // }).catch(err => {
    //     console.log('axios err:', err.message);
    // })
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
            // var fileName = Date.now() + '.jpg';
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