// export default () => {
//     return <div>
//         tree test
//     </div>
// }

import React from 'react'
import {getUserName} from '../../utils/request'

class TreeTest extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            username: ''
        }
    }

    componentDidMount(){
        getUserName().then(un=>{
            console.log(un.data.UserName)
            this.setState({
                username: JSON.parse(un.data).UserName
            })
        })
    }


    render() {
        return <div>
            {this.state.username}
    </div>
    }
}

export default TreeTest