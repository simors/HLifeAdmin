/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getShopDetail, getAnnouncements, getCommentList} from '../../selector/ShopManager/shopSelector'
import {connect} from 'dva'
import ShopInfoManager from './ShopInfoManager'
import Announcement from '../../components/ShopManager/InfoManager/Announcement'
import {Tag, Tabs} from 'antd'
import ShopDetails from '../../components/ShopManager/InfoManager/ShopDetails'
import CommentList from '../../components/ShopManager/InfoManager/CommentList'

const TabPane = Tabs.TabPane

class ShopDetailsManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

    this.props.dispatch({
      type: 'shopInfoManager/getAnnouncements',
      payload: {id: this.props.location.query.id}
    })
    this.props.dispatch({
      type: 'shopInfoManager/getCommentList',
      payload: {id: this.props.location.query.id}
    })

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
      payload: {id: this.props.location.query.id}
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
      payload: {id: this.props.location.query.id}
    })
  }

  cancelImg(payload) {
    console.log('payload', payload)
  }

  updateCategory(payload, record) {
    this.props.dispatch({type: 'shopInfoManager/updateShopStatus', payload: {id: record, status: payload ? 1 : 0}})

  }
  updateCommentStatus(payload, record){
    this.props.dispatch({type: 'shopInfoManager/updateCommentStatus', payload: {id: record, status: payload ? 1 : 0}})

  }
  updateReplyStatus(payload, record){
    this.props.dispatch({type: 'shopInfoManager/updateReplyStatus', payload: {id: record, status: payload ? 1 : 0}})

  }

  render() {
    return (
      <ShopInfoManager>

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
                                                   updateCommentStatus={(payload,record)=> {
                                                     this.updateCommentStatus(payload,record)
                                                   }}
                                                   updateReplyStatus={(payload,record)=> {
                                                     this.updateReplyStatus(payload,record)
                                                   }}
          />
          </TabPane>


        </Tabs>

      </ShopInfoManager>
    )
  }
}

function mapStateToProps(state, ownProps) {

  let shopDetail = getShopDetail(state, ownProps.location.query.id)
  let announcements = getAnnouncements(state)
  let commentList = getCommentList(state)
  // console.log('shopDetail',announcements)
  return {shopDetail: shopDetail, announcements: announcements, commentList: commentList}
}

export default connect(mapStateToProps)(ShopDetailsManager)
