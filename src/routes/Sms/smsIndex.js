/**
 * Created by zachary on 2017/3/18.
 */
import React, { Component,PropTypes } from 'react'
import { connect } from 'dva'
import {Form, Layout, Input, Icon, Row, Col, Button, message, TreeSelect, Cascader, Select, Table, Popconfirm, Modal} from 'antd'
import styles from './sms.less'
import * as CommonSelect from '../../selector/CommonSelect'
import * as SmsSelector from '../../selector/SmsManager/SmsSelector'

const{Content} = Layout
const FormItem = Form.Item;
const Option = Select.Option;

class SmsIndex extends Component{
  constructor(props){
    super(props)

    this.state = {
      expand: false,
      current: 1,
      pageSize: 10,
      loading: false,
      sendSmsPopConfirmVisible: false,
      smsTemplateModalVisible: false,
      selectedUsers: [],
      smsTemplateName: 'marketing_shop'
    }
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })
    // console.log('componentDidMount=**********==>>>>');
  }

  handleSearch = (e) => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   // console.log('Received values of form: ', values);
    //
    // });
    this.submitSearch()
  }

  submitSearch() {
    const { getFieldsValue } = this.props.form;
    const values = getFieldsValue()
    // console.log('renderSearchResults.values===>>>', values)
    this.setState({
      loading: true
    }, ()=>{
      this.props.dispatch({
        type: 'smsManager/fetchUserList',
        payload: {
          ...values,
          pageNo: this.state.current,
          pageSize: this.state.pageSize,
          success: (userListInfo) =>{
            this.setState({
              loading: false
            })
          },
        }
      })
    })
  }

  sendSmsConfirm() {
    console.log('sendSmsConfirm...>>>>', this.state)
    this.props.dispatch({
      type: 'smsManager/sendSms',
      payload: {
        smsTemplateName: this.state.smsTemplateName,
        selectedUsers: this.state.selectedUsers,
        success: () =>{
          message.success('发送成功')
        },
        error: ()=>{
          message.error('发送失败')
        }
      }
    })
  }

  cancelSendSmsConfirm() {
    //console.log('cancelSendSmsConfirm...>>>>', this.state)
  }

  handleSendSmsPopConfirmVisibleChange(visible) {
    if (!visible) {
      this.setState({ sendSmsPopConfirmVisible: visible });
      return;
    }

    if(!this.state.selectedUsers || !this.state.selectedUsers.length) {
      message.error('请选择要发送短信的用户')
    }else {
      this.showSmsTemplateModal()
    }
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  renderCollapse(formItemLen, defaultShowCount) {
    const expand = this.state.expand;
    const showCollapse = formItemLen > defaultShowCount;

    if(showCollapse) {
      if(expand) {
        return (
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            收起 <Icon type={'up'} />
          </a>
        )
      }else {
        return (
          <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
            展开 <Icon type={'down'} />
          </a>
        )
      }
    }
    return null
  }

  renderSearchResults() {
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log('onSelect==>>>', record, selected, selectedRows);
        this.setState({
          selectedUsers: selectedRows
        })
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log('onSelectAll==>>>', selected, selectedRows, changeRows);
        this.setState({
          selectedUsers: selectedRows
        })
      },
      getCheckboxProps: record => ({
        disabled: record.status == 0,    //被禁用户,无法被选择
      }),
    }

    const columns = [
      {title: '用户昵称', dataIndex: 'nickname', key: 'nickname'},
      {title: '用户名', dataIndex: 'username', key: 'username'},
      {title: '手机号', dataIndex: 'mobilePhoneNumber', key: 'mobilePhoneNumber'},
      {title: '用户类型', dataIndex: 'identityShowNames', key: 'identityShowNames'},
      {title: '省', dataIndex: 'geoProvince', key: 'geoProvince'},
      {title: '市', dataIndex: 'geoCity', key: 'geoCity'},
      {title: '区', dataIndex: 'geoDistrict', key: 'geoDistrict'},
    ]

    const pagination = {
      total: this.props.total,
      current: this.state.current,
      onChange: (page)=>{
        // console.log(page);
        this.setState({
          current: page,
        }, ()=>{
          this.submitSearch()
        });
      },
      showSizeChanger: true,
      pageSizeOptions: ['10', '30', '50', '80', '100'],
      onShowSizeChange: (current, size)=>{
        // console.log('onShowSizeChange.current===>>>', current);
        // console.log('onShowSizeChange.size===>>>', size);
        this.setState({
          current: 1,
          pageSize: size,
        }, ()=>{
          this.submitSearch()
        });
      },
      showQuickJumper: true,
      showTotal: (total, range)=>{
        // console.log('showTotal.total===>>>', total);
        // console.log('showTotal.range===>>>', range);
        return `${range[0]}-${range[1]} 条 / 总共 ${total} 条`
      }
    }

    return (
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={this.props.userList}
        pagination={pagination}
        loading={this.state.loading}
      />
    )
  }

  render() {
    const { getFieldDecorator, getFieldsError} = this.props.form;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };

    const children = [];
    const formItemComps = [
      <FormItem {...formItemLayout} label={'用户昵称'}>
        {getFieldDecorator(`nickname`)(
          <Input/>
        )}
      </FormItem>,
      <FormItem {...formItemLayout} label={'用户名'}>
        {getFieldDecorator(`username`)(
          <Input/>
        )}
      </FormItem>,
      <FormItem
        {...formItemLayout}
        label={'手机号码'}
      >
        {getFieldDecorator(`mobilePhoneNumber`, {
          validateTrigger: 'onBlur',
          rules: [{pattern: /^1[34578]\d{9}$/, message: '请输入11位手机号码'}]
        })(
          <Input />
        )}
      </FormItem>,
      <FormItem {...formItemLayout} label={'地区'}>
        {getFieldDecorator(`area`)(
          <Cascader
            options={this.props.areaTreeSelectData}
            changeOnSelect
            placeholder="请选择地区"
          />
        )}
      </FormItem>,
      <FormItem {...formItemLayout} label={'用户类型'}>
        {getFieldDecorator(`userType`, {
          initialValue: '1'
        })(
          <Select
            style={{ width: '100%' }}
          >
            <Option value="1">不限</Option>
            <Option value="2">店主</Option>
            <Option value="3">推广员</Option>
          </Select>
        )}
      </FormItem>,
    ]

    for (let i = 0; i < formItemComps.length; i++) {
      children.push(
        <Col span={8} key={i}>
          {formItemComps[i]}
        </Col>
      );
    }

    const expand = this.state.expand;
    const formItemLen = children.length
    const defaultShowCount = 6
    const shownCount = expand ? formItemLen : defaultShowCount;

    return (
      <Layout>
        <Content className={styles.content}>
          <Form
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Row gutter={40}>
              {children.slice(0, shownCount)}
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={this.hasErrors(getFieldsError())}
                >查询</Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                  重置
                </Button>
                <Popconfirm
                  placement="topLeft"
                  title="确认发送给选中的用户?"
                  onConfirm={this.sendSmsConfirm.bind(this)}
                  onCancel={this.cancelSendSmsConfirm.bind(this)}
                  visible={this.state.sendSmsPopConfirmVisible}
                  onVisibleChange={this.handleSendSmsPopConfirmVisibleChange.bind(this)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button style={{ marginLeft: 8 }}>
                    发送短信
                  </Button>
                </Popconfirm>
                {this.renderCollapse(formItemLen, defaultShowCount)}

              </Col>
            </Row>
          </Form>
          <Row className={styles.searchResultList}>
            {this.renderSearchResults()}
          </Row>

          <Modal
            title="请选择短信模板"
            visible={this.state.smsTemplateModalVisible}
            onOk={this.handleSmsTemplateModalOk.bind(this)}
            onCancel={this.handleSmsTemplateModalCancel.bind(this)}
          >
            <Row>
              <Col span={10}>
                <Select
                  defaultValue="marketing_shop"
                  style={{ width: '100%' }}
                  onChange={this.handleSmsTemplateChange}
                >
                  <Option value="marketing_shop">提醒店主更新店铺信息</Option>
                </Select>
              </Col>
              <Col offset={1} span={12}>
                {this.renderSmsTemplatePreView()}
              </Col>
            </Row>
          </Modal>
        </Content>
      </Layout>
    )
  }

  renderSmsTemplatePreView() {
    switch(this.state.smsTemplateName) {
      case 'marketing_shop':
        return (
          <Row style={{padding:8, backgroundColor:'#f5f5f5'}}>
            感谢您在邻家优店注册店铺！完善店铺信息，发布促销活动，能有效提升店铺形象！
          </Row>
        )
      default:
        return null
    }
  }

  showSmsTemplateModal() {
    this.setState({
      smsTemplateModalVisible: true
    })
  }

  hideSmsTemplateModal() {
    this.setState({
      smsTemplateModalVisible: false
    })
  }

  handleSmsTemplateModalOk() {
    this.hideSmsTemplateModal()
    this.setState({ sendSmsPopConfirmVisible: true });
  }

  handleSmsTemplateModalCancel() {
    this.hideSmsTemplateModal()
    this.setState({ sendSmsPopConfirmVisible: true });
  }

  handleSmsTemplateChange = (value) => {
    // console.log(`handleSmsTemplateChange.value = ${value}`);
    this.setState({
      smsTemplateName: value,
    });
  }
}

const SmsIndexForm = Form.create()(SmsIndex);

const mapStateToProps = (state, ownProps) => {
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)
  const userListInfo = SmsSelector.selectUserList(state)
  const total = userListInfo.total
  let userList = userListInfo.data || []

  if(userList && userList.length) {
    userList.forEach((item, index)=>{
      item.key = index
      if(item.identity && Object.prototype.toString.call(item.identity) === '[object Array]'){
        let identityShowNames = []
        item.identity.forEach((idt)=>{
          if(idt == 'shopkeeper') {
            identityShowNames.push('店主')
          }else if(idt == 'promoter') {
            identityShowNames.push('推广员')
          }
        })
        item.identityShowNames = identityShowNames.join('|')
      }
    })
  }

  // console.log('mapStateToProps.areaTreeSelectData===>>>', areaTreeSelectData)
  // console.log('mapStateToProps.userList===>>>', userList)
  // console.log('mapStateToProps.total===>>>', total)
  return {
    areaTreeSelectData: areaTreeSelectData,
    userList: userList,
    total: total
  }
}

export default connect(mapStateToProps)(SmsIndexForm)

