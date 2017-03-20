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