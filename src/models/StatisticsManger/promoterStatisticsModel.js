/**
 * Created by lilu on 2017/4/22.
 */
import {parse} from 'qs'
import * as promoterFunC from '../../services/Statistics/promoterStatistics'
import * as MessagePushSelector from '../../selector/MessagePushManager/MessagePushSelector'

export default {
  namespace: 'promoterStatistics',
  state: {
    promoterPerformance: []
  },
  subscriptions:{

  },
  effects: {
    *query({payload}, {call ,put, select}) {
      // console.log('fetchUserList.payload===', payload)
    },
  },
  reducers:{
    fetchPerformance(state, action) {
      const {userListInfo} = action.payload
      return {
        ...state,
        userListInfo
      }
    }
  }
}