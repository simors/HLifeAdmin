/**
 * Created by lilu on 2017/2/28.
 */
import {parse} from 'qs'
import {getShopCategoryList,getShopTagList,createShopCategory,updateShopCategory,createShopTag,updateShopTag,updateChoosenCategory,updateCategoryStatus,updateShopCategoryId} from '../../services/ShopManager/CategoryManager'

export default {
  namespace: 'shopCategoryManager',
  state:{
    categoryList:[],
    tagList:[],
    loading: false,
    categoryPool:[],
    categoryChoosenPool:[],
    modalData:{},
    catagoryModalOpen:false,
    modalKey:-1,
    selectTags:[],
  },
  subscriptions:{

  },
  effects:{
    *query ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      const category = yield call(getShopCategoryList, parse(payload))
      // const tag = yield call(getShopTagList,parse(payload))
      if (category.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            categoryList: category.categoryList,
            // tagList: tag.tagList
          }
        })
      }
    },
    *fetchSelectTag({payload},{call,put}){
      yield put({type:'showLoading'})
      if(payload){
        yield put ({type:'selectTagReducer',payload:payload})
      }
      },
    *queryTag ({payload}, {call, put}) {
      yield put({type: 'showLoading'})
      // const category = yield call(getShopCategoryList, parse(payload))
      const tag = yield call(getShopTagList,parse(payload))
      if (tag.success) {
        yield put({
          type: 'queryTagSuccess',
          payload: {
            tagList: tag.tagList
          }
        })
      }
    },
    *openModal({payload}, {call, put}){
      yield put({type:'dataToModal',payload:payload})
      },
    closeModal({payload},{call,put}){
         put ({type:'closeModal'})
      },
    *submitChoosenCategory({payload}, {call, put}) {
      yield call(updateChoosenCategory, parse(payload))
      yield put({
        type:'query',
      })
    },

    *submitCategorySort({payload}, {call, put}) {
      const success = yield call(updateShopCategoryId, parse(payload))
      if(success){
        payload.success()
      }
      yield put({
        type:'query',
      })
    },
    *updateCategoryStatus({payload}, {call, put}){
      const data = yield call(updateCategoryStatus,parse(payload))
      if(data.success){
        put({type:'query'})
      }
      }
    ,
    *addChoosenCategory({payload},{call,put}){

      },
    *tagcreate({payload}, {call, put}){
      yield put({type: 'showLoading'})
      const tag = yield call(createShopTag, parse(payload))
      if (tag.success) {
        yield put({
          type: 'queryTag',
          payload:payload
        })
      }
      },
    *create ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(createShopCategory, parse(payload))
      if (category.success) {
        yield put({
          type: 'query',

        })
      }
    },
    *update ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(updateShopCategory, parse(payload))
      if (category.success) {
        yield put({
          type: 'query',

        })
      }
    },
    *tagupdate ({payload},{call,put}){
      yield put({type: 'showLoading'})
      const category = yield call(updateShopTag, parse(payload))
      if (category.success) {
        yield put({
          type: 'queryTag',

        })
      }
    }
  },
  reducers:{
    showLoading (state) {
      return {...state, loading: true}
    },
    querySuccess(state,action){
      let {categoryList} = action.payload

      return {
        ...state,categoryList:categoryList
      }
    },
    queryTagSuccess(state,action){
      let {tagList} = action.payload

      return {
        ...state,tagList:tagList
      }
    },
    queryPoolSuccess(state,action){
      let {categoryPool,categoryChoosenPool} = action.payload
      return {
        ...state,categoryPool:categoryPool,categoryChoosenPool:categoryChoosenPool
      }
    },
    dataToModal(state,action){
      return{
        ...state,modalData:action.payload,catagoryModalOpen:true,modalKey:state.modalKey-1
      }
    },
    closeModal(state,action){
      return {
        ...state,catagoryModalOpen:false,modalKey:state.modalKey-1
      }
    },
    selectTagReducer(state,action){
      return {
        ...state,selectTags:action.payload
      }
    }

  }
}