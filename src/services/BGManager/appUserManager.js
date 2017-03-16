/**
 * Created by lilu on 2017/3/16.
 */
import AV from 'leancloud-storage'


export async function  getAppUserList(payload){
  try{
    let appUserList = await AV.Cloud.run('getAppUserList',payload)
    return {success:true,appUserList:appUserList}
  }catch(err){
    return {succes:false}
  }
}

export async function updateAppUserEnable(payload){
  try{
    console.log('ggogogogogo',payload)
    await AV.Cloud.run('updateAppUserEnable',payload)
    return {success:true}
  }catch (err){
    return {success:false}
  }
}