/**
 * Created by lilu on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs,message} from 'antd'
import CategoryList from '../../components/ShopManager/CategoryManager/CategoryList'
import {getCategoryList, getTagList} from '../../selector/ShopManager/categorySelector'
// import UserSearch from '../../components/users/search'
import TagModal from '../../components/ShopManager/CategoryManager/TagModal'
import TagList from '../../components/ShopManager/CategoryManager/TagList'
import CategoryManager from './CategoryManager'


class ShopTagManager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      selectedItem: {},

    }
  }

  componentDidMount() {
     this.props.dispatch({type:'shopCategoryManager/queryTag'})
  }

  add() {
    // console.log('openModal')

    this.setState({modalVisible: true, modalType: 'create', selectedItem: {}})
  }

  onOk(data) {
    if(data.name&&data.name!=''){
      this.props.dispatch({
        type: 'shopCategoryManager/tag' + this.state.modalType,
        payload: data
      })
      // console.log('data====>', data)
      this.setState({modalVisible: false})
    }else{
      message.info('请填写标签名称')
    }
  }

  onCancel() {
    this.setState({modalVisible: false})
  }

  onModify(data) {
    // console.log('data',data)
    this.setState({modalVisible: true, modalType: 'update', selectedItem: data})
  }

  onDelete(itemId) {
    this.props.dispatch({
      type: 'personManage/delete',
      payload: itemId
    })
  }

  render() {
    return (
      <CategoryManager>
        <div className='content-inner'>
          {/*<Tabs defaultActiveKey="categoryManager" >*/}
          {/*<TabPane tab = '分类管理' key = 'categoryManager'>*/}
          <Button size='large' type='ghost' onClick={()=> {
            this.add()
          }}>添加标签</Button>
          <TagList
            dataSource={this.props.tagList}
            onEditItem={(payload)=> {
              this.onModify(payload)
            }}
            onDeleteItem={(payload)=> {
              this.onDelete(payload)
            }}
            pagination={{total: this.props.tagList?this.props.tagList.length:1, pageSize: 10}}
          />
          <TagModal
            categoryList = {this.props.categoryList}
            visible={this.state.modalVisible}
            type={this.state.modalType}
            onOk={(payload)=> {
              this.onOk(payload)
            }}
            onCancel={()=> {
              this.onCancel()
            }}
            item={this.state.selectedItem}
            tagList={this.props.tagList}
          /></div>
      </CategoryManager>
    )
  }
}


function mapStateToProps(state) {
  let categoryList = getCategoryList(state)
  let tagList = getTagList(state)
  // console.log('tagList', tagList)
  return {
      categoryList:categoryList,
    tagList: tagList

  }
}

export default connect(mapStateToProps)(ShopTagManager)