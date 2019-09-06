
import React from 'react'

export const asyncComponent = (loadComponent, opts) =>(
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

            var propss = Object.assign({}, this.props, opts);
            return Component?<Component { ...propss }></Component>:''
        }
    }
)