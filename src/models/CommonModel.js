/**
 * Created by zachary on 2017/3/28.
 */

import * as CommonService from '../services/CommonService'
import * as CommonSelect from '../selector/CommonSelect'
import * as antdUtils from '../utils/antdUtils'

export default {
  namespace: 'common',
  state: {
    subAreaMap: {},
    areaTreeSelectData: []
  },
  subscriptions: {

  },
  effects: {
    *fetchSubAreaList({payload}, {call ,put, select}) {
      let eventKey = (payload && payload.eventKey) || '0-1'

      let subAreaList = yield select(state => {
        const _subAreaList = CommonSelect.selectSubAreaList(state, eventKey)
        return {
          subAreaList: _subAreaList
        }
      });

      if(!subAreaList || !subAreaList.length) {
        subAreaList = yield call(CommonService.fetchSubAreaList, payload)
        yield put({
          type: 'fetchSubAreaListSuccess',
          payload: {
            eventKey: eventKey,
            subAreaList
          }
        })

        let areaTreeSelectData = antdUtils.transformSubAreaListToTreeData(subAreaList)
        yield put({
          type: 'transformSubAreaListToTreeDataSuccess',
          payload: {
            areaTreeSelectData
          }
        })
      }
    }
  },
  reducers: {
    fetchSubAreaListSuccess(state, action) {
      let {eventKey, subAreaList} = action.payload
      state.subAreaMap[eventKey] = [...subAreaList]
      return {
        ...state
      }
    },
    transformSubAreaListToTreeDataSuccess(state, action) {
      let {areaTreeSelectData} = action.payload
      state.areaTreeSelectData = [...areaTreeSelectData]
      return {
        ...state
      }
    }
  }
}
