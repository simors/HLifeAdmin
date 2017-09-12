/**
 * Created by lilu on 2017/3/9.
 */
/**
 * Created by lilu on 2017/2/28.
 */
import {parse} from 'qs'
import {getShopList,updateShopStatus,getAnnouncementsByShopId,getShopCommentList,updateReplyStatus,updateCommentStatus,getGoodsByShopId,getPromotionsByShopId} from '../../services/ShopManager/shopInfoManager'

export default {
  namespace: 'shopInfoManager',
  state:{
    shopList:[],
    loading: false,
    announcements:[],
    commentList:[],
    promotionList: [],
    goodsList: [],
  },
  subscriptions:{

  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(getShopList, parse(payload))
      if (shop.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            shopList: shop.shopList,
          }
        })
      }
    },

    *updateShopStatus({payload},{call,put}){
      yield put({type: 'showLoading'})
      const shop = yield call(updateShopStatus, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *updateReplyStatus({payload},{call,put}){
      yield put({type: 'showLoading'})
      const shop = yield call(updateReplyStatus, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *updateCommentStatus({payload},{call,put}){
      yield put({type: 'showLoading'})
      const shop = yield call(updateCommentStatus, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *getAnnouncements ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const announcements = yield call(getAnnouncementsByShopId, parse(payload))
      if (announcements.success) {
        yield put({
          type: 'announcementsReducer',
          payload:{announcements:announcements.announcements}
        })
      }
    },
    *getCommentList ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const commentList = yield call(getShopCommentList, parse(payload))
      if (commentList.success) {
        yield put({
          type: 'commentListReducer',
          payload:{commentList:commentList.commentList}
        })
      }
    },
    *getGoodsList ({payload}, {call, put}) {
      console.log('here is get goods list')
      yield put({type: 'showLoading'})
      const data = yield call(getGoodsByShopId, parse(payload))
      if (data.success) {
        yield put({
          type: 'goodsListReducer',
          payload:{goodsList:data.goodsList}
        })
      }
    },
    *getPromotionList ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getPromotionsByShopId, parse(payload))
      if (data.success) {
        yield put({
          type: 'promotionListReducer',
          payload:{promotionList:data.promotionList}
        })
      }
    },
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {shopList} = action.payload

      return {
        ...state,shopList:shopList
      }
    },
    announcementsReducer(state,action){
      let {announcements}=action.payload
      return{
        ...state,announcements:announcements
      }
    },
    commentListReducer(state,action){
      let {commentList} = action.payload
      return{...state,commentList:commentList}
    },
    goodsListReducer(state,action){
      let {goodsList} = action.payload
      return{...state,goodsList:goodsList}
    },
    promotionListReducer(state,action){
      let {promotionList} = action.payload
      return{...state,promotionList:promotionList}
    }
  }
}