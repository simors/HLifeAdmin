/**
 * Created by lilu on 2017/4/1.
 */
import {parse} from 'qs'
import {fetchPromoterList} from '../../services/PromoterManager/promoterAgentManager'
export default {
  namespace: 'promoterAgentSet',
  state:{
    promoterList:[]
  },
  subscriptions:{

  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(fetchPromoterList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            promoterList: data.promoterList,
          }
        })
      }
    },
  }
  ,
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {promoterList} = action.payload

      return {
        ...state,promoterList:promoterList
      }
    },


  }
}