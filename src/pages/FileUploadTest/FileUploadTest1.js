import React, { useEffect } from 'react'
import style from './FileUploadTest1.css'

function FileUploadTest1() {

    const [innerHtml, setInnerHtml] = React.useState('Drop files here');


    function handleOnDragEnter(e) {
        var types = e.dataTransfer.types;
        if (types && ((types.contains && types.contains("Files")) || (types.indexOf && types.indexOf("Files") !== -1))) {
            return false;
        }
    }

    function handleOnDragOver(e) {
        e.preventDefault();
        return false;
    }

    function handleOnDragLeave() {
        return false;
    }

    function handleOnDrop(e) {
        // debugger
        e.preventDefault();
        console.log('ondrop')
        var files = e.dataTransfer.files;
        if (!files) return;

        setInnerHtml(getInnerHTML(files))

        return false;
    }

    function getInnerHTML(files) {
        var lis = [];
        for (var i = 0; i < files.length; i++) {
            lis.push(React.createElement("li", {}, files[i].name));
        }
        var message = React.createElement("ul", {}, lis);

        return message
    }



    return <div>
        FileUploadTest
        <div className={style.dropFileTarget} onDragEnter={handleOnDragEnter} onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave} onDrop={handleOnDrop}
            onDropCapture={handleOnDrop}>
            {innerHtml}
        </div>
    </div>
}

export default FileUploadTest1