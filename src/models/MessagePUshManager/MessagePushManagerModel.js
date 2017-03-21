/**
 * Created by zachary on 2017/3/18.
 */
import {parse} from 'qs'
import * as MessagePush from '../../services/MessagePushManager/MessagePush'
import * as MessagePushSelector from '../../selector/MessagePushManager/MessagePushSelector'
import * as antdUtils from '../../utils/antdUtils'

export default {
  namespace: 'messagePushManager',
  state: {
    subAreaMap: {},
    pushTargetDistrictTreeDatas: [{
      label: '中国',
      value: '0-1',
      key: '0-1'
    }]
  },
  subscriptions:{

  },
  effects: {
    *updatePushTargetDistrictTreeDatas({payload}, {call, put, select}) {
      let eventKey = payload.eventKey || '0-1'
      payload = {
        ...payload,
        eventKey: eventKey
      }

      let {pushTargetDistrictTreeDatas, subAreaList} = yield select(state => {
        const _subAreaList = MessagePushSelector.selectSubAreaList(state, eventKey)
        const _pushTargetDistrictTreeDatas = MessagePushSelector.selectPushTargetDistrictTreeDatas(state)
        return {
          pushTargetDistrictTreeDatas: _pushTargetDistrictTreeDatas,
          subAreaList: _subAreaList
        }
      });

      if(!subAreaList || !subAreaList.length) {
        subAreaList = yield call(MessagePush.fetchSubAreaList, {
          areaCode: eventKey.split('-')[1]
        })
        yield put({
          type: 'fetchSubAreaListSuccess',
          payload: {
            eventKey,
            subAreaList
          }
        })
      }

      // console.log('pushTargetDistrictTreeDatas===>>>>>', pushTargetDistrictTreeDatas)
      // console.log('subAreaList===>>>>>', subAreaList)

      if(subAreaList && subAreaList.length) {
        let children = subAreaList.map((item, index) => {
          return {
            label: item.area_name,
            value: `${item.area_type}-${item.area_code}`,
            key: `${item.area_type}-${item.area_code}`,
            area_type: item.area_type
          }
        })
        // console.log('getNewTreeData.pushTargetDistrictTreeDatas====', pushTargetDistrictTreeDatas)
        // console.log('getNewTreeData.areaCode====', payload.areaCode)
        // console.log('getNewTreeData.children====', children)
        antdUtils.getNewTreeData(pushTargetDistrictTreeDatas, eventKey, children, 2)
        // console.log('getNewTreeData.pushTargetDistrictTreeDatas====', pushTargetDistrictTreeDatas)
        yield put({
          type: 'updatePushTargetDistrictTreeDatasSuccess',
          payload: {
            pushTargetDistrictTreeDatas
          }
        })
      }
    },
    *fetchSubAreaList({payload}, {call, put, select}) {
      // console.log('fetchSubAreaList.payload=====', payload)
      const eventKey = payload.eventKey

      let subAreaList = yield select(state => {
        MessagePushSelector.selectSubAreaList(state, eventKey)
      });

      if(!subAreaList || !subAreaList.length) {
        subAreaList = yield call(MessagePush.fetchSubAreaList, {
          areaCode: eventKey.split('-')[1]
        })
      }

      if(subAreaList && subAreaList.length) {
        yield put({
          type: 'fetchSubAreaListSuccess',
          payload: {
            eventKey,
            subAreaList
          }
        })
      }
    }
  },
  reducers:{
    fetchSubAreaListSuccess(state, action) {
      let {eventKey, subAreaList} = action.payload
      state.subAreaMap[eventKey] = [...subAreaList]
      return {
        ...state
      }
    },
    updatePushTargetDistrictTreeDatasSuccess(state, action) {
      let {pushTargetDistrictTreeDatas} = action.payload
      state.pushTargetDistrictTreeDatas = [...pushTargetDistrictTreeDatas]
      return {
        ...state
      }
    }
  }
}
