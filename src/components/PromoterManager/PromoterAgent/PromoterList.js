/**
 * Created by lilu on 2017/4/1.
 */
/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import React from 'react'
import {Link,} from 'dva/router'

import {Table, Popconfirm,Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './PromoterList.less'
import {formatLeancloudTime} from '../../../utils/numberUtils'

class PromoterList extends React.Component {
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
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
        render:(text,record)=>{
          return <p>{record.liveProvince+record.liveCity+record.liveDistrict}</p>
        }
      },
      {
        title: '邀请店铺数量',
        dataIndex: 'inviteShopNum',
        key: 'inviteShopNum'
      },
      {
        title: '团队人数',
        dataIndex: 'teamMemNum',
        key: 'teamMemNum',

      },
      {
        title: '电话号码',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title:'等级',
        dataIndex:'level',
        key:'level',
        render:(text,record)=>{
          if(record.level==1){
            return <p>青铜</p>
          }else if(record.level==2){
            return <p>白银</p>
          }else if(record.level==3){
            return <p>黄金</p>
          }else if(record.level==4){
            return <p>钻石</p>
          }else if(record.level==5){
            return <p>皇冠</p>
          }
        }
      },
      {
        title: '代理区域',
        dataIndex: 'agenDistrict',
        key: 'agenDistrict',
        render:(text,record)=>{
          if(record.identity==1){
            return <p>{record.province}</p>
          }else if(record.identity==2){
            return <p>{record.city}</p>
          }else if(record.identity==3){
            return <p>{record.district}</p>
          }else{
            return <p>无</p>
          }
        }
      },
      {
        title: '店铺收益',
        dataIndex: 'shopEarnings',
        key: 'shopEarnings',
      },
      {
        title: '提成收益',
        dataIndex: 'royaltyEarnings',
        key: 'royaltyEarnings',

      },
      {
        title:'总收益',
        dataIndex:'totalEarnings',
        key:'totalEarnings',
        render:(text,record)=>{
          return <p>{record.royaltyEarnings+record.shopEarnings}</p>
        }
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (text, record)=> {
          const status = record.status
          return <p>{formatLeancloudTime(new Date(record.createdAt))}</p>
        }
      },
      {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record,index) => (
          <p>
          <a onClick={() => this.props.onEditItem(record.objectId)} style={{
            marginRight: 4
          }}>设置代理</a>
            <p>
              <Link to={{
                pathname: "/promoterManager/promoterAgentSet/promoterDetail",
                query: {id: record.objectId, index: index}
              }} style={{
                marginRight: 4
              }}>详情</Link>
            </p>
        </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.objectId} pagination={this.props.pagination?this.props.pagination:{}} />
    </div>
  }
}

export default PromoterList
