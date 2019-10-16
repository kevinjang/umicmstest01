import React from 'react';
import {
    Layout, Icon, Popconfirm
    , Table, Form, Button, Input, Select, Spin, Row
} from 'antd'
import SearchSquare from '../../CommonUtility/BPM_RM/SearchSquare'
const { Option } = Select;
import { getByPage } from '../../utils/toserver/VacationStandardMaintainUtil'

class VacationStandardMaintain extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: [],
            spinning: false,
            allCount: 0,
            selectedRowKeys: [],
            pagi_pageSize: 10,
            pagi_total: 0,
            pagi_current: 0,
            operation: '',
            filterCol: '-'
        }

        this.pagination = {
            pageSize: 10,
            total: 0,
            current: 0,
            onChange: (page, pageSize) => {
                // console.log('pagination - page:', page);
                this.pagination.current = page;
                this.setState({
                    pagi_pageSize: pageSize,
                    pagi_current: page
                }, () => {
                    this.loadData();
                })
            }
        }

        this.columns = [
            {
                title: '序号',
                dataIndex: 'RowNum',
                width: '5%',
            }, {
                title: '域账号',
                dataIndex: 'UserAD',
                width: '13%'
            }, {
                title: '员工编号',
                dataIndex: 'PersonalID',
                width: '13%'
            }, {
                title: '外出类型',
                dataIndex: 'Kinds',
                width: '13%'
            }, {
                title: '计算方法',
                dataIndex: 'Type',
                width: '13%'
            }, {
                title: '标准天数',
                dataIndex: 'StandardDays',
                width: '13%'
            }, {
                title: '剩余天数',
                dataIndex: 'OldDays',
                width: '13%'
            }, {
                title: '备注',
                dataIndex: 'Description',
                width: '13%'
            }, {
                title: '操作',
                width: '5%',
                render: (text, record) => {
                    // console.log('render-this', this)
                    return <div>
                        <a href='javascript:;' onClick={() => this.handleEditRecord(record)}> <Icon type='file'></Icon></a>
                        <Popconfirm title='确定删除吗？' onConfirm={() => this.handleDeleteRecord(record)}>
                            <a href='javascript:;'>
                                <Icon type='delete'>
                                </Icon></a>
                        </Popconfirm>
                    </div>
                }
            }
        ];

        this.options = [
            <Option value='-'>请选择过滤字段</Option>,
            <Option value="UserAD">域账号</Option>,
            <Option value="PersonalID">员工编号</Option>,
            <Option value="Kinds">外出类型</Option>,
            <Option value="Type">计算方法</Option>,
            <Option value="StandardDays">标准天数</Option>,
            <Option value="OldDays">剩余天数</Option>,
            <Option value="Description">备注</Option>
        ]

        this.items = [
            {
                name: 'vsm_add_btn',
                obj: <Button type="primary">添加</Button>
            }, {
                name: 'vsm_delete_btn',
                obj: <Button type="danger">删除所选</Button>
            }, {
                name: 'vsm_filter_text',
                obj: <Input style={{ width: '120px' }} 
                    onPressEnter={this.handleSearch}
                    suffix={<a href="" onClick={this.handleSearch} ><Icon type="search"></Icon></a>}>

                </Input>
            }, {
                name: 'vsm_filter_column',
                obj: <Select style={{ width: '150px' }}>
                    {this.options}
                </Select>
            }
        ]
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const { getFieldValue } = this.props.form;
        var vsm_filter_column = getFieldValue('vsm_filter_column');
        var vsm_filter_text = getFieldValue('vsm_filter_text');
        const condition = vsm_filter_column === '-' ? null : {
            name: vsm_filter_column,
            value: vsm_filter_text
        }

        const { activeKey, selfID } = this.props;
        if (activeKey !== selfID) return false;

        getByPage(this.state.pagi_pageSize, this.state.pagi_current, condition, this.queryCallBack);
    }

    queryCallBack = (e) => {
        const {
            PaginationTotal,
            dataSource,
            allCount,
            pagi_total,
            spinning
        } = e;

        this.pagination.total = PaginationTotal;

        this.setState({
            dataSource,
            allCount,
            pagi_total,
            spinning
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.loadData();
    }

    onTableRowSelectedChange = (selectedRowKeys)=>{
        this.setState({
            selectedRowKeys
        });
    }

    render() {
        const tableFooter = () => {
            return `共计${this.state.allCount}条数据`
        }

        const {selectedRowKeys} = this.state;
        const onRowSelection = {
            selectedRowKeys,
            onChange: this.onTableRowSelectedChange
        }

        return (
            <Spin spinning={this.state.spinning} tip="加载中...">
                <SearchSquare 
                    form={this.props.form} 
                    items={this.items}></SearchSquare>
                <Layout>
                    <Form style={{ padding: '0 5px' }}>
                        <Row gutter={8}>
                            <Form.Item>
                                <Table
                                    bordered
                                    columns={this.columns}
                                    dataSource={this.state.dataSource}
                                    footer={tableFooter}
                                    pagination={this.pagination}
                                    rowSelection={onRowSelection}>

                                    </Table>
                            </Form.Item>
                        </Row>
                    </Form>
                </Layout>
            </Spin>
        );
    }
}

const VSMForm = Form.create({ name: 'VacationStandardMaintain' })(VacationStandardMaintain);

class VacationStandardMaintainFormComp extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <VSMForm {...this.props}></VSMForm>
    }
}

export default VacationStandardMaintainFormComp