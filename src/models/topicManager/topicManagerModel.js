/**
 * Created by wuxingyu on 2017/2/20.
 */

import {getTopicList, getTopicCategoryList, updateTopicPicked} from '../../services/topicManager/topicManagerServices'
import {parse} from 'qs'

export default {

  namespace: 'topicManage',

  state:
  {
    loading: false,
    topicList: [],
    topicCategoryList:[]
  },

  subscriptions: {
  },

  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getTopicList, payload)
      const topicCategory = yield call(getTopicCategoryList, payload)
      if (data.success && topicCategory.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            categoryList:topicCategory.data
          }
        })
      }
    },

    *update ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(updateTopicPicked, payload)
      if (data && data.success) {
        yield put({
          type: 'query',
          payload: payload.payload
        })
      }
    }
  },

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess (state, action) {

      let {list} = action.payload
      let {categoryList} = action.payload
      return {...state, topicList: list, topicCategoryList: categoryList}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    }
  }

}
