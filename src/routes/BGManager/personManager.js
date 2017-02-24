/**
 * Created by lilu on 2017/2/18.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button} from 'antd'
import UserList from '../../components/BGManager/personManager/personList'
import {getPersonList,getAllRoleList} from '../../selector/BGManager/personManager'
// import UserSearch from '../../components/users/search'
import UserModal from '../../components/BGManager/personManager/personModal'

class personManager extends Component{
  constructor(props){
    super(props)
    this.state={
      modalVisible:false,
      modalType:'create',
      selectedItem:{},

    }
  }
  componentDidMount(){
    this.props.dispatch({type:'personManage/query'})
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
        <Button size='large' type='ghost'  onClick={()=>{this.add()}}>添加用户</Button>
        <UserList dataSource={this.props.personList} onEditItem={(payload)=>{this.onModify(payload)}} onDeleteItem={(payload)=>{this.onDelete(payload)}}/>
        <UserModal
          visible = {this.state.modalVisible}
          type = {this.state.modalType}
          onOk={(payload)=>{this.onOk(payload)}}
          onCancel={()=>{this.onCancel()}}
          item = {this.state.selectedItem}
          roleList = {this.props.roleList}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  let personList = getPersonList(state)
  let roleList = getAllRoleList(state)
  return {
    personList:personList,
    roleList:roleList
  }
}

export default connect(mapStateToProps)(personManager)