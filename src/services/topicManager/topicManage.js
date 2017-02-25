/**
 * Created by wuxingyu on 2017/2/25.
 */
import AV from 'leancloud-storage'
import {topicList} from '../../models/structs/topicManager/topicManage'

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
