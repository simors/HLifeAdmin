/**
 * Created by lilu on 2017/3/16.
 */
/**
 * Created by lilu on 2017/3/11.
 */
import React, {Component} from 'react'
import {Table, Popconfirm, Card, Rate, Tag, Button, Icon, Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import UserToPromoter from './user2promoterModal'
import {Link} from 'dva/router'
import {formatLeancloudTime} from '../../../utils/numberUtils'

export default class AppUserDetail extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalVisible:false
    }
  }

  onOk(data){
    // console.log('data=====>',data)
    this.props.user2promoter(data)
    this.setState({
      modalVisible:false
    })
  }
  openVisible(){
    this.setState({
      modalVisible:true
    })
  }
  onCancel(){
    this.setState({
      modalVisible:false
    })
  }
  renderToPromoter(){
    if(this.props.userDetail.identity[0]=='promoter'||this.props.userDetail.identity[1]=='promoter'){
      return null
    }else{
      return(
        <div><Button onClick={()=>{this.openVisible()}}>直接升为推广员</Button></div>
      )
    }
  }
  render() {
     console.log('asas',this.props.areaTreeSelectData)
    return (
      <div>
        {this.props.userDetail.avatar?<div>头像：<img style={{width: 150, height: 150}} src={this.props.userDetail.avatar}></img></div>:null}
        {this.props.userDetail.username?<div>注册用户名：{this.props.userDetail.username}</div>:null}
        {this.props.userDetail.geoCity?<div>所属城市：{this.props.userDetail.geoCity}</div>:null}
        {this.props.userDetail.geoDistrict?<div>所属地区：{this.props.userDetail.geoDistrict}</div>:null}
        <div>是否可用：<Switch checkedChildren={'可用'} unCheckedChildren={'不可用'}
                          defaultChecked={this.props.userDetail.status ? true : false} onChange={(payload)=> {
          this.props.updateUserEnable(payload, this.props.userDetail.id)
        }}></Switch></div>
        <div>昵称：{this.props.userDetail.nickname}</div>
        {this.props.userDetail.birthday?<div>生日：{this.props.userDetail.birthday}</div>:null}
        {this.props.userDetail.type?<div>类型：{this.props.userDetail.type=='normal'?'普通':'未知'}</div>:null}
        {this.props.userDetail.emailVerified?<div>是否邮箱认证：{this.props.userDetail.emailVerified}</div>:null}
        {this.props.userDetail.mobilePhoneNumber?<div>联系电话：{this.props.userDetail.mobilePhoneNumber}</div>:null}
        <div>性别：{this.props.userDetail.gender=='male'?'男':'女'}</div>
        {this.props.userDetail.authData?<div>认证数据：{this.props.userDetail.authData}</div>:null}
        {this.props.userDetail.createdAt?<div>注册时间：{formatLeancloudTime(new Date(this.props.userDetail.createdAt))}</div>:null}
        {this.renderToPromoter()}
        <UserToPromoter key = {this.props.userDetail.id} onOk={(data)=>{this.onOk(data)}} visible={this.state.modalVisible} areaTreeSelectData={this.props.areaTreeSelectData} userDetail={this.props.userDetail} onCancel={()=>{this.onCancel()}} />
      </div>
    )
  }
}