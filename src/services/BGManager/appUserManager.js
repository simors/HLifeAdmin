/**
 * Created by lilu on 2017/3/16.
 */
import AV from 'leancloud-storage'


export async function  getAppUserList(payload){
  try{
     console.log('ggogogogogo',payload)

    let appUserList = await AV.Cloud.run('getAppUserList',payload)
    console.log('appUserList',appUserList)

    return {success:true,appUserList:appUserList}
  }catch(err){
    return {succes:false}
  }
}
export async function getPromoterInfoByUserId(payload){
  try{
    let promoterDetail=await AV.Cloud.run('promoterFetchByUser',payload)
    // console.log('promoterDetail',promoterDetail,payload)
    return{success:true,promoterDetail:promoterDetail}
  }catch (err){
    return{success:false}
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

export async function getUserDetailById(payload){
  try{
    let userDetail = await AV.Cloud.run('getUserDetailById',payload)
     console.log('ggogogogogo',userDetail)

    return {userDetail:userDetail,success:true}
  }catch (err){
    return {success:false}
  }
}

export async function getShopByUserId(payload){
  try{
    // console.log('ggogogogogo',payload)

    let shopDetail=await AV.Cloud.run('getShopByUserId',payload)
    // console.log('ggogogogogo==============+>',shopDetail)

    return {shopDetail:shopDetail,success:true}
  }catch (err){
    return {success:false}
  }
}

export async function user2promoter(payload){
  try{
     // console.log('payload',payload.identityArea[1])
    let promoter={
      province:payload.identityArea[1],
      city:payload.identityArea[2],
      district:payload.identityArea[3],
      liveProvince:payload.liveArea[1],
      liveCity:payload.liveArea[2],
      liveDistrict:payload.liveArea[3],
      cardId:payload.cardId,
      name:payload.name,
      phone:payload.phone,
      userId:payload.userId,
      identity:payload.identity
    }
  await AV.Cloud.run('promoterDirectSetPromoter',promoter)

    // console.log('gogogogogogogoog',promoter)

    return {success:true}
  }catch (err){
    return {success:false,message:err.message}
  }
}

export async function addVirtualAppUser(payload){
  try{
    await AV.Cloud.run('addVirtualUserByAdmin',payload)
    return {success:true}
  }catch (err){
    return {success:false,error:err}
  }
}