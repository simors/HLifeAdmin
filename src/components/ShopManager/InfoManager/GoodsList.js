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
      {
        title: '是否启用',
        dataIndex: 'status',
        key: 'status',
        render: (text, record)=> {
          const status = record.status
          return <Switch checkedChildren={'启用'} unCheckedChildren={'不启用'} defaultChecked={(record.status==1)?true:false}
                         onChange={(payload)=> {
                           this.props.updateReplyStatus(payload, record.id)
                         }}></Switch>
        }
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
        title: '评论时间',
        dataIndex: 'createdDate',
        key: 'createdDate'
      },
      {
        title: '名称',
        dataIndex: 'goodsName',
        key: 'goodsName'
      },
      {
        title: '图片集',
        dataIndex: 'album',
        key: 'album',
        render: (text,record)=> {
          if(record.album){
            let imgList = record.album.map((item,key)=>{
              return <img src={item} style={{width:50,height:50}} key={key}></img>
            })
            return imgList
          }else {
            return <div></div>
          }
        }
      },
      {
        title:'封面',
        dataIndex: 'coverPhoto',
        key: 'coverPhoto',
        render: (text,record)=> {
          if(record.coverPhoto){
              return <img src={record.coverPhoto} style={{width:50,height:50}} ></img>
          }else {
            return <div></div>
          }
        }
      },
      {
        title:'原价',
        dataIndex: 'originalPrice',
        key: 'originalPrice'
      },

      {
        title: '价格',
        dataIndex: 'price',
        key: 'price'
      },

    ]
    // console.log('hahahahahah',dataSource)
    return <div>
      <Table className={styles.components} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.objectId} pagination={this.props.pagination?this.props.pagination:{}} expandedRowRender={(record)=>{return this.replyList(record.replys)}} />
    </div>
  }
}

export default CommentList
