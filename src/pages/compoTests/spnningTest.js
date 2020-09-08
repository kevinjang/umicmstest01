import React from 'react'
import {Spin, InputNumber} from 'antd'

class SpinningTest extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        spinning: true
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                spinning: false
            })
        }, 5000);
    }

    render(){
        return (
            <Spin tip='Loading...' spinning={this.state.spinning}>
                <div style={{width: '100%', height: 'calc(100vh - 100px)', backgroundColor: 'violet'}}>
                    <InputNumber autoFocus={true} />
                </div>
            </Spin>
        )
    }
}

export default SpinningTest