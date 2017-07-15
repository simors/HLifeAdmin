/**
 * Created by lilu on 2017/2/20.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import {Record, List, Map} from 'immutable'

const personInfoConfig = {
   id:undefined,
  username: undefined,
  password: undefined,
  roleList: []
}

export class personList {
  static fromLeancloudObject(results) {
    //console.log('result===>',results)
    let personList = []
    results.forEach((result)=> {
      let personInfo = {}
      let roleList = []
     // let count = 1
      result.roleList.forEach((role)=> {
        roleList.push(role)
      })
      personInfo.key = result.id
      personInfo.username = result.username
      personInfo.password = result.password
      personInfo.phone = result.phone

      personInfo.roleList = result.roleList

     // count++
      personList.push(personInfo)
    })
    // console.log('personList',personList)
    return personList
  }
}

const Role = Record({
  name:undefined,
  id:undefined
})

export class roleList{
  static fromLeancloudObject(results){
    let roleList = []
    results.forEach((result)=>{
    //  console.log('result',result)

      let role = {
        value: result.roleName
      }

      roleList.push(result.roleName)
    })
    // console.log('roleList',roleList)
    return roleList
  }
}


export const personManageConfig = Record({
  personList: List(),
}, 'personManageConfig')

export const backgroundManageConfig = Record({
  personManage: personManageConfig()
}, 'backgroundManageConfig')

export class AppUserItem {
  static fromLeancloudApi(result){
    let authData = result.authData
    let weixin = authData?authData.weixin:undefined
    let appUser = {
      id: result.id,
      identity: result.identity,
      isVirtual: result.isVirtual,
      status: result.status,
      geoCity: result.geoCity,
      nickname: result.nickname,
      username: result.username,
      birthday: result.birthday,
      type: result.type,
      emailVerified: result.emailVerified,
      mobilePhoneNumber: result.mobilePhoneNumber,
      avatar: result.avatar,
      geoDistrict: result.geoDistrict,
      gender: result.gender,
      // authData: result.authData,
      openId: weixin?weixin.openId:undefined,
      access_token: weixin?weixin.access_token:undefined,
      expires_at: weixin?weixin.expires_at:undefined,
      MobilePhoneVerified: result.mobilePhoneVerified,
      // detailId:result.attributes.detail.id,
      geoProvince: result.geoProvince,
      createdAt: result.createdAt
    }
    return appUser

  }
}