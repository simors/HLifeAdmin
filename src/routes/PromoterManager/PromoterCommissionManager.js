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
      invitePromoterRoyalty1: 0.01,       // 推广员入驻费提成比例
      invitePromoterRoyalty2: 0.02,       // 推广员入驻费提成比例
      invitePromoterRoyalty3: 0.03,       // 推广员入驻费提成比例
      promoterCharge: 0.00,              // 推广员入驻费
      minShopkeeperCharge: 0.00,          // 店铺入驻最低费用

    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'promoterCommissionManager/query',
    })
  }

  componentDidMount() {

    if (this.props.commissionCof && this.props.commissionCof.agentTable) {
      console.log('here is comissionCOf', this.props.commissionCof)

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
        invitePromoterRoyalty1: this.props.commissionCof.invitePromoterRoyalty[0],       // 推广员入驻费提成比例
        invitePromoterRoyalty2: this.props.commissionCof.invitePromoterRoyalty[1],       // 推广员入驻费提成比例
        invitePromoterRoyalty3: this.props.commissionCof.invitePromoterRoyalty[2],       // 推广员入驻费提成比例
        promoterCharge: this.props.commissionCof.promoterCharge,              // 推广员入驻费
        minShopkeeperCharge: this.props.commissionCof.minShopkeeperCharge,          // 店铺入驻最低费用
      })
    }

  }

  changeProvinceAgent(payload) {
    var ratio = payload == 0? 0: payload/100

    var amount_level_1 = this.state.level1Royalty1 + this.state.level1Royalty2 + this.state.level1Royalty3 + this.state.city_agent + this.state.district_agent + ratio
    var amount_level_2 = this.state.level2Royalty1 + this.state.level2Royalty2 + this.state.level2Royalty3 + this.state.city_agent + this.state.district_agent + ratio
    var amount_level_3 = this.state.level3Royalty1 + this.state.level3Royalty2 + this.state.level3Royalty3 + this.state.city_agent + this.state.district_agent + ratio
    var amount_level_4 = this.state.level4Royalty1 + this.state.level4Royalty2 + this.state.level4Royalty3 + this.state.city_agent + this.state.district_agent + ratio
    var amount_level_5 = this.state.level5Royalty1 + this.state.level5Royalty2 + this.state.level5Royalty3 + this.state.city_agent + this.state.district_agent + ratio

    if ( amount_level_1 > 1 ||amount_level_2 > 1 ||amount_level_3 > 1 ||amount_level_4 > 1 ||amount_level_5 > 1 ) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        province_agent: Number(ratio.toFixed(3))
      })
    }
  }

  changeCityAgent(payload) {
    var ratio = payload == 0? 0: payload/100

    var amount_level_1 = this.state.level1Royalty1 + this.state.level1Royalty2 + this.state.level1Royalty3 + this.state.province_agent + this.state.district_agent + ratio
    var amount_level_2 = this.state.level2Royalty1 + this.state.level2Royalty2 + this.state.level2Royalty3 + this.state.province_agent + this.state.district_agent + ratio
    var amount_level_3 = this.state.level3Royalty1 + this.state.level3Royalty2 + this.state.level3Royalty3 + this.state.province_agent + this.state.district_agent + ratio
    var amount_level_4 = this.state.level4Royalty1 + this.state.level4Royalty2 + this.state.level4Royalty3 + this.state.province_agent + this.state.district_agent + ratio
    var amount_level_5 = this.state.level5Royalty1 + this.state.level5Royalty2 + this.state.level5Royalty3 + this.state.province_agent + this.state.district_agent + ratio

    if ( amount_level_1 > 1 ||amount_level_2 > 1 ||amount_level_3 > 1 ||amount_level_4 > 1 ||amount_level_5 > 1 ) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        city_agent: Number(ratio.toFixed(3))
      })
    }
  }

  changeDistrictAgent(payload) {
    console.log("changeDistrictAgent payload", payload)
    var ratio = payload == 0? 0: payload/100

    var amount_level_1 = this.state.level1Royalty1 + this.state.level1Royalty2 + this.state.level1Royalty3 + this.state.province_agent + this.state.city_agent + ratio
    var amount_level_2 = this.state.level2Royalty1 + this.state.level2Royalty2 + this.state.level2Royalty3 + this.state.province_agent + this.state.city_agent + ratio
    var amount_level_3 = this.state.level3Royalty1 + this.state.level3Royalty2 + this.state.level3Royalty3 + this.state.province_agent + this.state.city_agent + ratio
    var amount_level_4 = this.state.level4Royalty1 + this.state.level4Royalty2 + this.state.level4Royalty3 + this.state.province_agent + this.state.city_agent + ratio
    var amount_level_5 = this.state.level5Royalty1 + this.state.level5Royalty2 + this.state.level5Royalty3 + this.state.province_agent + this.state.city_agent + ratio

    if ( amount_level_1 > 1 ||amount_level_2 > 1 ||amount_level_3 > 1 ||amount_level_4 > 1 ||amount_level_5 > 1 ) {
      message.error('总提成比例不能大于1')
    } else {
      console.log("setState this.state.district_agent:", Number(ratio.toFixed(3)))
      this.setState({
        district_agent: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel1Team(payload) {
    this.setState({
      level1Team: parseInt(payload)
    })
  }

  changeLevel1Shop(payload) {
    this.setState({
      level1Shop: parseInt(payload)
    })
  }

  changeLevel1Royal1(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty3 + this.state.level1Royalty2 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level1Royalty1: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel1Royal2(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty3 + this.state.level1Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level1Royalty2: Number(ratio.toFixed(3))
      })
    }

  }

  changeLevel1Royal3(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level1Royalty2 + this.state.level1Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level1Royalty3: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel2Team(payload) {
    this.setState({
      level2Team: parseInt(payload)
    })
  }

  changeLevel2Shop(payload) {
    this.setState({
      level2Shop: parseInt(payload)
    })
  }

  changeLevel2Royal1(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty3 + this.state.level2Royalty2 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level2Royalty1:  Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel2Royal2(payload) {
  var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty3 + this.state.level2Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level2Royalty2: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel2Royal3(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level2Royalty2 + this.state.level2Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level2Royalty3: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel3Team(payload) {
    this.setState({
      level3Team: parseInt(payload)
    })
  }

  changeLevel3Shop(payload) {
    this.setState({
      level3Shop: parseInt(payload)
    })
  }

  changeLevel3Royal1(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty2 + this.state.level3Royalty3 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level3Royalty1: Number(ratio.toFixed(3))
      })
    }

  }

  changeLevel3Royal2(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty1 + this.state.level3Royalty3 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level3Royalty2: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel3Royal3(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level3Royalty1 + this.state.level3Royalty2 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level3Royalty3: Number(ratio.toFixed(3))
      })
    }

  }

  changeLevel4Team(payload) {
    this.setState({
      level4Team: parseInt(payload)
    })
  }

  changeLevel4Shop(payload) {
    this.setState({
      level4Shop: parseInt(payload)
    })
  }

  changeLevel4Royal1(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty3 + this.state.level4Royalty2 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level4Royalty1: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel4Royal2(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty3 + this.state.level4Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level4Royalty2: Number(ratio.toFixed(3))
      })

    }
  }

  changeLevel4Royal3(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level4Royalty2 + this.state.level4Royalty1 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level4Royalty3: Number(ratio.toFixed(3))
      })
    }


  }

  changeLevel5Team(payload) {
    this.setState({
      level5Team: parseInt(payload)
    })
  }

  changeLevel5Shop(payload) {
    this.setState({
      level5Shop: parseInt(payload)
    })
  }

  changeLevel5Royal1(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty2 + this.state.level5Royalty3 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level5Royalty1: Number(ratio.toFixed(3))
      })
    }
  }

  changeLevel5Royal2(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty1 + this.state.level5Royalty3 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level5Royalty2: Number(ratio.toFixed(3))
      })
    }


  }

  changeLevel5Royal3(payload) {
    var ratio = payload == 0? 0: payload/100

    if ((this.state.province_agent + this.state.city_agent + this.state.district_agent + this.state.level5Royalty1 + this.state.level5Royalty2 + ratio) > 1) {
      message.error('总提成比例不能大于1')
    } else {
      this.setState({
        level5Royalty3:  Number(ratio.toFixed(3))
      })
    }


  }

  changeInvitePromoterRoyalty1(payload) {
    var ratio = payload == 0? 0: payload/100
    if((this.state.invitePromoterRoyalty2+this.state.invitePromoterRoyalty3+ratio)>1){
      message.error('总提成比例不能大于1')
    }else{
      this.setState({
        invitePromoterRoyalty1: Number(ratio.toFixed(3))
      })
    }

  }
  changeInvitePromoterRoyalty2(payload) {
    var ratio = payload == 0? 0: payload/100
    if((this.state.invitePromoterRoyalty1+this.state.invitePromoterRoyalty3+ratio)>1){
     message.error('总提成比例不能大于1')
    }else{
      this.setState({
        invitePromoterRoyalty2: Number(ratio.toFixed(3))
      })
    }
  }
  changeInvitePromoterRoyalty3(payload) {
    var ratio = payload == 0? 0: payload/100
    if((this.state.invitePromoterRoyalty2+this.state.invitePromoterRoyalty1+ratio)>1){
      message.error('总提成比例不能大于1')
    }else{
      this.setState({
        invitePromoterRoyalty3: Number(ratio.toFixed(3))
      })
    }
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

  submit() {


    var amount_level_1 = this.state.level1Royalty1 + this.state.level1Royalty2 + this.state.level1Royalty3 + this.state.city_agent + this.state.district_agent + this.state.promoterCharge
    var amount_level_2 = this.state.level2Royalty1 + this.state.level2Royalty2 + this.state.level2Royalty3 + this.state.city_agent + this.state.district_agent + this.state.promoterCharge
    var amount_level_3 = this.state.level3Royalty1 + this.state.level3Royalty2 + this.state.level3Royalty3 + this.state.city_agent + this.state.district_agent + this.state.promoterCharge
    var amount_level_4 = this.state.level4Royalty1 + this.state.level4Royalty2 + this.state.level4Royalty3 + this.state.city_agent + this.state.district_agent + this.state.promoterCharge
    var amount_level_5 = this.state.level5Royalty1 + this.state.level5Royalty2 + this.state.level5Royalty3 + this.state.city_agent + this.state.district_agent + this.state.promoterCharge

    if(amount_level_1 > 1) {
      message.error('青铜级:总提成比例不能大于1')
      return
    } else if(amount_level_2 > 1) {
      message.error('白银级:总提成比例不能大于1')
      return
    } else if(amount_level_3 > 1) {
      message.error('黄金级:总提成比例不能大于1')
      return
    } else if(amount_level_4 > 1) {
      message.error('钻石级:总提成比例不能大于1')
      return
    } else if(amount_level_5 > 1) {
      message.error('皇冠级:总提成比例不能大于1')
      return
    }

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
        invitePromoterRoyalty: [this.state.invitePromoterRoyalty1,this.state.invitePromoterRoyalty2,this.state.invitePromoterRoyalty3],       // 推广员入驻费提成比例
        promoterCharge: this.state.promoterCharge,              // 推广员入驻费
        minShopkeeperCharge: this.state.minShopkeeperCharge,          // 店铺入驻最低费用
      }
    }
    // console.log('submit', record)
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
    var amount = ((this.state.province_agent + this.state.city_agent + this.state.district_agent) * 100).toFixed(1)
    return (
      <div style={{flex: 1}}>
        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20, flex: 1}}>
          <Row type='flex' align='left' justify='center'>
            <Col span={20}></Col>
            <Col span={4}> <Button size='large' type="primary" onClick={()=> {
              this.submit()
            }}>提交配置清单</Button></Col>
          </Row>
        </div>

        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>
          <Row type='flex' align='left' justify='center'>
            <Col span={1}><Icon type='star'/></Col>
            <Col span={23}><p style={{fontSize: 17}}>推广员入驻费提成设置</p></Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>一级推广员入驻费提成比例:
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  defaultValue={1}
                  step={0.1}
                  value = {(this.state.invitePromoterRoyalty1*100).toFixed(1)}
                  onChange={(payload)=> {
                    this.changeInvitePromoterRoyalty1(payload)
                  }}/>
              </div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>二级推广员入驻费提成比例:
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  defaultValue={1}
                  step={0.1}
                  value = {(this.state.invitePromoterRoyalty2*100).toFixed(1)}
                  onChange={(payload)=> {
                    this.changeInvitePromoterRoyalty2(payload)
                  }}/>
              </div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>三级推广员入驻费提成比例:
                <InputNumber
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  defaultValue={1}
                  step={0.1}
                  value = {(this.state.invitePromoterRoyalty3*100).toFixed(1)}
                  onChange={(payload)=> {
                    this.changeInvitePromoterRoyalty3(payload)
                  }}/>
              </div>
            </Col>
            </Row>
          </div>
          <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>

          <Row type='flex' align='left' justify='center'>
            <Col span={1}><Icon type='star'/></Col>
            <Col span={23}><p style={{fontSize: 17}}>基本设置</p></Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>推广员入驻费: <InputNumber
                formatter={value => `${value}¥`}
                parser={value => value.replace('¥', '')}
                min={0}
                value = {this.state.promoterCharge}
                defaultValue={1}
                step={1}

                onChange={(payload)=> {
                  this.changePromoterCharge(payload)
                }}/>
              </div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>店铺入驻最低费用: <InputNumber
                formatter={value => `${value}¥`}
                parser={value => value.replace('¥', '')}
                min={0}
                defaultValue={1}
                step={1}
                value={this.state.minShopkeeperCharge}
                onChange={(payload)=> {
                  this.changeMinShopkeeperCharge(payload)
                }}/>
              </div>
            </Col>


          </Row>
        </div>


        <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>
          <Row type='flex' align='left' justify='center'>
            <Col span={1}><Icon type='star'/></Col>
            <Col span={23}><p style={{fontSize: 17}}>地区总代理提成配置</p></Col>
          </Row>
          <Row gutter={24}>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>省代理提成：<InputNumber
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                min={0.1}
                max={100}
                step={0.1}
                defaultValue={this.props.commissionCof.agentTable.province_agent * 100}
                value={(this.state.province_agent * 100).toFixed(1)}
                onChange={(payload)=> {
                  this.changeProvinceAgent(payload)
                }}/></div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>市代理提成：<InputNumber
                formatter={value => `${value}%`}
                parser={value => value.replace('%', '')}
                min={0.1}
                max={100}
                step={0.1}
                defaultValue={this.props.commissionCof.agentTable.city_agent * 100}
                value={(this.state.city_agent * 100).toFixed(1)}
                onChange={(payload)=> {
                  this.changeCityAgent(payload)
                }}/></div>
            </Col>
            <Col span={6}>
              <div style={{marginTop: 1, marginBottom: 1}}>区代理提成：<InputNumber
                formatter={value => `${value }%`}
                parser={value => value.replace('%', '')}
                min={0.1}
                max={100}
                step={0.1}
                defaultValue={this.props.commissionCof.agentTable.district_agent * 100}
                value={(this.state.district_agent * 100).toFixed(1)}
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
          }}>{'总计:' + amount + '%'}</div>

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
                <div className={style.divCol}>
                  <InputNumber
                    formatter={value => `${value }%`}
                    parser={value => value.replace('%', '')}
                    min={0.1}
                    max={100}
                    step={0.1}
                    defaultValue={this.props.commissionCof.upgradeTable.promoter_level_1.royalty[0] * 100}
                    value={(this.state.level1Royalty1 * 100).toFixed(1)}
                    onChange={(payload)=> {this.changeLevel1Royal1(payload)}}
                  />
                </div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level2Royalty1 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_2.royalty[0] * 100}
                  onChange={(payload)=> {
                    this.changeLevel2Royal1(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level3Royalty1 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_3.royalty[0] * 100}
                  onChange={(payload)=> {
                    this.changeLevel3Royal1(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level4Royalty1 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_4.royalty[0] * 100}
                  onChange={(payload)=> {
                    this.changeLevel4Royal1(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level5Royalty1 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_5.royalty[0] * 100}
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
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level1Royalty2 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_1.royalty[1] * 100}

                  onChange={(payload)=> {
                    this.changeLevel1Royal2(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level2Royalty2 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_2.royalty[1] * 100}
                  onChange={(payload)=> {
                    this.changeLevel2Royal2(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level3Royalty2 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_3.royalty[1] * 100}
                  onChange={(payload)=> {
                    this.changeLevel3Royal2(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level4Royalty2 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_4.royalty[1] * 100}
                  onChange={(payload)=> {
                    this.changeLevel4Royal2(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level5Royalty2 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_5.royalty[1] * 100}
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
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level1Royalty3 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_1.royalty[2] * 100}
                  onChange={(payload)=> {
                    this.changeLevel1Royal3(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level2Royalty3 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_2.royalty[2] * 100}

                  onChange={(payload)=> {
                    this.changeLevel2Royal3(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level3Royalty3 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_3.royalty[2] * 100}

                  onChange={(payload)=> {
                    this.changeLevel3Royal3(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level4Royalty3 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_4.royalty[2] * 100}

                  onChange={(payload)=> {
                    this.changeLevel4Royal3(payload)
                  }}/></div>
              </Col>
              <Col span={4}>
                <div className={style.divCol}><InputNumber
                  formatter={value => `${value }%`}
                  parser={value => value.replace('%', '')}
                  min={0.1}
                  max={100}
                  step={0.1}
                  value={(this.state.level5Royalty3 * 100).toFixed(1)}
                  defaultValue={this.props.commissionCof.upgradeTable.promoter_level_5.royalty[2] * 100}
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
  // console.log('commissionCof',commissionCof)
  return {commissionCof: commissionCof}
}
export default connect(mapStateToProps)(PromoterCommissionManager)
