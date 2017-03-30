/**
 * Created by lilu on 2017/3/30.
 */
import {parse} from 'qs'
import {fetchCommissionCof} from '../../services/PromoterManager/promoterCommissionManager'
export default {
  namespace: 'promoterCommissionManager',
  state:{
    commissionCof:{}
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(fetchCommissionCof, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            commissionCof: data.commissionCof,
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
      let {commissionCof} = action.payload

      return {
        ...state,commissionCof:commissionCof
      }
    },


  }
}