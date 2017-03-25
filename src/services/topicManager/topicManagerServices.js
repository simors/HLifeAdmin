/**
 * Created by wuxingyu on 2017/2/25.
 */
import AV from 'leancloud-storage'
import {topicList, topicCategoryList} from '../../models/structs/topicManager/topicManage'

export async function getTopicList(payload) {
  try {
    let topicInfo = await AV.Cloud.run('getAdminTopicList', payload)
    console.log('topicInfo',topicInfo)
    let topicListIM = topicList.fromLeancloudObject(topicInfo)
    return {success:true, data: topicListIM}
  }catch (err){
    return {success:false}
  }
}

export async function getTopicCategoryList(payload) {
  try {
    let topicInfo = await AV.Cloud.run('getAdminTopicCategoryList', payload)
    let topicListIM = topicCategoryList.fromLeancloudObject(topicInfo)
    return {success:true, data: topicListIM}
  }catch (err){
    return {success:false}
  }
}


export async function updateTopicPicked(payload) {
  try{
    await AV.Cloud.run('updateTopicPicked',payload)
    return {success:true}
  }catch (err){
    return {success: false}
  }
}

export async function updateTopicCategoryPicked(payload) {
  try{
    await AV.Cloud.run('updateTopicCategoryPicked',payload)
    return {success:true}
  }catch (err){
    return {success: false}
  }
}

export async function createNewTopicCategory(payload) {
  try{
    await AV.Cloud.run('createNewTopicCategory',payload)
    return {success:true}
  }catch(err){
    return{success: false}
  }

}
