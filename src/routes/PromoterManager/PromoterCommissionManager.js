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
  Layout,
  Alert

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
      province_agent: 0.00,
      city_agent: 0.00,
      district_agent: 0.00,
      street_agent: 0.00,
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
      invitePromoterRoyalty: 0.00,       // 推广员入驻费提成比例
      promoterCharge: 0.00,              // 推广员入驻费
      minShopkeeperCharge: 0.00,          // 店铺入驻最低费用

    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'promoterCommissionManager/query',
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

  componentDidMount() {

  }

  changeProvinceAgent(payload) {

    if ((payload + this.state.city_agent + this.state.district_agent) > 1) {
      message.error('总提成比例不能大于1')

    } else {

      if (payload > 0 && payload.toString().split(".")[1].length > 3) {
        message.error('请输入不超过小数点后3位')

      } else {
        this.setState({
          province_agent: payload
        })
      }
    }

  }

  changeCityAgent(payload) {

      if ((this.state.province_agent + payload + this.state.district_agent) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
          // this.setState({
          //   city_agent: payload.toFixed(3)
          // })
        } else {
          this.setState({
            city_agent: payload
          })
        }

    }
  }

  changeDistrictAgent(payload) {

      if ((this.state.province_agent + this.state.city_agent + payload) > 1) {
        message.error('总提成比例不能大于1')

      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
          // this.setState({
          //   district_agent: payload.toFixed(3)
          // })
        } else {
          this.setState({
            district_agent: payload
          })
        }

    }

  }

  changeStreetAgent(payload) {
    this.setState({
      street_agent: payload
    })
  }

  changeLevel1Team(payload) {
    this.setState({
      level1Team: payload
    })
  }

  changeLevel1Shop(payload) {
    this.setState({
      level1Shop: payload
    })
  }

  changeLevel1Royal1(payload) {
      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty3 + this.state.level1Royalty2 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level1Royalty1: payload
          })
        }
      }

  }

  changeLevel1Royal2(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty3 + this.state.level1Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level1Royalty2: payload
          })
        }
      }

  }

  changeLevel1Royal3(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty2 + this.state.level1Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level1Royalty3: payload
          })
        }

    }
  }

  changeLevel2Team(payload) {
    this.setState({
      level2Team: payload
    })
  }

  changeLevel2Shop(payload) {
    this.setState({
      level2Shop: payload
    })
  }

  changeLevel2Royal1(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty3 + this.state.level2Royalty2 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level2Royalty1: payload
          })
        }

    }
  }

  changeLevel2Royal2(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty3 + this.state.level2Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level2Royalty2: payload
          })
        }

    }

  }

  changeLevel2Royal3(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty2 + this.state.level2Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level2Royalty3: payload
          })
        }
      }


  }

  changeLevel3Team(payload) {
    this.setState({
      level3Team: payload
    })
  }

  changeLevel3Shop(payload) {
    this.setState({
      level3Shop: payload
    })
  }

  changeLevel3Royal1(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty2 + this.state.level3Royalty3 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level3Royalty1: payload
          })
        }
      }

  }

  changeLevel3Royal2(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty1 + this.state.level3Royalty3 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level3Royalty2: payload
          })
        }

    }
  }

  changeLevel3Royal3(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty1 + this.state.level3Royalty2 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level3Royalty3: payload
          })

      }
    }

  }

  changeLevel4Team(payload) {
    this.setState({
      level4Team: payload
    })
  }

  changeLevel4Shop(payload) {
    this.setState({
      level4Shop: payload
    })
  }

  changeLevel4Royal1(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty3 + this.state.level4Royalty2 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level4Royalty1: payload
          })
        }

    }
  }

  changeLevel4Royal2(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty3 + this.state.level4Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level4Royalty2: payload
          })
        }

    }
  }

  changeLevel4Royal3(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty2 + this.state.level4Royalty1 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level4Royalty3: payload
          })
        }
      }


  }

  changeLevel5Team(payload) {
    this.setState({
      level5Team: payload
    })
  }

  changeLevel5Shop(payload) {
    this.setState({
      level5Shop: payload
    })
  }

  changeLevel5Royal1(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty2 + this.state.level5Royalty3 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level5Royalty1: payload
          })
        }

    }
  }

  changeLevel5Royal2(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty1 + this.state.level5Royalty3 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level5Royalty2: payload
          })
        }
      }


  }

  changeLevel5Royal3(payload) {

      if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty1 + this.state.level5Royalty2 + payload) > 1) {
        message.error('总提成比例不能大于1')
      } else {
        if (payload > 0 && payload.toString().split(".")[1].length > 3) {
          message.error('请输入不超过小数点后3位')
        } else {
          this.setState({
            level5Royalty3: payload
          })
        }
      }


  }

  changeInvitePromoterRoyalty(payload) {
    // console.log('hahahahahahah',payload)
    console.log('payload',payload)

      if(payload>1){
        message.error('提成比例不能大于1')
      }else{
        if(payload>0&&payload.toString().split(".")[1].length>3){
          message.error('请输入不超过小数点后3位')

        }else{
          this.setState({
            invitePromoterRoyalty: payload
          })
        }


    }


    // console.log('state', this.state.invitePromoterRoyalty)
  }

  changePromoterCharge(payload) {

      this.setState({
        promoterCharge: payload
      })


  }

  changeMinShopkeeperCharge(payload) {
    this.setState({
      minShopkeeperCharge: payload
    })
  }

  sumbit() {
    // console.log('here is code')
    let record = {
      promoterSysCfg: {
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
            royalty: [this.state.level1Royalty1, this.state.level1Royalty2, this.state.level1Royalty3]
          },
          promoter_level_2: {
            team: this.state.level2Team,
            shop: this.state.level2Shop,
            royalty: [this.state.level2Royalty1, this.state.level2Royalty2, this.state.level2Royalty3]
          },
          promoter_level_3: {
            team: this.state.level3Team,
            shop: this.state.level3Shop,
            royalty: [this.state.level3Royalty1, this.state.level3Royalty2, this.state.level3Royalty3]
          },
          promoter_level_4: {
            team: this.state.level4Team,
            shop: this.state.level4Shop,
            royalty: [this.state.level4Royalty1, this.state.level4Royalty2, this.state.level4Royalty3]
          },
          promoter_level_5: {
            team: this.state.level5Team,
            shop: this.state.level5Shop,
            royalty: [this.state.level5Royalty1, this.state.level5Royalty2, this.state.level5Royalty3]
          },
        },
        invitePromoterRoyalty: this.state.invitePromoterRoyalty,       // 推广员入驻费提成比例
        promoterCharge: this.state.promoterCharge,              // 推广员入驻费
        minShopkeeperCharge: this.state.minShopkeeperCharge,          // 店铺入驻最低费用
      }
    }
    // console.log('sumbit', record)
    this.props.dispatch({
      type: 'promoterCommissionManager/submitCommissionCof',
      payload: {
        ...record,
        success: function () {
          message.success('提交成功')
        }
      }
    })
  }

  render() {
    // console.log('hahahaha', {...this.state})
    // console.log('state.',this.state.province_agent)
    let provinceAgent = this.state.province_agent
    if(this.state.province_agent==''||this.state.province_agent=='0.0'){
      provinceAgent=0
    }
    let cityAgent = this.state.city_agent
    if(this.state.city_agent=='0.0'||this.state.city_agent==''){
      cityAgent=0
    }
    let districtAgent = this.state.district_agent
    if(this.state.district_agent=='0.0'||this.state.district_agent==''){
      districtAgent=0
    }
    let countCom = (provinceAgent +cityAgent + districtAgent).toFixed(3)
    return (
      <div style={{flex: 1}}>
        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20, flex: 1}}>
          <Row type='flex' align='left' justify='center'>
            <Col span={1}><Icon type='star'/></Col>
            <Col span={19}><p style={{fontSize: 17}}>基本设置</p></Col>
            <Col span={4}> <Button size='large' type="primary" onClick={()=> {
              this.sumbit()
            }}>提交配置清单</Button></Col>


          </Row>

          <div>推广员入驻费提成比例:<InputNumber
                                    //formatter={value =>`${value }%` }
                                      // parser={value => value.replace('%', '')} min={0} max={1} step={0.001}
                                       value={this.state.invitePromoterRoyalty}

                                       onChange={(payload)=> {
                                         this.changeInvitePromoterRoyalty(payload)
                                       }}/></div>

          <div>推广员入驻费: <InputNumber
                                    min={0}
                                    step={0.01}
                                    value={this.state.promoterCharge}
                                    onChange={(payload)=> {
                                      this.changePromoterCharge(payload)
                                    }}/>
          </div>

          <div>店铺入驻最低费用: <InputNumber step={0.01}
                                      min={0}
                                      value={this.state.minShopkeeperCharge}
                                      onChange={(payload)=> {
                                        this.changeMinShopkeeperCharge(payload)
                                      }}/>
          </div>

        </div>

        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>
          <Row type='flex' align='left' justify='center'>
            <Col span={1}><Icon type='star'/></Col>
            <Col span={23}><p style={{fontSize: 17}}>地区总代理提成配置</p></Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>省代理提成：<InputNumber
                                                                              min={0} max={1} step={0.001}
                                                                              value={this.state.province_agent}
                                                                              onChange={(payload)=> {
                                                                                this.changeProvinceAgent(payload)
                                                                              }}/></div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>市代理提成：<InputNumber
                                                                              value={this.state.city_agent}
                                                                              onChange={(payload)=> {
                                                                                this.changeCityAgent(payload)
                                                                              }}/></div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>区代理提成：<InputNumber
                                                                              value={this.state.district_agent}
                                                                              onChange={(payload)=> {
                                                                                this.changeDistrictAgent(payload)
                                                                              }}/></div>
            </Col>


          </Row>
          {/*<div style={{marginTop: 1, marginBottom: 1}}>街道代理提成：<InputNumber formatter={(value) =>{ ` ${value*100}%`}} parser={value => value.replace('%', '')} min={0} max={1} step={0.01}*/}
          {/*value={this.state.street_agent}*/}
          {/*onChange={(payload)=> {*/}
          {/*this.changeStreetAgent(payload)*/}
          {/*}}/></div>*/}
          <div style={{
            marginTop: 1,
            marginBottom: 1
          }}>{'总计:' + countCom}</div>

        </div>

        <div style={{borderWidth: 1, borderColor: '#FFFFFF', marginBottom: 20}}><Row type='flex' align='left'
                                                                                     justify='center'>
          <Col span={1}><Icon type='star'/></Col>
          <Col span={23}><p style={{fontSize: 17}}>推广员绩效收益方式</p></Col>
        </Row>
          <div className={style.table} style={{flex: 1}}>
            <Row type='flex' align='middle' justify='center' className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}><p>推广员</p></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>青铜级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>白银级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>黄金级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>钻石级</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}>皇冠级</div>
              </Col>
            </Row>
            <Row className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}>邀请成员数</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level1Team}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel1Team(payload)
                  }}/></div>

              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level2Team}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel2Team(payload)
                  }}/></div>

              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  min={0}
                  value={this.state.level3Team}
                  onChange={(payload)=> {
                    this.changeLevel3Team(payload)
                  }}/></div>

              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  min={0}
                  value={this.state.level4Team}
                  onChange={(payload)=> {
                    this.changeLevel4Team(payload)
                  }}/></div>

              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level5Team}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel5Team(payload)
                  }}/></div>

              </Col>
            </Row>
            <Row className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}>邀请店铺数</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level1Shop}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel1Shop(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level2Shop}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel2Shop(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level3Shop}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel3Shop(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level4Shop}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel4Shop(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  value={this.state.level5Shop}
                  min={0}
                  onChange={(payload)=> {
                    this.changeLevel5Shop(payload)
                  }}/></div>
              </Col>
            </Row>
            <Row className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}>邀请店铺提成比例</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level1Royalty1}
                                                           onChange={(payload)=> {
                                                             this.changeLevel1Royal1(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                 min={0} max={1} step={0.001}
                                                           value={this.state.level2Royalty1}
                                                           onChange={(payload)=> {
                                                             this.changeLevel2Royal1(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level3Royalty1}
                                                           onChange={(payload)=> {
                                                             this.changeLevel3Royal1(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level4Royalty1}
                                                           onChange={(payload)=> {
                                                             this.changeLevel4Royal1(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level5Royalty1}
                                                           onChange={(payload)=> {
                                                             this.changeLevel5Royal1(payload)
                                                           }}/></div>
              </Col>
            </Row>
            <Row className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}>一级成员邀请店铺提成比例</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level1Royalty2}
                                                           onChange={(payload)=> {
                                                             this.changeLevel1Royal2(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level2Royalty2}
                                                           onChange={(payload)=> {
                                                             this.changeLevel2Royal2(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level3Royalty2}
                                                           onChange={(payload)=> {
                                                             this.changeLevel3Royal2(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level4Royalty2}
                                                           onChange={(payload)=> {
                                                             this.changeLevel4Royal2(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level5Royalty2}
                                                           onChange={(payload)=> {
                                                             this.changeLevel5Royal2(payload)
                                                           }}/></div>
              </Col>
            </Row>
            <Row className={style.divRow}>
              <Col span={4}>
                <div className={style.divCol}>二级成员邀请店铺提成比例</div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber min={0} max={1} step={0.001}
                                                           value={this.state.level1Royalty3}
                                                           onChange={(payload)=> {
                                                             this.changeLevel1Royal3(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level2Royalty3}
                                                           onChange={(payload)=> {
                                                             this.changeLevel2Royal3(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber  min={0} max={1} step={0.001}
                                                           value={this.state.level3Royalty3}
                                                           onChange={(payload)=> {
                                                             this.changeLevel3Royal3(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                                                           min={0} max={1} step={0.001}
                                                           value={this.state.level4Royalty3}
                                                           onChange={(payload)=> {
                                                             this.changeLevel4Royal3(payload)
                                                           }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                                                           min={0} max={1} step={0.001}
                                                           value={this.state.level5Royalty3}
                                                           onChange={(payload)=> {
                                                             this.changeLevel5Royal3(payload)
                                                           }}/></div>
              </Col>
            </Row>

          </div>
        </div>

      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let commissionCof = getCommissionCof(state)
  return {commissionCof: commissionCof}
}
export default connect(mapStateToProps)(PromoterCommissionManager)