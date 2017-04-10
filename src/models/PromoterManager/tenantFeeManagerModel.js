/**
 * Created by wanpeng on 2017/4/10.
 */
import {parse} from 'qs'
import {fetchShopTenantFee, setShopTenantFee} from '../../services/PromoterManager/tenantFeeManagerServices'

export default {
  namespace: 'tenantFeeManager',
  state: {
    tenantFeeList: [],
  },
  subscriptions: {

  },
  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(fetchShopTenantFee, parse(payload))
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            tenantFeeList: data.shopTenantFeeList,
          }
        })
      }
    },
    *update ({payload}, {call, put}) {
      // yield put({type: 'showLoading'})
      const data = yield call(setShopTenantFee, parse(payload))
      if (data.success) {
        yield put({
          type: 'updateSuccess',
          payload: {
            shopTenantFee: data.shopTenantFee,
          }
        })
      }
    },
  },
  reducers: {
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state, action) {
      let {tenantFeeList} = action.payload

      return {
        ...state, tenantFeeList: tenantFeeList
      }
    },
    updateSuccess(state, action) {
      let tenantFee = action.payload.shopTenantFee
      state.tenantFeeList.forEach((value) => {
        if(value.objectId == tenantFee.objectId)
          value.fee = tenantFee.fee
      })

      return {
        ...state
      }
    }
  }
}
