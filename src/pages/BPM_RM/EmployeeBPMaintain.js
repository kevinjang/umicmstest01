
// import styles from './EmployeeBPMaintain.css';
import React from 'react'
import { Spin, Row, Col, Layout, Table, Form, Button, Input, Icon, Select, Popconfirm } from 'antd'

const { Header } = Layout;
const { Option } = Select;

class EmployeeBPMaintain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      spinning: true
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
        render: () => {
          (text, record) => {
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
      }
    ]
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        spinning: false
      })
    }, 1000)
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
              <Select style={{ minWidth: '100px' }}>
                <Option value="-">请选择</Option>
                {
                  this.columns.filter(item => item.key !== 'RowNum').map(item => {
                    return <Option value={item.key} >
                      {item.title}
                    </Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </Header>
        <Layout>
          <Table  
            columns={this.columns}
            bordered>

          </Table>
        </Layout>
      </div>
    </Spin>
  }
}

export default EmployeeBPMaintain
