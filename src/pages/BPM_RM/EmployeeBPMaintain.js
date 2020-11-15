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

import styles from './EmployeeBPMaintain.css'
import { connect } from 'umi';
import UserBPMaintain from '../../models/userBPMaintain';

class EmployeeBPMaintain extends React.Component {
  constructor(props) {
    super(props);

    console.log('props:', props.dataSource)
    this.state = {
      modalShow: false,
      dataSource: props.dataSource,
      filterCol: '-',
      allCount: 0,
      pageSize: 10,
      total: props.total,
      current: 0,
      operation: '',
      // 编辑项
      editingRecord: null,
      okBtnAvailable: false,
      spinning: props.spinning
    }
    // this.spinning = props.spinning
    console.log(' props.pageSize:', props.pageSize)

    this.paginationModel = props.paginationModel

    this.pagination = {
      pageSize: this.state.pageSize, //this.state.pagi_pageSize,
      total: this.state.total,
      current: this.state.current,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (current, pageSize) => {
        // this.pagination.current = page;
        // this.setState({
        //   pagi_pageSize: pageSize,
        //   pagi_current: page
        // }, () => {
        //   this.loadData();
        // })

        // this.updatePagination(page, pageSize)
        this.setState({
          pageSize,
          current
        })
      },
      onShowSizeChange: (current, pageSize) => {
        // this.pagination.current = current;
        // this.pagination.pageSize = size;
        // this.setState({
        //   pagi_pageSize: size,
        //   pagi_current: current
        // }, () => {
        //   this.loadData()
        // })


        // this.updatePagination(current, size);
        this.setState({
          current,
          pageSize
        })
      },
      showTotal: function (total, range) {
        return `共计${total}条数据，当前显示${range.toString().replace(',', '~')}`
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
        title: '操作',
        width: '5%',
        render: (text, record) => {
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

    this.dispatch = props.dispatch;

  }

  handleSearch = (e) => {
    e.preventDefault();
    this.loadData();
  }

  handleEditRecord = (e) => {
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
    this.setState({
      filterCol: e
    }, () => {
      console.log(this.state.filterCol)
    })
  }

  onTableRowSelectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  onModalOK = () => {
    this.setState({
      modalShow: false
    })
  }

  componentDidMount() {
    this.form = this.formRef.current;
    this.loadDataTest();
  }

  loadData = async () => {
    const { activeKey, selfID } = this.props;
    if (activeKey !== selfID) return false;

    getByPage(this.state.pagi_pageSize, this.state.pagi_current, null, this.callbackAfterQuery);
  }

  loadDataTest = async () => {
    const { dispatch } = this.props
    if (dispatch) {
      dispatch({
        type: 'UserBPMaintainModel/fetchData',
        payload: {
          pageSize: this.state.pageSize,
          current: this.state.current
        }
      })
    }
  }

  updatePagination = (current, pageSize) => {
    if (this.dispatch) {
      this.dispatch({
        type: 'UserBPMaintainModel/setPagination',
        payload: {
          current,
          pageSize
        }
      })
    }
  }

  getQueryConditions = () => {
    var condition = null;
    try {
      const { dispatch } = this.props
      if (dispatch) {
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
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onTableRowSelectedChange
    }

    return <Spin spinning={this.state.spinning}>
      <div>
        <SearchSquare
          className={styles.searchSquare}
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
          dispatch={this.dispatch}
          modelType={"UserBPMaintainModel"}
          setSearchConditionType={"UserBPMaintainModel/setCondition"}
        // loadData={this.loadDataTest}
        ></SearchSquare>
        <Layout style={{ width: '100%' }}>
          <Form onFieldsChange={(changedFields, allFields) => {

          }} ref={this.formRef}>
            <Form.Item>
              <Table
                columns={this.columns}
                bordered
                size={"small"}
                // dataSource={this.state.dataSource}
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

export default connect(({ UserBPMaintainModel, loading }) => {
  console.log('UserBPMaintainModel:', UserBPMaintainModel)
  return {
    UserBPMaintainModel,
    // fetchData: loading.effects["UserBPMaintainModel/fetchData"],
    dataSource: UserBPMaintainModel.data,
    total: UserBPMaintainModel.total,
    spinning: !UserBPMaintainModel.loading
  }
})(EmployeeBPMaintain);
