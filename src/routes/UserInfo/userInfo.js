/**
 * Created by lilu on 2017/2/27.
 */
import React, {Component} from 'react'
import {Button,message} from 'antd'
import {connect} from 'dva'
import UserInfoManage from '../../components/userInfo/userInfo'
import {getUserInfo} from '../../selector/userInfo/userInfo'
class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalVisible:false,


    }  }

    add(){
      this.setState({modalVisible:true})

    }
  updatePassword(payload) {
    this.props.dispatch({
      type: 'app/updatePassword',
      payload: payload
    })
    this.setState({modalVisible:false})
  }
  onCancel(){
    this.setState({modalVisible:false})
  }

  render() {
    return (
      <div style={{flex:1,flexDirection:'column'}}>
      <text>{'用户名： '+this.props.username+'  '}</text>
        <Button size='large' type='ghost'  onClick={()=>{this.add()}}>修改密码</Button>
      <UserInfoManage
        username={this.props.username}
        onOk={(payload)=> {this.updatePassword(payload)}}
        visible = {this.state.modalVisible}
        onCancel={()=>{this.onCancel()}}

      />
        </div>
    )
  }
}

function mapStateToProps(state) {
  // console.log('hahah', state)
  let user = getUserInfo(state)
  return {
    username: user.name,
    password: user.password
  }
}
export default connect(mapStateToProps)(UserInfo)