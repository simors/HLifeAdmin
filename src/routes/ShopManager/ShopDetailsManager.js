/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getShopDetail,getAnnouncements} from '../../selector/ShopManager/shopSelector'
import {connect} from 'dva'
import ShopInfoManager from './ShopInfoManager'
import Announcement from '../../components/ShopManager/InfoManager/Announcement'
import {Tag,Tabs} from 'antd'
const TabPane = Tabs.TabPane

class ShopDetailsManager extends Component{
  constructor(props){
    super(props)

  }
  componentDidMount(){

this.props.dispatch({
  type:'shopInfoManager/getAnnouncements',
  payload:{id:this.props.location.query.id}
})
    this.props.dispatch({
      type:'shopInfoManager/getCommentList',
      payload:{id:this.props.location.query.id}
    })

  }

  renderAnnouncement(){
    let announcements=this.props.announcements.map((item,key)=>{
      // console.log('key',key)
      return <Announcement content={item.content} coverUrl={item.coverUrl} key={key} index={key} />
    })
    return announcements
  }
  renderTags(){
    let tags = this.props.shopDetail.containedTag.map((item,key)=>{
      return <Tag key={key}>{item.name}</Tag>
    })
    return tags
  }

  render(){
    return(
      <ShopInfoManager>

        <Tabs defaultActiveKey='1' className='content-inner'>
          <TabPane tab='详情管理' key='1'>标签：{this.renderTags()}
          </TabPane>
          <TabPane tab='通告管理' key='2'>{this.renderAnnouncement()}
          </TabPane>


          </Tabs>

      </ShopInfoManager>
    )
  }
}

function mapStateToProps(state,ownProps) {

  let shopDetail = getShopDetail(state,ownProps.location.query.id)
  let announcements = getAnnouncements(state)
   // console.log('shopDetail',announcements)
 return {shopDetail:shopDetail,announcements:announcements}
}

export default connect(mapStateToProps)(ShopDetailsManager)
