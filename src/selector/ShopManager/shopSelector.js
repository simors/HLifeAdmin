/**
 * Created by lilu on 2017/3/9.
 */
export function getShopList(state) {
  return state.shopInfoManager.shopList
}

export function getShopDetail(state,id){
  let shopList = getShopList(state)
  let shopDetail={}
  shopList.forEach((result)=>{
    if(result.id==id) {
      // console.log('result',result)
shopDetail=result
    }
  })
  return shopDetail
}

export function getAnnouncements(state){
  return state.shopInfoManager.announcements
}

export function getCommentList(state){
  return state.shopInfoManager.commentList
}