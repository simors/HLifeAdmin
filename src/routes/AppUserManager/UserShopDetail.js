/**
 * Created by lilu on 2017/3/28.
 */
/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getShopDetail, getAnnouncements, getCommentList} from '../../selector/ShopManager/shopSelector'
import  {getShopDetailFromUser} from '../../selector/BGManager/appUserManagerSelector'
import {connect} from 'dva'
import Announcement from '../../components/ShopManager/InfoManager/Announcement'
import {Tag, Tabs} from 'antd'
import ShopDetails from '../../components/ShopManager/InfoManager/ShopDetails'
import CommentList from '../../components/ShopManager/InfoManager/CommentList'

const TabPane = Tabs.TabPane

class UserShopDetail extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

    this.props.dispatch({
      type: 'appUserManager/fetchShopDetailByUserId',
      payload: {id: this.props.userDetail.id}
    })
    // this.props.dispatch({
    //   type: 'shopInfoManager/getCommentList',
    //   payload: {id: this.props.location.query.id}
    // })

  }

  renderAnnouncement() {
    let announcements = this.props.announcements.map((item, key)=> {
      // console.log('key',key)
      return <Announcement content={item.content} coverUrl={item.coverUrl} key={key} index={key}/>
    })
    return announcements
  }

  enableComment(payload) {
    console.log('payload', payload)
    this.props.dispatch({
      type: 'shopInfoManager/enableComment',
      payload: {id: payload}
    })
    this.props.dispatch({
      type: 'shopInfoManager/getCommentList',
      payload: {id: this.props.shopDetail.id}
    })
  }

  disableComment(payload) {
    console.log('payload', payload)

    this.props.dispatch({
      type: 'shopInfoManager/disableComment',
      payload: {id: payload}
    })
    this.props.dispatch({
      type: 'shopInfoManager/getCommentList',
      payload: {id: this.props.shopDetail.id}
    })
  }

  cancelImg(payload) {
    console.log('payload', payload)
  }

  updateCategory(payload, record) {
    this.props.dispatch({
      type: 'appUserManager/updateShopStatus',
      payload: {id: record, status: payload ? 1 : 0, userId: this.props.userDetail.id}
    })

  }

  render() {
    return (

      <Tabs defaultActiveKey='1' className='content-inner'>
        <TabPane tab='详情管理' key='1'><ShopDetails shopDetails={this.props.shopDetail} cancelImg={(payload)=> {
          this.cancelImg(payload)
        }} updateCategory={(payload, record)=> {
          this.updateCategory(payload, record)
        }}/>
        </TabPane>
        <TabPane tab='通告管理' key='2'>{this.renderAnnouncement()}
        </TabPane>
        <TabPane tab='评论管理' key='3'><CommentList dataSource={ this.props.commentList}
                                                 disableComment={(data)=> {
                                                   this.disableComment(data)
                                                 }}
                                                 enableComment={(data)=> {
                                                   this.enableComment(data)
                                                 }}
        />
        </TabPane>


      </Tabs>

    )
  }
}

function mapStateToProps(state, ownProps) {

  let shopDetail = getShopDetailFromUser(state, ownProps.userDetail.id)
  let announcements = getAnnouncements(state)
  let commentList = getCommentList(state)
  // console.log('shopDetail',announcements)
  return {shopDetail: shopDetail, announcements: announcements, commentList: commentList}
}

export default connect(mapStateToProps)(UserShopDetail)
