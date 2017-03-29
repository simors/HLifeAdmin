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
