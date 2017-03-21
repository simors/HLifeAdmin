/**
 * Created by lilu on 2017/3/18.
 */
/**
 * Created by lilu on 2017/2/28.
 */
/**
 * Created by lilu on 2017/2/20.
 */
import React from 'react'
import {Table, Popconfirm, Switch} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import styles from './ActionList.less'

class ActionList extends React.Component {
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
      <TweenOneGroup component='tbody' className={body.props.className} enter={this.enterAnim} leave={this.leaveAnim}
                     appear={false}>
        {body.props.children}
      </TweenOneGroup>
    )
  }

  onEnd = (e) => {
    e.target.style.height = 'auto'
  }

  renderOneROle(result) {
    return (
      <a style={{marginRight: 4}}>{result.name}</a>
    )
  }

  renderRole(text, record) {
    //  console.log('record',record)
    //   let roleList = ''
    if (record && record.roleList.length > 0) {
      return (record.roleList.forEach((result)=> {
          //  console.log('result',result)
          return this.renderOneROle()
        })
      )
    }
    // console.log('roleList',roleList)
    // return roleList

  }

  async pageChange(pagination) {
    await this.props.onPageChange(pagination)
    this.newPage = pagination.current
  }

  render() {
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
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '城市',
        dataIndex: 'geoCity',
        key: 'geoCity'
      },
      {
        title: '地区',
        dataIndex: 'geoDistrict',
        key: 'geoDistrict'
      },
      {
        title: '活动类型',
        dataIndex: 'actionType',
        key: 'actionType',

      },
      {
        title: '活动内容',
        dataIndex: 'action',
        key: 'action',

      },
      {
        title: '活动封面',
        dataIndex: 'image',
        key: 'image',
        render: (text, record)=> {
          // console.log('record', record.image)
          return record.image ? <img style={{width: 60, height: 60}} src={record.image}></img> : <div></div>
        }
      },
      {
        title: '生成日期',
        dataIndex: 'createdAt',
        key: 'createdAt',

      },
      {
        title: '是否启用',
        dataIndex: 'status',
        key: 'status',
        render: (text, record)=> {
          const status = record.status
          return <Switch checkedChildren={'启用'} unCheckedChildren={'不启用'} defaultChecked={(record.status==1)?true:false}
                         onChange={(payload)=> {
                           this.props.updateActionEnable(payload, record.id)
                         }}></Switch>
        }
      }, {
        title: '操作',
        key: 'operation',
        width: 100,
        render: (text, record) => (
          <p>
            <a onClick={() => this.props.onEditItem(record)} style={{
              marginRight: 4
            }}>编辑</a>
            {/*<Popconfirm title='确定要删除吗？' onConfirm={() => this.props.onDeleteItem(record.key)}>*/}
            {/*<a>删除</a>*/}
            {/*</Popconfirm>*/}
          </p>
        )
      }
    ]
    return <div>
      <Table className={styles.table} bordered scroll={{
        x: 1200
      }} columns={columns} dataSource={dataSource} simple rowKey={record => record.id}
             pagination={this.props.pagination ? this.props.pagination : {}}/>
    </div>
  }
}

export default ActionList
