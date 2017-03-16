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