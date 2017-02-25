/**
 * Created by lilu on 2017/2/20.
 */
/**
 * Created by lilu on 2017/2/20.
 */
//import { create, remove, update, query } from '../services/users'
import {personManageConfig} from '../structs/BGManager/personManage'
import {getPersonList,getAllRoles,addAdminUser,updeteAdminUser,deleteAdminUser} from '../../services/BGManager/personManage'
import {parse} from 'qs'
import {Record, List, Map} from 'immutable'

// import {userConfig} from './structs/users'
// const user = userConfig()
export default {

  namespace: 'personManage',

  state: // Record({abc: '123'}),
  {
    // location:location,
    //user:user,
    loading: false,
    personList: [],
    roleList: []
  },

  subscriptions: {
    // setup ({dispatch, history}) {
    //   history.listen(location => {
    //     if (location.pathname === '/BGManager/personManager') {
    //       dispatch({
    //         type: 'query',
    //         payload: location.query
    //       })
    //     }
    //   })
    // }
  },

  effects: {
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(getPersonList, parse(payload))
      const roleList = yield call(getAllRoles, parse(payload))
      if (data.success&&roleList.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            roleList:roleList.data,
            list: data.data,
            //pagination: data.page
          }
        })
      }
    },
    *delete ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(deleteAdminUser, {id: payload})
      if (data && data.success) {
        yield put({
          type: 'query',
        })
      }
    },
    *create ({payload}, {call, put}) {
     // yield put({type: 'hideModal'})
      yield put({type: 'showLoading'})
      const data = yield call(addAdminUser, payload)
      if (data && data.success) {
        yield put({
          type: 'query'
        })
      }
    },
    *update ({payload}, {select, call, put}) {
      // yield put({type: 'hideModal'})
      yield put({type: 'showLoading'})
      // const id = yield select(({users}) => users.currentItem.id)
      // const newUser = {...payload, id}
      const data = yield call(updeteAdminUser, payload)
      if (data && data.success) {
        yield put({
          type: 'query',

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
      let {roleList} = action.payload
      // console.log('state====>',state)
      // let _map = state.personList
      // console.log('-map======>',_map)
      //  _map = _map.set('personList',list)
      // state = state.set('personManage',_map)
      return {...state, personList: list,roleList:roleList}
    },
    showModal (state, action) {
      return {...state, ...action.payload, modalVisible: true}
    },
    hideModal (state) {
      return {...state, modalVisible: false}
    }
  }

}
