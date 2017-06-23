/**
 * Created by lilu on 2017/6/23.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Row,Col} from 'antd'
import SmsInput from './SmsInput'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 18
  }
}
class SmsModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      count: 0
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
  }

  componentDidMount() {
    this.setState({visible: !!this.props.visible})
    console.log(...this.props)

  }

  handleOk() {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
      }
      console.log('data',data)
      this.props.onOk(data)
    })
  }

  render() {
    const options = ['apple', 'pear', 'orange']
    return (
      <Modal
        title='请输入短信验证码'
        visible={this.state.visible}
        onOk={()=> {
          this.handleOk()
        }}
        onCancel={()=> {
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.props.key}
      >
        <Form style={{flex:1,flexDirection:'row'}}>
         <Row gutter={24}> <Col span={12}><FormItem label='验证码：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('smsCode', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '验证码未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
           </Col>
          <Col span={6}>
          <SmsInput />
            </Col>
           </Row>
        </Form>
      </Modal>
    )
  }
}

SmsModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(SmsModal)
