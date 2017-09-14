/**
 * Created by lilu on 2017/9/14.
 */

import AV from 'leancloud-storage'


export async function getPromotionDayPay(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('getShopPromotionDayPay')
    // console.log('goodsList=====>',goodsList)

    return {success:true,dayPay:item.message}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}

export async function getPromotionMaxNum(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('hLifeGetShopPromotionMaxNum')
    console.log('item=====>',item)

    return {success:true,maxNum:item.message}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}

export async function setPromotionDayPay(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('setPromotionDayPay',payload)
    console.log('item=====>',item)

    return {success:true,item:item}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}

export async function setPromotionMaxNum(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('setPromotionMaxNum',payload)
    console.log('item=====>',item)

    return {success:true,item:item}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}

export async function setShopConfig(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('setShopConfig',payload)
    console.log('item=====>',item)

    return {success:true,item:item}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}

export async function getShopConfig(payload){
  // console.log('hahaha==========>',payload)
  try{
    let item=await AV.Cloud.run('getShopConfig')
    // console.log('goodsList=====>',goodsList)

    return {success:true,dayPay:item.dayPay,maxNum: item.maxNum}
  }catch(err){
    // console.log('goodsList=====>',err.message)
    return {success: false}
  }
}