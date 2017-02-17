/**
 * Created by lilu on 2017/2/17.
 */
import {Record,List,Map} from 'immutable'



export const subMenu = Record({
  key:undefined,
  name:undefined,
  icon:undefined,
  child:List()
},'subMenu')

export const MenuList = Record({
  articleManager:subMenu(),
  doctorManager:subMenu(),
  shopManager:subMenu(),
  BKManager:subMenu(),
  topicManager:subMenu(),
},'MenuList')


