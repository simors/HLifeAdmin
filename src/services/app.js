import { request } from '../utils'
import AV from 'leancloud-storage'
import {MenuList} from '../models/structs/app'
export function getPivilege (params){

}



export async function login (params) {
  return AV.Cloud.run('getPermissionListOnlyByLogin',params).then((results)=>{
    //let permissionList = List(results)
    console.log(results)
    if(results) {
      let menuList = MenuList.fromLeancloudObject(results)
      return menuList
    }
  })
}

export async function logout (params) {
  return request('/api/logout', {
    method: 'post',
    data: params
  })
}

export async function userInfo (params) {
  return request('/api/userInfo', {
    method: 'get',
    data: params
  })
}
