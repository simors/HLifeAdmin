/**
 * Created by lilu on 2017/4/1.
 */
/**
 * Created by lilu on 2017/4/1.
 */
import React, {Component, PropTypes} from 'react'
import {Link, routerRedux} from 'dva/router'
import {connect} from 'dva'
import {Button, Tabs, Layout,Row,Col,Select,Menu,Cascader,Input,InputNumber} from 'antd'
import PromoterAgentManager from './PromoterAgentManager'
import {getPromoterList} from '../../selector/PromoterManager/promoterAgentSelector'
import PromoterList from '../../components/PromoterManager/PromoterAgent/PromoterList'
import AgentModal from '../../components/PromoterManager/PromoterAgent/AgentModal'
import * as CommonSelect from '../../selector/CommonSelect'
const Option = Select.Option;

class AgentManager extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      promoterId: '',
      identity :0,
      province :undefined,
      city :undefined,
      district:undefined,
      areaList:[]
    }
  }

  componentDidMount() {
    this.props.dispatch({type: 'promoterAgentSet/queryAgent',})
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })
    this.setState({
      areaList:this.props.areaTreeSelectData
    })
  }

  onOk(data) {
    // console.log('data=====>',data)
    this.props.dispatch({type: 'promoterAgentSet/agentSet', payload: {...data, promoterId: this.state.promoterId,success:()=>{
      this.props.dispatch({type: 'promoterAgentSet/queryAgent',})

    }}})
    this.setState({
      modalVisible: false
    })
  }


  filterArea(value,selectedOptions){
  let liveArea = []
  selectedOptions.forEach((record)=> {
    // console.log('record',record)
    liveArea.push(record.label)
  })
  this.setState({
    province:liveArea[1],
    city:liveArea[2],
    district:liveArea[3],
  })
}

  openVisible(record) {

    this.setState({
      promoterId: record,
      modalVisible: true
    })
  }

  filterIdentity(value){
    // console.log('data',value)
    let areaList = new Array()
    areaList = JSON.parse(JSON.stringify(this.props.areaTreeSelectData))
    switch (value){
      case '0':
        this.setState({
          identity:0,
          areaList:areaList
        })
        break
      case '1':
        areaList.forEach((item)=> {
          if (item.children) {
            item.children.forEach((result)=> {
              delete result.children
            })
          }
        })
        this.setState({
          identity:1,
          areaList:areaList
        })
        break
      case '2':
        areaList.forEach((item)=> {
          item.children.forEach((result)=> {
            result.children.forEach((record)=> {
              delete record.children
            })
          })
        })
        this.setState({
          identity:2,
          areaList:areaList
        })
        break
      case '3':
        this.setState({
          identity:3,
          areaList:areaList
        })
        break
    }
  }
  onCancel() {
    this.setState({
      modalVisible: false
    })
  }
  onSearchByFilter(){
    // console.log('hahahahahahahahaha',this.state.level)
    let value = this.state.identity
    switch (value){
      case 0:
        this.props.dispatch({type: 'promoterAgentSet/queryAgent'
        })
        break
      case 1:
        this.props.dispatch({type: 'promoterAgentSet/queryAgent',
          payload:{
            identity :this.state.identity,
            province :this.state.province,

          }
        })
        break
      case 2:
        this.props.dispatch({type: 'promoterAgentSet/queryAgent',
          payload:{
            identity :this.state.identity,
            city :this.state.city,
          }
        })
        break
      case 3:
        this.props.dispatch({type: 'promoterAgentSet/queryAgent',
          payload:{
            identity :this.state.identity,
            district:this.state.district,
          }
        })
        break
    }
    // this.props.dispatch({type: 'promoterAgentSet/queryAgent',
    //   payload:{
    //     identity :this.state.identity,
    //     province :this.state.province,
    //     city :this.state.city,
    //     district:this.state.district,
    //   }
    // })

  }
  unSearchByFilter(){
    this.setState({
      identity :undefined,
      province :undefined,
      city :undefined,
      district:undefined,
      street:undefined,
    })
    this.props.dispatch({type: 'promoterAgentSet/queryAgent',

    })

  }
  render() {
    return (
      <PromoterAgentManager>
        <div>
          <Row gutter={24}>
            <Col lg={{offset: 0, span:4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择代理级别</p>
              <Select style={{width:100}} onChange={(value)=>{this.filterIdentity(value)}} >
                <Option value='0'>全部代理</Option>
                <Option value='1'>省级代理</Option>
                <Option value='2'>市级代理</Option>
                <Option value='3'>区级代理</Option>
              </Select>
            </Col>
            <Col lg={{offset: 0, span: 8}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择推广代理地区</p>
              <Cascader
                style = {{width:260}}
                options={this.state.areaList}
                changeOnSelect
                placeholder="请选择代理地区"
                onChange={(value, selectedOptions)=> {
                  this.filterArea(value, selectedOptions)
                }}
              />
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginTop: 18, textAlign: 'left'}}>
              <Button type="primary" onClick={()=>this.onSearchByFilter()}>查询</Button>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginTop: 18, textAlign: 'left'}}>
              <Button type="ghost" onClick={()=>this.unSearchByFilter()}>取消筛选</Button>
            </Col>


          </Row>
          <PromoterList dataSource={this.props.promoterList} onEditItem={(record)=> {
            this.openVisible(record)
          }}/>
          <AgentModal visible={this.state.modalVisible} areaTreeSelectData={this.props.areaTreeSelectData}
                      onOk={(data)=> {
                        this.onOk(data)
                      }} onCancel={()=> {
            this.onCancel()
          }}/>
        </div>
      </PromoterAgentManager>
    )
  }
}
function mapStateToProps(state) {
  let promoterList = getPromoterList(state)
  const areaTreeSelectData = CommonSelect.selectAreaTreeSelectData(state)

  return {
    promoterList: promoterList, areaTreeSelectData: areaTreeSelectData
  }
}

export default connect(mapStateToProps)(AgentManager)