/**
 * Created by wuxingyu on 2017/2/20.
 */

import {getTopicCategoryList, updateTopicCategoryPicked, createNewTopicCategory} from '../../services/topicManager/topicManagerServices'

export default {

  namespace: 'topicCategoryManage',

  state:
  {
    loading: false,
    topicCategoryList:[]
  },

  subscriptions: {
  },

  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const topicCategory = yield call(getTopicCategoryList, payload)
      if (topicCategory.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            categoryList:topicCategory.data
          }
        })
      }
    },

    *update ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(updateTopicCategoryPicked, payload)
      if (data && data.success) {
        yield put({
          type: 'query',
          payload: payload.payload
        })
      }
    },

    *create ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(createNewTopicCategory, {name: payload.name, introduction: payload.introduction})
      if (data && data.success) {
        yield put({
          type: 'query'
        })
      }
    },
  },

  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess (state, action) {

      let {categoryList} = action.payload
      return {...state, topicCategoryList: categoryList}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    }
  }

}
