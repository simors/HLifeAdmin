/**
 * Created by lilu on 2017/3/9.
 */
/**
 * Created by lilu on 2017/2/28.
 */
import {parse} from 'qs'
import {getShopList,openShop,closeShop} from '../../services/ShopManager/shopInfoManager'

export default {
  namespace: 'shopInfoManager',
  state:{
    shopList:[],
    loading: false,
  },
  subscriptions:{

  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(getShopList, parse(payload))
      if (shop.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            shopList: shop.shopList,
          }
        })
      }
    },
    *openShop ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(openShop, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *closeShop ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const shop = yield call(closeShop, parse(payload))
      if (shop.success) {
        yield put({
          type: 'query',
        })
      }
    },
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {shopList} = action.payload

      return {
        ...state,shopList:shopList
      }
    },
  }
}