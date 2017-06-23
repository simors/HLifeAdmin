import { request } from '../utils'
import AV from 'leancloud-storage'
import {MenuList,getMenuList} from '../models/structs/app'
import {message} from 'antd'
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
    // console.log('params',params)
    console.log('results',results)


    let menuList = getMenuList.fromLeancloudObject(results.permissionList)
    // console.log('menuList',menuList)

    let storage = window.sessionStorage
    storage.setItem('username',params.username)
    storage.setItem('password',params.password)
    // console.log('storage',storage)
    return {success:true,menuList:menuList,permissionList:results.permissionList,userInfo:results.userInfo}
  }catch (err){
    err.message='用户名或密码错误'
    //throw err
    return {success:false}
  }
}

export async function logout (params) {
  // return request('/api/logout', {
  //   method: 'post',
  //   data: params
  // })
  let storage = window.localStorage
  storage.removeItem('username')
  storage.removeItem('password')
  return {success:true}
}


export async function userInfo (params) {
  // return request('/api/userInfo', {
  //   method: 'get',
  //   data: params
  // })
  // let storage = window.localStorage
  // let payload = {
  //   username: storage.getItem('username'),
  //   password: storage.getItem('password')
  // }
  try{
    let results = await AV.Cloud.run('getPermissionListOnlyByLogin',payload)
    let menuList = getMenuList.fromLeancloudObject(results)
    return {success:true,menuList:menuList,username:storage.getItem('username'),password:storage.getItem('password')}
  }catch (err){
    err.message='用户名或密码错误'
    //throw err
    return {success:false}  }
}


export async function updatePassword(params) {
  // console.log('params',params)
  try{
    let result = await AV.Cloud.run('updateMyPassword',params)

    return {success:true,username:result.username,password: result.password,phone:result.phone}
  }catch(err){
    err.message='密码错误'
    throw err
    //return {success:false}
  }
}
