/**
 * Created by lilu on 2017/3/16.
 */
/**
 * Created by lilu on 2017/3/9.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Input, DatePicker, Row, Col, Menu, Dropdown, Icon,} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;

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

    }
  }

  componentDidMount() {
    // this.props.dispatch({type:'shopCategoryManager/query'})
    // this.props.dispatch({
    //   type:'shopInfoManager/query'
    // })
  }

  add() {
    // console.log('openModal')

    this.setState({modalVisible: true, modalType: 'create', selectedItem: {}})
  }


  handleInputCityChange(value) {
    this.setState({geoCity: value.target.value})
  }

  handleInputUsernameChange(value) {
    this.setState({username: value.target.value})

  }

  handleInputCategoryChange(value) {
    this.setState({shopCategoryName: value.target.value})

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
    })
    this.props.dispatch({
      type: 'appUserManager/query'
    })
  }

  updateUserEnable(payload, record) {
    // console.log('jhahahaha',payload,record)
    this.props.dispatch({type: 'appUserManager/updateAppUserEnable', payload: {id: record, status: payload ? 1 : 0}})

  }

  // console.log('personList====>',personList)
  render() {
    console.log('personList===>')
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
              <p>城市关键字：</p>
              <Input style={{width: 200}} defaultValue="" onChange={(value)=> {
                this.handleInputCityChange(value)
              }}/>
            </Col>
            <Col lg={{offset: 0, span: 4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>用户名关键字：</p>
              <Input style={{width: 200}} defaultValue="" onChange={(value)=> {
                this.handleInputUsernameChange(value)
              }}/>
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
          <AppUserList dataSource={this.props.appUserList} updateUserEnable={(payload, record)=> {
            this.updateUserEnable(payload, record)
          } }/>
        </div>
      </AppUserManager>
    )
  }
}


function mapStateToProps(state) {
  let appUserList = getAppUserList(state)
  // console.log('appUserList',appUserList)
  return {appUserList: appUserList}
}

export default connect(mapStateToProps)(AppUserListManager)
