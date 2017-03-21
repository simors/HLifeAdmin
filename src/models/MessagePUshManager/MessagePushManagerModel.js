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
      value: '1',
      key: '1',
    }]
  },
  subscriptions:{

  },
  effects: {
    *updatePushTargetDistrictTreeDatas({payload}, {call, put, select}) {
      payload = {
        ...payload,
        areaCode: payload.areaCode || '1'
      }

      let {pushTargetDistrictTreeDatas, subAreaList} = yield select(state => {
        const _subAreaList = MessagePushSelector.selectSubAreaList(state, payload.areaCode)
        const _pushTargetDistrictTreeDatas = MessagePushSelector.selectPushTargetDistrictTreeDatas(state)
        return {
          pushTargetDistrictTreeDatas: _pushTargetDistrictTreeDatas,
          subAreaList: _subAreaList
        }
      });

      if(!subAreaList || !subAreaList.length) {
        subAreaList = yield call(MessagePush.fetchSubAreaList, payload)
        yield put({
          type: 'fetchSubAreaListSuccess',
          payload: {
            areaCode: payload.areaCode,
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
            value: item.area_code + "",
            key: item.area_code + "",
          }
        })
        // console.log('getNewTreeData.pushTargetDistrictTreeDatas====', pushTargetDistrictTreeDatas)
        // console.log('getNewTreeData.areaCode====', payload.areaCode)
        // console.log('getNewTreeData.children====', children)
        antdUtils.getNewTreeData(pushTargetDistrictTreeDatas, payload.areaCode, children, 3)
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
      const areaCode = payload.areaCode

      let subAreaList = yield select(state => {
        MessagePushSelector.selectSubAreaList(state, areaCode)
      });

      if(!subAreaList || !subAreaList.length) {
        subAreaList = yield call(MessagePush.fetchSubAreaList, payload)
      }

      if(subAreaList && subAreaList.length) {
        yield put({
          type: 'fetchSubAreaListSuccess',
          payload: {
            areaCode,
            subAreaList
          }
        })
      }
    }
  },
  reducers:{
    fetchSubAreaListSuccess(state, action) {
      let {areaCode, subAreaList} = action.payload
      state.subAreaMap[areaCode] = [...subAreaList]
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
