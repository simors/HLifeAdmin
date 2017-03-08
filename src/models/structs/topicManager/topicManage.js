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
      topicInfo.picked = result.picked
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
      topicCategoryInfo.id = result.id
      topicCategoryInfo.picked = result.isPicked
      topicCategoryInfo.enabled = result.enabled
      topicCategoryInfo.createdAt = result.createdAt
      topicCategoryInfo.introduction = result.introduction
      topicCategoryInfo.image = result.image
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
