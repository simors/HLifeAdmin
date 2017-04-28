/**
 * Created by lilu on 2017/4/22.
 */
import AV from 'leancloud-storage'
export async function getPromoterStatistics(payload){
  let statistics = await AV.Cloud.run('statPromoterPerformance',payload.date)
}

export async function fetchDaliyPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchDailyPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchLastDaysPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchLastDaysPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchMonthPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchMonthPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchLastMonthsPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchLastMonthsPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchAreaMonthPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchAreaMonthPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchArealastMonthsPerformance(payload) {
  try{
    let data = await AV.Cloud.run('statFetchAreaLastMonthsPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}


