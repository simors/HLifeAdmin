/**
 * Created by lilu on 2017/3/16.
 */
export function getAppUserList(state) {
  return state.appUserManager.appUserList
}

export function getAppUserDetail(state,id){
  // let userList = getAppUserList(state)
  return state.appUserManager.userDetail

}

export function getShopDetailFromUser(state) {
  return state.appUserManager.shopDetail
}

export function getPromoterDetail(state){
  return state.appUserManager.promoterDetail

}