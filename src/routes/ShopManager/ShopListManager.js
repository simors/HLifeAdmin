/**
 * Created by lilu on 2017/3/9.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button,Tabs,Input, Modal,DatePicker, Row, Col, Menu, Dropdown, Icon,Cascader,Select} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;
import * as CommonSelect from '../../selector/CommonSelect'
import ShopList from '../../components/ShopManager/InfoManager/ShopList'
import {getShopList} from '../../selector/ShopManager/shopSelector'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import {getCategoryList, getTagList} from '../../selector/ShopManager/categorySelector'

import ShopInfoManager from './ShopInfoManager'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
const Option = Select.Option;

const orderShowTab = {
  'createTimeDescend': '时间降序',
  'createTimeAscend': '时间升序',

}
// const TabPane = Tabs.TabPane;

class ShopListManager extends Component{
  constructor(props){
    super(props)
    this.state={
      modalVisible:false,
      modalType:'create',
      selectedItem:{},
      filterValue: '',
      orderMode: 'createTimeDescend',
      orderModeShow: orderShowTab['createTimeDescend'],
      startTime: new Date('2000-01-01 00:00:00'),
      endTime: new Date(),
      geoCity:'',
      username:'',
      selectedCategory:'',
      liveArea: [],
      certification:'',
      imgVisible:false,
      shopName:''

    }
  }
  componentDidMount(){
    // this.props.dispatch({type:'shopCategoryManager/query'})
    // this.props.dispatch({
    //   type:'shopInfoManager/query'
    // })
  }
  add(){
     console.log('openModal')

    this.setState({modalVisible:true,modalType:'create',selectedItem:{}})
  }
  onOk(data){
    this.props.dispatch({
      type:'shopCategoryManager/'+this.state.modalType,
      payload:data
    })
    // console.log('data====>',data)
    this.setState({modalVisible:false})
  }
  onOpen(payload){
    this.props.dispatch({
      type:'shopInfoManager/openShop',
      payload:{id:payload}
    })  }
  onClose(payload){
    // console.log('payload',payload)
    this.props.dispatch({
      type:'shopInfoManager/closeShop',
      payload:{id:payload}
    })  }
  shopInfoView(){

  }
  updateStatus(payload,id,userId){
    // console.log('payload',payload,record)
    this.props.dispatch({type: 'shopInfoManager/updateShopStatus', payload: {userId:userId,id: id, status: payload ? 1 : 0}})

  }
  onModify(data){
    // console.log('data',data)
    this.setState({modalVisible:true,modalType:'update',selectedItem:data })
  }

  onDelete(itemId){
    this.props.dispatch({
      type:'personManage/delete',
      payload:itemId
    })
  }
  handleInputCityChange(value){
    this.setState({geoCity:value.target.value})
  }
  handleInputshopnameChange(value){
    this.setState({shopName:value.target.value})

  }
  handleInputCategoryChange(value){
    this.setState({shopCategoryName:value.target.value})

  }
  onDateChange(date, dateString) {
    console.log(date[0]._d);
    this.setState({startTime: date[0]._d});
    this.setState({endTime: date[1]._d});
  }
  handleMenuClick(e) {
    this.setState({orderMode: e.key})
    this.setState({orderModeShow: orderShowTab[e.key]})
  }
  onSearchByFilter(){
    this.props.dispatch({
      type:'shopInfoManager/query',
      payload:{
        orderMode: this.state.orderMode,
        selectedCategory: this.state.selectedCategory,
        shopName: this.state.shopName,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        geoCity: this.state.geoCity,
        liveArea: this.state.liveArea
      }
    })
  }
  selectedLiveDistrict(value, selectedOptions) {
    let liveArea = []
    selectedOptions.forEach((record)=> {
      // console.log('record',record)
      liveArea.push(record.label)
    })
    this.setState({
      liveArea: liveArea
    })
    // console.log('hahahahahahah',value,selectedOptions)
  }
  unSearchByFilter(){
    this.setState({
      orderMode: 'createTimeDescend',
      orderModeShow: orderShowTab['createTimeDescend'],
      startTime: new Date('2000-01-01 00:00:00'),
      endTime: new Date(),
      geoCity:'',
      shopName:'',
      selectedCategory:'',
      liveArea: []
    })
    this.props.dispatch({
      type:'shopInfoManager/query'
    })
  }
  renderCategoryList() {
    if (this.props.categoryList) {
      let categoryList = this.props.categoryList.map((item, key)=> {
        return <Option key={item.id}>{item.text}</Option>
      })
      return categoryList
    }
  }
  changeCategory(value){
    this.setState({
      selectedCategory:value
    })
  }
  seeCertification(img){
    this.setState({
      certification : img,
      imgVisible:true

  })
  }
  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)
    let menu = (
      <Menu onClick={(e)=> {
        this.handleMenuClick(e)
      }}>
        <Menu.Item key="createTimeAscend">时间升序</Menu.Item>
        <Menu.Item key="createTimeDescend">时间降序</Menu.Item>
      </Menu>
    );
    return (
      <ShopInfoManager>
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
            <Col lg={{offset: 0, span: 5}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择用户所在地区</p>
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择生活地区地区"
                onChange={(value, selectedOptions)=> {
                  this.selectedLiveDistrict(value, selectedOptions)
                }}
              />
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择类别：</p>
              <Select defaultValue='all' onChange={(value)=>{
                this.changeCategory(value)
              }}>
                <Option key = 'all'>全部分类</Option>
                {this.renderCategoryList()}
              </Select>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>店铺名称：</p>
              <Input style={{width:100}} defaultValue="" onChange={(value)=>{this.handleInputshopnameChange(value)}} value={this.state.shopName}/>
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
<ShopList dataSource={this.props.shopList} seeCertification={(img)=>{this.seeCertification(img)}} updateStatus={(payload,record,userId)=>{this.updateStatus(payload,record,userId)}} shopInfoView={(payload)=>{this.shopInfoView(payload)}} />
        </div>
        <Modal visible={this.state.imgVisible} style={{width:400,height:400}} onCancel={()=>{this.setState({imgVisible:false})}} onOk={()=>{this.setState({imgVisible:false})}}>
          <img src={this.state.certification} style={{width:400,height:400}}></img>
        </Modal>
      </ShopInfoManager>
    )
  }
}


function mapStateToProps(state) {
  let shopList=getShopList(state)
  let categoryList = getCategoryList(state)

  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)

  // console.log('shopList',shopList)
  return {shopList:shopList,areaTreeSelectData:areaTreeSelectData,categoryList:categoryList}
}

export default connect(mapStateToProps)(ShopListManager)
