import React from 'react'
import {Router, Route, IndexRoute, hashHistory,browserHistory} from 'dva/router'

import App from './routes/app'
import PersonManage from './routes/BGManager/personManager'
import TopicManage from './routes/topicManager/topicManager'
import TopicCategoryManager from './routes/topicManager/topicCategoryManager'
import TopicDetail from './routes/topicManager/TopicDetail'
import UserInfoManage from './routes/UserInfo/userInfo'
import ShopCategoryManage from './routes/ShopManager/CategoryQuery'
import ShopTagManage from './routes/ShopManager/TagManager'
import ShopCategoryChoosen from './routes/ShopManager/CategoryChoosen'
import ShopCategorySort from './routes/ShopManager/CategorySort'

import ShopDetailsManager from './routes/ShopManager/ShopDetailsManager'
import ShopListManager from './routes/ShopManager/ShopListManager'
import AppUserListManager from './routes/AppUserManager/AppUserListManager'
import AppUserDetailManager from './routes/AppUserManager/AppUserDetailManager'
import MessagePushIndex from './routes/MessagePush/MessagePushIndex'
import SmsIndex from './routes/Sms/SmsIndex'
import ActionQueryManager from './routes/ActionManager/ActionQueryManager'
import PromoterCommissionManager from './routes/PromoterManager/PromoterCommissionManager'
import AddAgent from './routes/PromoterManager/AddAgent'
import AgentManager from './routes/PromoterManager/AgentManager'
import PromoterDetail from './routes/PromoterManager/PromoterDetail'
import UserFeedbackList from './routes/UserFeedback/UserFeedBackList'
import UserFeedbackDetail from './routes/UserFeedback/UserFeedbackDetail'
import TenantFeeManager from './routes/PromoterManager/TenantFeeManager'
import PromoterStatistics from './routes/Statistics/PromoterStatistics/index'
import ShopConfigManager from './routes/ShopManager/ShopConfigManager'

import Welcome from './routes/welcome'
import err from './routes/error'
export default function ({history, app}) {


  const routes =
    <Route path="/" breadcrumbName='仪表盘' component={App}>
      <IndexRoute component={Welcome}/>
      <Route path="/BGManager/personListManager" breadcrumbName="用户列表管理" component={PersonManage}/>
      <Route path="/BGManager/appUserManager" breadcrumbName="app用户管理">
        <IndexRoute component={AppUserListManager}/>
        <Route path="/BGManager/appUserManager/appUserDetailManager" breadcrumbName="app用户详情" component={AppUserDetailManager}/>
      </Route>
      <Route path="/backgroundStatistics/promoterBalanceStatistics" breadcrumbName="推广员统计" component={PromoterStatistics}/>
      <Route path="/actionManager/actionListManager" breadcrumbName="活动列表管理">
        <IndexRoute component={ActionQueryManager}/>
      </Route>
      <Route path="/adminUserInfoManager" breadcrumbName="个人信息" component={UserInfoManage}/>
      <Route path="/shopManager/shopCategoryManager" breadcrumbName="店铺分类管理" >
        <IndexRoute   component={ShopCategoryManage}/>
        <Route path="/shopManager/shopCategoryManager/ShopTagManager" breadcrumbName="店铺标签管理" component={ShopTagManage}/>
        <Route path="/shopManager/shopCategoryManager/ShopCategoryChoosen" breadcrumbName="精选分类管理" component={ShopCategoryChoosen}/>
        <Route path="/shopManager/shopCategoryManager/ShopCategorySort" breadcrumbName="分类排序" component={ShopCategorySort}/>

      </Route>
      <Route path="/shopManager/shopInfoManager" breadcrumbName="店铺信息管理" >
        <IndexRoute   component={ShopListManager}/>
        <Route path="/shopManager/shopInfoManager/shopDetailsManager" breadcrumbName="店铺详情管理" component={ShopDetailsManager}/>

      </Route>
      <Route path="/shopManager/shopConfigManager" breadcrumbName="店铺参数设置" component={ShopConfigManager}/>

      <Route path="/promoterManager/promoterCommissionManager" breadcrumbName="推广员提成管理" component={PromoterCommissionManager}/>
      <Route path="/promoterManager/promoterAgentSet" breadcrumbName="地区代理设置">
        <IndexRoute component={AddAgent}/>
        <Route path="/promoterManager/promoterAgentSet/agentManager" breadcrumbName="代理管理" component={AgentManager}/>
        <Route path="/promoterManager/promoterAgentSet/promoterDetail" breadcrumbName="推广用户详情" component={PromoterDetail}/>

      </Route>
      <Route path="/promoterManager/tenantFeeManager" breadcrumbName="入驻费管理" component={TenantFeeManager}/>
      <Route path="/topicManager/contentManager" breadcrumbName="内容管理" component={TopicManage}/>
      <Route path="/topicManager/topicDetail" breadcrumbName="话题详情" component={TopicDetail}/>
      <Route path="/topicManager/topicCategoryManager" breadcrumbName="分类管理" component={TopicCategoryManager}/>
      <Route path="/userFeedback" breadcrumbName="反馈信息列表" >
        <IndexRoute component={UserFeedbackList}/>
        <Route path="/userFeedback/userFeedbackDetail" breadcrumbName="反馈详情" component={UserFeedbackDetail}/>
      </Route>
      <Route path="/messagePushManager/messagePushIndex" breadcrumbName="消息推送" component={MessagePushIndex}/>
      <Route path="/smsManager/smsIndex" breadcrumbName="发短信" component={SmsIndex}/>
      <Route path="*" component={err}/>
    </Route>

  return <Router history={history} routes={routes}/>
}
