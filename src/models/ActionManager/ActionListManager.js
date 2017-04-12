/**
 * Created by lilu on 2017/3/18.
 */

import {parse} from 'qs'
import {getActionList,updateBannersStatus,createBanner,updateBanner} from '../../services/ActionManager/actionListManager'
import {getProvinceList,getProviceBaiduMap} from '../../services/baiduMap'
export default {
  namespace: 'actionListManager',
  state:{
    actionList:[],
    provinceList:[],
    modalData:{},
    actionModalOpen:false,
    modalKey:-1,
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
      // console.log('asdasd',payload)
      const data = yield call(updateBannersStatus,parse(payload))
      if(data&&data.success){
        put({
          type:'query'
        })
      }
      },
    *openModal({payload}, {call, put}){
      yield put({type:'dataToModal',payload:payload})
    },
    closeModal({payload},{call,put}){
      put ({type:'closeModal'})
    },
    *create ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const data = yield call(createBanner, parse(payload))
      if (data.success) {
        yield put({
          type: 'query',

        })
      }
    },
    *update ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const data = yield call(updateBanner, parse(payload))
      if (data.success) {
        yield put({
          type: 'query',

        })
      }
    },

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
    dataToModal(state,action){
      return{
        ...state,modalData:action.payload,actionModalOpen:true,modalKey:state.modalKey-1
      }
    },
    closeModal(state,action){
      return {
        ...state,actionModalOpen:false,modalKey:state.modalKey-1,modalData:{}
      }
    }
  }
}