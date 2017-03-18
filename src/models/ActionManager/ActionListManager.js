/**
 * Created by lilu on 2017/3/18.
 */

import {parse} from 'qs'
import {getActionList} from '../../services/ActionManager/actionListManager'
export default {
  namespace: 'actionListManager',
  state:{
    actionList:[],
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


  }
}