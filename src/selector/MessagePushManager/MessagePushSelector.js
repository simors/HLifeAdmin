/**
 * Created by zachary on 2017/3/21.
 */

export function selectMessagePush(state) {
  return state.messagePushManager
}

export function selectSubAreaList(state, areaCode) {
  const subAreaList = selectMessagePush(state).subAreaMap.get(areaCode)
  if(subAreaList && subAreaList.size) {
    return subAreaList.toJS()
  }
  return []
}

export function selectPushTargetDistrictTreeDatas(state) {
  const list = selectMessagePush(state).pushTargetDistrictTreeDatas
  if(list && list.size) {
    return list.toJS()
  }
  return []
}
