/**
 * Created by lilu on 2017/2/27.
 */
import React,{Component} from 'react'
import { connect } from 'dva'
import UserInfoManage from '../../components/userInfo/userInfo'

class UserInfo extends Component{
  constructor(props){
    super(props)
  }
  updatePassword(payload){
    this.props.dispatch({
      type:'app/updatePassword',
      payload:payload
    })
  }
  render(){
    return(
      <UserInfoManage username={this.props.username} onOk={(payload)=>{this.updatePassword(payload)}} />
    )
  }
}

function mapStateToProps(state){
console.log('hahah',state)
  let username = state.app.user.name
  return {
  username:username
  }
}
export default connect(mapStateToProps)(UserInfo)