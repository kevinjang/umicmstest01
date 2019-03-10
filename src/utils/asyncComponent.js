// import React, { Component } from 'react'

// // class asyncComponent extends React.Component{

// //     render(){
// //         return <div>

// //         </div>
// //     }
// // }

// // export default asyncComponent

// export default (e)=>{
//     // console.log('asyncComponent',arguments)

//     // const comp = require(e)
//     // console.log('ac',comp)
//     // return ()=>{
//     //     return comp
//     // }
//     return class x extends Component{
//         render(){
//             return <div>
//                 ac
//             </div>
//         }
//     }
// }

import React from 'react'
import path from 'path'

export const asyncComponent = loadComponent =>(
    class AsyncComponent extends React.Component{
        constructor(props){
            super(props)
            this.state={
                Component: null
            }

            this.hasLoadedComponent = this.hasLoadedComponent.bind(this)
        }

        componentWillMount(){
            if(this.hasLoadedComponent()){
                return;
            }
            console.log('ac_this',this.props.match.url)

            // console.log('loadComponent',loadComponent)

            loadComponent()
            .then(module=>{
                console.log(module)
                return module.default?module.default: module
            })
            .then(Component=>{
                this.setState({
                    Component
                })
            })
            .catch(error=>{
                console.log('error',error)
                throw error
            })

        }

        hasLoadedComponent(){
            return this.state.Component !== null
        }

        render(){
            const {Component} = this.state

            return Component?<Component {...this.props}></Component>:''
        }
    }
)