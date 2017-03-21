/**
 * Created by lilu on 2017/3/18.
 */
export function getAppUserList(state) {
  return state.actionListManager.actionList
}
export function getProvinceList(state){
  return state.actionListManager.provinceList
}


export function getModalData(state) {
  return state.actionListManager.modalData
}
export function getModalState(state) {
  return state.actionListManager.actionModalOpen
}
export function getModalKey(state) {
  return state.actionListManager.modalKey
}