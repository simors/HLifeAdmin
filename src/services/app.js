import { request } from '../utils'
import AV from 'leancloud-storage'
import {MenuList} from '../models/structs/app'
export function getPivilege (params){

}



export async function login (params) {
  // return AV.Cloud.run('getPermissionListOnlyByLogin',params).then((results)=>{
  //   //let permissionList = List(results)
  //   console.log(results)
  //
  //     let menuList = MenuList.fromLeancloudObject(results)
  //     return menuList
  //
  //
  // },(err)=>{
  //   err.message='用户名或密码错误'
  //   throw err
  //   return []
  // })
  try{
    let results = await AV.Cloud.run('getPermissionListOnlyByLogin',params)
      let menuList = MenuList.fromLeancloudObject(results)
    return {success:true,menuList:menuList}
  }catch (err){
    err.message='用户名或密码错误'
    //throw err
    return {success:false}
  }
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
