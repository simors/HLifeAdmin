/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Menu, Dropdown, Icon, message} from 'antd'
import TopicList from '../../components/topicManager/topicManager/topicList'
import {getTopicList} from '../../selector/topicManager/topicManager'
import TopicModal from '../../components/topicManager/topicManager/topicModal'

class topicManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      selectedItem: {},

    }
  }

  handleMenuClick(e) {
    console.log("--->", e)
    this.props.dispatch({type: 'topicManage/query',
      payload: {
      orderMode: e.key
    }})
  }


  componentDidMount() {
    this.props.dispatch({type: 'topicManage/query'})
  }

  add() {
    // console.log('openModal')

    this.setState({modalVisible: true, modalType: 'create'})
  }

  onOk(data) {
    this.props.dispatch({
      type: 'personManage/' + this.state.modalType,
      payload: data
    })
    this.setState({modalVisible: false})
  }

  onCancel() {
    this.setState({modalVisible: false})
  }

  onModify(data) {
    this.setState({modalVisible: true, modalType: 'update', selectedItem: data})
  }

  onDelete(itemId) {

  }

  render() {
    var menu = (
      <Menu onClick={(e)=> {
        this.handleMenuClick(e)
      }}>
        <Menu.Item key="createTimeAscend">时间升序</Menu.Item>
        <Menu.Item key="createTimeDescend">时间降序</Menu.Item>
        <Menu.Item key="commentNumDescend">评论数</Menu.Item>
        <Menu.Item key="likeCountDescend">点赞数</Menu.Item>
      </Menu>
    );
    return (
      <div className='content-inner'>
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 0 }}>
            排序方式 <Icon type="down" />
          </Button>
        </Dropdown>
        <TopicList dataSource={this.props.topicList} onEditItem={(payload)=> {
          this.onModify(payload)
        }} onDeleteItem={(payload)=> {
          this.onDelete(payload)
        }}/>
        <TopicModal
          visible={this.state.modalVisible}
          type={this.state.modalType}
          onOk={(payload)=> {
            this.onOk(payload)
          }}
          onCancel={()=> {
            this.onCancel()
          }}
          item={this.state.selectedItem}
        />
      </div>
    )
  }
}


function mapStateToProps(state) {
  let topicList = getTopicList(state)
  return {
    topicList: topicList,
  }
}

export default connect(mapStateToProps)(topicManager)
