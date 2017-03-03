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
import CategoryList from '../../components/ShopManager/CategoryManager/CategoryList'
import {getCategoryList,getTagList} from '../../selector/ShopManager/categorySelector'
// import UserSearch from '../../components/users/search'
 import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
//
// const TabPane = Tabs.TabPane;

class categoryManager extends Component{
  constructor(props){
    super(props)
    this.state={
      modalVisible:false,
      modalType:'create',
      selectedItem:{},

    }
  }
  componentDidMount(){
    this.props.dispatch({type:'shopCategoryManager/query'})
  }
  add(){
    // console.log('openModal')

    this.setState({modalVisible:true,modalType:'create'})
  }
  onOk(data){
    this.props.dispatch({
      type:'shopCategoryManager/'+this.state.modalType,
      payload:data
    })
     console.log('data====>',data)
    this.setState({modalVisible:false})
  }
  onCancel(){
    this.setState({modalVisible:false})
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

      <div className='content-inner'>
        {/*<Tabs defaultActiveKey="categoryManager" >*/}
          {/*<TabPane tab = '分类管理' key = 'categoryManager'>*/}
        <Button size='large' type='ghost'  onClick={()=>{this.add()}}>添加用户</Button>
        <CategoryList
          dataSource={this.props.categoryList}
          onEditItem={(payload)=>{this.onModify(payload)}}
          onDeleteItem={(payload)=>{this.onDelete(payload)}}
          pagination={{total:this.props.categoryList.length,pageSize:10}}
        />
            {/*</TabPane>*/}
          {/*</Tabs>*/}
        <CategoryModal
          visible = {this.state.modalVisible}
          type = {this.state.modalType}
          onOk={(payload)=>{this.onOk(payload)}}
          onCancel={()=>{this.onCancel()}}
          item = {this.state.selectedItem}
          tagList = {this.props.tagList}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  let categoryList = getCategoryList(state)
  let tagList = getTagList(state)
  return {
    categoryList:categoryList,
    tagList: tagList

  }
}

export default connect(mapStateToProps)(categoryManager)