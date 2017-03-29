/**
 * Created by zachary on 2017/3/28.
 */
export function selectCommon(state) {
  return state.common
}

export function selectSubAreaList(state, eventKey) {
  const subAreaList = selectCommon(state).subAreaMap[eventKey]
  if(subAreaList && subAreaList.length) {
    return subAreaList
  }
  return []
}

export function selectAreaTreeSelectData(state) {
  const list = selectCommon(state).areaTreeSelectData
  if(list && list.length) {
    return list
  }
  return []
}
