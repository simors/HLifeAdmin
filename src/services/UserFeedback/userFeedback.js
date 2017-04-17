/**
 * Created by lilu on 2017/4/8.
 */
import AV from 'leancloud-storage'

export async function getAdviseList(payload){
  try{
    let adviseList= await AV.Cloud.run('getAdviseList',payload)
    return{success:true,adviseList:adviseList}
  }catch (err){
    return {success:false}
  }
}

export async function readAdviseDetail(payload){
  try{
     await AV.Cloud.run('readAdvise',payload)
    return{success:true}
  }catch (err){
    return {success:false}
  }
}