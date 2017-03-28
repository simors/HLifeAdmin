/**
 * Created by lilu on 2017/3/16.
 */

import {parse} from 'qs'
import {getAppUserList,updateAppUserEnable,getShopByUserId} from '../../services/BGManager/appUserManager'
export default {
  namespace: 'appUserManager',
  state:{
   appUserList:[],
   shopDetail:{}
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getAppUserList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            appUserList: data.appUserList,
          }
        })
      }
    },
    *fetchShopDetailByUserId({payload},{call,put}){
      const data = yield call(getShopByUserId,parse(payload))
      if(data&&data.success){
        yield put({
          type: 'shopInfoManager/getAnnouncements',
          payload: {id: data.shopDetail.id}
        })
        yield put({
          type: 'shopInfoManager/getCommentList',
          payload: {id: data.shopDetail.id}
        })
        yield put({
          type:'fetchShopDetail',
          payload:{shopDetail:data.shopDetail}
        })
      }
      },
    *updateAppUserEnable({payload},{call,put}){
      const data = yield call(updateAppUserEnable,parse(payload))
      // console.log('data',data)
      if (data && data.success) {
        yield put({
          type: 'query',
        })
      }
      }
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {appUserList} = action.payload

      return {
        ...state,appUserList:appUserList
      }
    },
    fetchShopDetail(state,action){
      let {shopDetail}=action.payload
      return{
        ...state,shopDetail:shopDetail
      }
    }


  }
}