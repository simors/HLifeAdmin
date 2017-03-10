/**
 * Created by lilu on 2017/3/9.
 */

import AV from 'leancloud-storage'

export async function getShopList(payload){
  try {
    let shopList = await AV.Cloud.run('getShopList',payload)
    // console.log(shopList)
    return {success: true, shopList: shopList}
  } catch (err) {
    return {success: false}
  }
}

export async function openShop(payload){
  try{
    await AV.Cloud.run('openShop',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}

export async function closeShop(payload){
  try{
    await AV.Cloud.run('closeShop',payload)
    return {success:true}
  }catch(err){
    return {success: false}
  }
}