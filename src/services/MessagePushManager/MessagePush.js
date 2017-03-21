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
