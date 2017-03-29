/**
 * Created by zachary on 2017/3/21.
 */

export function selectSmsManager(state) {
  return state.smsManager
}

export function selectUserList(state) {
  const userListInfo = selectSmsManager(state).userListInfo
  return userListInfo || {}
}

