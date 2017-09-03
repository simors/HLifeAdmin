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
  Form

} from 'antd'
import style from './PromoterCommissionManager.less'
import SmsModal from '../../components/common/SmsModal'
import {verifySmsCode} from '../../services/SmsService'
import {getUserInfo} from '../../selector/userInfo/userInfo'
const FormItem = Form.Item;

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
    this.state={
      modalKey: -1,
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'promoterCommissionManager/query',
    })
  }

  componentDidMount() {

  }

  onOk(data) {
    this.props.dispatch({
      type: 'app/verifySmsCodeAction',
      payload: {
        smsAuthCode: data.smsCode,
        phone: this.props.phone,
        success: ()=> {
          this.handleSubmit()
          this.setState({
            modalVisible: false
          })
        },
        error: ()=> {
          message.error('验证码输入错误，请重新输入')
        }
      }
    })
  }

  onCancel() {
    this.setState({
      modalVisible: false
    })
  }

  openMadal() {
    this.setState({
      modalKey: this.state.modalKey - 1,
      modalVisible: true
    })
  }

  handleSubmit(e){
    // e.preventDefault();

    let record = {}
    this.props.form.validateFields((err, values) => {
      if (!err) {
        record={promoterSysCfg: {
          agentTable: {
            province_agent: 0.1,
            city_agent: 0.2,
            district_agent: 0.3,
            street_agent: 0.4
          },
          upgradeTable: {
            promoter_level_1: {
              team: values.promoter_level_1team,
              shop: values.promoter_level_1shop,
              royalty: [values.promoter_level_1royalty1/100, values.promoter_level_1royalty2/100,values.promoter_level_1royalty3/100]
            },
            promoter_level_2: {
              team: values.promoter_level_2team,
              shop: values.promoter_level_2shop,
              royalty: [values.promoter_level_2royalty1/100, values.promoter_level_2royalty2/100,values.promoter_level_2royalty3/100]
            },
            promoter_level_3: {
              team: values.promoter_level_3team,
              shop: values.promoter_level_3shop,
              royalty: [values.promoter_level_3royalty1/100, values.promoter_level_3royalty2/100,values.promoter_level_3royalty3/100]
            },
            promoter_level_4: {
              team: values.promoter_level_4team,
              shop: values.promoter_level_4shop,
              royalty: [values.promoter_level_4royalty1/100, values.promoter_level_4royalty2/100,values.promoter_level_4royalty3/100]
            },
            promoter_level_5: {
              team: values.promoter_level_5team,
              shop: values.promoter_level_5shop,
              royalty: [values.promoter_level_5royalty1/100, values.promoter_level_5royalty2/100,values.promoter_level_5royalty3/100]
            },
            promoter_level_6: {
              team: values.promoter_level_6team,
              shop: values.promoter_level_6shop,
              royalty: [values.promoter_level_6royalty1/100, values.promoter_level_6royalty2/100,values.promoter_level_6royalty3/100]
            },
            promoter_level_7: {
              team: values.promoter_level_7team,
              shop: values.promoter_level_7shop,
              royalty: [values.promoter_level_7royalty1/100, values.promoter_level_7royalty2/100,values.promoter_level_7royalty3/100]
            },
            promoter_level_8: {
              team: values.promoter_level_8team,
              shop: values.promoter_level_8shop,
              royalty: [values.promoter_level_8royalty1/100, values.promoter_level_8royalty2/100,values.promoter_level_8royalty3/100]
            },
            promoter_level_9: {
              team: values.promoter_level_9team,
              shop: values.promoter_level_9shop,
              royalty: [values.promoter_level_9royalty1/100, values.promoter_level_9royalty2/100,values.promoter_level_9royalty3/100]
            },
            promoter_level_10: {
              team: values.promoter_level_10team,
              shop: values.promoter_level_10shop,
              royalty: [values.promoter_level_10royalty1/100, values.promoter_level_10royalty2/100,values.promoter_level_10royalty3/100]
            },
            promoter_level_11: {
              team: values.promoter_level_11team,
              shop: values.promoter_level_11shop,
              royalty: [values.promoter_level_11royalty1/100, values.promoter_level_11royalty2/100,values.promoter_level_11royalty3/100]
            },
            promoter_level_12: {
              team: values.promoter_level_12team,
              shop: values.promoter_level_12shop,
              royalty: [values.promoter_level_12royalty1/100, values.promoter_level_12royalty2/100,values.promoter_level_12royalty3/100]
            },
            promoter_level_13: {
              team: values.promoter_level_13team,
              shop: values.promoter_level_13shop,
              royalty: [values.promoter_level_13royalty1/100, values.promoter_level_13royalty2/100,values.promoter_level_13royalty3/100]
            },
          },
          invitePromoterRoyalty: [values.invitePromoterRoyalty1/100, values.invitePromoterRoyalty2/100, values.invitePromoterRoyalty3/100],       // 推广员入驻费提成比例
          promoterCharge: values.promoterCharge,              // 推广员入驻费
          minShopkeeperCharge: values.minShopkeeperCharge,          // 店铺入驻最低费用
        }

        }
        console.log('Received values of form: ', record);
      }
    });
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

  componentWillReceiveProps(nextProps) {


  }


  submit() {

    //
    // var amount_level_1 = this.state.level1Royalty1 + this.state.level1Royalty2 + this.state.level1Royalty3 + this.state.city_agent + this.state.district_agent + this.state.province_agent
    // var amount_level_2 = this.state.level2Royalty1 + this.state.level2Royalty2 + this.state.level2Royalty3 + this.state.city_agent + this.state.district_agent + this.state.province_agent
    // var amount_level_3 = this.state.level3Royalty1 + this.state.level3Royalty2 + this.state.level3Royalty3 + this.state.city_agent + this.state.district_agent + this.state.province_agent
    // var amount_level_4 = this.state.level4Royalty1 + this.state.level4Royalty2 + this.state.level4Royalty3 + this.state.city_agent + this.state.district_agent + this.state.province_agent
    // var amount_level_5 = this.state.level5Royalty1 + this.state.level5Royalty2 + this.state.level5Royalty3 + this.state.city_agent + this.state.district_agent + this.state.province_agent

    // if (amount_level_1 > 1) {
    //   message.error('青铜级:总提成比例不能大于100%')
    //   return
    // } else if (amount_level_2 > 1) {
    //   message.error('白银级:总提成比例不能大于100%')
    //   return
    // } else if (amount_level_3 > 1) {
    //   message.error('黄金级:总提成比例不能大于100%')
    //   return
    // } else if (amount_level_4 > 1) {
    //   message.error('钻石级:总提成比例不能大于100%')
    //   return
    // } else if (amount_level_5 > 1) {
    //   message.error('皇冠级:总提成比例不能大于100%')
    //   return
    // }

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
        invitePromoterRoyalty: [this.state.invitePromoterRoyalty1, this.state.invitePromoterRoyalty2, this.state.invitePromoterRoyalty3],       // 推广员入驻费提成比例
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

  renderPromtionRow(key, item) {
    console.log('item.royalty[1]========>',item.royalty[1].toFixed(3))
    return (
      <div key={key}>
        <Col span={4}> <FormItem
        >
          {this.props.form.getFieldDecorator(key + 'team', {
            rules: [{required: true, message: '请确认所有数值都已经输入'}],
            initialValue: item.team,

          })(
            <InputNumber

              min={0}
              step={1}
            />
          )}
        </FormItem></Col>
        <Col span={4}> <FormItem
        >
          {this.props.form.getFieldDecorator(key + 'shop', {
            rules: [{required: true, message: '请确认所有数值都已经输入'}],
            initialValue: item.shop,

          })(
            <InputNumber
                         min={0}
                         step={1}

            />
          )}
        </FormItem></Col>
        <Col span={4}> <FormItem
        >
          {this.props.form.getFieldDecorator(key + 'royalty1', {
            rules: [{required: true, message: '请确认所有数值都已经输入'}],
            initialValue: (item.royalty[0]*100).toFixed(1),

          })(
            <InputNumber formatter={value => `${value}%`}
                         parser={value => value.replace('%', '')}
                         min={0}
                         max={100}
                         step={0.1}

            />
          )}
        </FormItem></Col>
        <Col span={4}> <FormItem
        >
          {this.props.form.getFieldDecorator(key + 'royalty2', {
            rules: [{required: true, message: '请确认所有数值都已经输入'}],
            initialValue: (item.royalty[1]*100).toFixed(1),

          })(
            <InputNumber formatter={value => `${value}%`}
                         parser={value => value.replace('%', '')}
                         min={0}
                         max={100}
                         step={0.1}

            />
          )}
        </FormItem></Col>
        <Col span={4}> <FormItem
        >
          {this.props.form.getFieldDecorator(key + 'royalty3', {
            rules: [{required: true, message: '请确认所有数值都已经输入'}],
            initialValue: (item.royalty[2]*100).toFixed(1),

          })(
            <InputNumber formatter={value => `${value}%`}
                         parser={value => value.replace('%', '')}
                         min={0}
                         max={100}
                         step={0.1}
            />
          )}
        </FormItem></Col>
      </div>
    )
  }

  renderPromotionConfList() {
    if (this.props.commissionCof && this.props.commissionCof.upgradeTable) {
      let table = []
      let count = 1
      for (let key in this.props.commissionCof.upgradeTable) {
        let value = this.props.commissionCof.upgradeTable[key]
        // console.log('key and value ============>',key,value)

        let item = (<div>
          <Row gutter={24}>
            <Col span={4}><p>{count + '级推广员'}</p></Col>
            {this.renderPromtionRow(key, value)}
          </Row>
        </div>)
        table.push(item)
        count++
      }
      return table
    } else {
      return null
    }

  }

  render() {
    let commissionConf = this.props.commissionCof
    console.log('0.14de gushi======>',0.14*100)
    console.log('0.14de gushi======>',typeof(this.props.commissionCof.invitePromoterRoyalty[0]))

    return (
      <div style={{flex: 1}}>
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
          <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>
            <Row type='flex' align='left' justify='center'>
              <Col span={20}></Col>
              <Col span={4}><Button type='primary' onClick={()=>this.openMadal()}>提交配置清单</Button></Col>
            </Row>
            <Row type='flex' align='left' justify='center'>
              <Col span={1}><Icon type='star'/></Col>
              <Col span={23}><p style={{fontSize: 17}}>推广员入驻费提成设置</p></Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1}}>一级推广员入驻费提成比例:
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('invitePromoterRoyalty1', {
                      rules: [{required: true, message: '请确认所有数值都已经输入'}],
                      initialValue: commissionConf.invitePromoterRoyalty[0]*100,

                    })(
                      <InputNumber
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    )}
                  </FormItem>
                </div>
              </Col>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1}}>二级推广员入驻费提成比例:
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('invitePromoterRoyalty2', {
                      rules: [{required: true, message: '请确认所有数值都已经输入'}],
                      initialValue: commissionConf.invitePromoterRoyalty[1]*100,

                    })(
                      <InputNumber
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    )}
                  </FormItem>
                </div>
              </Col>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1}}>三级推广员入驻费提成比例:
                  <FormItem
                  >
                    {this.props.form.getFieldDecorator('invitePromoterRoyalty3', {
                      rules: [{required: true, message: '请确认所有数值都已经输入'}],
                      initialValue: commissionConf.invitePromoterRoyalty[2]*100,

                    })(
                      <InputNumber
                        formatter={value => `${value}%`}
                        parser={value => value.replace('%', '')}
                        min={0}
                        max={100}
                        step={0.1}
                      />
                    )}
                  </FormItem>
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
                <div style={{marginTop: 1, marginBottom: 1}}>推广员入驻费:  <FormItem
                >
                  {this.props.form.getFieldDecorator('promoterCharge', {
                    rules: [{required: true, message: '请确认所有数值都已经输入'}],
                    initialValue: commissionConf.promoterCharge,

                  })(
                    <InputNumber
                      formatter={value => `${value}¥`}
                      parser={value => value.replace('¥', '')}
                      min={0.0}
                      step={0.1}
                    />
                  )}
                </FormItem>
                </div>
              </Col>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1}}>店铺入驻最低费用: <FormItem
                >
                  {this.props.form.getFieldDecorator('minShopkeeperCharge', {
                    rules: [{required: true, message: '请确认所有数值都已经输入'}],
                    initialValue: commissionConf.minShopkeeperCharge,

                  })(
                    <InputNumber
                      formatter={value => `${value}¥`}
                      parser={value => value.replace('¥', '')}
                      min={0.0}
                      step={0.1}
                    />
                  )}
                </FormItem>
                </div>
              </Col>


            </Row>
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
                  <div className={style.divCol}>邀请成员数</div>
                </Col>
                <Col span={4}>
                  <div className={style.divCol}>邀请店铺数</div>
                </Col>
                <Col span={4}>
                  <div className={style.divCol}>邀请店铺提成比例</div>
                </Col>
                <Col span={4}>
                  <div className={style.divCol}>一级成员邀请店铺提成比例</div>
                </Col>
                <Col span={4}>
                  <div className={style.divCol}>二级成员邀请店铺提成比例</div>
                </Col>
              </Row>
              {this.renderPromotionConfList()}
            </div>
          </div>
        </Form>

        <SmsModal
          key={this.state.modalKey}
          visible={this.state.modalVisible}
          onOk={(payload)=> {
            this.onOk(payload)
          }}
          onCancel={()=> {
            this.onCancel()
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  let commissionCof = getCommissionCof(state)
  let userInfo = getUserInfo(state)
  // console.log('commissionCof',commissionCof)
  return {commissionCof: commissionCof, phone: userInfo.phone}
}
export default connect(mapStateToProps)(Form.create()(PromoterCommissionManager))
