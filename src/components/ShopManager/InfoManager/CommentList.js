/**
 * Created by lilu on 2017/3/9.
 */


import React from 'react'
import {Table, Popconfirm} from 'antd'
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






  replyList(data){
    let replyColumns=[
      {
        title: '回复内容',
        dataIndex: 'content',
        key: 'content',
      },{
        title: '作者',
        dataIndex: 'user.username',
        key: 'user.username'
      },
    ]

    let replyData=data
    return (
      <Table
        columns={replyColumns}
        dataSource={replyData}
        pagination={false}
        rowKey={record=>record.id}
      />
    );
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
        title: '评论内容',
        dataIndex: 'content',
        key: 'content'
      },
      {
        title: '是否显示',
        dataIndex: 'enable',
        key: 'enable',
        render: (text,record)=> {
          if (record && record.enable==true) {
            // console.log('record', record)
            return <div>显示</div>
          }

          else{
            return <div>屏蔽</div>
          }

        }
      },
      {
        title: '图片集',
        dataIndex: 'blueprints',
        key: 'blueprints',
        render: (text,record)=> {
          if(record.blueprints){
            let imgList = record.blueprints.map((item,key)=>{
              return <img src={item} style={{width:50,height:50}} key={key}></img>
            })
            return imgList
          }else {
            return <div></div>
          }
          }

      },
      {
        title: '评论时间',
        dataIndex: 'createdDate',
        key: 'geoCity'
      },
      {
        title: '评分',
        dataIndex: 'score',
        key: 'score'
      },
      {
        title:'点赞数',
        dataIndex: 'ups.length',
        key: 'ups.length'
      },{
        title:'回复数',
        dataIndex: 'replys.length',
        key: 'replys.length'
      },

      {
        title: '作者',
        dataIndex: 'user.username',
        key: 'user.username'
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record,index) => (
          <p>
            <Popconfirm  title='确定要显示吗？' onConfirm={() => this.props.enableComment(record.id)}>
              <a style={{
                marginRight: 4
              }}>显示</a>
            </Popconfirm>
            <Popconfirm title='确定要屏蔽吗？' onConfirm={() => this.props.disableComment(record.id)}>
              <a>屏蔽</a>
            </Popconfirm>
          </p>
        )
      }
    ]
    // console.log('hahahahahah',dataSource)
    return <div>
      <Table className={styles.components} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.id} pagination={this.props.pagination?this.props.pagination:{}} expandedRowRender={(record)=>{return this.replyList(record.replys)}} />
    </div>
  }
}

export default CommentList
