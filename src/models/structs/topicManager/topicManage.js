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
      if(result.picked)
        topicInfo.picked = "true"
      else
        topicInfo.picked = "false"
     // count++
      topicList.push(topicInfo)
    })
    return topicList
  }
}

export class topicCategoryList {
  static fromLeancloudObject(results) {
    let topicCategoryList = []
    results.forEach((result)=> {
      let topicCategoryInfo = {}
      topicCategoryInfo.title = result.title
      topicCategoryList.push(topicCategoryInfo)
    })
    return topicCategoryList
  }
}

export const topicManageConfig = Record({
  topicList: List(),
  topicCategoryList: List(),
}, 'topicManageConfig')

export const topicAllManageConfig = Record({
  topicManage: topicManageConfig()
}, 'topicAllManageConfig')
