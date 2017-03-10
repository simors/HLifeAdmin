/**
 * Created by lilu on 2017/3/9.
 */
/**
 * Created by lilu on 2017/2/28.
 */

import React from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './ShopList.less'
import {Link,} from 'dva/router'

class CategoryList extends React.Component {
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

  renderOneROle(result){
    return (
      <a style={{marginRight: 4}}>{result.name}</a>
    )
  }

  renderRole(text,record){
    //  console.log('record',record)
    //   let roleList = ''
    if (record&&record.roleList.length>0){
      return  (record.roleList.forEach((result)=>{
          //  console.log('result',result)
          return this.renderOneROle()
        })
      )
    }
    // console.log('roleList',roleList)
    // return roleList

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
    //console.log('dataSource',dataSource)
    const columns = [
      {
        title: '店铺名称',
        dataIndex: 'shopName',
        key: 'shopName'
      },
      {
        title: '是否开张',
        dataIndex: 'isOpen',
        key: 'isOpen',
        render: (text,record)=> {
          if (record && record.isOpen==true) {
            //console.log('result', item,key)
            return <div>开张</div>
          }

          else{
            return <div>关张</div>
          }

        }
      },
      {
        title: '所在城市',
        dataIndex: 'geoCity',
        key: 'geoCity'
      },
      {
        title: '联系电话',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title:'分类',
        dataIndex:'targetShopCategory.text',
        key:'targetShopCategory.text',
      },

      {
        title: '店主',
        dataIndex: 'owner.username',
        key: 'owner.username'
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',

      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record,index) => (
          <p>
              <Link to={{
                pathname: "/shopManager/shopInfoManager/shopDetailsManager",
                query:{id:record.id,index:index}
              }} style={{
                marginRight: 4
              }}>详情</Link>
            <Popconfirm  title='确定要开张吗？' onConfirm={() => this.props.onOpen(record.id)}>
              <a style={{
                marginRight: 4
              }}>开张</a>
            </Popconfirm>
            <Popconfirm title='确定要关张吗？' onConfirm={() => this.props.onClose(record.id)}>
            <a>关张</a>
            </Popconfirm>
          </p>
        )
      }
    ]
    // console.log('hahahahahah',dataSource)
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.id} pagination={this.props.pagination?this.props.pagination:{}} />
    </div>
  }
}

export default CategoryList
