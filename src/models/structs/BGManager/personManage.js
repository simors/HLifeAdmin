/**
 * Created by lilu on 2017/2/20.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import {Record, List, Map} from 'immutable'

const personInfoConfig = {
   id:undefined,
  username: undefined,
  password: undefined,
  roleList: []
}

export class personList {
  static fromLeancloudObject(results) {
    //console.log('result===>',results)
    let personList = []
    results.forEach((result)=> {
      let personInfo = {}
      let roleList = []
     // let count = 1
      result.roleList.forEach((role)=> {
        roleList.push(role)
      })
      personInfo.id = result.id
      personInfo.username = result.username
      personInfo.password = result.password
      personInfo.roleList = result.roleList

     // count++
      personList.push(personInfo)
    })
    return personList
  }
}

const Role = Record({
  name:undefined,
  id:undefined
})

export class roleList{
  static fromLeancloudObject(results){
    let roleList = []
    results.forEach((result)=>{
    //  console.log('result',result)

      let role = {
        value: result.roleName
      }

      roleList.push(result.roleName)
    })
    console.log('roleList',roleList)
    return roleList
  }
}


export const personManageConfig = Record({
  personList: List(),
}, 'personManageConfig')

export const backgroundManageConfig = Record({
  personManage: personManageConfig()
}, 'backgroundManageConfig')