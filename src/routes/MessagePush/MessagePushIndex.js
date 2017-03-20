/**
 * Created by zachary on 2017/3/18.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Radio, Checkbox,InputNumber,Select, Cascader, TreeSelect, Button,Tabs,Input, DatePicker, Row, Col, Menu, Dropdown, Icon, Layout} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import styles from './messagePush.less'
import * as BaiduMap from '../../components/common/baiduMap'

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
      inactivityDays: 0,  //未活跃天数
      pushTimeType: 1,   //1-现在; 2-指定时间
      pushTime: '',      //推送时间
      expireTimeType: 1, //1-从不; 2-指定时间; 3-指定间隔时间
      expireTime: '',    //过期时间
      expireIntervalTime: '', //过期间隔时间
      expireIntervalTimeUnit: '1', //过期间隔时间单位; 1-小时; 2-天
      pushTargetType: '1', //1-不限; 2-指定地区; 3-指定人群
      pushTargetDistrictTreeDatas: [{
        label: '中国',
        value: '1',
        key: '1',
        children: []
      }],
      pushTargetDistrict: []
    }
  }

  componentDidMount(){
    // this.updateDistrictProvinceTreeDatas()
  }

  onTerminalTypeChange = (e) => {
    console.log('terminalType radio checked', e.target.value);
    this.setState({
      terminalType: e.target.value,
    });
  }

  onPushConditionChange = (e) => {
    console.log('pushCondition radio checked', e.target.value);
    this.setState({
      pushCondition: e.target.value,
    });
  }

  onInactivityDaysCheckBoxChange = (e) => {
    console.log(`onInactivityDaysCheckBoxChange.checked = ${e.target.checked}`);
    this.setState({
      inactivityDaysIsChecked: e.target.checked,
    });
  }

  onInactivityDaysChange = (value) => {
    console.log(`onInactivityDaysChange.days = ${value}`);
    this.setState({
      inactivityDays: value,
    });
  }

  handlePushTimeTypeChange = (value) => {
    console.log(`handlePushTimeTypeChange.value = ${value}`);
    this.setState({
      pushTimeType: value,
    });
  }

  onPushTimeChange = (date, dateString) => {
    console.log(`onPushTimeChange.date = ${date}`);
    console.log(`onPushTimeChange.dateString = ${dateString}`);
    this.setState({
      pushTime: date,
    });
  }

  handleExpireTimeTypeChange = (value) => {
    console.log(`handleExpireTimeTypeChange.value = ${value}`);
    this.setState({
      expireTimeType: value,
    });
  }

  onExpireTimeChange = (date, dateString) => {
    console.log(`onPushTimeChange.date = ${date}`);
    console.log(`onPushTimeChange.dateString = ${dateString}`);
    this.setState({
      expireTime: date,
    });
  }

  onExpireIntervalTimeChange = (value) => {
    console.log(`onExpireIntervalTimeChange.num = ${value}`);
    this.setState({
      expireIntervalTime: value,
    });
  }

  handleExpireIntervalTimeUnitChange = (value) => {
    console.log(`handleExpireIntervaluTimeUnitChange.value = ${value}`);
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

  handlePushTargetTypeChange = (value) => {
    console.log(`handlePushTargetTypeChange.value = ${value}`);
    this.setState({
      pushTargetType: value,
    });
  }

  onDistrictTreeDataChange = (value, label, extra) => {
    console.log('onDistrictTreeDataChange ', value, label, extra);
    // this.updateDistrictCityTreeDatas(value)
    this.setState({ pushTargetDistrict: value });
  }

  updateDistrictProvinceTreeDatas() {
    BaiduMap.getProviceList().then((results) => {
      console.log('updateDistrictProvinceTreeDatas.getProviceList====>>>>', results)
      let pushTargetDistrictTreeDatas = []
      let rootNode = this.state.pushTargetDistrictTreeDatas[0]
      if(!rootNode.children.length) {
        rootNode.children = results.map((item, index) => {
          return {
            ...item,
            label: item.area_name,
            value: item.area_code + "",
            key: item.area_code + "",
            children: []
          }
        })
        pushTargetDistrictTreeDatas.push(rootNode)
        this.setState({
          pushTargetDistrictTreeDatas: pushTargetDistrictTreeDatas
        })
      }
    })
  }

  updateDistrictCityTreeDatas(provinceCode) {
    BaiduMap.getCityList(provinceCode).then((results) => {
      console.log('updateDistrictCityTreeDatas.getCityList====>>>>', results)
      let rootNode = this.state.pushTargetDistrictTreeDatas[0]
      let provinceNodes = rootNode.children
      let pushTargetDistrictTreeDatas = []
      for(let i = 0; i < provinceNodes.length; i++) {
        if(provinceNodes[i].value == provinceCode) {
          provinceNodes[i].children = results.map((item, index) => {
            return {
              ...item,
              label: item.area_name,
              value: item.area_code + "",
              key: item.area_code + "",
              children: []
            }
          })
          break;
        }
      }
      pushTargetDistrictTreeDatas.push(rootNode)
      this.setState({
        pushTargetDistrictTreeDatas: pushTargetDistrictTreeDatas
      })
    })
  }

  loadDistrictTreeData = (node) => {
    return new Promise((resolve, reject) => {
      BaiduMap.getSubAreaList(node.props.value).then((results) => {
        const findUpdate = (nodesData, targetNodeData) => {
          for(let i = 0; i < nodesData.length; i++) {
            // console.log('nodesData[i]=============>>>>>>>>>>.', nodesData[i])
            // console.log('targetNodeData=============>>>>>>>>>>.', targetNodeData)
            if(nodesData[i].value == targetNodeData.value) {
              // console.log('nodesData[i].value == targetNodeData.value============>>>>>>>>>>.', results)
              let children = results.map((item, index) => {
                return {
                  ...item,
                  label: item.area_name,
                  value: item.area_code + "",
                  key: item.area_code + "",
                  children: []
                }
              })
              nodesData[i].children = children
              console.log('this.state.pushTargetDistrictTreeDatas===========', this.state.pushTargetDistrictTreeDatas)
              this.setState({
                pushTargetDistrictTreeDatas: this.state.pushTargetDistrictTreeDatas
              }, ()=> {

              })
              break
            }else {
              if(nodesData[i].children) {
                findUpdate(nodesData[i].children, node.props)
              }
            }
          }
        }
        findUpdate(this.state.pushTargetDistrictTreeDatas, node.props)
      })
    })
  }

  renderPushTarget() {
    if(this.state.pushTargetType == 2) {
      // this.updateDistrictProvinceTreeDatas()

      const tProps = {
        treeData: this.state.pushTargetDistrictTreeDatas,
        value: this.state.pushTargetDistrict,
        onChange: this.onDistrictTreeDataChange,
        loadData: this.loadDistrictTreeData,
        multiple: true,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        searchPlaceholder: 'Please select',
        style: {
          width: 300,
        },
      };

      return (
        <Col span={20}>
          <TreeSelect {...tProps} />
        </Col>
      )
    }else if(this.state.pushTargetType == 3) {
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
            <Col>
              <Select defaultValue="1" style={{ width: 120 }} onChange={this.handlePushTimeTypeChange}>
                <Option value="1">现在</Option>
                <Option value="2">指定时间</Option>
              </Select>
              {this.state.pushTimeType == 2 &&
                <DatePicker style={{marginLeft:16}} onChange={this.onPushTimeChange} />
              }
            </Col>
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
                style={{width:120}}
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
            <Col span={3}>
              <Select
                defaultValue="1"
                style={{width:120}}
                onChange={this.handlePushTargetTypeChange}>
                <Option value="1">不限</Option>
                <Option value="2">指定地区</Option>
                <Option value="3">指定人群</Option>
              </Select>
            </Col>
            {this.renderPushTarget()}
          </Row>
        </Content>
      )
    }
    return null
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

        </Content>
      </Layout>
    )
  }
}


function mapStateToProps(state) {
  return {

  }
}

export default connect(mapStateToProps)(MessagePushIndex)

