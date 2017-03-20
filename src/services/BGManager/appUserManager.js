/**
 * Created by lilu on 2017/3/16.
 */
import AV from 'leancloud-storage'


export async function  getAppUserList(payload){
  try{
    // console.log('ggogogogogo',payload)

    let appUserList = await AV.Cloud.run('getAppUserList',payload)
    return {success:true,appUserList:appUserList}
  }catch(err){
    return {succes:false}
  }
}

export async function updateAppUserEnable(payload){
  try{
    await AV.Cloud.run('updateAppUserEnable',payload)
    // console.log('ggogogogogo',payload)

    return {success:true}
  }catch (err){
    return {success:false}
  }
}