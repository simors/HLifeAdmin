/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/18.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button} from 'antd'
import CategoryList from '../../components/ShopManager/CategoryList'
import {getCategoryList} from '../../selector/ShopManager/categorySelector'
// import UserSearch from '../../components/users/search'
// import UserModal from '../../components/BGManager/personManager/personModal'

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
      type:'personManage/'+this.state.modalType,
      payload:data
    })
    // console.log('data====>',data)
    this.setState({modalVisible:false})
  }
  onCancel(){
    this.setState({modalVisible:false})
  }

  onModify(data){
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
        {/*<Button size='large' type='ghost'  onClick={()=>{this.add()}}>添加用户</Button>*/}
        <CategoryList
          dataSource={this.props.categoryList}
          onEditItem={(payload)=>{this.onModify(payload)}}
          onDeleteItem={(payload)=>{this.onDelete(payload)}}
          pagination={{total:this.props.categoryList.length,pageSize:10}}
        />

      </div>
    )
  }
}


function mapStateToProps(state) {
  let categoryList = getCategoryList(state)
  return {
    categoryList:categoryList,

  }
}

export default connect(mapStateToProps)(categoryManager)