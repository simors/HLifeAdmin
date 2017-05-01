/**
 * Created by lilu on 2017/4/8.
 */
/**
 * Created by lilu on 2017/3/16.
 */
/**
 * Created by lilu on 2017/3/11.
 */
import React, {Component} from 'react'
import {Table, Popconfirm, Card, Rate, Tag, Button, Icon, Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import UserToPromoter from '../../BGManager/appUserManager/user2promoterModal'
import {Link} from 'dva/router'
import {formatLeancloudTime} from '../../../utils/numberUtils'

export default class PromoterDetail extends Component {
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
    return(
      <div><Button onClick={()=>{this.openVisible()}}>直接升为推广员</Button></div>

    )
  }
  renderIdentityArea(){
    if(this.props.promoterDetail&&this.props.promoterDetail.identity)
    switch(this.props.promoterDetail.identity){
      case 0:
        return null
        break
      case 1:
        return <div>代理地区：{this.props.promoterDetail.province} </div>
        break
      case 2:
        return <div>代理地区：{this.props.promoterDetail.province + this.props.promoterDetail.city}</div>
        break
      case 3:
        return <div>代理地区：{this.props.promoterDetail.province + this.props.promoterDetail.city + this.props.promoterDetail.district}</div>
        break
    }
  }
  renderLevel(){
    if(this.props.promoterDetail&&this.props.promoterDetail.level){
      switch (this.props.promoterDetail.level){
        case 1:
          return <div>级别：青铜级</div>
          break
        case 2:
          return <div>级别：白银级</div>
          break
        case 3:
          return <div>级别：黄金级</div>
          break
        case 4:
          return <div>级别：钻石级</div>
          break
        case 5:
          return <div>级别：皇冠级</div>
          break
      }
    }

  }
  render() {
    console.log('promoterDetail',this.props.promoterDetail)
    return (
      <div>
        {(this.props.promoterDetail&&this.props.promoterDetail.name)?<div>名称：{this.props.promoterDetail.name}</div>:null}
        {(this.props.promoterDetail&&this.props.promoterDetail.liveProvince)?<div>生活地区：{this.props.promoterDetail.liveProvince+this.props.promoterDetail.liveCity?this.props.promoterDetail.liveCity:''+this.props.promoterDetail.liveDistrict?this.props.promoterDetail.liveDistrict:''}</div>:null}
        {this.renderIdentityArea()}
        {this.renderLevel}
        {(this.props.promoterDetail&&this.props.promoterDetail.phone)?<div>联系电话：{this.props.promoterDetail.phone}</div>:null}
        {(this.props.promoterDetail)?<div>邀请店铺数量：{this.props.promoterDetail.inviteShopNum}</div>:null}
        {(this.props.promoterDetail)?<div>团队成员数量：{this.props.promoterDetail.teamMemNum}</div>:null}
        {(this.props.promoterDetail)?<div>是否交费：{this.props.promoterDetail.payment==0?'未交费':'已交费'}</div>:null}
        {(this.props.promoterDetail)?<div>推广店铺提成金额：{this.props.promoterDetail.shopEarnings}</div>:null}
        {(this.props.promoterDetail)?<div>推广员提成金额：{this.props.promoterDetail.royaltyEarnings}</div>:null}
        {(this.props.promoterDetail&&this.props.promoterDetail.createdAt)?<div>注册时间：{formatLeancloudTime(new Date(this.props.promoterDetail.createdAt))}</div>:null}
        {this.renderToPromoter()}
        <UserToPromoter onOk={(data)=>{this.onOk(data)}} visible={this.state.modalVisible} areaTreeSelectData={this.props.areaTreeSelectData} onCancel={()=>{this.onCancel()}} />
      </div>
    )
  }
}