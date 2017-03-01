/**
 * Created by lilu on 2017/2/28.
 */
import {parse} from 'qs'
import {getShopCategoryList} from '../../services/ShopManager/CategoryManager'

export default {
  namespace: 'shopCategoryManager',
  state:{
    categoryList:[],
    loading: false,
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getShopCategoryList, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            categoryList: data.categoryList,
            //pagination: data.page
          }
        })
      }
    }
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {categoryList} = action.payload
      return {
        ...state,categoryList:categoryList
      }
    }
  }
}