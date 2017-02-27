import React from 'react'
import {Router, Route, IndexRoute,hashHistory} from 'dva/router'

import App from './routes/app'
import PersonManage from './routes/BGManager/personManager'
import TopicManage from './routes/topicManager/topicManager'
import TopicDetail from './routes/topicManager/TopicDetail'
import UserInfoManage from './routes/UserInfo/userInfo'
import Welcome from './routes/welcome'
import err from './routes/error'
export default function ({history, app}) {

  const routes =
    <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/BGManager/personManager" component={PersonManage}/>
      <Route path="/adminUserInfoManager" component={UserInfoManage}/>
      <Route path="/topicManager/topicManager" component={TopicManage}/>
      <Route path="/topicManager/topicDetail" component={TopicDetail}/>
      <Route path="*" component={err}/>

    </Route>

  return <Router history={history} routes={routes}/>
}
