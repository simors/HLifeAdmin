/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Menu, Dropdown, Icon, message, Input, DatePicker, Row, Col} from 'antd'
const { MonthPicker, RangePicker } = DatePicker;
import TopicList from '../../components/topicManager/topicManager/topicList'
import {getTopicList, getTopicCategoryList} from '../../selector/topicManager/topicManager'
import TopicModal from '../../components/topicManager/topicManager/topicModal'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';

const orderShowTab = {
  'createTimeDescend': '时间降序',
  'createTimeAscend': '时间升序',
  'commentNumDescend': '评论数',
  'likeCountDescend': '点赞数',
}

class topicManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      orderMode: 'createTimeDescend',
      orderModeShow: orderShowTab['createTimeDescend'],
      categoryName: '所有分类',
      filterValue: '',
      startTime: new Date('2000-01-01 00:00:00'),
      endTime: new Date(),
      selectedItem: {},

    }
    this.handleFilterSelectedChange = this.handleFilterSelectedChange.bind(this);
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
  }

  handleMenuClick(e) {
    this.setState({orderMode: e.key})
    this.setState({orderModeShow: orderShowTab[e.key]})
  }

  handleCategoryMenuClick(e) {
    this.setState({categoryName: e.key})
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'topicManage/query',
      payload: {
        orderMode: this.state.orderMode,
        categoryName: this.state.categoryName == '所有分类' ? '' : this.state.categoryName,
        filterValue: this.state.filterValue,
        startTime:this.state.startTime,
        endTime:this.state.endTime,
      }
    })
  }

  add() {
    this.setState({modalVisible: true, modalType: 'create'})
  }

  onOk(data) {
    this.props.dispatch({
      type: 'personManage/' + this.state.modalType,
      payload: data
    })
    this.setState({modalVisible: false})
  }

  onCancel() {
    this.setState({modalVisible: false})
  }

  onModify(data) {
    this.setState({modalVisible: true, modalType: 'update', selectedItem: data})
  }

  onDelete(itemId) {

  }

  onSearchByFilter() {
    this.props.dispatch({
      type: 'topicManage/query',
      payload: {
        orderMode: this.state.orderMode,
        categoryName: this.state.categoryName == '所有分类' ? '' : this.state.categoryName,
        filterValue: this.state.filterValue,
        startTime:this.state.startTime,
        endTime:this.state.endTime,
      }
    })
  }

  handleFilterSelectedChange(value) {
    this.setState({filterName: value});
  }

  handleFilterInputChange(value) {
    this.setState({filterValue: value.target.value});
  }

  renderMenu() {
    return (
      this.props.topicCategoryList.map((value, key)=> {
        return (
          <Menu.Item key={value.title}>{value.title}</Menu.Item>
        )
      })
    )
  }

  onDateChange(date, dateString) {
  console.log(date[0]._d);
    this.setState({startTime: date[0]._d});
    this.setState({endTime: date[1]._d});
}
  render() {
    var menu = (
      <Menu onClick={(e)=> {
        this.handleMenuClick(e)
      }}>
        <Menu.Item key="createTimeAscend">时间升序</Menu.Item>
        <Menu.Item key="createTimeDescend">时间降序</Menu.Item>
        <Menu.Item key="commentNumDescend">评论数</Menu.Item>
        <Menu.Item key="likeCountDescend">点赞数</Menu.Item>
      </Menu>
    );
    var categoryMenu = (
      <Menu onClick={(e)=> {
        this.handleCategoryMenuClick(e)
      }}>
        <Menu.Item key="所有分类">所有分类</Menu.Item>
        {this.renderMenu()}
      </Menu>
    );
    return (
      <div className='content-inner'>
        <Row gutter={24}>
          <Col lg={2} style={{marginBottom: 16}}>
            <p>排序方式：</p>
            <Dropdown overlay={menu}>
              <Button style={{marginBottom: 10, width: 100}}>
                {this.state.orderModeShow} <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>
          <Col lg={{offset: 2, span: 2}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>话题分类：</p>
            <Dropdown overlay={categoryMenu}>
              <Button style={{marginBottom: 10, width: 100}}>
                {this.state.categoryName} <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>
          <Col lg={{offset: 2, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>标题关键字：</p>
            <Input style={{width: 120}} defaultValue="" onChange={this.handleFilterInputChange}/>
          </Col>
          <Col lg={{offset: 2, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择日期：</p>
            <RangePicker
              defaultValue={[moment('2000-01-01', dateFormat), new moment()]}
              onChange={(date, dateString)=>this.onDateChange(date, dateString)}
            />
          </Col>
          <Col lg={{offset: 0, span: 2}} style={{marginTop: 18, textAlign: 'left'}}>
            <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
          </Col>


        </Row>
        <TopicList dataSource={this.props.topicList} onEditItem={(payload)=> {
          this.onModify(payload)
        }} onDeleteItem={(payload)=> {
          this.onDelete(payload)
        }}/>
        <TopicModal
          visible={this.state.modalVisible}
          type={this.state.modalType}
          onOk={(payload)=> {
            this.onOk(payload)
          }}
          onCancel={()=> {
            this.onCancel()
          }}
          item={this.state.selectedItem}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let topicList = getTopicList(state)
  let topicCategoryList = getTopicCategoryList(state)
  return {
    topicList: topicList,
    topicCategoryList: topicCategoryList
  }
}

export default connect(mapStateToProps)(topicManager)
