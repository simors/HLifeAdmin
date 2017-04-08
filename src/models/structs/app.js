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

export const userFeedbackConfig = {
  key: 'userFeedback',
  name: '用户反馈',
  icon: '',
  // child: [
  //   {key:'userFeedback',name:'用户反馈'}
  // ]
}

export const messagePushConfig = {
  key: 'messagePushManager',
  name: '消息推送管理',
  icon: '',
  child: [
    {key:'messagePushIndex',name:'消息推送'}
  ]
}

export const smsConfig = {
  key: 'smsManager',
  name: '短信服务管理',
  icon: '',
  child: [
    {key:'smsIndex',name:'发短信'}
  ]
}

export const actionManagerConfig = {
  key: 'actionManager',
  name: '活动管理',
  icon: '',
  child: [
    {key:'actionListManager',name:'活动列表管理'}
  ]
}
export const topicManagerConfig = {
  key: 'topicManager',
  name: '话题管理' ,
  icon: '',
  child: [
    {key:'contentManager',name:'内容管理'},
    {key:'topicCategoryManager',name:'分类管理'}
  ]
}
export const BGManagerConfig = {
  key: 'BGManager',
  name: '用户管理',
  icon: '',
  child: [
    {key:'personListManager',name:'后台用户管理'},
    {key:'appUserManager',name:'app用户管理' }

  ]
}
export const backgroundStatisticsConfig = {
  key: 'backgroundStatistics',
  name: '后台统计',
  icon: '',
  child: [
    {key:'companyStatistics',name:'公司统计'},
    {key:'promoterBalanceStatistics',name:'推广员统计'}

  ]
}
export const promoterManagerConfig = {
  key: 'promoterManager',
  name: '推广员管理',
  icon: '',
  child:[
    {key:'promoterGroupManager',name:'推广小组管理'},
    {key:'promoterCommissionManager',name:'推广员提成管理'},
    {key:'promoterAgentSet',name:'地区代理设置'},
    {key:'tenantFeeManager',name:'入驻费管理'}

  ]
}
export const shopManagerConfig = {
  key: 'shopManager',
  name: '店铺管理',
  icon: '',
  child: [
    {key:'shopInfoManager',name:'店铺信息管理'},{key:'shopCategoryManager',name:'店铺分类管理'}
  ]
}

export const adminUserInfo = {
  key:'adminUserInfoManager',
  name:'个人信息',
  icon:''
}

export const subMenuList = [shopManagerConfig,promoterManagerConfig,backgroundStatisticsConfig,BGManagerConfig,topicManagerConfig,actionManagerConfig,messagePushConfig,smsConfig, userFeedbackConfig]

export class getMenuList{
  static fromLeancloudObject(results){
    let menuList=[]
    subMenuList.forEach((record)=>{
      if(record.child&&record.child.length>0){
        let menus=[]
        let keys=[]
        results.forEach((result)=>{

          if(result.subPermission == record.name){
            //  console.log('result===>',result)
            // console.log('record====>',record)

            if(result.key )
              keys.push(result.key)
          }
        })
        if(keys.length>0) {
          // console.log('menus===>',menus)
          let set = new Set(keys)
          keys = [...set]
          keys.forEach((key)=>{
            record.child.forEach((child)=>{
              if(key==child.key){
                menus.push(child)
              }
            })
          })
          // console.log('menus===>',menus)
          record.child = menus
          //  console.log('record===>',record)

          menuList.push(record)
        }
      }else{
        results.forEach((result)=>{
          if(result.subPermission==record.name){
            menuList.push(record)
          }
        })
      }

    })
   // console.log('menuList',menuList)
    menuList.push(adminUserInfo)
    return menuList
  }
}

// export const MenuListConfig = List([
//   articleManager(),
//   doctorManager(),
//   shopManager(),
//   BGManager(),
//   topicManager(),
// // ])
// export class MenuList  {
//   static fromLeancloudObject(results) {
//     // console.log('results===>',results)
//     let articleManager =  articleManagerConfig
//     let doctorManager = doctorManagerConfig
//     let shopManager = shopManagerConfig
//     let BKManager =  BGManagerConfig
//     let topicManager =  topicManagerConfig
//     let actionManager =  actionManagerConfig
//     let actionList = []
//     let articleList=[]
//     let doctorList = []
//     let shopList = []
//     let BKList = []
//     let topicList = []
//    // let menuList = new MenuListConfig()
//     results.forEach((result)=> {
//       // console.log('result',result)
//
//       let menu = result
//
//       // console.log('menuSUBPERmission',menu.subPermission)
//
//       switch (menu.subPermission) {
//         case '文章管理':
//           articleList.push(menu)
//           break
//         case '医生管理':
//           doctorList.push(menu)
//           break
//         case '店铺管理':
//           shopList.push(menu)
//           break
//         case '后台管理':
//           BKList.push(menu)
//           break
//         case '话题管理':
//           topicList.push(menu)
//           break
//         case '活动管理':
//           actionList.push(menu)
//           break
//       }
//
//     })
//     // console.log('articleManager',articleList)
//     // console.log('doctorManager',doctorList)
//     // console.log('shopManager',shopList)
//    //  console.log('BGManager',BKList)
//     // console.log('topicManager',topicList)
//     articleManager.child = articleList
//     doctorManager.child = doctorList
//     shopManager.child = shopList
//     BKManager.child = BKList
//     topicManager.child = topicList
//     actionManager.child = actionList
//     // console.log('topicManager',BKManager)
//     let welcome = new welcomeConfig()
//     let menuList=[]
//     // menuList.push(welcome)
//     if(articleManager.child.length>0){
//       menuList.push(articleManager)
//     }
//     if(doctorManager.child.length>0){
//       menuList.push(doctorManager)
//     }
//     if(actionManager.child.length>0){
//       menuList.push(actionManager)
//     }
//     if(shopManager.child.length>0){
//       menuList.push(shopManager)
//     }
//     if(BKManager.child.length>0){
//       menuList.push(BKManager)
//     }
//     if(topicManager.child.size>0){
//       menuList.push(topicManager)
//     }
//     return menuList
//   }
// }

