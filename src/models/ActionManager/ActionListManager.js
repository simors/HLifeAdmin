/**
 * Created by lilu on 2017/3/18.
 */

import {parse} from 'qs'
import {getActionList,updateBannersStatus} from '../../services/ActionManager/actionListManager'
import {getProvinceList,getProviceBaiduMap} from '../../services/baiduMap'
export default {
  namespace: 'actionListManager',
  state:{
    actionList:[],
    provinceList:[]
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getActionList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            actionList: data.actionList,
          }
        })
      }
    },
    *updateBannersStatus({payload},{call,put}){
      console.log('asdasd',payload)
      const data = yield call(updateBannersStatus,parse(payload))
      if(data&&data.success){
        put({
          type:'query'
        })
      }
      }

  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {actionList} = action.payload

      return {
        ...state,actionList:actionList
      }
    },

    pushProvince(state,action){
      let {provinces}=action.payload
      // console.log('***********provinces===========>',action.payload)
      return {
        ...state,
        provinceList:provinces
      }
    },
  }
}