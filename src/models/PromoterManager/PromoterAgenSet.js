/**
 * Created by lilu on 2017/4/1.
 */
import {parse} from 'qs'
import {fetchPromoterList,fetchAgentList,agentSet,getPromoterInfoById} from '../../services/PromoterManager/promoterAgentManager'
export default {
  namespace: 'promoterAgentSet',
  state:{
    promoterList:[],
    promoterDetail:{}
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
    *queryAgent ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(fetchAgentList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            promoterList: data.promoterList,
          }
        })
      }
    },
    *agentAdd({payload},{call,put}){
      yield put({type: 'showLoading'})
      const promoter = yield call(agentSet, parse(payload))
      if (promoter.success) {
        payload.success()
        // yield put({
        //   type: 'query',
        //   // payload:{id:payload.userId}
        // })
      }
    },
    *fetchPromoterDetail({payload},{call,put}){
      yield put({type:'showLoading'})
      const data = yield call(getPromoterInfoById,parse(payload))
      if(data.success){
        yield put ({
          type:'promoterDetailReducer',
          payload:{promoterDetail:data.promoterDetail}
        })
      }
    },

    *agentSet({payload},{call,put}){
      yield put({type: 'showLoading'})
      const promoter = yield call(agentSet, parse(payload))
      if (promoter.success) {
        yield put({
          type: 'queryAgent',
          // payload:{id:payload.userId}
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
    // console.log('promoterList',promoterList)
      return {
        ...state,promoterList:promoterList
      }
    },
    promoterDetailReducer(state,action){
      let {promoterDetail}=action.payload
      return{
        ...state,promoterDetail:promoterDetail
      }
    }


  }
}