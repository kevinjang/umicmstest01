import React from 'react'
import { Spin, Layout, Table, Form, Button, Popconfirm, message, Modal } from 'antd';
import EmployeeBPMaintainItemModal from './EmployeeBPMaintainItemModal'
import SearchSquare from 'ksnlSearchSquare';
import { FileOutlined, DeleteOutlined, FileAddOutlined } from '@ant-design/icons'
import styles from './EmployeeBPMaintain.css'
import { connect } from 'umi';

class EmployeeBPMaintain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      dataSource: props.dataSource,
      filterCol: '-',
      allCount: 0,
      pageSize: 10,
      total: props.total,
      current: 1,
      operation: '',
      // 编辑项
      editingRecord: null,
      okBtnAvailable: false,
      // notificationModalShow: false,
      spinning: false
    }

    this.dispatch = props.dispatch;

    this.pagination = {
      pageSize: 10,
      total: 0,
      current: 1,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (current, pageSize) => {
        this.pagination.current = current;
        this.pagination.pageSize = pageSize;
        this.setState({
          pageSize,
          current
        }, () => this.loadData());
      },
      showTotal: function (total, range) {
        return `共计${total}条数据，当前显示${range.toString().replace(',', '~')}`
      }
    }

    this.columns = [
      {
        key: 'RowNum',
        dataIndex: 'key',
        title: '序号',
        width: '50px',
        asQuery: false
      },
      {
        key: 'BPNo',
        dataIndex: 'BPNo',
        title: 'BP号',
        width: '100px',
        asQuery: true
      },
      {
        key: 'EmployeeName',
        dataIndex: 'EmployeeName',
        title: '姓名',
        width: '100px',
        asQuery: true
      },
      {
        key: 'PriDept',
        dataIndex: 'PriDept',
        title: '一级部门',
        width: '200px',
        asQuery: true
      },
      {
        key: 'SecDept',
        dataIndex: 'SecDept',
        title: '二级部门',
        width: '200px',
        ellipsis: true,
        asQuery: true
      },
      {
        key: 'BankAccount',
        dataIndex: 'BankAccount',
        title: '银行账号',
        width: '200px',
        asQuery: true
      },
      {
        key: 'BankName',
        dataIndex: 'BankName',
        title: '开户行',
        asQuery: true
      },
      {
        key: 'Email',
        dataIndex: 'Email',
        title: 'Email',
        asQuery: true
      },
      {
        key: 'Remark',
        dataIndex: 'Remark',
        title: '备注',
        asQuery: true
      },
      {
        title: '操作',
        width: '5%',
        asQuery: false,
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

    this.tableOptions = {
      pagination: this.pagination,
      columns: this.columns,
      style: {
        paddingBottom: '10px',
        width: '99%'
      },
      bordered: true
    }

    this.form = null;
    this.formRef = React.createRef();

    // 
    this.prevEditingRecord = null;
  }

  componentDidMount() {
    this.form = this.formRef.current;
    this.loadData();
  }

  loadData = async () => {
    const { activeKey, selfID } = this.props;
    if (activeKey !== selfID) return false;

    this.setState({
      spinning: true,
      selectedRowKeys: []
    })

    const { pageSize, current } = this.state;
    if (this.dispatch) {
      this.dispatch({
        type: 'UserBPMaintainModel/fetchData',
        payload: {
          pageSize,
          current,
          condition: null,
          callback: this.callbackAfterQuery
        }
      })
    }
  }

  callbackAfterQuery = (e) => {
    const {
      dataSource,
      allCount
    } = e;

    this.pagination.total = allCount;

    this.setState({
      dataSource,
      allCount,
      spinning: false
    })
  }

  handleEditRecord = (e) => {
    this.prevEditingRecord = { ...e };
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

  handleDeleteRecord = (record) => {

    const { dataSource } = this.state;

    const item = dataSource.filter(it => it.ID === record.ID)[0] || null;

    if (!!item) {
      this.setState({
        selectedRowKeys: []
      });
      const ids = [item.ID];

      if (!this.dispatch) {
        message.warn("dispatch为空！");
        return false;
      }
      this.dispatch({
        type: 'UserBPMaintainModel/deleteItems',
        payload: {
          ids,
          callback: this.loadData
        }
      });
    }


  }

  handleDeleteSelectedRecords = () => {
    this.setState({
      notificationModalShow: false
    })

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

        if (this.dispatch) {
          this.dispatch({
            type: 'UserBPMaintainModel/deleteItems',
            payload: {
              ids: toDeleteItemsIDs,
              callback: this.loadData
            }
          })
        }


        // deleteItems(toDeleteItemsIDs, this.loadData).then(response => {
        //   if (response && response.data && response.data.result && response.data.result.message) {
        //     message.success(response.data.result.message)
        //     this.setState({
        //       selectedRowKeys: []
        //     })
        //   }
        //   else {
        //     message.error(response.statusText);
        //   }

        //   this.loadData();
        // }).catch(err => {
        //   if (err)
        //     console.log('delete multiple item error:', err);
        // });
      }
    })

  }

  onTableRowSelectedChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys })
  }

  handleModalOK = () => {
    this.setState({
      modalShow: false
    })

    let record = { ...this.state.editingRecord };
    if (this.dispatch) {
      var methodName = "";

      const { operation } = this.state
      let payload = null;
      switch (operation) {
        case "insert":
        default:
          methodName = "insertItem";
          payload = {
            record,
            callback: this.loadData
          }
          break;
        case "update":
          methodName = "updateItem";
          const { ID } = record;
          const item = this.state.dataSource.filter(it => it.key === ID)[0] || null;
          if (!!item) {
              record["ID"] = item.ID;
          }
          const ulcs = this.getUpdateColumns(record);
          payload = {
            record,
            updates: ulcs,
            where: ` ID = '${ID}'`,
            callback: this.loadData
          }
          break;
      }

      this.dispatch({
        type: `UserBPMaintainModel/${methodName}`,
        payload
      })
    }
  }

  // 新旧数据记录对比，获取需要更新的内容
  getUpdateColumns = (record) => {
    // 获取需要更新的列信息
    const keys =Object.keys(record);   
    const result = keys.filter(key=>{
      if(this.prevEditingRecord[key] !== record[key]){
        return {
          name: key,
          value: record[key]
        };
      }
    })

    this.prevEditingRecord = null;
    return result;
  }

  /******** NOTE: Modal相关**************************************************** */
  //NOTE: 根据表单内容控制窗体按钮可用状态
  updateModalOKButtonsAvailablity = (value) => {
    this.setState({
      okBtnAvailable: value
    })
  }

  //NOTE: 关闭窗体时更新父级页面的在编辑项
  updateEditingRecordState = (record) => {
    this.setState({
      editingRecord: record
    })
  }
  /**************************************************************************** */

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onTableRowSelectedChange
    }

    return <Spin tip="加载中..." spinning={this.state.spinning}>
      <div className={styles.mainContainer}>
        <Layout>
          <div style={{ width: '100%', float: 'right' }}>
            <SearchSquare
              dispatch={this.dispatch}
              modelType={"UserBPMaintainModel"}
              // className={styles.searchSquare}
              loadCallback={this.callbackAfterQuery}
              columns={this.columns}
              buttons={
                [
                  <Button key="batch_del_btn" type="danger" icon={
                    <DeleteOutlined />
                  } onClick={
                    this.handleDeleteSelectedRecords
                  } >删除所选</Button>,
                  <Button key="add_btn" type="primary" icon={
                    <FileAddOutlined />
                  } onClick={this.handleAddRecord}>新增</Button>
                ]
              }
            ></SearchSquare>
          </div>
          <Layout style={{ width: '100%' }}>
            <Form style={{ padding: '0 5px' }} ref={this.formRef}>
              <Form.Item style={{ width: '100%' }}>
                <Table
                  size={"small"}
                  dataSource={this.state.dataSource}
                  rowSelection={rowSelection}
                  onRow={
                    (record, index) => {
                      return {
                        onDoubleClick: (event) => {
                          this.prevEditingRecord = { ...record };
                          this.setState({
                            modalShow: true,
                            editingRecord: record,
                            operation: 'update'
                          })
                        }
                      }
                    }
                  }
                  footer={() => ("")}
                  {...this.tableOptions}>

                </Table>
              </Form.Item>
            </Form>
          </Layout>
        </Layout>
      </div>
      <Modal
        visible={this.state.modalShow}
        title="编辑项目"
        maskClosable={false}
        width="48%"
        style={{
          minWidth: '920px'
        }}
        forceRender={true}
        destroyOnClose={true}
        centered={true}
        onOk={this.handleModalOK}
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
        <EmployeeBPMaintainItemModal
          editingRecord={this.state.editingRecord}
          operation={this.state.operation}
          updateParentState={(record) => this.updateEditingRecordState(record)}
          updateOkButtonAvailable={value => this.updateModalOKButtonsAvailablity(value)}>

        </EmployeeBPMaintainItemModal>
      </Modal>
    </Spin>
  }
}

export default connect(({ UserBPMaintainModel }) => {
  // console.log('UserBPMaintainModel:', UserBPMaintainModel)
  return {
    UserBPMaintainModel,
    dataSource: UserBPMaintainModel.data,
  }
})(EmployeeBPMaintain);
