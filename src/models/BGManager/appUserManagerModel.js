/**
 * Created by lilu on 2017/3/16.
 */

import {parse} from 'qs'
import {getAppUserList,updateAppUserEnable} from '../../services/BGManager/appUserManager'
export default {
  namespace: 'appUserManager',
  state:{
   appUserList:[],
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
    *updateAppUserEnable({payload},{call,put}){
      yield call(updateAppUserEnable,parse(payload))
      // if(data.success){
      //   put({
      //     type:'query'
      //   })
      // }
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


  }
}