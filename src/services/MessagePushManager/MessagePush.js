/**
 * Created by zachary on 2017/3/21.
 */
import AV from 'leancloud-storage'
import * as BaiduMap from '../../components/common/baiduMap'

export async function fetchSubAreaList(payload) {
  // console.log('services-------fetchSubAreaList.payload=====', payload)
  let areaCode = payload.areaCode
  let cityList = await BaiduMap.getSubAreaList(areaCode)
  return cityList || []
}

export async function push(payload) {
  if(payload) {
    if(payload.pushFileList && payload.pushFileList.length) {
      let localCoverFile = payload.pushFileList[0].originFileObj
      let name = 'pushCoverImage.png'
      let file = new AV.File(name, localCoverFile)
      let leanFileObj = await file.save()
      // console.log('leanFileObj====', leanFileObj)
      payload.message_cover_url = leanFileObj.attributes.url
    }
  }

  // console.log('hLifePush====', payload)
  let result = await AV.Cloud.run('hLifePush', payload)
  if(result && result.code == 1) {
    return true
  }
  return false
}
