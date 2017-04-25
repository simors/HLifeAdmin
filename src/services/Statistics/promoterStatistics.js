/**
 * Created by lilu on 2017/4/22.
 */
import AV from 'leancloud-storage'
export async function getPromoterStatistics(payload){
  let statistics = await AV.Cloud.run('statPromoterPerformance',payload.date)
}

export async function fetchDaliyPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchDaliyPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchLastDaysPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchLastDaysPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchMonthPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchMonthPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchLastMonthsPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchLastMonthsPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchAreaMonthPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchAreaMonthPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}
export async function fetchArealastMonthsPerformance(payload) {
  try{
    let data = await AV.Cloud.run('fetchArealastMonthsPerformance',payload)
    return {success:true,data:data}

  }catch (err){
    return{success:false}
  }
}