/**
 * Created by lilu on 2017/2/20.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import {Record, List, Map} from 'immutable'

const personInfoConfig = Record({
   id:undefined,
  username: undefined,
  password: undefined,
  roleList: List()
}, 'personInfoConfig')

export class personList {
  static fromLeancloudObject(results) {
    let personList = []
    results.forEach((result)=> {
      let personInfo = new personInfoConfig
      let roleList = []
     // let count = 1
      result.roleList.forEach((role)=> {
        roleList.push(role)
      })
      let person = personInfo.withMutations((record)=> {
        record.set('id', result.username)
        record.set('username', result.username)
        record.set('password', result.password)
        record.set('roleList', List(roleList))
      })
     // count++
      personList.push(person)
    })
    return List(personList)
  }
}

export const personManageConfig = Record({
  personList: List(),
}, 'personManageConfig')

export const backgroundManageConfig = Record({
  personManage: personManageConfig()
}, 'backgroundManageConfig')