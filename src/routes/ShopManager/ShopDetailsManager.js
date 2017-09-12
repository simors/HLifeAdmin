/**
 * Created by lilu on 2017/3/10.
 */
import React, {Component} from 'react'
import {getShopDetail, getAnnouncements, getCommentList,getGoodsList,getPromotionList} from '../../selector/ShopManager/shopSelector'
import {connect} from 'dva'
import ShopInfoManager from './ShopInfoManager'
import Announcement from '../../components/ShopManager/InfoManager/Announcement'
import {Tag, Tabs} from 'antd'
import ShopDetails from '../../components/ShopManager/InfoManager/ShopDetails'
import CommentList from '../../components/ShopManager/InfoManager/CommentList'
import GoodsList from '../../components/ShopManager/InfoManager/GoodsList'
import PromotionList from '../../components/ShopManager/InfoManager/PromotionList'

const TabPane = Tabs.TabPane

class ShopDetailsManager extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {

    // this.props.dispatch({
    //   type: 'shopInfoManager/getAnnouncements',
    //   payload: {id: this.props.location.query.id}
    // })
    this.props.dispatch({
      type: 'shopInfoManager/getCommentList',
      payload: {id: this.props.location.query.id}
    })
    this.props.dispatch({
      type: 'shopInfoManager/getGoodsList',
      payload: {shopId: this.props.location.query.id}
    })
    this.props.dispatch({
      type: 'shopInfoManager/getPromotionList',
      payload: {shopId: this.props.location.query.id}
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

  updateStatus(payload, record,userId) {
    this.props.dispatch({type: 'shopInfoManager/updateShopStatus', payload: {userId:userId,id: record, status: payload ? 1 : 0}})

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
          }} updateStatus={(payload, record,userId)=> {
            this.updateStatus(payload, record,userId)
          }}/>
          </TabPane>


          <TabPane tab='评论管理' key='2'><CommentList dataSource={ this.props.commentList}
                                                   updateCommentStatus={(payload,record)=> {
                                                     this.updateCommentStatus(payload,record)
                                                   }}
                                                   updateReplyStatus={(payload,record)=> {
                                                     this.updateReplyStatus(payload,record)
                                                   }}
          />
          </TabPane>
          <TabPane tab='商品列表' key='3'><GoodsList dataSource={ this.props.goodsList}
          />
          </TabPane>
          <TabPane tab='活动列表' key='4'><PromotionList dataSource={ this.props.promotionList}

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
  let goodsList = getGoodsList(state)
  let promotionList = getPromotionList(state)
  // console.log('shopDetail',announcements)
  return {shopDetail: shopDetail, announcements: announcements, commentList: commentList, goodsList: goodsList, promotionList: promotionList}
}

export default connect(mapStateToProps)(ShopDetailsManager)
