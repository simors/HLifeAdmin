/**
 * Created by lilu on 2017/9/14.
 */

import {parse} from 'qs'
import {getPromotionDayPay,getPromotionMaxNum,setPromotionDayPay,setPromotionMaxNum,getShopConfig,setShopConfig} from '../../services/ShopManager/shopConfigManager'

export default {
  namespace: 'shopConfigManager',
  state:{
    maxNum: 0,
    dayPay: 0,
    loading: false,
  },
  subscriptions:{

  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getShopConfig, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            dayPay: data.dayPay,
            maxNum: data.maxNum
          }
        })
      }
    },
    *queryMaxNum ({payload}, {call, put}) {
      console.log('haahahhahahahahahaha')
      yield put({type: 'showLoading'})
      const data = yield call(getPromotionMaxNum, parse(payload))
      if (data.success) {
        yield put({
          type: 'queryMaxNumSuccess',
          payload: {
            maxNum: data.maxNum,
          }
        })
      }
    },
    *updateConfig ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(setShopConfig, parse(payload))
      if (data.success) {
        yield put({
          type: 'queryMaxNumSuccess',
          payload: {
            maxNum: data.maxNum,
            dayPay: data.dayPay
          }
        })
      }
    },
    *updateDayPay ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(setPromotionDayPay, parse(payload))
      if (data.success) {
        yield put({
          type: 'queryDayPaySuccess',
          payload: {
            dayPay: data.dayPay,
          }
        })
      }
    },
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {dayPay,maxNum} = action.payload

      return {
        ...state,dayPay:dayPay,maxNum: maxNum
      }
    },
    queryMaxNumSuccess(state,action){
      let {maxNum} = action.payload

      return {
        ...state,maxNum:maxNum
      }
    },
  }
}