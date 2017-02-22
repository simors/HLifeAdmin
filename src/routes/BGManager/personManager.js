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
    }
  }
  componentDidMount(){
    this.props.dispatch({type:'personManage/query'})
  }
  add(){
    this.setState({modalVisible:true})
  }
  onOk(){
    this.setState({modalVisible:false})
  }
  onCancel(){
    this.setState({modalVisible:false})
  }
 // console.log('personList====>',personList)
  render() {
    console.log('personList===>',this.props.personList)

    return (
      <div className='content-inner'>
        <Button onClick={()=>this.add()}></Button>
        <UserList dataSource={this.props.personList} />
        {/*<UserModal*/}
          {/*visible = {this.state.modalVisible}*/}
          {/*type = {this.state.modalType}*/}
          {/*onOk={()=>this.onOk()}*/}
          {/*onCancel={()=>this.onCancel()}*/}
          {/*item = {{}}*/}
        {/*/>*/}
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