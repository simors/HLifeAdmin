import React, {PropTypes} from 'react'
import {Breadcrumb, Icon} from 'antd'
import {Router, Route, IndexRoute, hashHistory,Link} from 'dva/router'
import App from '../../routes/app'
import PersonManage from '../../routes/BGManager/personManager'
import TopicManage from '../../routes/topicManager/topicManager'
import UserInfoManage from '../../routes/UserInfo/userInfo'
import Welcome from '../../routes/welcome'
import err from '../../routes/error'

import styles from './main.less'
//import {routes} from '../../router'
// const routes =[
//   {path:'/',component:App,indexRoute:{component:Welcome},breadcrumbName:'HOME',name:'HOME',childRoutes:[
//     {path:'/BGManager/personManager',breadcrumbName:'用户信息',name:'/BGManager/personManager',component:PersonManage},
//     {path:'/adminUserInfoManager',breadcrumbName:'个人信息',name:'/adminUserInfoManager',component:UserInfoManage},
//     {path:'/topicManager/topicManager',breadcrumbName:'话题管理',name:'/topicManager/topicManager',component:TopicManage},
//     {path:'/*',component:err},
//   ]}]
//


let pathSet = []
const getPathSet = function (menuArray, parentPath) {
  parentPath = parentPath || '/'
  menuArray.map(item => {
    pathSet[(parentPath + item.key).replace(/\//g, '-').hyphenToHump()] = {
      path: parentPath + item.key,
      name: item.name,
      icon: item.icon || '',
      clickable: item.clickable === undefined
    }
    if (item.child) {
      getPathSet(item.child, parentPath + item.key + '/')
    }
  })
}

function Bread({params,routes, location, menuList}) {
  if (menuList)
    getPathSet(menuList)
  // console.log(pathSet)

  let pathNames = []
  location.pathname.substr(1).split('/').map((item, key) => {
    if (key > 0) {
      pathNames.push((pathNames[key - 1] + '-' + item).hyphenToHump())
    } else {
      pathNames.push(('-' + item).hyphenToHump())
    }
  })
  function itemRender(route, params, routes, paths) {
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  // const breads = pathNames.map((item, key) => {
  //   if (!(item in pathSet)) {
  //     //item = {icon:'',key:'welcome',name:'welcome'}
  //     //console.log('here is code hahahahaaha',item,key)
  //     return (
  //       <Breadcrumb.Item key={key} href={ '#' + 'welcome' }>
  //         <span>{'welcome'}</span>
  //       </Breadcrumb.Item>
  //     )
  //   }
  //   return (
  //     <Breadcrumb.Item
  //       key={key} {...((pathNames.length - 1 === key) || !pathSet[item].clickable) ? '' : {href: '#' + pathSet[item].path}}>
  //       {pathSet[item].icon
  //         ? <Icon type={pathSet[item].icon}/>
  //         : ''}
  //       <span>{pathSet[item].name}</span>
  //     </Breadcrumb.Item>
  //   )
  // })

  return (
    <div className={styles.bread}>
      <Breadcrumb routes={routes} params={params} itemRender={itemRender}>
        {/*<Breadcrumb.Item href='#/'><Icon type='home' />*/}
        {/*<span>主页</span>*/}
        {/*</Breadcrumb.Item>*/}
        {/*{breads}*/}
      </Breadcrumb>
    </div>
  )
}

Bread.propTypes = {
  location: PropTypes.object
}

export default Bread
