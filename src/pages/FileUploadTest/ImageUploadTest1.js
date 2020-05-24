import React from 'react';
import styles from './FileUploadTest1.css'

var getBlobUrl = (window.URL && URL.createObjectURL.bind(URL)) || (window.webkitURL && webkitURL.createObjectURL.bind(webkitURL)) || window.createObjectURL;
var revokeBlobUrl = (window.URL && URL.revokeObjectURL.bind(URL)) || (window.webkitURL && webkitURL.revokeObjectURL.bind(webkitURL)) || window.revokeObjectURL;

function ImageUploadTest1() {
    const [innerHtml, setInnerHtml] = React.useState([]);

    function handleDragEnter(e) {
        var types = e.dataTransfer.types;
        if (types && ((types.contains && types.contains("Files")) || (types.indexOf && types.indexOf("Files")))) {
            return false;
        }
    }
    function handleDropOver(e) {
        e.preventDefault();
        return false;
    }

    function handleDragLeave(e) { }

    function handleDrop(e) {
        e.preventDefault();
        var files = e.dataTransfer.files;
        var newInnerHtml = innerHtml;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (file.type.substring(0, 6) !== "image/") {
                continue;
            }
            var url = getBlobUrl(file);
            var img = React.createElement(setImage, {
                src: url
            });
            // img.src = url;
            // revokeBlobUrl(img.src);
            newInnerHtml.push(img);
        }

        setInnerHtml([...newInnerHtml]);

        console.log(innerHtml)

        return false;
    }
    return <div>
        <div className={styles.dropFileTarget} onDragEnter={handleDragEnter} onDragOver={handleDropOver} onDragLeave={handleDragLeave} onDrop={handleDrop} //onDropCapture={handleDrop}
        >
            {innerHtml}
        </div>
    </div>
}

function setImage(props) {
    console.log(props)
    return <img src={props.src} />
}

export default ImageUploadTest1