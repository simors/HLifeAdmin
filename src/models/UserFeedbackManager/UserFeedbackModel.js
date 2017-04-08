/**
 * Created by lilu on 2017/4/8.
 */
/**
 * Created by wuxingyu on 2017/2/20.
 */

import {getAdviseList,readAdviseDetail} from '../../services/UserFeedback/userFeedback'
import {parse} from 'qs'

export default {

  namespace: 'userFeedbackModel',

  state:
  {
    adviseList: [],
  },

  subscriptions: {
  },

  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getAdviseList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            adviseList: data.adviseList,
          }
        })
      }
    },
    *readDetail({payload},{call,put}){
      yield put({type:'showLoading'})
      yield call(readAdviseDetail,parse(payload))
      },

  },
  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess (state, action) {

      let {adviseList} = action.payload
      return {...state, adviseList: adviseList,}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    }
  }

}
