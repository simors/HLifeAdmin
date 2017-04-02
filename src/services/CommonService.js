/**
 * Created by zachary on 2017/3/28.
 */
import AV from 'leancloud-storage'

export async function fetchSubAreaList(payload) {
  let defaultPayload = {
    level: "3",
    areaCode: '0-1'
  }
  Object.assign(defaultPayload, payload)
  if(defaultPayload.areaCode.indexOf('-') > -1) {
    defaultPayload.areaType = defaultPayload.areaCode.split('-')[0]
    defaultPayload.areaCode = defaultPayload.areaCode.split('-')[1]
  }
  // console.log('fetchSubAreaList.defaultPayload====>>>>', defaultPayload)
  let results = await AV.Cloud.run('hLifeGetSubAreaList2', defaultPayload)
  // console.log('fetchSubAreaList.results====>>>>', results)
  return results
}