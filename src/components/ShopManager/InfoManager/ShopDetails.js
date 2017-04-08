/**
 * Created by lilu on 2017/3/11.
 */
import React,{Component} from 'react'
import {Table, Popconfirm,Card,Rate,Tag,Button,Icon,Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './ShopList.less'
import {Link} from 'dva/router'
import {formatLeancloudTime} from '../../../utils/numberUtils'

export default class ShopDetails extends Component{
  constructor(props){
    super(props)
  }
  renderTags(){
    let tags = this.props.shopDetails.containedTag.map((item,key)=>{
      return <Tag key={key}>{item.name}</Tag>
    })
    return tags
  }
  renderScore(){
    return <Rate defaultValue={this.props.shopDetails.score} allowHalf={true} disabled={true}></Rate>
  }
  renderIsOpen(){
    if(this.props.shopDetails.isOpen){
      return '开张'
    } else {
      return '关张'
    }
  }
  renderAlbum(){
    if(this.props.shopDetails.album&&this.props.shopDetails.album.length>0){
      let Albums=this.props.shopDetails.album.map((item,key)=>{
        return <img style={{width:100,height:100}} src={item} key={key}></img>
      })
      return Albums
    }else {
      return null
    }


  }
  render(){
    return(
      <div>
        <div>封面：<img style={{width:150,height:150}} src={this.props.shopDetails.coverUrl}></img><Button onClick={()=>{this.props.cancelImg(this.props.shopDetails.coverUrl)}}><Icon type='close'></Icon></Button></div>
        <div>店铺名称：{this.props.shopDetails.shopName}</div>
        <div>所属城市：{this.props.shopDetails.geoCity}</div>
        <div>所属地区：{this.props.shopDetails.geoDistrict}</div>
        <div>是否开张：<Switch checkedChildren={'开张'} unCheckedChildren={'关张'} defaultChecked={(this.props.shopDetails.status==1)?true:false} onChange={(payload)=>{this.props.updateStatus(payload,this.props.shopDetails.id,this.props.shopDetail.owner.id)}}></Switch></div>
        <div>店长：{this.props.shopDetails.name}</div>
        <div>注册用户：{this.props.shopDetails.owner.username}</div>
        <div>营业时间：{this.props.shopDetails.openTime}</div>
        <div>联系电话：{this.props.shopDetails.contactNumber}</div>
        <div>联系电话：{this.props.shopDetails.contactNumber2}</div>
        <div>移动电话：{this.props.shopDetails.phone}</div>
        <div>访问人数：{this.props.shopDetails.pv}</div>
        <div>店铺地址：{this.props.shopDetails.shopAddress}</div>
        <div>评分：{this.renderScore()}</div>
        <div>注册时间：{formatLeancloudTime(new Date(this.props.shopDetails.createdAt))}</div>
        <div>权重：{this.props.shopDetails.grade}</div>
        <div>专辑:</div><div>{this.renderAlbum()}</div>
        <div>标签：{this.renderTags()}</div>

      </div>
    )
  }
}