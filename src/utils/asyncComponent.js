
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
            loadComponent()
            .then(module=>{
                return module.default?module.default: module
            })
            .then(Component=>{
                this.setState({
                    Component
                })
            })
            .catch(error=>{
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