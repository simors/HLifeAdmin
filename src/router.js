import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'dva/router'

import App from './routes/app'
import PersonManage from './routes/BGManager/personManager'
import TopicManage from './routes/topicManager/topicManager'
import TopicCategoryManager from './routes/topicManager/topicCategoryManager'
import TopicDetail from './routes/topicManager/TopicDetail'
import UserInfoManage from './routes/UserInfo/userInfo'
import ShopCategoryManage from './routes/ShopManager/CategoryManager'
import Welcome from './routes/welcome'
import err from './routes/error'
export default function ({history, app}) {


  const routes =
    <Route path="/" breadcrumbName='仪表盘' component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/BGManager/personListManager" breadcrumbName="用户列表管理" component={PersonManage}/>
      <Route path="/adminUserInfoManager" breadcrumbName="个人信息" component={UserInfoManage}/>
      <Route path="/shopManager/shopCategoryManager" breadcrumbName="店铺分类管理" component={ShopCategoryManage}/>
      <Route path="/topicManager/contentManager" breadcrumbName="内容管理" component={TopicManage}/>
      <Route path="/topicManager/topicDetail" breadcrumbName="话题详情" component={TopicDetail}/>
      <Route path="/topicManager/topicCategoryManager" breadcrumbName="分类管理" component={TopicCategoryManager}/>
      <Route path="*" component={err}/>
    </Route>

  return <Router history={history} routes={routes}/>
}
