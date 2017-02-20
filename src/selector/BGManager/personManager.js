/**
 * Created by lilu on 2017/2/20.
 */
export function getPersonList(state) {
  return state.personManage.personList?state.personManage.personList.toJS():[]
}