/**
 * Created by lilu on 2017/9/14.
 */
/**
 * Created by lilu on 2017/3/29.
 */
import React, {Component, PropTypes} from 'react'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import {getShopDayPay,getShopMaxNum} from '../../selector/ShopManager/shopSelector'
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
import style from './ShopConfigManager.less'
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
class ShopConfigManager extends Component {
  constructor(props) {
    super(props)
    this.state={
      modalKey: -1,
      type:undefined
    }
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'shopConfigManager/query',
    })
  }

  componentDidMount() {

  }

  onOk(data,type) {
    this.props.dispatch({
      type: 'app/verifySmsCodeAction',
      payload: {
        smsAuthCode: data.smsCode,
        phone: this.props.phone,
        success: ()=> {
          this.handleSubmit(type)
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
      modalVisible: true,
    })
  }

  handleSubmit(e){
    // e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.dispatch({
            type: 'shopConfigManager/updateConfig',
            payload: {
              ...values,
              success: function () {
                message.success('提交成功')
              }
            }
          })
      }
    });
  }

  componentWillReceiveProps(nextProps) {


  }


  submit(type) {
    if(type==='dayPay'){
      this.props.dispatch({
        type: 'shopConfigManager/updateDayPay',
        payload: {
          ...record,
          success: function () {
            message.success('提交成功')
          }
        }
      })
    }else{
      this.props.dispatch({
        type: 'shopConfigManager/updateMaxNum',
        payload: {
          ...record,
          success: function () {
            message.success('提交成功')
          }
        }
      })
    }

  }


  render() {
    let commissionConf = this.props.commissionCof
    return (
      <div style={{flex: 1}}>
        <Form onSubmit={(e)=>this.handleSubmit(e)}>
          <div style={{borderWidth: 2, borderColor: '#FFFFFF', marginBottom: 20}}>
            <Row type='flex' align='left' justify='center'>
              <Col span={1}><Icon type='star'/></Col>
              <Col span={23}><p style={{fontSize: 17}}>基本设置</p></Col>
            </Row>
            <Row gutter={24}>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1,flexDirection: 'row'}}>活动每日收费:  <FormItem
                >
                  {this.props.form.getFieldDecorator('dayPay', {
                    rules: [{required: true, message: '请确认所有数值都已经输入'}],
                    initialValue: this.props.dayPay,

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
            <Row>
              <Col span={6}>
                <div style={{marginTop: 1, marginBottom: 1, flexDirection: 'row'}}>店铺最大活动数: <FormItem
                >
                  {this.props.form.getFieldDecorator('maxNum', {
                    rules: [{required: true, message: '请确认所有数值都已经输入'}],
                    initialValue: this.props.maxNum,

                  })(
                    <InputNumber

                      min={1}
                      step={1}
                    />
                  )}
                </FormItem>
                </div>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <Button type='primary' onClick={()=>{this.openMadal('dayPay')}}>提交</Button>
              </Col>
            </Row>
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
  let dayPay = getShopDayPay(state)
  let maxNum = getShopMaxNum(state)

  let userInfo = getUserInfo(state)
  // console.log('commissionCof',commissionCof)
  return {dayPay: dayPay, phone: userInfo.phone, maxNum: maxNum}
}
export default connect(mapStateToProps)(Form.create()(ShopConfigManager))
