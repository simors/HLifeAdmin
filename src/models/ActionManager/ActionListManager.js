/**
 * Created by lilu on 2017/3/18.
 */

import {parse} from 'qs'
import {getActionList} from '../../services/ActionManager/actionListManager'
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
    *fetchProvinces({payload}, {call, put}){
      // console.log('asdasdasdhahahahahahahaha')
      // getProvinceList().then((result)=>{
      //   console.log('asdasdasdasdasd',result.sub)
      //   put({
      //     type:'pushProvince',
      //     payload:{
      //       provinces:result.sub
      //     }
      //
      //   })
      //   put({
      //     type:'query'
      //   })
      // })
      console.log('provinces===========>')

      const data = yield call(getProviceBaiduMap)
      console.log('**********provinces===========>')
      if(data&&data.success){
        yield put ({
          type:'pushProvince',
          payload: data.provinces
        })
      }
    },
    *fetchProvinceList ({payload},{call,put}){
      const data = yield getProvinceList()

         yield put ({type:'pushProvince',payload:{provinces:data.sub}})

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