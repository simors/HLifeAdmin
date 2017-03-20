/**
 * Created by zachary on 2017/3/18.
 */
import {parse} from 'qs'
import {getShopList,openShop,closeShop,getAnnouncementsByShopId,getShopCommentList,enableShopComment,disableShopComment} from '../../services/ShopManager/shopInfoManager'

export default {
  namespace: 'messagePushManager',
  state:{
    shopList:[],
    loading: false,
    announcements:[],
    commentList:[]
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
    *openShop ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(openShop, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *closeShop ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(closeShop, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *disableComment ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      yield call(disableShopComment, parse(payload))
      // if (shop.success) {
      //   yield put({
      //     type: 'query',
      //   })
      // }
    },
    *enableComment ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
    yield call(enableShopComment, parse(payload))
      // if (shop.success) {
      //   yield put({
      //     type: 'query',
      //   })
      // }
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
    }
  }
}
