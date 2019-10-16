import React from 'react'

class FileInput extends React.Component{
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileinput = React.createRef();
    }

    handleSubmit(event){
        event.preventDefault();
        alert(
            `Selected File ${this.fileinput.current.files[0].name}`
        );
    }


    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label >
                    Upload File:
                    <input type="file" ref={this.fileinput} accept="image/*" multiple/>
                </label>
                <br/>
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default FileInput