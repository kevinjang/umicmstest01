import axios from 'axios';
import { message } from 'antd'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function download(url) {
    // axios.post('/DownloadFile', {
    //     headers: {
    //         "Access-Control-Allow-Origin": "http://localhost:3000",
    //         'Content-Type': 'multipart/form-data'
    //     },
    //     // params:{
    //     //     fileData: file
    //     // },
    //     responseType: 'arraybuffer'
    // }).then(response => {
    //     console.log('response:', response);

    //     // const blob = response.data;
    //     // const reader = new FileReader();
    //     // reader.readAsDataURL(blob);
    //     // reader.onload=function(e){
    //     //     const a = document.createElement('a');
    //     //     a.download = Date.now()+".jpg";
    //     //     a.href = e.target.result;
    //     //     document.body.appendChild(a);
    //     //     a.click();
    //     //     document.body.removeChild(a);
    //     // }

    //     // var src = "data:image/jpg;base64,"+btoa(new Uint8Array(response.data).reduce((data, byte)=>data+String.fromCharCode(byte), ''));

    //     var eleLink = document.createElement('a');
    //     eleLink.download = Date.now() + ".txt";
    //     eleLink.style.display = 'none';
    //     var blob = new Blob([response.data],{
    //         type: 'plain/text'
    //     });
    //     // console.log('src:', src);
    //     eleLink.href = URL.createObjectURL(blob);
    //     document.body.appendChild(eleLink);
    //     eleLink.click();
    //     document.body.removeChild(eleLink);
    //     window.URL.revokeObjectURL(blob)
    // }).catch(err => {
    //     message.error(err.message)
    // })

    var xhr = new XMLHttpRequest();
    // xhr.open('POST', baseURL + '/DownloadFile', true);
    xhr.open('GET', 'http://e.hiphotos.baidu.com/image/pic/item/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg', true);
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
}

export { download }