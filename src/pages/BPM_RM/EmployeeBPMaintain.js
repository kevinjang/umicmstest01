import React from 'react'
import {
  Spin, Row, Col, Layout, Table, Form, Button, Input,
  Icon, Select, Popconfirm, message, Modal
} from 'antd'

import EmployeeBPMaintainItemModalFormComp from './EmployeeBPMaintainItemModal'

import SearchSquare from '../../CommonUtility/BPM_RM/SearchSquare'

const { Header } = Layout;
const { Option } = Select;

import { getByPage, insert, update, deleteItem, deleteItems } from '../../utils/toserver/EmployeeBPUtil'

import ModalFooter from '../../CommonUtility/ModalUtils/ModalFooter'

import { FileOutlined, DeleteOutlined } from '@ant-design/icons'

class EmployeeBPMaintain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      spinning: true,
      dataSource: [],
      filterCol: '-',
      allCount: 0,
      pagi_pageSize: 10,
      pagi_total: 0,
      pagi_current: 0,
      operation: '',
      // 编辑项
      editingRecord: null,
      okBtnAvailable: false
    }

    this.pagination = {
      pageSize: this.state.pagi_pageSize,
      total: 0,
      current: 0,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (page, pageSize) => {
        // console.log('pagination - page:', page);
        console.log(pageSize)
        this.pagination.current = page;
        this.setState({
          pagi_pageSize: pageSize,
          pagi_current: page
        }, () => {
          this.loadData();
        })
      },
      onShowSizeChange: (current, size) => {
        this.pagination.current = current;
        console.log('showsizechanger-size:', size)
        this.pagination.pageSize = size;
        this.setState({
          pagi_pageSize: size,
          pagi_current: current
        }, () => {

          this.loadData()
        })
      },
      showTotal: function (total, range) {
        return `11共计${total}条数据，当前显示${range.toString().replace(',', '~')}`
      }
    }

    this.columns = [
      {
        key: 'RowNum',
        dataIndex: 'RowNum',
        title: '序号',
        width: '50px'
      },
      {
        key: 'BPNo',
        dataIndex: 'BPNo',
        title: 'BP号',
        width: '100px'
      },
      {
        key: 'EmployeeName',
        dataIndex: 'EmployeeName',
        title: '姓名',
        width: '100px'
      },
      {
        key: 'PriDept',
        dataIndex: 'PriDept',
        title: '一级部门',
        width: '200px'
      },
      {
        key: 'SecDept',
        dataIndex: 'SecDept',
        title: '二级部门',
        width: '200px',
        ellipsis: true
      },
      {
        key: 'BankAccount',
        dataIndex: 'BankAccount',
        title: '银行账号',
        width: '200px'
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
        key: 'Remark',
        dataIndex: 'Remark',
        title: '备注'
      },
      {
        // key: 'BPNo',
        // dataIndex: '',
        title: '操作',
        width: '5%',
        render: (text, record) => {
          // console.log('render-this', this)
          return <div>
            <a href='javascript:;' onClick={() => this.handleEditRecord(record)}> <FileOutlined /></a>
            <Popconfirm title='确定删除吗？' okText="确定" cancelText="取消" onConfirm={() => this.handleDeleteRecord(record)}>
              <a href='javascript:;'>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </div>
        }
      }
    ];

    this.form = null;
    this.formRef = React.createRef();

    this.options = this.columns.filter(item => (item.key !== 'RowNum' && item.title !== '操作'))
      .map(item => {
        return <Option value={item.key} key={item.key} >
          {item.title}
        </Option>
      });

    this.options.unshift(<Option value="-" key="-" >请选择</Option>);
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.loadData();
  }

  handleEditRecord = (e) => {
    // console.log('edit-e:', e);
    this.setState({
      editingRecord: e,
      modalShow: true,
      operation: 'update'
    })
  }

  handleAddRecord = () => {
    var record = {
      RowNum: this.state.dataSource.length + 1,
      BPNo: '',
      EmployeeName: '',
      PriDept: '',
      SecDept: '',
      BankAccount: '',
      BankName: '',
      Email: '',
      Remark: ''
    }

    this.setState({
      editingRecord: record,
      modalShow: true,
      operation: 'insert'
    })
  }

  handleDeleteRecord = (e) => {
    console.log('delete-e:', e);
    const { ID } = e;
    deleteItem(ID, this.loadData);
  }

  handleDeleteSelectedRecords = () => {
    const { selectedRowKeys } = this.state;
    if (!selectedRowKeys || selectedRowKeys.length === 0) {
      message.info('请选择要删除的记录！');
      return;
    }

    Modal.confirm({
      centered: true,
      content: '确认删除已选中的行吗？',
      cancelText: '放弃删除',
      okText: '确认删除',
      onCancel: () => {
        return;
      },
      onOk: () => {

        var toDeleteItemsIDs = [];
        var toDeleteItems = this.state.dataSource.filter(it => selectedRowKeys.includes(it.key));

        toDeleteItems.forEach(it => {
          toDeleteItemsIDs.push(it.ID);
        });

        deleteItems(toDeleteItemsIDs, this.loadData).then(response => {
          if (response && response.data && response.data.result && response.data.result.message) {
            message.success(response.data.result.message)
            this.setState({
              selectedRowKeys: []
            })
          }
          else {
            message.error(response.statusText);
          }

          this.loadData();
        }).catch(err => {
          if (err)
            console.log('delete multiple item error:', err);
        });
      }
    })

  }

  onFilterSelectChange = (e) => {
    // console.log('onFilterSelectChange-e', e);
    this.setState({
      filterCol: e
    }, () => {
      console.log(this.state.filterCol)
    })
  }

  onTableRowSelectedChange = (selectedRowKeys) => {
    // console.log('onTableRowSelectedChange-selectedRowKeys:', selectedRowKeys);
    this.setState({ selectedRowKeys })
  }

  onModalOK = () => {
    this.setState({
      modalShow: false
    })
  }

  componentDidMount() {
    this.form = this.formRef.current;
    this.loadData();
  }

  loadData = async () => {
    const { activeKey, selfID } = this.props;
    if (activeKey !== selfID) return false;

    // const condition = this.getQueryConditions();

    getByPage(this.state.pagi_pageSize, this.state.pagi_current, null, this.callbackAfterQuery);
  }

  getQueryConditions = () => {
    // const { getFieldValue } = this.form;
    // console.log(`fields['ebm_filter_combo']:`, getFieldValue('ebm_filter_combo'))
    // var ebm_filterKeyWord = getFieldValue('ebm_filter_combo');//fields['ebm_filter_combo'].value;
    // var ebm_filter_text = getFieldValue('ebm_filter_text');//fields['ebm_filter_text'].value;
    // const condition = ebm_filterKeyWord === 'none' ? null : {
    //   name: ebm_filterKeyWord,
    //   value: ebm_filter_text
    // }
    var condition = null;
    try {
      const { dispatch } = this.props
      if(dispatch){
        dispatch({
          type: ''
        })
      }
    } catch (error) {

    }
    return condition;
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
    }, () => {
      console.log('this.pagination.pageSize:', this.pagination.pageSize);

      console.log('this.state.pagi_pageSize-after reload:', this.state.pagi_pageSize);
    })
    // message.info('ok')
  }

  render() {
    const tableFooter = () => {
      return `共计${this.state.allCount}条数据`
    }

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onTableRowSelectedChange
    }

    return <Spin spinning={this.state.spinning}>
      <div>
        <SearchSquare
          form={this.form}
          columns={this.columns}
          items={
            [{
              name: 'ebm_add_btn',
              obj: <Button type="primary" style={{ marginBottom: '0px' }} onClick={this.handleAddRecord}>添加</Button>
            }, {
              name: 'ebm_delete_btn',
              obj: <Button type='danger' style={{ marginBottom: '0px' }} onClick={this.handleDeleteSelectedRecords}>删除所选</Button>
            }, {
              name: 'ebm_filter_text',
              obj: <Input onPressEnter={this.handleSearch} style={{ marginBottom: '0px' }}
                suffix={<a href="" onClick={this.handleSearch}
                ><Icon type='search' /></a>} ></Input>
            }, {
              name: 'ebm_filter_combo',
              obj: <Select style={{ minWidth: '100px', marginBottom: '0px' }} onChange={this.onFilterSelectChange}>
                {this.options}
              </Select>
            }]
          }
          loadData={this.loadData}></SearchSquare>
        <Layout style={{ width: '100%' }}>
          <Form onFieldsChange={(changedFields, allFields) => {

          }} ref={this.formRef}>
            <Form.Item>
              <Table
                columns={this.columns}
                bordered
                size={"small"}
                dataSource={this.state.dataSource}
                pagination={this.pagination}
                rowSelection={rowSelection}
                onRow={
                  (record, index) => {
                    return {
                      onDoubleClick: (event) => {
                        this.setState({
                          modalShow: true,
                          editingRecord: record,
                          operation: 'update'
                        })
                      }
                    }
                  }
                }>

              </Table>
            </Form.Item>
          </Form>
        </Layout>
      </div>
      <Modal
        // footer={<ModalFooter></ModalFooter>}
        visible={this.state.modalShow}
        title="编辑项目"
        maskClosable={false}
        destroyOnClose={true}
        centered={true}
        onOk={this.onModalOK}
        okButtonProps={{
          disabled: !this.state.okBtnAvailable
        }}
        onCancel={
          () => {
            this.setState({
              modalShow: false
            })
          }
        }>
        <EmployeeBPMaintainItemModalFormComp
          // ref={this.myRef}
          editingRecord={this.state.editingRecord}
          operation={this.state.operation}>

        </EmployeeBPMaintainItemModalFormComp>
      </Modal>
    </Spin>
  }
}

export default  EmployeeBPMaintain
