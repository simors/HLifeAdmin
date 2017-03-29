/**
 * Created by zachary on 2017/3/18.
 */
import {parse} from 'qs'
import * as SmsService from '../../services/SmsService'
import * as MessagePushSelector from '../../selector/MessagePushManager/MessagePushSelector'

export default {
  namespace: 'smsManager',
  state: {
    userListInfo: {}
  },
  subscriptions:{

  },
  effects: {
    *fetchUserList({payload}, {call ,put, select}) {
      // console.log('fetchUserList.payload===', payload)
      const userListInfo = yield call(SmsService.fetchUserList, payload)
      // console.log('userListInfo........>>>>>>', userListInfo)
      if(payload && payload.success) {
        payload.success(userListInfo)
      }
      yield put({
        type: 'fetchUserListSuccess',
        payload: {
          userListInfo
        }
      })
    },
    *sendSms({payload}, {call, put, select}) {
      const {smsTemplateName, selectedUsers, success, error} = payload
      if(smsTemplateName && selectedUsers && selectedUsers.length) {
        let mobilePhoneNumbers = []
        selectedUsers.forEach((item)=>{
          mobilePhoneNumbers.push(item.mobilePhoneNumber)
        })
        const isSendSuccess = yield call(SmsService.sendSms, {
          smsTemplateName,
          mobilePhoneNumbers
        })

        success && success()
        // console.log('sendSms.isSendSuccess===', isSendSuccess)
        // if(isSendSuccess) {
        //   success && success()
        // }else{
        //   error && error()
        // }
      }else {
        error && error()
      }
    }
  },
  reducers:{
    fetchUserListSuccess(state, action) {
      const {userListInfo} = action.payload
      return {
        ...state,
        userListInfo
      }
    }
  }
}
