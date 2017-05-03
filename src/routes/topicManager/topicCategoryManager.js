/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'dva'
import {Button, Menu, Dropdown, Icon, message, Input, DatePicker, Row, Col} from 'antd'
const {MonthPicker, RangePicker} = DatePicker;
import TopicCategoryList from '../../components/topicManager/topicCategoryManager/topicCategoryList'
import {getTopicCategoryDetailList} from '../../selector/topicManager/topicManagerSelector'
import TopicCategoryModal from '../../components/topicManager/topicCategoryManager/topicCategoryModal'
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

class topicCategoryManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: 'create',
      filterValue: '',
      startTime: undefined,
      endTime: undefined,
      picked: false,
      enabled: true,
      enabledName: '启用',
      pickedName: '全部',
      selectedItem: {},
      modalKey:-1,
    }
    this.handleFilterSelectedChange = this.handleFilterSelectedChange.bind(this);
    this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
  }

  add(){
    this.setState({modalVisible:true,modalType:'create'})
  }

  handleMenuClick(e) {
    this.setState({orderMode: e.key})
    this.setState({orderModeShow: orderShowTab[e.key]})
  }

  handleEnableClick(e) {
    if (e.key == "true") {
      this.setState({enabled: true})
      this.setState({enabledName: "启用"})
    }
    else {
      this.setState({enabled: false})
      this.setState({enabledName: "全部"})
    }
  }

  handlePickedClick(e) {
    if (e.key == "true") {
      this.setState({picked: true})
      this.setState({pickedName: "精选"})
    }
    else {
      this.setState({picked: false})
      this.setState({pickedName: "全部"})
    }
  }

  handleCategoryMenuClick(e) {
    this.setState({categoryName: e.key})
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'topicCategoryManage/query',
      payload: {
        filterValue: this.state.filterValue,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        enabled: this.state.enabled,
      }
    })
  }


  onCancel() {
    this.setState({modalVisible: false,modalKey:this.state.modalKey-1})
  }

  onModify(data) {
    this.setState({modalVisible: true, modalType: 'update', selectedItem: data})
  }


  onSearchByFilter() {
    this.props.dispatch({
      type: 'topicCategoryManage/query',
      payload: {
        filterValue: this.state.filterValue,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        picked: this.state.picked,
        enabled: this.state.enabled,
      }
    })
  }

  onOk(data){
     // console.log('data====>',data)

    this.props.dispatch({
      type:'topicCategoryManage/create',
      payload:data
    })
    this.setState({modalVisible:false,modalKey:this.state.modalKey-1})
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
    var pickedMenu = (
      <Menu onClick={(e)=> {
        this.handlePickedClick(e)
      }}>
        <Menu.Item key="true">精选</Menu.Item>
        <Menu.Item key="false">全部</Menu.Item>
      </Menu>
    );
    var enableMenu = (
      <Menu onClick={(e)=> {
        this.handleEnableClick(e)
      }}>
        <Menu.Item key="true">启用</Menu.Item>
        <Menu.Item key="false">全部</Menu.Item>
      </Menu>
    );
    return (
      <div className='content-inner'>
        <Row gutter={24}>
          <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>是否精选：</p>
            <Dropdown overlay={pickedMenu}>
              <Button style={{marginBottom: 10, width: 100}}>
                {this.state.pickedName} <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>启用状态：</p>
            <Dropdown overlay={enableMenu}>
              <Button style={{marginBottom: 10, width: 100}}>
                {this.state.enabledName} <Icon type="down"/>
              </Button>
            </Dropdown>
          </Col>
          <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>分类关键字：</p>
            <Input style={{width: 200}} defaultValue="" onChange={this.handleFilterInputChange}/>
          </Col>
          <Col lg={{offset: 0, span: 6}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>选择日期：</p>
            <RangePicker
              defaultValue={[moment('2000-01-01', dateFormat), new moment()]}
              onChange={(date, dateString)=>this.onDateChange(date, dateString)}
            />
          </Col>
          <Col lg={{offset: 0, span: 2}} style={{marginTop: 18, textAlign: 'left'}}>
            <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
          </Col>
          <Col lg={{offset: 0, span: 3}} style={{marginTop: 18, textAlign: 'left'}}>
            <Button type='ghost' onClick={()=>{this.add()}}>添加分类</Button>
          </Col>

        </Row>
        <TopicCategoryList
          changePicked={(id, picked)=> {
            this.props.dispatch({
              type: 'topicCategoryManage/update',
              payload: {
                id: id, picked: picked, payload: {
                  filterValue: this.state.filterValue,
                  startTime: this.state.startTime,
                  endTime: this.state.endTime,
                  picked: this.state.picked,
                  enabled: this.state.enabled,
                }
              }
            })
          }}
          changeEnabled={(id, enabled)=> {
            this.props.dispatch({
              type: 'topicCategoryManage/update',
              payload: {
                id: id, enabled: enabled, payload: {
                  filterValue: this.state.filterValue,
                  startTime: this.state.startTime,
                  endTime: this.state.endTime,
                  picked: this.state.picked,
                  enabled: this.state.enabled,
                }
              }
            })
          }}
          dataSource={this.props.topicCategoryList}
          onEditItem={(payload)=> {
            this.onModify(payload)
          }}/>
        <TopicCategoryModal
          modalKey={this.state.modalKey}
          visible={this.state.modalVisible}
          type={this.state.modalType}
          onOk={(payload)=> {
            this.onOk(payload)
          }}
          categoryList = {this.props.topicCategoryList}
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
  let topicCategoryList = getTopicCategoryDetailList(state)
  return {
    topicCategoryList: topicCategoryList
  }
}

export default connect(mapStateToProps)(topicCategoryManager)
