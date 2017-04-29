/**
 * Created by lilu on 2017/4/22.
 */
import {parse} from 'qs'
import * as promoterFunC from '../../services/Statistics/promoterStatistics'
import * as MessagePushSelector from '../../selector/MessagePushManager/MessagePushSelector'

export default {
  namespace: 'promoterStatistics',
  state: {
    // promoterPerformance: [],
    daliyPerfomance:{},
    lastDaysPerformance:[],
    monthPerformance:{},
    lastMonthsPerformance:[],
    areaMonthPerformance:[],
    lastAreaMonthPerformance:[],

  },
  subscriptions:{

  },
  effects: {
    *query({payload}, {call ,put, select}) {
      // console.log('fetchUserList.payload===', payload)
    },
    *queryDaliyPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchDaliyPerformance,payload)
      if(data.success){
        yield put({type:'daliyPerformanceReducer',payload:data.data})
      }
    },
    *queryLastDaysPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchLastDaysPerformance,payload)
      if(data.success){
        yield put({type:'lastDaysPerformanceReducer',payload:data.data})
      }
    },
    *queryMonthPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchMonthPerformance,payload)
      if(data.success){
        yield put({type:'monthPerformanceReducer',payload:data.data})
      }
    },
    *queryLastMonthsPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchLastMonthsPerformance,payload)
      if(data.success){
        yield put({type:'lastMonthsPerformanceReducer',payload:data.data})
      }
    },
    *queryAreaMonthPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchAreaMonthPerformance,payload)
      if(data.success){
        yield put({type:'areaMonthPerformanceReducer',payload:data.data})
      }
    },
    *queryArealastMonthsPerformance({payload}, {call ,put, select}) {
      let data = yield call(promoterFunC.fetchArealastMonthsPerformance,payload)
      if(data.success){
        yield put({type:'arealastMonthsPerformanceReducer',payload:data.data})
      }
    },
  },
  reducers:{
    fetchPerformance(state, action) {
      const {userListInfo} = action.payload
      return {
        ...state,
        userListInfo
      }
    },
    daliyPerformanceReducer(state,action){
      const data = action.payload
      // console.log('daliyPerformanceReducer',data)
      return {...state,daliyPerfomance:data.statistics}

    },
    arealastMonthsPerformanceReducer(state,action){
      const data = action.payload
      // console.log('arealastMonthsPerformanceReducer',data)
      return {...state,lastAreaMonthPerformance:data.statistics}

    },
    areaMonthPerformanceReducer(state,action){
      const data = action.payload
      console.log('areaMonthPerformanceReducer',data)
      return {...state,areaMonthPerformance:data.statistics}

    },
    lastMonthsPerformanceReducer(state,action){
      const data = action.payload
      // console.log('lastMonthsPerformanceReducer',data)
      return {...state,lastMonthsPerformance:data.statistics}

    },
    monthPerformanceReducer(state,action){
      const data = action.payload
      // console.log('monthPerformanceReducer',data)
      return {...state,monthPerformance:data.statistics}

    },
    lastDaysPerformanceReducer(state,action){
      const data = action.payload
      // console.log('lastDaysPerformanceReducer',data)
      return {...state,lastDaysPerformance:data.statistics}
    }


  }
}
