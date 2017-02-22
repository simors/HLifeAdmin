import React from 'react'
import {Router, Route, IndexRoute} from 'dva/router'
import App from './routes/app'
import PersonManage from './routes/BGManager/personManager'
import Welcome from './routes/welcome'
import err from './routes/error'
export default function ({history, app}) {
  // const routes = [
  //   {
  //     path: '/',
  //     component: App,
  //     getIndexRoute (nextState, cb) {
  //       require.ensure([], require => {
  //         cb(null, {component: require('./routes/welcome')})
  //       })
  //     },
  //     childRoutes: [
  //       {
  //         path: 'dashboard',
  //         name: 'dashboard',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/dashboard'))
  //           })
  //         }
  //       },
  //       {
  //         path: 'welcome',
  //         name: 'welcome',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/welcome'))
  //           })
  //         }
  //       },
  //       {
  //         path: 'users',
  //         name: 'users',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/users'))
  //           })
  //         }
  //       }, {
  //         path: 'ui/ico',
  //         name: 'ui/ico',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/ui/ico'))
  //           })
  //         }
  //       }, {
  //         path: 'ui/search',
  //         name: 'ui/search',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/ui/search'))
  //           })
  //         }
  //       },{
  //         path: 'BGManager/personManager',
  //         name: 'BGManager/personManager',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/BGManager/personManager'))
  //           })
  //         }
  //       }, {
  //         path: '*',
  //         name: 'error',
  //         getComponent (nextState, cb) {
  //           require.ensure([], require => {
  //             cb(null, require('./routes/error'))
  //           })
  //         }
  //       }
  //     ]
  //   }
  // ]
  const routes =
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/BGManager/personManager" component={PersonManage}/>
      <Route path="/error" component={err}/>

    </Route>

  return <Router history={history} routes={routes}/>
}
