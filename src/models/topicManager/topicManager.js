/**
 * Created by wuxingyu on 2017/2/20.
 */

import {getTopicList} from '../../services/topicManager/topicManage'
import {parse} from 'qs'

export default {

  namespace: 'topicManage',

  state:
  {
    loading: false,
    topicList: [],
  },

  subscriptions: {
  },

  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getTopicList, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          }
        })
      }
    },
  },

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess (state, action) {

      let {list} = action.payload
      return {...state, topicList: list}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    }
  }

}
