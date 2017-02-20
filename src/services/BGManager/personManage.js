/**
 * Created by lilu on 2017/2/20.
 */
import AV from 'leancloud-storage'
import {personList} from '../../models/structs/BGManager/personManage'

export async function getPersonList() {
  try {
    let personListInfo = await AV.Cloud.run('getAdminUserList')
    let personListIM = personList.fromLeancloudObject(personListInfo)
    //console.log('personList',personListIM)
    return {success:true, data: personListIM}
  }catch (err){
    return {success:false}
  }
}