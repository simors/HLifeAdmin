/**
 * Created by lilu on 2017/3/9.
 */
/**
 * Created by lilu on 2017/3/7.
 */
/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/18.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button,Tabs} from 'antd'
import ShopList from '../../components/ShopManager/InfoManager/ShopList'
import {getShopList} from '../../selector/ShopManager/shopSelector'
// import UserSearch from '../../components/users/search'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import ShopInfoManager from './ShopInfoManager'
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
