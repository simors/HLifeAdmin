/**
 * Created by lilu on 2017/2/17.
 */
import {Record, List, Map} from 'immutable'

export const welcomeConfig = Record({
  key: 'welcome',
  name: '首页',
  icon: '',
  // child: List()
}, 'welcomeConfig')

export const articleManagerConfig = {
  key: 'articleManager',
  name: '文章管理',
  icon: '',
  child: []
}
export const doctorManagerConfig = {
  key: 'doctorManager',
  name: '医生管理',
  icon: '',
  child: []
}
export const shopManagerConfig = {
  key: 'shopManager',
  name: '店铺管理',
  icon: '',
  child: []
}
export const BGManagerConfig = {
  key: 'BGManager',
  name: '后台管理',
  icon: '',
  child: []
}
export const topicManagerConfig = {
  key: 'topicManager',
  name: '话题管理',
  icon: '',
  child: []
}
export const actionManagerConfig = {
  key: 'actionManager',
  name: '活动管理',
  icon: '',
  child:[]
}
// export const MenuListConfig = List([
//   articleManager(),
//   doctorManager(),
//   shopManager(),
//   BGManager(),
//   topicManager(),
// ])
export class MenuList  {
  static fromLeancloudObject(results) {
    // console.log('results===>',results)
    let articleManager =  articleManagerConfig
    let doctorManager =  doctorManagerConfig
    let shopManager = shopManagerConfig
    let BKManager =  BGManagerConfig
    let topicManager =  topicManagerConfig
    let actionManager =  actionManagerConfig
    let actionList = []
    let articleList=[]
    let doctorList = []
    let shopList = []
    let BKList = []
    let topicList = []
   // let menuList = new MenuListConfig()
    results.forEach((result)=> {
      // console.log('result',result)

      let menu = result

      // console.log('menuSUBPERmission',menu.subPermission)

      switch (menu.subPermission) {
        case '文章管理':
          articleList.push(menu)
          break
        case '医生管理':
          doctorList.push(menu)
          break
        case '店铺管理':
          shopList.push(menu)
          break
        case '后台管理':
          BKList.push(menu)
          break
        case '话题管理':
          topicList.push(menu)
          break
        case '活动管理':
          actionList.push(menu)
          break
      }

    })
    // console.log('articleManager',articleList)
    // console.log('doctorManager',doctorList)
    // console.log('shopManager',shopList)
   //  console.log('BGManager',BKList)
    // console.log('topicManager',topicList)
    articleManager.child = articleList
    doctorManager.child = doctorList
    shopManager.child = shopList
    BKManager.child = BKList
    topicManager.child = topicList
    actionManager.child = actionList
    // console.log('topicManager',BKManager)
    let welcome = new welcomeConfig()
    let menuList=[]
    // menuList.push(welcome)
    if(articleManager.child.length>0){
      menuList.push(articleManager)
    }
    if(doctorManager.child.length>0){
      menuList.push(doctorManager)
    }
    if(actionManager.child.length>0){
      menuList.push(actionManager)
    }
    if(shopManager.child.length>0){
      menuList.push(shopManager)
    }
    if(BKManager.child.length>0){
      menuList.push(BKManager)
    }
    if(topicManager.child.size>0){
      menuList.push(topicManager)
    }
    return menuList
  }
}

