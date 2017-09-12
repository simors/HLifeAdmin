/**
 * Created by lilu on 2017/9/12.
 */
/**
 * Created by lilu on 2017/3/9.
 */


import React from 'react'
import {Table, Popconfirm,Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './ShopList.less'
import {Link,} from 'dva/router'

class CommentList extends React.Component {
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



  test(){
    return <p>test</p>
  }


  render () {
    const {
      // loading,
      dataSource,
      // pagination,
      // onDeleteItem,
      // onEditItem
    } = this.props
    // console.log('dataSource',dataSource)
    const columns = [

      {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '价格',
        dataIndex: 'promotionPrice',
        key: 'promotionPrice'
      },

      {
        title:'开始时间',
        dataIndex: 'startDate',
        key: 'startDate'
      },
      {
        title: '结束时间',
        dataIndex: 'endDate',
        key: 'endDate'
      },
      {
        title: '是否启用',
        dataIndex: 'status',
        key: 'status',
        render:(text,record)=>{
          return <p>{record.status?'是':'否'}</p>

        }
      },
    ]
    // console.log('hahahahahah',dataSource)
    return <div>
      <Table className={styles.components} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.id} pagination={this.props.pagination?this.props.pagination:{}}  />
    </div>
  }
}

export default CommentList
