/**
 * Created by lilu on 2017/3/9.
 */

import AV from 'leancloud-storage'

export async function getShopList(payload){
  console.log('payload',payload)
  try {
    let shopList = await AV.Cloud.run('getShopList',payload)
     console.log('shopList',shopList)
    return {success: true, shopList: shopList}
  } catch (err) {
    return {success: false}
  }
}

// export async function openShop(payload){
//   try{
//     await AV.Cloud.run('openShop',payload)
//     return {success:true}
//   }catch(err){
//     return {success: false}
//   }
// }
//
// export async function closeShop(payload){
//   try{
//     await AV.Cloud.run('closeShop',payload)
//     return {success:true}
//   }catch(err){
//     return {success: false}
//   }
// }
export async function updateShopStatus(payload){
  try{
    console.log('asdasd',payload)
    await AV.Cloud.run('updateShopStatus',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}

export async function updateCommentStatus(payload){
  try{
     console.log('asdasd',payload)
    await AV.Cloud.run('updateCommentStatus',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}
export async function updateReplyStatus(payload){
  try{
    console.log('asdasd',payload)
    await AV.Cloud.run('updateReplyStatus',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}

export async function getShopCommentList(payload){
  // console.log('hahaha',payload)
  try{
    let commentList=await AV.Cloud.run('AdminShopCommentList',payload)
     // console.log('commentList',commentList)

    return {success:true,commentList:commentList}
  }catch(err){
    return {success: false}
  }
}

export async function getAnnouncementsByShopId(payload){
  // console.log('hahaha',payload)
  try{
    let announcements=await AV.Cloud.run('getAnnouncementsByShopId',payload)
    // console.log('announcements',announcements)

    return {success:true,announcements:announcements}
  }catch(err){
    return {success: false}
  }
}

export async function enableShopComment(payload){
  console.log('hahaha',payload)

  try{
    await AV.Cloud.run('enableShopComment',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}

export async function disableShopComment(payload){
  console.log('hahaha',payload)

  try{
    await AV.Cloud.run('disableShopComment',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}