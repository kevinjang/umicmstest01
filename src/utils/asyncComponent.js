
import React from 'react'

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
            console.log('ac_this',this.props)

            // console.log('loadComponent',loadComponent)

            loadComponent()
            .then(module=>{
                // console.log(module)
                return module.default?module.default: module
            })
            .then(Component=>{
                this.setState({
                    Component
                })
            })
            .catch(error=>{
                // console.log('error',error)
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