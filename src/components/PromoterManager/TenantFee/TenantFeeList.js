/**
 * Created by wanpeng on 2017/4/10.
 */

import React from 'react'
import {Table, Popconfirm, Switch} from 'antd'

class TenantFeeList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      dataSource,
    } = this.props

    const columns = [
      {
        title: '省份',
        dataIndex: 'province',
        key: 'province'
      },
      {
        title: '城市',
        dataIndex: 'city',
        key: 'city',
      },
      {
        title: '入驻费（元）',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <p>
            <a onClick={() => this.props.onEditItem(record)}>编辑</a>
          </p>
        )
      }
    ]
    return(
      <div>
        <Table dataSource={dataSource} columns={columns} rowKey={record => record.objectId}/>
      </div>
    )
  }
}

export default TenantFeeList
