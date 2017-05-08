import {login, userInfo, logout, updatePassword} from '../services/app'
import {getProvinceList,getProviceBaiduMap} from '../services/baiduMap'
import {parse} from 'qs'

export default {
  namespace: 'app',
  state: {
    login: false,
    loading: false,
    user: {},
   // message: '',
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'true',
    darkTheme: localStorage.getItem('antdAdminDarkTheme') !== 'false',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(localStorage.getItem('navOpenKeys') || '[]'),//侧边栏菜单打开的keys
    menuList: undefined,
    permissionList: undefined,
    provinceList:[]
  },
  subscriptions: {
    setup ({dispatch}) {
      dispatch({type: 'queryUser'})
      window.onresize = function () {
        dispatch({type: 'changeNavbar'})
      }
    }
  },
  effects: {
    *login ({payload}, {call, put}) {
      yield put({type: 'showLoginButtonLoading'})
      const data = yield call(login, parse(payload))
      // console.log('hahahahahahahah',data)
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: payload.username,
              password: payload.password
            },
            menuList: data.menuList,
            permissionList: data.permissionList
          }
        })
      } else {
        yield put({
          type: 'loginFail'
        })
        payload.error()
      }
    },
    *fetchProvinceList ({payload},{call,put}){
      const data = yield getProvinceList()

      yield put ({type:'pushProvince',payload:{provinces:data.sub}})

    },

    *queryUser ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const data = yield call(userInfo, parse(payload))
      if (data.success) {
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username,
              password: data.password
            },
            menuList: data.menuList
          }
        })
      }

      yield put({type: 'hideLoading'})
    },
    *updatePassword({payload}, {call, put}){
      const data = yield call(updatePassword, parse(payload))
      if (data.success) {
        //console.log(data)
        yield put({
          type: 'loginSuccess',
          payload: {
            user: {
              name: data.username,
              password: data.password
            }
          }
        })
      }
    },

    *logout ({
      payload
    }, {call, put}) {
      const data = yield call(logout, parse(payload))
      // console.log('data',data)
      if (data.success) {
        yield put({
          type: 'logoutSuccess'
        })
      }
    },
    *switchSider ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchSider'
      })
    },
    *changeTheme ({
      payload
    }, {put}) {
      yield put({
        type: 'handleChangeTheme'
      })
    },
    *
    changeNavbar ({
      payload
    }, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'})
      } else {
        yield put({type: 'hideNavbar'})
      }
    },
    *switchMenuPopver ({
      payload
    }, {put}) {
      yield put({
        type: 'handleSwitchMenuPopver'
      })
    }
  },
  reducers: {
    loginSuccess (state, action) {
      return {
        ...state,
        ...action.payload,
        login: true,
        loginButtonLoading: false
      }
    },
    logoutSuccess (state) {
      return {
        ...state,
        login: false
      }
    },
    loginFail (state) {
      return {
        ...state,
        login: false,
        loginButtonLoading: false
      }
    },
    showLoginButtonLoading (state) {
      return {
        ...state,
        loginButtonLoading: true
      }
    },
    showLoading (state) {
      return {
        ...state,
        loading: true
      }
    },
    hideLoading (state) {
      return {
        ...state,
        loading: false
      }
    },
    handleSwitchSider (state) {
      localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      }
    },
    handleChangeTheme (state) {
      localStorage.setItem('antdAdminDarkTheme', !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme
      }
    },
    showNavbar (state) {
      return {
        ...state,
        isNavbar: true
      }
    },
    hideNavbar (state) {
      return {
        ...state,
        isNavbar: false
      }
    },
    handleSwitchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      }
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      }
    },

    REHYDRATE(state, action) {
      // console.log("rehydrate")
      return {...state}
    },
  }
}
