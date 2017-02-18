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

export const articleManagerConfig = Record({
  key: 'articleManager',
  name: '文章管理',
  icon: '',
  child: List()
}, 'articleManagerConfig')
export const doctorManagerConfig = Record({
  key: 'doctorManager',
  name: '医生管理',
  icon: '',
  child: List()
}, 'doctorManagerConfig')
export const shopManagerConfig = Record({
  key: 'shopManager',
  name: '店铺管理',
  icon: '',
  child: List()
}, 'shopManagerConfig')
export const BKManagerConfig = Record({
  key: 'BKManager',
  name: '后台管理',
  icon: '',
  child: List()
}, 'BKManagerConfig')
export const topicManagerConfig = Record({
  key: 'topicManager',
  name: '话题管理',
  icon: '',
  child: List()
}, 'topicManagerConfig')
export const actionManagerConfig = Record({
  key: 'actionManager',
  name: '活动管理',
  icon: '',
  child: List()
}, 'actionManagerConfig')
// export const MenuListConfig = List([
//   articleManager(),
//   doctorManager(),
//   shopManager(),
//   BKManager(),
//   topicManager(),
// ])
export class MenuList  {
  static fromLeancloudObject(results) {
    // console.log('results===>',results)
    let articleManager = new articleManagerConfig()
    let doctorManager = new doctorManagerConfig()
    let shopManager = new shopManagerConfig()
    let BKManager = new BKManagerConfig()
    let topicManager = new topicManagerConfig()
    let actionManager = new actionManagerConfig()
    let actionList = []
    let articleList=[]
    let doctorList = []
    let shopList = []
    let BKList = []
    let topicList = []
   // let menuList = new MenuListConfig()
    results.forEach((result)=> {
    //  console.log('result',result)

      let menuRecord = Record(result)
      let menu = new menuRecord
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
    // console.log('BKManager',BKList)
    // console.log('topicManager',topicList)
    let articleSubMenu=articleManager.withMutations((record)=>{
      record.set('child',List(articleList))
    })
    let doctorSubMenu=doctorManager.withMutations((record)=>{
      record.set('child',List(doctorList))
    })
    let shopSubMenu=shopManager.withMutations((record)=>{
      record.set('child',List(shopList))
    })
    let BKSubMenu=BKManager.withMutations((record)=>{
      record.set('child',List(BKList))
    })
    let topicSubMenu=topicManager.withMutations((record)=>{
      record.set('child',List(topicList))
    })
    let actionSubMenu=actionManager.withMutations((record)=>{
      record.set('child',List(actionList))
    })

    let welcome = new welcomeConfig()
    let menuList=[]
    // menuList.push(welcome)
    if(actionSubMenu.child.size>0){
      menuList.push(actionSubMenu)
    }
    if(articleSubMenu.child.size>0){
      menuList.push(articleSubMenu)
    }
    if(doctorSubMenu.child.size>0){
      menuList.push(doctorSubMenu)
    }
    if(shopSubMenu.child.size>0){
      menuList.push(shopSubMenu)
    }
    if(BKSubMenu.child.size>0){
      menuList.push(BKSubMenu)
    }
    if(topicSubMenu.child.size>0){
      menuList.push(topicSubMenu)
    }
    return List(menuList)
  }
}

