/**
 * Created by zachary on 2017/3/18.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Radio, Checkbox,InputNumber,Select, Tag, Cascader, TreeSelect, Button, Upload, message, Tabs,Input, DatePicker, Row, Col, Menu, Dropdown, Icon, Layout} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './messagePush.less'
import * as BaiduMap from '../../components/common/baiduMap'

import * as MessagePushSelector from '../../selector/MessagePushManager/MessagePushSelector'

const {MonthPicker, RangePicker} = DatePicker;
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const{Header,Content} = Layout
// const TabPane = Tabs.TabPane;

class MessagePushIndex extends Component{
  constructor(props){
    super(props)
    this.state = {
      terminalType: 1,  // 1-不限; 2-iOS; 3-Android
      pushCondition: 1, //1-不限; 2-自定义
      inactivityDaysIsChecked: false, //是否根据未活跃天数进行推送
      inactivityDays: 30,  //未活跃天数
      pushTimeType: 1,   //1-现在; 2-指定时间
      pushTime: '',      //推送时间
      expireTimeType: 1, //1-从不; 2-指定时间; 3-指定间隔时间
      expireTime: '',    //过期时间
      expireIntervalTime: '1', //过期间隔时间
      expireIntervalTimeUnit: '1', //过期间隔时间单位; 1-小时; 2-天
      pushTargetUserType: '1', //1-不限; 2-店主; 3-推广员
      pushTargetDistrict: [],
      pushContentType: 1, //1-文本; 2-JSON
      pushContent: '',
      pushFileList: [],
    }
  }

  componentDidMount(){
    // console.log('componentDidMount=**********==>>>>');
  }

  componentWillReceiveProps(nextProps) {
  }

  onTerminalTypeChange = (e) => {
    // console.log('terminalType radio checked', e.target.value);
    this.setState({
      terminalType: e.target.value,
    });
  }

  onPushConditionChange = (e) => {
    // console.log('pushCondition radio checked', e.target.value);
    this.setState({
      pushCondition: e.target.value,
    });
  }

  onInactivityDaysCheckBoxChange = (e) => {
    // console.log(`onInactivityDaysCheckBoxChange.checked = ${e.target.checked}`);
    this.setState({
      inactivityDaysIsChecked: e.target.checked,
    });
  }

  onInactivityDaysChange = (value) => {
    // console.log(`onInactivityDaysChange.days = ${value}`);
    this.setState({
      inactivityDays: value,
    });
  }

  handlePushTimeTypeChange = (value) => {
    // console.log(`handlePushTimeTypeChange.value = ${value}`);
    this.setState({
      pushTimeType: value,
    });
  }

  onPushTimeChange = (date, dateString) => {
    // console.log(`onPushTimeChange.date = ${date}`);
    // console.log(`onPushTimeChange.dateString = ${dateString}`);
    this.setState({
      pushTime: dateString,
    });
  }

  handleExpireTimeTypeChange = (value) => {
    // console.log(`handleExpireTimeTypeChange.value = ${value}`);
    this.setState({
      expireTimeType: value,
    });
  }

  onExpireTimeChange = (date, dateString) => {
    // console.log(`onPushTimeChange.date = ${date}`);
    // console.log(`onPushTimeChange.dateString = ${dateString}`);
    this.setState({
      expireTime: dateString,
    });
  }

  onExpireIntervalTimeChange = (value) => {
    // console.log(`onExpireIntervalTimeChange.num = ${value}`);
    this.setState({
      expireIntervalTime: value,
    });
  }

  handleExpireIntervalTimeUnitChange = (value) => {
    // console.log(`handleExpireIntervaluTimeUnitChange.value = ${value}`);
    this.setState({
      expireIntervalTimeUnit: value,
    });
  }

  renderPushExpireTime() {
    if(this.state.expireTimeType == 2) {
      return (
        <Col span={6}>
          <DatePicker style={{marginLeft:16}} onChange={this.onExpireTimeChange} />
        </Col>
      )
    }else if(this.state.expireTimeType == 3) {
      return (
        <Col span={12}>
          <InputNumber style={{marginLeft:16}} min={1} max={31} defaultValue={1} onChange={this.onExpireIntervalTimeChange} />
          <Select style={{marginLeft:16}} defaultValue="1" onChange={this.handleExpireIntervalTimeUnitChange}>
            <Option value="1">小时</Option>
            <Option value="2">天</Option>
          </Select>
        </Col>
      )
    }
    return null
  }

  onDistrictTreeDataChange = (value, label, extra) => {
    // console.log('onDistrictTreeDataChange ', value, label, extra);
    this.setState({ pushTargetDistrict: value });
  }

  loadDistrictTreeData = (treeNode) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'messagePushManager/updatePushTargetDistrictTreeDatas',
        payload: {
          eventKey: treeNode.props.eventKey
        }
      })
      resolve();
    })
  }

  renderPushTargetDistrict() {
    let tProps = {
      treeData: this.props.pushTargetDistrictTreeDatas,
      value: this.state.pushTargetDistrict,
      onChange: this.onDistrictTreeDataChange,
      loadData: this.loadDistrictTreeData,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择发送地区',
      style: {
        width: 300,
      },
    };

    return (
      <Col span={20}>
        <TreeSelect {...tProps} />
      </Col>
    )
  }

  handlePushTargetUserTypeChange = (value) => {
    // console.log(`handlePushTargetUserTypeChange.value = ${value}`);
    this.setState({
      pushTargetUserType: value,
    });
  }

  renderPushTargetUserType() {
    return (
      <Col span={3}>
        <Select defaultValue="1" style={{ width: '100%' }} onChange={this.handlePushTargetUserTypeChange}>
          <Option value="1">不限</Option>
          <Option value="2">店主</Option>
          <Option value="3">推广员</Option>
        </Select>
      </Col>
    )
  }

  renderPushTime() {
    if(this.state.pushTimeType == 2) {
      return (
        <Col span={6}>
          <DatePicker style={{marginLeft:16}} onChange={this.onPushTimeChange} />
        </Col>
      )
    }
    return null
  }

  renderCustomCondition() {
    if(this.state.pushCondition !== 1) {
      return (
        <Content>
          <Row>
            <Col>
              <div className={styles.label}>未活跃天数</div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col>
              <Checkbox onChange={this.onInactivityDaysCheckBoxChange} />
              <InputNumber min={1} max={1000} defaultValue={30} onChange={this.onInactivityDaysChange} />
              &nbsp;天
            </Col>
          </Row>
          <Row>
          <Col>
            <div className={styles.label}>推送时间</div>
          </Col>
        </Row>
          <Row className={styles.row}>
            <Col span={3}>
              <Select defaultValue="1" style={{ width: '100%' }} onChange={this.handlePushTimeTypeChange}>
                <Option value="1">现在</Option>
                <Option value="2">指定时间</Option>
              </Select>
            </Col>
            {this.renderPushTime()}
          </Row>

          <Row>
            <Col>
              <div className={styles.label}>推送过期时间</div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={3}>
              <Select
                defaultValue="1"
                style={{width:'100%'}}
                onChange={this.handleExpireTimeTypeChange}>
                <Option value="1">从不</Option>
                <Option value="2">指定时间</Option>
                <Option value="3">过期间隔时间</Option>
              </Select>
            </Col>
            {this.renderPushExpireTime()}
          </Row>

          <Row>
            <Col>
              <div className={styles.label}>推送目标</div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col span={2}>
              <div className={styles.subLabel}>指定地区</div>
            </Col>
            {this.renderPushTargetDistrict()}
          </Row>
          <Row className={styles.row}>
            <Col span={2}>
              <div className={styles.subLabel}>指定人群</div>
            </Col>
            {this.renderPushTargetUserType()}
          </Row>
        </Content>
      )
    }
    return null
  }

  onChangePushContent = (e) => {
    this.setState({
      pushContent: e.target.value
    })
  }

  renderPushContentPreview() {
    if(this.state.pushContentType == 1) {
      if(this.state.pushContent) {
        return (
          <Col offset={1} span={12}>
            <Row className={styles.row}>
              <Col>
                <div className={styles.label}>推送格式预览</div>
              </Col>
            </Row>
            <Row className={styles.preview}>
              <Col>
                <div>{'{'}</div>
                <div>&nbsp;&nbsp;{'"alert":'}{this.state.pushContent}</div>
                <div>}</div>
              </Col>
            </Row>
          </Col>
        )
      }

    }else if(this.state.pushContentType == 2) {
      return (
        <Col offset={1} span={12}>
          <Row className={styles.row}>
            <Col>
              <div className={styles.label}>推送格式参考</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Row className={styles.preview}>
                <Col>
                  <div>{'{'}</div>
                    <div>&nbsp;&nbsp;{'"alert": "消息内容",'}</div>
                    <div>&nbsp;&nbsp;{'"message_title": "消息中心列表展示标题",'}</div>
                    <div>&nbsp;&nbsp;{'"message_abstract": "消息中心列表展示摘要",'}</div>
                    <div>&nbsp;&nbsp;{'"message_url": "点击标题跳转url地址"'}</div>
                    <div>}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      )
    }
    return null
  }

  onPushContentTypeChange = (e) => {
    // console.log('onPushContentTypeChange radio checked', e.target.value);
    this.setState({
      pushContentType: e.target.value,
    });
  }

  onPushFileUploadChange = (info) => {
    // console.log('onPushFileUploadChange==info==>>>>>', info)
    let fileList = info.fileList;
    if(fileList.length > 1) {
      fileList = fileList.slice(-1);
    }
    //对于受控模式，你应该在 onChange 中始终 setState fileList，保证所有状态同步到 Upload 内
    this.setState({ pushFileList: fileList });
  }

  renderUploadPushFile() {
    return (
      <Upload
        listType="picture"
        disabled={!!this.state.pushFileList.length}
        fileList={this.state.pushFileList}
        onChange={this.onPushFileUploadChange}
      >
        <Button>
          <Icon type="upload" /> 点击选择封面图片
        </Button>
      </Upload>
    )
  }

  handlePushBtnClick = (e) => {
    // console.log('handlePushBtnClick.e=====', e)
    // console.log('handlePushBtnClick.this.state=====', this.state)
    this.props.dispatch({
      type: 'messagePushManager/push',
      payload: {
        ...this.state,
        success: (msg)=>{
          message.success(msg || '推送成功')
        },
        error: (msg)=>{
          message.error(msg || '推送失败')
        }
      }
    })
  }

  render() {
    return (
      <Layout>
        <Content className={styles.content}>
          <Row>
            <Col>
              <div className={styles.label}>终端类别</div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col>
              <RadioGroup onChange={this.onTerminalTypeChange} value={this.state.terminalType}>
                <Radio value={1}>不限</Radio>
                <Radio value={2}>iOS</Radio>
                <Radio value={3}>Android</Radio>
              </RadioGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.label}>推送条件</div>
            </Col>
          </Row>
          <Row className={styles.row}>
            <Col>
              <RadioGroup onChange={this.onPushConditionChange} value={this.state.pushCondition}>
                <Radio value={1}>不限</Radio>
                <Radio value={2}>自定义</Radio>
              </RadioGroup>
            </Col>
          </Row>

          {this.renderCustomCondition()}

          <Row>
            <Col span={11}>
              <Row>
                <Col span={2}>
                  <div className={styles.label}>内容</div>
                </Col>
                <Col style={{marginLeft:8}} span={3}><Tag color="red-inverse">必填</Tag></Col>
              </Row>
              <Row>
                <Col>
                  <Input
                    type="textarea"
                    rows={8}
                    size="large"
                    value={this.state.pushContent}
                    onChange={this.onChangePushContent}
                  />
                </Col>
              </Row>
            </Col>

            {this.renderPushContentPreview()}
          </Row>

          <Row className={styles.row}>
            <Col>
              <RadioGroup onChange={this.onPushContentTypeChange} value={this.state.pushContentType}>
                <Radio value={1}>Text</Radio>
                <Radio value={2}>JSON</Radio>
              </RadioGroup>
            </Col>
          </Row>

          <Row className={styles.row}>
            <Col>
              {this.renderUploadPushFile()}
            </Col>
            <Col>会在推送接收端消息中心列表展示</Col>
            <Col>注:仅当内容类型为JSON时,且message_url字段有值时生效</Col>
          </Row>
          <Row className={styles.row}>
            <Col>
              <Button
                type="primary"
                disabled={!this.state.pushContent}
                onClick={this.handlePushBtnClick}
              >发送</Button>
            </Col>
          </Row>
        </Content>
      </Layout>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const pushTargetDistrictTreeDatas = MessagePushSelector.selectPushTargetDistrictTreeDatas(state)
  // console.log('mapStateToProps.pushTargetDistrictTreeDatas===>>>', pushTargetDistrictTreeDatas)
  return {
    pushTargetDistrictTreeDatas: pushTargetDistrictTreeDatas
  }
}

export default connect(mapStateToProps)(MessagePushIndex)

