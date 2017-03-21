/**
 * Created by zachary on 2017/3/21.
 */

export function selectSubAreaList(state, areaCode) {
  if(state.messagePushManager.subAreaMap && state.messagePushManager.subAreaMap[areaCode]) {
    return state.messagePushManager.subAreaMap[areaCode]
  }
  return []
}

export function selectPushTargetDistrictTreeDatas(state) {
  return state.messagePushManager.pushTargetDistrictTreeDatas || []
}
