import axios from 'axios';
import { message } from 'antd'
import ReactDOM from 'react-dom'
import fs from 'fs'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function download(url) {
    return axios.post('/DownloadFile', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'application/octet-stream'
        },
        // params:{
        //     fileData: file
        // },
        responseType: 'blob'
    }).then(response => {
        // console.log('response.data:', response.data)

        // const blob = response.data;
        // const reader = new FileReader();
        // reader.readAsDataURL(blob);
        // reader.onload=function(e){
        //     const a = document.createElement('a');
        //     a.download = Date.now()+".jpg";
        //     a.href = e.target.result;
        //     document.body.appendChild(a);
        //     a.click();
        //     document.body.removeChild(a);
        // }

        // var src = "data:image/jpg;base64,"+btoa(new Uint8Array(response.data).reduce((data, byte)=>data+String.fromCharCode(byte), ''));

        var eleLink = document.createElement('a');
        eleLink.download = Date.now() + ".jpg";
        eleLink.style.display = 'none';
        var blob = new Blob([(response.data)]);
        // console.log('src:', src);
        eleLink.href = URL.createObjectURL(blob);
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
        window.URL.revokeObjectURL(blob)
    }).catch(err => {
        message.error(err.message)
    })
}

export { download }