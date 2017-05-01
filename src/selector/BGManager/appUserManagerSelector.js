/**
 * Created by lilu on 2017/3/16.
 */
export function getAppUserList(state) {
  return state.appUserManager.appUserList
}

export function getAppUserDetail(state,id){
  let userList = getAppUserList(state)
  let userDetail= {}
  userList.forEach((result)=>{
    if (result.id==id){
      // console.log('result',result)
      userDetail=result
    }
  })
  return userDetail
}

export function getShopDetailFromUser(state) {
  return state.appUserManager.shopDetail
}

export function getPromoterDetail(state){
  return state.appUserManager.promoterDetail

}