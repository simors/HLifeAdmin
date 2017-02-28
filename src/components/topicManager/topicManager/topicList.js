/**
 * Created by lilu on 2017/2/20.
 */
import React from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './topicList.less'
import {Link, } from 'dva/router'
class topicList extends React.Component {
  constructor (props) {
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
    //const {current} = this.props.pagination
    // this.currentPage = current
    // this.newPage = current
  }

  getBodyWrapper = (body) => {
    // 切换分页去除动画;
    if (this.currentPage !== this.newPage) {
      this.currentPage = this.newPage
      return body
    }
    return (
      <TweenOneGroup component='tbody' className={body.props.className} enter={this.enterAnim} leave={this.leaveAnim} appear={false}>
        {body.props.children}
      </TweenOneGroup>
    )
  }

  onEnd = (e) => {
    e.target.style.height = 'auto'
  }

  async pageChange (pagination) {
    await this.props.onPageChange(pagination)
    this.newPage = pagination.current
  }

  render () {
    const {
      // loading,
      dataSource,
      // pagination,
      // onDeleteItem,
      // onEditItem
    } = this.props
    const columns = [
      {
        title: '话题分类',
        dataIndex: 'category',
        key: 'category'
      }, {
        title: '话题标题',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '话题作者',
        dataIndex: 'username',
        key: 'username'
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      }, {
        title: '评论数',
        dataIndex: 'commentNum',
        key: 'commentNum',
      }, {
        title: '点赞数',
        dataIndex: 'likeCount',
        key: 'likeCount',
      },{
        title: '是否精选',
        dataIndex: 'picked',
        key: 'picked',
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => {
          return (
          <p>
            <Link to={{pathname:"/topicManager/topicDetail", query:{articleContent: record.content, title: record.title}}} style={{
              marginRight: 4
            }}>文章详情</Link>
            <Popconfirm title='确定要删除吗？' onConfirm={() => this.props.onDeleteItem(record.key)}>
              <a>删除</a>
            </Popconfirm>
          </p>
        )}
      }
    ]
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 800
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.key}/>
    </div>
  }
}

export default topicList
