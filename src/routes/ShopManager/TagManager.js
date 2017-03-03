/**
 * Created by lilu on 2017/3/3.
 */
import React, { Component,PropTypes } from 'react'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import {Button,Tabs} from 'antd'
import CategoryList from '../../components/ShopManager/CategoryManager/CategoryList'
import {getCategoryList,getTagList} from '../../selector/ShopManager/categorySelector'
// import UserSearch from '../../components/users/search'
import CategoryModal from '../../components/ShopManager/CategoryManager/CategoryModal'
import TagList from '../../components/ShopManager/CategoryManager/TagList'

class ShopTagManager extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <TagList
        dataSource={this.props.tagList}
      />
    )
  }
}


function mapStateToProps(state) {
 // let categoryList = getCategoryList(state)
  let tagList = getTagList(state)
  console.log('tagList',tagList)
  return {
 //   categoryList:categoryList,
    tagList: tagList

  }
}

export default connect(mapStateToProps)(ShopTagManager)