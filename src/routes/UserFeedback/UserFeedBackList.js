/**
 * Created by lilu on 2017/4/8.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import React, {Component} from 'react'
import {Table, Popconfirm, Checkbox,Switch} from 'antd'
import {connect} from 'dva'
import {TweenOneGroup} from 'rc-tween-one'
// import styles from './topicList.less'
import {Link,} from 'dva/router'
import {formatLeancloudTime} from '../../utils/numberUtils'
import {getAdviseList} from '../../selector/UserFeedbackManager/userFeedbackSelector'
class UserFeedBackList extends React.Component {
  constructor(props) {
    super(props)
    this.enterAnim = [
      {
        opacity: 0,
        x: 30,
        backgroundColor: '#fffeee',
        duration: 0
      }, {
        height: 0,
        duration: 200,
        type: 'from',
        delay: 250,
        ease: 'easeOutQuad',
        onComplete: this.onEnd
      }, {
        opacity: 1,
        x: 0,
        duration: 250,
        ease: 'easeOutQuad'
      }, {
        delay: 1000,
        backgroundColor: '#fff'
      }
    ]
    this.leaveAnim = [
      {
        duration: 250,
        opacity: 0
      }, {
        height: 0,
        duration: 200,
        ease: 'easeOutQuad'
      }
    ]
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'userFeedbackModel/query',

    })
  }
  getBodyWrapper = (body) => {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage
      return body
    }
    return (
      <TweenOneGroup component='tbody' className={body.props.className} enter={this.enterAnim} leave={this.leaveAnim}
                     appear={false}>
        {body.props.children}
      </TweenOneGroup>
    )
  }

  onEnd = (e) => {
    e.target.style.height = 'auto'
  }

  async pageChange(pagination) {
    await this.props.onPageChange(pagination)
    this.newPage = pagination.current
  }

  render() {

    const columns = [

      {
        title: '是否已读',
        dataIndex: 'status',
        key: 'status',
        render: (text, record)=> {
// console.log('record',record.key,record.status)
          return <p>{record.status?'已读':'未读'}</p>
        }
      },
      {
        title: '作者',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render:(text,record)=>{
          return <p>{formatLeancloudTime(new Date(record.createdAt))}</p>
        }
      },

      {
        title: '详情',
        key: 'operation',
        width: 100,
        render: (text, record) => {
          return (
            <p>
              <Link to={{
                pathname: "/userFeedback/userFeedbackDetail",
                query: {adviseContent: record.content,id:record.id}
              }} style={{
                marginRight: 4
              }}>反馈详情</Link>
            </p>
          )
        }
      }
    ]
    return <div>
      <Table  bordered scroll={{
        x: 800
      }} columns={columns} dataSource={this.props.adviseList} simple rowKey={record => record.id}/>
    </div>
  }
}

function mapStateToProps(state) {
  let adviseList = getAdviseList(state)
  // let topicCategoryList = getTopicCategoryList(state)
  return {
    adviseList: adviseList,
    // topicCategoryList: topicCategoryList
  }
}

export default connect(mapStateToProps)(UserFeedBackList)
