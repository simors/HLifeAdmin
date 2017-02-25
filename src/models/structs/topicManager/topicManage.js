/**
 * Created by lilu on 2017/2/20.
 */
/**
 * Created by wuxingyu on 2017/2/25.
 */
import {Record, List, Map} from 'immutable'

export class topicList {
  static fromLeancloudObject(results) {
    let topicList = []
    results.forEach((result)=> {
      let topicInfo = {}
      topicInfo.key = result.id
      topicInfo.title = result.title
      topicInfo.content = result.content
      topicInfo.username = result.username
      topicInfo.category = result.category
      topicInfo.likeCount = result.likeCount
      topicInfo.commentNum = result.commentNum
      topicInfo.createdAt = result.createdAt
     // count++
      topicList.push(topicInfo)
    })
    console.log('topicList ==>',topicList)
    return topicList
  }
}

export const topicManageConfig = Record({
  topicList: List(),
}, 'personManageConfig')

export const topicAllManageConfig = Record({
  topicManage: topicManageConfig()
}, 'topicAllManageConfig')
