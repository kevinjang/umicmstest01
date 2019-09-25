
// import styles from './EmployeeBPMaintain.css';
import React from 'react'
import { Spin, Row, Col, Layout, Table, Form, Button, Input, Icon, Select, Popconfirm, message } from 'antd'

const { Header } = Layout;
const { Option } = Select;

import { getByPage } from '../../utils/toserver/EmployeeBPUtil'

class EmployeeBPMaintain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinning: true,
      dataSource: [],
      filterCol: '-',
      allCount: 0,
      pagi_pageSize: 10,
      pagi_total: 0,
      pagi_current: 0,
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
        key: 'RowNum',
        dataIndex: 'RowNum',
        title: '序号'
      },
      {
        key: 'BPNo',
        dataIndex: 'BPNo',
        title: 'BP号'
      },
      {
        key: 'EmployeeName',
        dataIndex: 'EmployeeName',
        title: '姓名'
      },
      {
        key: 'PriDept',
        dataIndex: 'PriDept',
        title: '一级部门'
      },
      {
        key: 'SecDept',
        dataIndex: 'SecDept',
        title: '二级部门'
      },
      {
        key: 'BankAccount',
        dataIndex: 'BankAccount',
        title: '银行账号'
      },
      {
        key: 'BankName',
        dataIndex: 'BankName',
        title: '开户行'
      },
      {
        key: 'Email',
        dataIndex: 'Email',
        title: 'Email'
      },
      {
        // key: 'BPNo',
        // dataIndex: '',
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

    this.options = this.columns.filter(item => (item.key !== 'RowNum' && item.title !== '操作'))
      .map(item => {
        return <Option value={item.key} key={item.key} >
          {item.title}
        </Option>
      });

    this.options.unshift(<Option value="-" key="-">请选择</Option>);
  }

  handleSearch = (e) => {
    e.preventDefault();
  }

  handleEditRecord = (e) => {

  }

  handleDeleteRecord = (e) => {

  }

  onFilterSelectChange = (e) => {
    // console.log('onFilterSelectChange-e', e);
    this.setState({
      filterCol: e
    }, () => {
      console.log(this.state.filterCol)
    })
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     spinning: false
    //   })
    // }, 200);

    this.loadData();
  }

  loadData = () => {
    const { activeKey, selfID } = this.props;
    if (activeKey !== selfID) return false;
    getByPage(this.state.pagi_pageSize, this.state.pagi_current, null, this.callbackAfterQuery);
  }

  callbackAfterQuery = (e) => {
    const {
      PaginationTotal,
      dataSource,
      allCount,
      pagi_total,
      spinning } = e;

    this.pagination.total = PaginationTotal;

    this.setState({
      dataSource,
      allCount,
      pagi_total,
      spinning
    })
    // message.info('ok')
  }

  render() {
    // const { getFieldDecorator } = this.props.form;
    return <Spin spinning={this.state.spinning}>
      <div>
        <Header style={{ backgroundColor: 'whitesmoke' }}>
          <Form>
            <Form.Item style={{ float: 'right' }}>
              <Button type="primary">添加</Button>
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Button type='danger'>删除所选</Button>
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Input suffix={<a href="" onClick={this.handleSearch}><Icon type='search' /></a>} ></Input>
            </Form.Item>
            <Form.Item style={{ float: 'right' }}>
              <Select style={{ minWidth: '100px' }} onChange={this.onFilterSelectChange}>
                {this.options}
              </Select>
            </Form.Item>
          </Form>
        </Header>
        <Layout>
          <Table
            columns={this.columns}
            bordered
            dataSource={this.state.dataSource}
            pagination={this.pagination}>

          </Table>
        </Layout>
      </div>
    </Spin>
  }
}

const EmployeeBPMaintainForm = Form.create({name: 'employee_bp_maintain'})(EmployeeBPMaintain);

class EmployeeBPMaintainFormComp extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <EmployeeBPMaintainForm {...this.props}></EmployeeBPMaintainForm>
    );
  }
}

export default EmployeeBPMaintainFormComp
