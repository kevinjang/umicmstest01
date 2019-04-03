import React from 'react'
import axios from 'axios'
import { getOUBaseInfoAll } from '../../utils/request'
import { Card, Table, Tag, Pagination } from 'antd';
import './dashboard.css'
// import { thisExpression } from '@babel/types';

class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            datasource: [],
            columns: [],
            allcount: 0,
            currentPage: 1,
            pageSize: 10,
            currentParentID: '6798'
        }
    }
    componentDidMount() {
        this.loadDataForTable({
            parentid: this.state.currentParentID,
            pageSize: this.state.pageSize,
            currentPage: this.state.currentPage
        });
    }

    // componentWillUpdate

    loadDataForTable = ({ parentid, pageSize, currentPage }) => {
        // console.log('{ parentid, pageSize, currentPage }',{ parentid, pageSize, currentPage })
        getOUBaseInfoAll({ parentid, pageSize, currentPage }).then(ds => {

            let dss = ds.data.datasource;

            dss.reduce(item => {
                // 为每一行添加key字段信息
                return { ...item, key: item.Id }
            })

            let columns = ds.data.columns;
            columns = columns.map(item => {
                // 为列添加独立的渲染方法，加特效
                if (item.dataIndex === 'RecordStatus') {
                    item = {
                        ...item,
                        render: rss => {
                            let color = (rss === '在用' ? 'green' : 'volcano')
                            let key = rss

                            return <Tag color={color} key={key}>
                                {rss}
                            </Tag>
                        }
                    }
                }
                else if (item.dataIndex === 'LastUpdateTime') {
                    item = {
                        ...item,
                        render: lut => {
                            return <Tag color={'geekblue'} key={Date.now()}>{lut}</Tag>
                        }
                    }
                }

                return item
            })

            this.setState({
                datasource: dss,
                columns: columns,
                allcount: ds.data.allcount
            })
        }).catch(err => {
            console.log('err', err);
        })
    }

    render() {
        return <div>
            <Table
                style={{ overflowX: 'scroll' }}
                dataSource={this.state.datasource}
                columns={this.state.columns}
                position='both'
                pagination={
                    {
                        currentPage: this.state.currentPage,
                        total: this.state.allcount,
                        showTotal: (total) => { return `共计 ${total} 条` },                        
                        onChange: (page, pageSize) => {
                            console.log('onchange',{page,pageSize})
                            this.setState({
                                pageSize:pageSize,
                                currentPage: page
                            })
                            console.log('onchange-currentpage',this.state.currentPage)

                            this.loadDataForTable({
                                parentid: this.state.currentParentID,
                                pageSize: this.state.pageSize,
                                currentPage: page//this.state.currentPage
                            });
                        }
                    }
                }
                filterDropdown>

            </Table>
            {/* <Pagination></Pagination> */}
        </div>
    }
}

export default DashBoard