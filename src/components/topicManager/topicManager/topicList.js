/**
 * Created by lilu on 2017/2/20.
 */
import React, {Component} from 'react'
import {Table, Popconfirm, Checkbox} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './topicList.less'
import {Link,} from 'dva/router'
import {formatLeancloudTime} from '../../../utils/numberUtils'

class topicList extends React.Component {
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
    const {
      dataSource,
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
        render:(text,record)=>{
          const status=record.status
          return <p>{formatLeancloudTime(new Date(record.createdAt))}</p>
        }
      }, {
        title: '评论数',
        dataIndex: 'commentNum',
        key: 'commentNum',
      }, {
        title: '点赞数',
        dataIndex: 'likeCount',
        key: 'likeCount',
      }, {
        title: '精选',
        dataIndex: 'picked',
        render: (text, record) => {
          return (
            <Checkbox checked={record.picked} disabled={false}
                      onChange={()=>this.props.changePicked(record.key, !record.picked)}>
            </Checkbox>
          )
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
                pathname: "/topicManager/topicDetail",
                query: {articleContent: record.content, title: record.title}
              }} style={{
                marginRight: 4
              }}>文章详情</Link>
            </p>
          )
        }
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
