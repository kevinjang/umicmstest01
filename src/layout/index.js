import React from 'react'

class Index extends React.Component{
    render(){
        return <div id="MainFrame">
            {this.props.children}
        </div>
    }
}

export default Index