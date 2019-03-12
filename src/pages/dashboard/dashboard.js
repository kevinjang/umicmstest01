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
            // console.log('ds',ds)

            let dss = ds.data.datasource;

            // dss.reduce(item=>{
            //     // console.log('redice-{...item,key:item.Id}',{...item,key:item.Id})
            //     return {...item,key:item.Id}
            // })

            // console.log('dss',dss)

            this.setState({
                datasource: dss,
                columns: ds.data.columns
            })
        }).catch(err=>{
            console.log('err',err);
        })
    }

    render(){
        return <div>
            <Card>
                {/* {console.log(this.state.datasource)} */}
                <Table 
                    style={{overflowX:'scroll'}}
                    dataSource={this.state.datasource} 
                    columns={this.state.columns}
                    position='bottom'
                    filterDropdown>

                </Table>
            </Card>
        </div>
    }
}

export default DashBoard