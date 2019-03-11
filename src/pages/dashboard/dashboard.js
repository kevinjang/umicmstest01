import React from 'react'
import axios from 'axios'
import { getOUBaseInfoAll } from '../../utils/request'
import { Card, Table } from 'antd';
// import { thisExpression } from '@babel/types';

class DashBoard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datasource:[],
            columns:[]
        }
    }
    componentDidMount(){
        getOUBaseInfoAll().then(ds=>{
            console.log('ds',ds)

            // this.setState({
            //     datasource,
            //     columns
            // })
        }).catch(err=>{
            console.log('err',err);
        })
    }

    render(){
        return <div>
            <Card>
                <Table datasource={this.state.datasource} columns={this.state.columns}>  

                </Table>
            </Card>
        </div>
    }
}

export default DashBoard