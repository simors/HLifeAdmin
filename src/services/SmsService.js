/**
 * Created by zachary on 2017/3/28.
 */
import AV from 'leancloud-storage'

export async function fetchUserList(payload) {
  // console.log('fetchSubAreaList.payload====>>>>', payload)
  let result = await AV.Cloud.run('hLifeFetchSmsUserList', payload)
  // console.log('fetchUserList.result====>>>>', result)
  return result
}

export async function sendSms(payload) {
  // console.log('sendSms.payload====>>>>', payload)
  let result = await AV.Cloud.run('hLifeSendSms', payload)
  // console.log('sendSms.result====>>>>', result)
  return result
}

export async function verifySmsCode(payload) {
  let smsAuthCode = payload.smsAuthCode
  let phone = payload.phone
  try {
    await AV.Cloud.verifySmsCode(smsAuthCode, phone)
    return ({success: true})
  } catch (err) {
    return ({success: false, err: err})
  }
}

export async function requestSmsAuthCode(payload){
  // console.log('payload',payload)
  let phone = payload
  try{
    await AV.Cloud.requestSmsCode({
      mobilePhoneNumber:phone,
      name: '汇邻优店',
      op: '注册',
      ttl: 10})
    return ({success:true})
  }catch(err){
    return ({success: false, err: err})
  }
}