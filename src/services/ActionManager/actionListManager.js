/**
 * Created by lilu on 2017/3/18.
 */
import AV from 'leancloud-storage'
export async function getActionList(payload) {
  try {

    let actionList = await AV.Cloud.run('getActionList', payload)
    return {success: true, actionList: actionList}
  } catch (err) {
    return {succes: false}
  }
}

export async function updateBannersStatus(payload){
  try {
    console.log('payload',payload)
    await AV.Cloud.run('updateBannersStatus', payload)
    return {success: true}
  } catch (err) {
    return {succes: false}
  }
}


export async function createBanner(payload){
  let image=''
  if (payload.image.file){
    try{
      let localFile = payload.image.file.originFileObj
      let name = 'categorytestimage.png'
      let file = new AV.File(name, localFile)
      let a = await file.save()
      image = a.attributes.url
    }catch (err){
      return{success:false}
    }
  }else{
    image=payload.image.url
    // console.log('hahahahahahhaahhahahaha=>>>>>>>>>>>>>')

  }
  try {
    let banner={
      image:image,
      title:payload.title,
      geoDistrict:payload.geoDistrict,
      geoCity:payload.geoCity,
      action:payload.action,
      actionType:payload.actionType,
      type:payload.type

    }
    await AV.Cloud.run('createBanner', banner)
    return {success: true}
  } catch (err) {
    return {success: false}
  }
}