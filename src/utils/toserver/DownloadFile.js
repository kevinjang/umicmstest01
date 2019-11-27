import axios from 'axios';
import { message } from 'antd'
import ReactDOM from 'react-dom'
import fs from 'fs'
var baseURL = axios.defaults.baseURL = "http://localhost:3000";

async function download(url) {
    return axios.post('/DownloadFile', {
        headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            'Content-Type': 'blob'
        },
        // params:{
        //     fileData: file
        // },
        // responseType: 'json'
    }).then(response => {
        console.log('download-Buffer(response.data):', response.data);
        // const readable = fs.createReadStream(Buffer(response.data));
        // console.log('atob response.data:', window.atob(response.data))

        // var reader = new FileReader();
        // reader.readAsBinaryString(new Blob([response]));
        // reader.onload = function(e){
        //     console.log('FileReader-result:',e.target.result)
        // }


        var eleLink = document.createElement('a');
        eleLink.download = Date.now() + ".jpg";
        eleLink.style.display = 'none';
        var blob = new Blob([Buffer(response.data)],{
            type: 'image/jpeg'
        });
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