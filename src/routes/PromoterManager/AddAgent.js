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

class AddAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      promoterId: '',
      identity :undefined,
      province :undefined,
      city :undefined,
      district:undefined,
      street:undefined,
      liveProvince:undefined,
      liveCity :undefined,
      liveDistrict:undefined,
      phone :undefined,
      payment :undefined,
      name:undefined,
      level:undefined,
      minShopEarnings :undefined,
      maxShopEarnings :undefined,
      minInviteShopNum :undefined,
      maxInviteShopNum :undefined,
      minRoyaltyEarnings :undefined,
      maxRoyaltyEarnings :undefined,
      minTeamMemNum :undefined,
      maxTeamMemNum :undefined,
      orderRule :undefined,
      descend:undefined,
    }
  }



  filterOrderRule(value){
    this.setState({
      orderRule:value
    })
  }

  filterDescend(value){
    if(value=='descend'){
      this.setState({
        descend:true
      })
    }
   else {
      this.setState({
        descend:false
      })
    }
  }


  filterMaxTeamMemNum(value){
    this.setState({
      maxTeamMemNum:value
    })
  }

  filterMinTeamMemNum(value){
    this.setState({
      minTeamMemNum:value
    })
  }

  filterMaxRoyaltyEarnings(value){
    this.setState({
      maxRoyaltyEarnings:value
    })
  }
  filterMinRoyaltyEarnings(value){
    this.setState({
      minRoyaltyEarnings:value
    })
  }
  filterMaxInviteShopNum(value){
    this.setState({
      maxInviteShopNum:value
    })
  }
  filterMinInviteShopNum(value){
    this.setState({
      minInviteShopNum:value
    })
  }
  filterMaxShopEarnings(value){
    this.setState({
      maxShopEarnings:value
    })
  }
  filterMinShopEarnings(value){
    this.setState({
      minShopEarnings:value
    })
  }
  filterLevel(value){
    switch (value){
      case '1':
        this.setState({
          level:1
        })
        break
      case '2':
        this.setState({
          level:2
        })
        break
      case '3':
        this.setState({
          level:3
        })
        break
      case '4':
        this.setState({
          level:4
        })
        break
      case '5':
        this.setState({
          level:5
        })
        break
    }
    this.setState({
      level:value
    })
  }
  filterName(value){
    this.setState({
      name:value
    })
  }
  filterPayment(value){
    switch (value){
      case '1':
        this.setState({
          payment:1
        })
        break
      case '0':
        this.setState({
          payment:0
        })
        break
    }

  }
  filterPhone(value){
    this.setState({
      phone:value
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
  filterLiveArea(value,selectedOptions){
    let liveArea = []
    selectedOptions.forEach((record)=> {
      // console.log('record',record)
      liveArea.push(record.label)
    })
    this.setState({
      liveProvince:liveArea[1],
      liveCity:liveArea[2],
      liveDistrict:liveArea[3],
    })
  }

  filterIdentity(value){
    switch (value){
      case '1':
        this.setState({
          identity:1
        })
        break
      case '2':
        this.setState({
          identity:2
        })
        break
      case '3':
        this.setState({
          identity:3
        })
        break
    }

  }
  componentDidMount() {
    this.props.dispatch({type: 'promoterAgentSet/query',})
    this.props.dispatch({
      type: 'common/fetchSubAreaList'
    })
  }

  onOk(data) {
    // console.log('data=====>',data)
    this.props.dispatch({type: 'promoterAgentSet/agentAdd', payload: {...data, promoterId: this.state.promoterId}})
    this.setState({
      modalVisible: false
    })
  }

  openVisible(record) {

    this.setState({
      promoterId: record,
      modalVisible: true
    })
  }

  onCancel() {
    this.setState({
      modalVisible: false
    })
  }
  onSearchByFilter(){
    console.log('hahahahahahahahaha',this.state.level)
    this.props.dispatch({type: 'promoterAgentSet/query',
      payload:{
        identity :this.state.identity,
        province :this.state.province,
        city :this.state.city,
        district:this.state.district,
        street:this.state.street,
        liveProvince:this.state.liveProvince,
        liveCity :this.state.liveCity,
        liveDistrict:this.state.liveDistrict,
        phone :this.state.phone,
        payment :this.state.payment,
        name:this.state.name,
        level:this.state.level,
        minShopEarnings :this.state.minShopEarnings,
        maxShopEarnings :this.state.maxShopEarnings,
        minInviteShopNum :this.state.minInviteShopNum,
        maxInviteShopNum :this.state.maxInviteShopNum,
        minRoyaltyEarnings :this.state.minRoyaltyEarnings,
        maxRoyaltyEarnings :this.state.maxRoyaltyEarnings,
        minTeamMemNum :this.state.minTeamMemNum,
        maxTeamMemNum :this.state.maxTeamMemNum,
        orderRule :this.state.orderRule,
        descend:this.state.descend,
      }
    })

  }
  unSearchByFilter(){
    this.setState({
      identity :undefined,
      province :undefined,
      city :undefined,
      district:undefined,
      street:undefined,
      liveProvince:undefined,
      liveCity :undefined,
      liveDistrict:undefined,
      phone :undefined,
      payment :undefined,
      name:undefined,
      level:undefined,
      minShopEarnings :undefined,
      maxShopEarnings :undefined,
      minInviteShopNum :undefined,
      maxInviteShopNum :undefined,
      minRoyaltyEarnings :undefined,
      maxRoyaltyEarnings :undefined,
      minTeamMemNum :undefined,
      maxTeamMemNum :undefined,
      orderRule :undefined,
      descend:undefined,
    })
    this.props.dispatch({type: 'promoterAgentSet/query',

    })

  }

  render() {
    let menu = (
      <Menu onClick={(e)=> {
        this.handleMenuClick(e)
      }}>
        <Menu.Item key="createTimeAscend">时间升序</Menu.Item>
        <Menu.Item key="createTimeDescend">时间降序</Menu.Item>
      </Menu>
    );
    return (
      <PromoterAgentManager>
        <div>
          <Row gutter={24}>
            <Col lg={3} style={{marginBottom: 16}}>
              <p>排序内容：</p>
              <Select  style={{width:100}} onChange={(value)=>{
                this.filterOrderRule(value)
              }}>

                <Option value='royaltyOrder'>按提成排序</Option>
                <Option value='shopEarnOrder'>按店铺收益排序</Option>
                <Option value='inviteShopOrder'>按邀请店铺排序</Option>
                <Option value='teamNumOrder'>按团队人数排序</Option>
              </Select>
            </Col>
            <Col lg={3} style={{marginBottom: 16}}>
              <p>排序方式：</p>
              <Select defaultValue='descend' onChange={(value)=>{
                this.filterDescend(value)
              }}>
                <Option value='descend'>降序</Option>
                <Option value='ascend'>升序</Option>
              </Select>
            </Col>
            <Col lg={{offset: 0, span: 5}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择推广生活地区</p>
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择生活地区"
                onChange={(value, selectedOptions)=> {
                  this.filterLiveArea(value, selectedOptions)
                }}
              />
            </Col>
            <Col lg={{offset: 0, span:4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择代理级别</p>
              <Select style={{width:100}} onChange={(value)=>{this.filterIdentity(value)}} >
                <Option value='1'>省级代理</Option>
                <Option value='2'>市级代理</Option>
                <Option value='3'>区级代理</Option>
              </Select>
            </Col>
            <Col lg={{offset: 0, span: 5}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>选择推广代理地区</p>
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择代理地区"
                onChange={(value, selectedOptions)=> {
                  this.filterArea(value, selectedOptions)
                }}
              />
            </Col>
            <Col lg={{offset: 0, span:4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>请选择交费状态</p>
              <Select style={{width:100}} onChange={(value)=>{this.filterPayment(value)}} >
                <Option value='1'>已交费</Option>
                <Option value='0'>未交费</Option>
              </Select>
            </Col>


          </Row>
          <Row gutter={24}>
            <Col lg={{offset: 0, span: 4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>手机号码：</p>
              <Input style={{width:100}} defaultValue="" onChange={(value)=>{this.filterPhone(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>姓名：</p>
              <Input style={{width:100}} defaultValue="" onChange={(value)=>{this.filterName(value)}}/>
            </Col>
            <Col lg={{offset: 0, span:4}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>请选择推广级别</p>
              <Select style={{width:100}} onChange={(value)=>{this.filterLevel(value)}} >
                <Option value='1'>青铜级</Option>
                <Option value='2'>白银级</Option>
                <Option value='3'>黄金级</Option>
                <Option value='4'>钻石级</Option>
                <Option value='5'>皇冠级</Option>
              </Select>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最小店铺收益：</p>
              <InputNumber style={{width:100}} defaultValue = {0} min={0} onChange={(value)=>{this.filterMinShopEarnings(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最大店铺收益：</p>
              <InputNumber style={{width:100}}  defaultValue = {0} min={this.state.minShopEarnings} onChange={(value)=>{this.filterMaxShopEarnings(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最小邀请店铺数：</p>
              <InputNumber style={{width:100}} defaultValue = {0} min={0} onChange={(value)=>{this.filterMinInviteShopNum(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最大邀请店铺数：</p>
              <InputNumber style={{width:100}}  defaultValue = {0} min={this.state.minInviteShopNum} onChange={(value)=>{this.filterMaxInviteShopNum(value)}}/>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
            <p>最小提成收益：</p>
            <InputNumber style={{width:100}} defaultValue = {0} min={0} onChange={(value)=>{this.filterMinRoyaltyEarnings(value)}}/>
          </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最大提成收益：</p>
              <InputNumber style={{width:100}}  defaultValue = {0} min={this.state.minRoyaltyEarnings} onChange={(value)=>{this.filterMaxRoyaltyEarnings(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最小团队人数：</p>
              <InputNumber style={{width:100}} defaultValue = {0} min={0} onChange={(value)=>{this.filterMinTeamMemNum(value)}}/>
            </Col>
            <Col lg={{offset: 0, span: 3}} style={{marginBottom: 16, textAlign: 'left'}}>
              <p>最大团队人数：</p>
              <InputNumber style={{width:100}}  defaultValue = {0} min={this.state.minTeamMemNum} onChange={(value)=>{this.filterMaxTeamMemNum(value)}}/>
            </Col >
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

export default connect(mapStateToProps)(AddAgent)