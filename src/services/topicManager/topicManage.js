/**
 * Created by wuxingyu on 2017/2/25.
 */
import AV from 'leancloud-storage'
import {topicList, topicCategoryList} from '../../models/structs/topicManager/topicManage'

export async function getTopicList(payload) {
  try {
    let topicInfo = await AV.Cloud.run('getAdminTopicList', payload)
    let topicListIM = topicList.fromLeancloudObject(topicInfo)
    //console.log('personList',personListIM)
    return {success:true, data: topicListIM}
  }catch (err){
    return {success:false}
  }
}

export async function getTopicCategoryList(payload) {
  try {
    let topicInfo = await AV.Cloud.run('getAdminTopicCategoryList', payload)
    let topicListIM = topicCategoryList.fromLeancloudObject(topicInfo)
    //console.log('personList',personListIM)
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
