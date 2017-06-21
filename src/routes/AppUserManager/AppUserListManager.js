/**
 * Created by lilu on 2017/3/16.
 */
/**
 * Created by lilu on 2017/3/9.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import * as CommonSelect from '../../selector/CommonSelect'

import {Button, Tabs, Input, DatePicker, Row, Col, Menu, Dropdown, Icon, Cascader, message} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;
import AppVirtualUserModal from '../../components/BGManager/appUserManager/appVirtualUserCreateModal'
import AppUserList from '../../components/BGManager/appUserManager/appUserList'
import {getAppUserList} from '../../selector/BGManager/appUserManagerSelector'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import AppUserManager from './AppUserManager'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';

const orderShowTab = {
  'createTimeDescend': '时间降序',
  'createTimeAscend': '时间升序',

}
// const TabPane = Tabs.TabPane;

class AppUserListManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      selectedItem: {},
      filterValue: '',
      orderMode: 'createTimeDescend',
      orderModeShow: orderShowTab['createTimeDescend'],
      startTime: new Date('2000-01-01 00:00:00'),
      endTime: new Date(),
      geoCity: '',
      username: '',
      liveArea: [],
      key: 0,
      isVirtual: 0,
    }
  }

  componentDidMount() {

  }

  add() {
    this.setState({modalVisible: true, modalType: 'create', selectedItem: {}, key: this.state.key - 1})
  }

  onCancel() {
    this.setState({modalVisible: false})
  }

  onOk(data) {
    if (data && data.liveArea && data.liveArea[3]) {
      let username = data.username
      let nickname = data.nickname
      // let mobilePhoneNumber = data.username
      let geoProvinceCode = data.liveArea[1].value.split("-")[1]
      let geoProvince = data.liveArea[1].label
      let geoCityCode = data.liveArea[2].value.split("-")[1]
      let geoCity = data.liveArea[2].label
      let geoDistrictCode = data.liveArea[3].value.split("-")[1]
      let geoDistrict = data.liveArea[3].label
      let geoFix = data.liveArea[3].geo.split("|")[2].split(",")
      // console.log('geo',geoFix)
      geoFix[1] = geoFix[1].split(";")[0]
      // console.log('geoFIxp1',geoFix[1])
      let geo = {x: geoFix[0], y: geoFix[1]}
      var BMap = window.BMap
      var projection = new BMap.MercatorProjection();
      // console.log('fix',projection.pointToLngLat(geo))
      let userGeo = {
        __type: "GeoPoint",
        latitude: projection.pointToLngLat(geo).lat,
        longitude: projection.pointToLngLat(geo).lng
      }
      // console.log('userGeo',userGeo)

      // let geo = {geoFix[0],geoFix[1]}
      // let geo = {}
      let payload = {
        username: username,
        nickname: nickname,
        mobilePhoneNumber: username,
        geoProvinceCode: geoProvinceCode,
        geoProvince: geoProvince,
        geoCityCode: geoCityCode,
        geoDistrictCode: geoDistrictCode,
        geoCity: geoCity,
        geoDistrict: geoDistrict,
        geo: userGeo,
        state:{...this.state,endTime:new Date()},
        // ...this.state,
        success: (result)=> {
          this.successAddVirtualUser(result)
        },
        error: (error)=> {
          this.addVirtualUserError(error)
        }
      }
      console.log('payload', payload)
      this.props.dispatch({type: 'appUserManager/addAppVirtualUser', payload: payload})
      // this.setState({modalVisible: false})
    } else {
      message.error('请填写完整地址信息')
    }
  }

  successAddVirtualUser(result) {
    message.info('添加用户成功')
    this.setState({modalVisible: false})
  }

  addVirtualUserError(error) {
    message.error(error.message)
  }

  selectedLiveDistrict(value, selectedOptions) {
    let liveArea = []
    selectedOptions.forEach((record)=> {
      // console.log('record', record)
      liveArea.push(record.label)
    })
    this.setState({
      liveArea: liveArea
    })
    // console.log('hahahahahahah',value,selectedOptions)
  }


  handleInputUsernameChange(value) {
    this.setState({username: value.target.value})

  }


  onDateChange(date, dateString) {
    // console.log(date[0]._d);
    this.setState({startTime: date[0]._d});
    this.setState({endTime: date[1]._d});
  }

  handleMenuClick(e) {
    this.setState({orderMode: e.key})
    this.setState({orderModeShow: orderShowTab[e.key]})
  }

  onSearchByFilter() {
    this.props.dispatch({
      type: 'appUserManager/query',
      payload: {
        orderMode: this.state.orderMode,
        username: this.state.username,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        geoCity: this.state.geoCity,
        liveArea: this.state.liveArea,
        isVirtual: this.state.isVirtual
      }
    })
  }

  unSearchByFilter() {
    this.setState({
      orderMode: 'createTimeDescend',
      orderModeShow: orderShowTab['createTimeDescend'],
      startTime: new Date('2000-01-01 00:00:00'),
      endTime: new Date(),
      geoCity: '',
      username: '',
      liveArea: [],
      isVirtual: 0
    })
    this.props.dispatch({
      type: 'appUserManager/query'
    })
  }

  updateUserEnable(payload, record) {
    // console.log('jhahahaha',payload,record)
    this.props.dispatch({type: 'appUserManager/updateAppUserEnable', payload: {id: record, status: payload ? 1 : 0}})

  }

  handlePickedClick(e) {
    if (e.key == "1") {
      this.setState({isVirtual: 1})
      this.setState({pickedName: "精选"})
    }
    else {
      this.setState({isVirtual: 0})
      this.setState({pickedName: "全部"})
    }
  }

  // console.log('personList====>',personList)
  render() {
    var pickedMenu = (
      <Menu onClick={(e)=> {
        this.handlePickedClick(e)
      }}>
        <Menu.Item key='1'>虚拟</Menu.Item>
        <Menu.Item key='0'>全部</Menu.Item>
      </Menu>
    );
    let appUserList=this.props.appUserList
    // console.log('personList===>')
    let menu = (
      <Menu onClick={(e)=> {
        this.handleMenuClick(e)
      }}>
        <Menu.Item key="createTimeAscend">时间升序</Menu.Item>
        <Menu.Item key="createTimeDescend">时间降序</Menu.Item>
      </Menu>
    );
    return (
      <AppUserManager>
        <div className='content-inner'>
          <Row gutter={24}>
            <Col lg={3} style={{marginBottom: 16}}>
              <p>排序方式：</p>
              <Dropdown overlay={menu}>
                <Button style={{marginBottom: 10, width: 100}}>
                  {this.state.orderModeShow} <Icon type="down"/>
                </Button>
              </Dropdown>
            </Col>
            <Col lg={{offset: 0, span: 4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择用户所在地区</p>
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择生活地区"
                onChange={(value, selectedOptions)=> {
                  this.selectedLiveDistrict(value, selectedOptions)
                }}
              />
            </Col>
            <Col lg={{offset: 0, span: 4}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>用户手机号码：</p>
            <Input style={{width: 120}} defaultValue="" onChange={(value)=> {
              this.handleInputUsernameChange(value)
            }}/>
          </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>是否虚拟：</p>
              <Dropdown overlay={pickedMenu}>
                <Button style={{ width: 100}}>
                  {this.state.isVirtual?'虚拟':'全部'} <Icon type="down"/>
                </Button>
              </Dropdown>
            </Col>
            <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择日期：</p>
              <RangePicker
                defaultValue={[moment('2000-01-01', dateFormat), new moment()]}
                onChange={(date, dateString)=>this.onDateChange(date, dateString)}
              />
            </Col>
            <Col lg={{offset: 0, span: 2}} style={{marginTop: 18, textAlign: 'left'}}>
              <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
            </Col>
            <Col lg={{offset: 0, span: 2}} style={{marginTop: 18, textAlign: 'left'}}>
              <Button type="ghost" onClick={()=>this.unSearchByFilter()}>取消筛选</Button>
            </Col>
          </Row>
          <Button style={{marginTop: 10}} size='large' type='ghost' onClick={()=> {
            this.add()
          }}>添加虚拟用户</Button>
          <AppUserList dataSource={appUserList} updateUserEnable={(payload, record)=> {
            this.updateUserEnable(payload, record)
          } }/>
        </div>
        <AppVirtualUserModal visible={this.state.modalVisible}
                             type={this.state.modalType}
                             onOk={(payload)=> {
                               this.onOk(payload)
                             }}
                             key={this.state.key}
                             onCancel={()=> {
                               this.onCancel()
                             }}
                             areaTreeSelectData={this.props.areaTreeSelectData}/>
      </AppUserManager>
    )
  }
}


function mapStateToProps(state) {
  let appUserList = getAppUserList(state)
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)

  // console.log('appUserList',appUserList)
  return {appUserList: appUserList, areaTreeSelectData: areaTreeSelectData}
}

export default connect(mapStateToProps)(AppUserListManager)
