/**
 * Created by lilu on 2017/3/29.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {getCommissionCof} from '../../selector/PromoterManager/PromoterCommissionSelector'
import {
  Radio,
  Checkbox,
  InputNumber,
  Select,
  Tag,
  Cascader,
  TreeSelect,
  Button,
  Upload,
  message,
  Tabs,
  Input,
  DatePicker,
  Row,
  Col,
  Menu,
  Dropdown,
  Icon,
  Layout
} from 'antd'
import style from './PromoterCommissionManager.less'

const defaultPromoterConfig = {
  agentTable: {
    province_agent: 0.1,
    city_agent: 0.2,
    district_agent: 0.3,
    street_agent: 0.4
  },
  upgradeTable: {
    promoter_level_1: {
      team: 100,
      shop: 200,
      royalty: [0.5, 0.1, 0.02]
    },
    promoter_level_2: {
      team: 500,
      shop: 1000,
      royalty: [0.5, 0.12, 0.02]
    },
    promoter_level_3: {
      team: 1000,
      shop: 3000,
      royalty: [0.5, 0.14, 0.02]
    },
    promoter_level_4: {
      team: 5000,
      shop: 10000,
      royalty: [0.5, 0.16, 0.02]
    },
    promoter_level_5: {
      team: 10000,
      shop: 30000,
      royalty: [0.5, 0.18, 0.02]
    },
  },
  invitePromoterRoyalty: 0.2,
}
class PromoterCommissionManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      province_agent: 0,
      city_agent: 0,
      district_agent: 0,
      street_agent: 0,
      level1Team: 100,
      level1Shop: 200,
      level1Royalty1: 0.5,
      level1Royalty2: 0.1,
      level1Royalty3: 0.02,
      level2Team: 100,
      level2Shop: 200,
      level2Royalty1: 0.5,
      level2Royalty2: 0.1,
      level2Royalty3: 0.02,
      level3Team: 100,
      level3Shop: 200,
      level3Royalty1: 0.5,
      level3Royalty2: 0.1,
      level3Royalty3: 0.02,
      level4Team: 100,
      level4Shop: 200,
      level4Royalty1: 0.5,
      level4Royalty2: 0.1,
      level4Royalty3: 0.02,
      level5Team: 100,
      level5Shop: 200,
      level5Royalty1: 0.5,
      level5Royalty2: 0.1,
      level5Royalty3: 0.02,
      invitePromoterRoyalty: 0,       // 推广员入驻费提成比例
      promoterCharge: 0,              // 推广员入驻费
      minShopkeeperCharge: 0,          // 店铺入驻最低费用

    }
  }
  componentDidMount(){
    this.props.dispatch({
      type:'promoterCommissionManager/query',
    })
    this.setState({
      province_agent: this.props.commissionCof.agentTable.province_agent,
      city_agent: this.props.commissionCof.agentTable.city_agent,
      district_agent: this.props.commissionCof.agentTable.district_agent,
      street_agent: this.props.commissionCof.agentTable.street_agent,
      level1Team: this.props.commissionCof.upgradeTable.promoter_level_1.team,
      level1Shop: this.props.commissionCof.upgradeTable.promoter_level_1.shop,
      level1Royalty1: this.props.commissionCof.upgradeTable.promoter_level_1.royalty[0],
      level1Royalty2: this.props.commissionCof.upgradeTable.promoter_level_1.royalty[1],
      level1Royalty3: this.props.commissionCof.upgradeTable.promoter_level_1.royalty[2],
      level2Team: this.props.commissionCof.upgradeTable.promoter_level_2.team,
      level2Shop: this.props.commissionCof.upgradeTable.promoter_level_2.shop,
      level2Royalty1: this.props.commissionCof.upgradeTable.promoter_level_2.royalty[0],
      level2Royalty2: this.props.commissionCof.upgradeTable.promoter_level_2.royalty[1],
      level2Royalty3: this.props.commissionCof.upgradeTable.promoter_level_2.royalty[2],
      level3Team: this.props.commissionCof.upgradeTable.promoter_level_3.team,
      level3Shop: this.props.commissionCof.upgradeTable.promoter_level_3.shop,
      level3Royalty1: this.props.commissionCof.upgradeTable.promoter_level_3.royalty[0],
      level3Royalty2: this.props.commissionCof.upgradeTable.promoter_level_3.royalty[1],
      level3Royalty3: this.props.commissionCof.upgradeTable.promoter_level_3.royalty[2],
      level4Team: this.props.commissionCof.upgradeTable.promoter_level_4.team,
      level4Shop: this.props.commissionCof.upgradeTable.promoter_level_4.shop,
      level4Royalty1: this.props.commissionCof.upgradeTable.promoter_level_4.royalty[0],
      level4Royalty2: this.props.commissionCof.upgradeTable.promoter_level_4.royalty[1],
      level4Royalty3: this.props.commissionCof.upgradeTable.promoter_level_4.royalty[2],
      level5Team: this.props.commissionCof.upgradeTable.promoter_level_5.team,
      level5Shop: this.props.commissionCof.upgradeTable.promoter_level_5.shop,
      level5Royalty1: this.props.commissionCof.upgradeTable.promoter_level_5.royalty[0],
      level5Royalty2: this.props.commissionCof.upgradeTable.promoter_level_5.royalty[1],
      level5Royalty3: this.props.commissionCof.upgradeTable.promoter_level_5.royalty[2],
      invitePromoterRoyalty: this.props.commissionCof.invitePromoterRoyalty,       // 推广员入驻费提成比例
      promoterCharge: this.props.commissionCof.promoterCharge,              // 推广员入驻费
      minShopkeeperCharge: this.props.commissionCof.minShopkeeperCharge,          // 店铺入驻最低费用

    })
  }
  changeProvinceAgent(payload) {
    this.setState({
      province_agent: payload
    })
  }

  changeCityAgent(payload) {
    this.setState({
      city_agent: payload
    })
  }

  changeDistrictAgent(payload) {
    this.setState({
      district_agent: payload
    })
  }

  changeStreetAgent(payload) {
    this.setState({
      street_agent: payload
    })
  }
  changeLevel1Team(payload){
    this.setState({
      level1Team: payload
    })
  }
  changeLevel1Shop(payload){
    this.setState({
      level1Shop: payload
    })
  }
  changeLevel1Royal1(payload){
    this.setState({
      level1Royalty1: payload
    })
  }
  changeLevel1Royal2(payload){
    this.setState({
      level1Royalty2: payload
    })
  }
  changeLevel1Royal3(payload){
    this.setState({
      level1Royalty3: payload
    })
  }
  changeLevel2Team(payload){
    this.setState({
      level2Team: payload
    })
  }
  changeLevel2Shop(payload){
    this.setState({
      level2Shop: payload
    })
  }
  changeLevel2Royal1(payload){
    this.setState({
      level2Royalty1: payload
    })
  }
  changeLevel2Royal2(payload){
    this.setState({
      level2Royalty2: payload
    })
  }
  changeLevel2Royal3(payload){
    this.setState({
      level2Royalty3: payload
    })
  }
  changeLevel3Team(payload){
    this.setState({
      level3Team: payload
    })
  }
  changeLevel3Shop(payload){
    this.setState({
      level3Shop: payload
    })
  }
  changeLevel3Royal1(payload){
    this.setState({
      level3Royalty1: payload
    })
  }
  changeLevel1Royal2(payload){
    this.setState({
      level3Royalty2: payload
    })
  }
  changeLevel3Royal3(payload){
    this.setState({
      level3Royalty3: payload
    })
  }
  changeLevel4Team(payload){
    this.setState({
      level4Team: payload
    })
  }
  changeLevel4Shop(payload){
    this.setState({
      level4Shop: payload
    })
  }
  changeLevel4Royal1(payload){
    this.setState({
      level4Royalty1: payload
    })
  }
  changeLevel4Royal2(payload){
    this.setState({
      level4Royalty2: payload
    })
  }
  changeLevel1Royal3(payload){
    this.setState({
      level4Royalty3: payload
    })
  }
  changeLevel5Team(payload){
    this.setState({
      level5Team: payload
    })
  }
  changeLevel5Shop(payload){
    this.setState({
      level5Shop: payload
    })
  }
  changeLevel5Royal1(payload){
    this.setState({
      level5Royalty1: payload
    })
  }
  changeLevel5Royal2(payload){
    this.setState({
      level5Royalty2: payload
    })
  }
  changeLevel5Royal3(payload){
    this.setState({
      level5Royalty3: payload
    })
  }
  changeInvitePromoterRoyalty(payload){
    this.setState({
      level5Royalty3: payload
    })
  }
  changePromoterCharge(payload){
    this.setState({
      promoterCharge: payload
    })
  }
  changeMinShopkeeperCharge(payload){
    this.setState({
      minShopkeeperCharge: payload
    })
  }
  sumbit(){
    console.log('here is code')
    let record={
      promoterSysCfg:{
        agentTable: {
          province_agent: this.state.province_agent,
          city_agent: this.state.city_agent,
          district_agent: this.state.district_agent,
          street_agent: this.state.street_agent
        },
        upgradeTable: {
          promoter_level_1: {
            team: this.state.level1Team,
            shop: this.state.level1Shop,
            royalty: [this.state.level1Royalty1,this.state.level1Royalty2, this.state.level1Royalty3]
          },
          promoter_level_2: {
            team: this.state.level2Team,
            shop: this.state.level2Shop,
            royalty: [this.state.level2Royalty1,this.state.level2Royalty2, this.state.level2Royalty3]
          },
          promoter_level_3:{
            team: this.state.level3Team,
            shop: this.state.level3Shop,
            royalty: [this.state.level3Royalty1,this.state.level3Royalty2, this.state.level3Royalty3]
          },
          promoter_level_4: {
            team: this.state.level4Team,
            shop: this.state.level4Shop,
            royalty: [this.state.level4Royalty1,this.state.level4Royalty2, this.state.level4Royalty3]
          },
          promoter_level_5: {
            team: this.state.level5Team,
            shop: this.state.level5Shop,
            royalty: [this.state.level5Royalty1,this.state.level5Royalty2, this.state.level5Royalty3]
          },
        },
        invitePromoterRoyalty: this.state.invitePromoterRoyalty,       // 推广员入驻费提成比例
        promoterCharge: this.state.promoterCharge,              // 推广员入驻费
        minShopkeeperCharge: this.state.minShopkeeperCharge,          // 店铺入驻最低费用
      }
    }
    console.log('sumbit',record)
    this.props.dispatch({
      type:'promoterCommissionManager/submitCommissionCof',
      payload:record
    })
  }
  render() {
    console.log('hahahaha', {...this.state})

    return (
      <div>
        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}><p style={{fontSize: 17}}>地区代理提成配置</p>
          <div style={{marginTop: 1, marginBottom: 1}}>省代理提成：<InputNumber formatter={value => ` ${value*100}%`}
                                                                          value={this.state.province_agent}
                                                                           onChange={(payload)=> {
            this.changeProvinceAgent(payload)
          }}></InputNumber></div>
          <div style={{marginTop: 1, marginBottom: 1}}>市代理提成：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                          value={this.state.city_agent}
                                                                           onChange={(payload)=> {
            this.changeCityAgent(payload)
          }}></InputNumber></div>
          <div style={{marginTop: 1, marginBottom: 1}}>区代理提成：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                          value={this.state.district_agent}
                                                                           onChange={(payload)=> {
            this.changeDistrictAgent(payload)
          }}></InputNumber></div>
          <div style={{marginTop: 1, marginBottom: 1}}>街道代理提成：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                           value={this.state.street_agent}
                                                                            onChange={(payload)=> {
            this.changeStreetAgent(payload)
          }}></InputNumber></div>
        </div>
        <div style={{borderWidth: 1, borderColor: '#FFFFFF', marginBottom: 20}}><p style={{fontSize: 17}}>推广员绩效收益方式</p>
          <div className={style.table}>
          <Row >
            <Col span={4}>
              <div className={style.divCol}></div>
            </Col>
            <Col span={20}>
              <div className={style.divCol}>收益</div>
            </Col>
          </Row>
            <Row >
              <Col span={4}>
                <div className={style.divCol}>分级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>人数：<InputNumber
                  value={this.state.level1Team}
                                                              onChange={(payload)=> {
                                                                this.changeLevel1Team(payload)
                                                              }}></InputNumber></div>
                <div className={style.divCol}>店铺数：<InputNumber
                  value={this.state.level1Shop}
                                                               onChange={(payload)=> {
                                                                 this.changeLevel1Shop(payload)
                                                               }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>人数：<InputNumber
                  value={this.state.level2Team}
                  onChange={(payload)=> {
                    this.changeLevel2Team(payload)
                  }}></InputNumber></div>
                <div className={style.divCol}>店铺数：<InputNumber
                  value={this.state.level2Shop}
                  onChange={(payload)=> {
                    this.changeLevel2Shop(payload)
                  }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>人数：<InputNumber
                  value={this.state.level3Team}
                  onChange={(payload)=> {
                    this.changeLevel3Team(payload)
                  }}></InputNumber></div>
                <div className={style.divCol}>店铺数：<InputNumber
                  value={this.state.level3Shop}
                  onChange={(payload)=> {
                    this.changeLevel3Shop(payload)
                  }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>人数：<InputNumber
                  value={this.state.level4Team}
                  onChange={(payload)=> {
                    this.changeLevel4Team(payload)
                  }}></InputNumber></div>
                <div className={style.divCol}>店铺数：<InputNumber
                  value={this.state.level4Shop}
                  onChange={(payload)=> {
                    this.changeLevel4Shop(payload)
                  }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>人数：<InputNumber
                  value={this.state.level5Team}
                  onChange={(payload)=> {
                    this.changeLevel5Team(payload)
                  }}></InputNumber></div>
                <div className={style.divCol}>店铺数：<InputNumber
                  value={this.state.level5Shop}
                  onChange={(payload)=> {
                    this.changeLevel5Shop(payload)
                  }}></InputNumber></div>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <div className={style.divCol}>1级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level1Royalty1}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel1Royal1(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level2Royalty1}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel2Royal1(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level3Royalty1}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel3Royal1(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level4Royalty1}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel4Royal1(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level5Royalty1}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel5Royal1(payload)
                                                                }}></InputNumber></div>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <div className={style.divCol}>2级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level1Royalty2}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel1Royal2(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level2Royalty2}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel2Royal2(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level3Royalty2}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel3Royal2(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level4Royalty2}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel4Royal2(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level5Royalty2}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel5Royal2(payload)
                                                                }}></InputNumber></div>
              </Col>
            </Row>
            <Row >
              <Col span={4}>
                <div className={style.divCol}>3级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level1Royalty3}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel1Royal3(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level2Royalty3}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel2Royal3(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level3Royalty3}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel3Royal3(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level4Royalty3}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel4Royal3(payload)
                                                                }}></InputNumber></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>提成比例：<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                                                value={this.state.level5Royalty3}
                                                                onChange={(payload)=> {
                                                                  this.changeLevel5Royal3(payload)
                                                                }}></InputNumber></div>
              </Col>
            </Row>
            <div>推广员入驻费提成比例:<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                         value={this.state.invitePromoterRoyalty}
                                         onChange={(payload)=> {
                                           this.changeInvitePromoterRoyalty(payload)
                                         }}></InputNumber></div>
            <div>推广员入驻费:<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                     value={this.state.promoterCharge}
                                     onChange={(payload)=> {
                                       this.changePromoterCharge(payload)
                                     }}></InputNumber></div>
            <div>店铺入驻最低费用:<InputNumber formatter={(value) =>{ ` ${value*100}%`}}
                                       value={this.state.minShopkeeperCharge}
                                       onChange={(payload)=> {
                                         this.changeMinShopkeeperCharge(payload)
                                       }}></InputNumber></div>
          </div>
        </div>
        <Button size='large'  onClick={()=>{
          this.sumbit()
        }}>提交配置清单</Button>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let commissionCof=getCommissionCof(state)
  return {commissionCof:commissionCof}
}
export default connect(mapStateToProps)(PromoterCommissionManager)