/**
 * Created by lilu on 2017/3/8.
 */
/**
 * Created by lilu on 2017/3/7.
 */
/**
 * Created by lilu on 2017/2/28.
 */
import React from 'react'
import {Table, Popconfirm} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
// import styles from './CategoryList.less'


class CategoryChoosenPool extends React.Component {
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
    this.state = {
      selectedRowKeys: '',
      dataSource: this.props.dataSource
    }
    //const {current} = this.props.pagination
    // this.currentPage = current
    // this.newPage = current
  }

  componentWillReceiveProps(newProps) {
    // console.log('asas', newProps.dataSource)
    this.setState({
      dataSource: newProps.dataSource
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
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

  onSelectChange = (selectedRowKeys, selectedRowData) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);
    this.setState({selectedRowKeys: selectedRowKeys})
    this.props.selectCategory({selectedRowKeys: selectedRowKeys, selectCategory: selectedRowData});

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
    const {selectedRowKeys} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio'
    };
    const {
      // loading,
      dataSource,
      // pagination,
      // onDeleteItem,
      // onEditItem
    } = this.state
    //console.log('dataSource',dataSource)
    const columns = [
      {
        title: '标签名称',
        dataIndex: 'text',
        key: 'text',
        width: 1000,
      },

      // {
      //   title: '操作',
      //   key: 'operation',
      //   width: 1000,
      //   render: (text, record) => (
      //     <p>
      //       <a onClick={() => this.props.onEditItem(record)} style={{
      //         marginRight: 4
      //       }}>编辑</a>
      //       {/*<Popconfirm title='确定要删除吗？' onConfirm={() => this.props.onDeleteItem(record.key)}>*/}
      //       {/*<a>删除</a>*/}
      //       {/*</Popconfirm>*/}
      //     </p>
      //   )
      // }
    ]
    return <div>
      <Table scroll={{y: 300}} bordered columns={columns} dataSource={this.state.dataSource} simple
             rowKey={record => record.id} pagination={false} rowSelection={rowSelection}/>
    </div>
  }
}



export default CategoryChoosenPool