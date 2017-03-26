/**
 * Created by lilu on 2017/2/20.
 */
import React, {Component} from 'react'
import {Table, Popconfirm, Checkbox} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './topicCategoryList.less'
import {Link,} from 'dva/router'
import {formatLeancloudTime} from '../../../utils/numberUtils'

class topicCategoryList extends React.Component {
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
        title: '分类名称',
        dataIndex: 'title',
        key: 'title'
      }, {
        title: '分类简介',
        dataIndex: 'introduction',
        key: 'introduction'
      }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render:(text,record)=>{
          const status=record.status
          return <p>{formatLeancloudTime(new Date(record.createdAt))}</p>
        }
      },

      // {
      //   title: '图标',
      //   dataIndex: 'image',
      //   key: 'image',
      //   render: (text,record)=>{
      //     // console.log('record', record)
      //     return <img style={{width:100,height:100}} src={record.image}></img>
      //   }
      // },
      // {
      //   title: '精选',
      //   dataIndex: 'picked',
      //   render: (text, record) => {
      //     return (
      //       <Checkbox checked={record.picked} disabled={false}
      //                 onChange={()=>this.props.changePicked(record.id, !record.picked)}>
      //       </Checkbox>
      //     )
      //   }
      // },
      {
        title: '是否启用',
        dataIndex: 'enabled',
        render: (text, record) => {
          return (
            <Checkbox checked={record.enabled} disabled={false}
                      onChange={()=>this.props.changeEnabled(record.id, !record.enabled)}>
            </Checkbox>
          )
        }
      },{
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => (
          <p>
            <a onClick={() => this.props.onEditItem(record)} style={{
              marginRight: 6
            }}>编辑</a>
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 800
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.id}/>
    </div>
  }
}

export default topicCategoryList
