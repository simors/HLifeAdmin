/**
 * Created by lilu on 2017/3/9.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button,Tabs,Input, DatePicker, Row, Col, Menu, Dropdown, Icon,} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;

import ShopList from '../../components/ShopManager/InfoManager/ShopList'
import {getShopList} from '../../selector/ShopManager/shopSelector'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import ShopInfoManager from './ShopInfoManager'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';

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
    console.log('payload',payload)
    this.props.dispatch({
      type:'shopInfoManager/closeShop',
      payload:{id:payload}
    })  }
  shopInfoView(){

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
  // console.log('personList====>',personList)
  render() {
    // console.log('personList===>',this.props.roleList)

    return (
      <ShopInfoManager>
        <div className='content-inner'>
<ShopList dataSource={this.props.shopList} onClose={(payload)=>{this.onClose(payload)}}  onOpen={(payload)=>{this.onOpen(payload)}} shopInfoView={(payload)=>{this.shopInfoView(payload)}} />
        </div>
      </ShopInfoManager>
    )
  }
}


function mapStateToProps(state) {
  let shopList=getShopList(state)
  // console.log('shopList',shopList)
  return {shopList:shopList}
}

export default connect(mapStateToProps)(ShopListManager)
