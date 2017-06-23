/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox} from 'antd'
import SmsInput from '../../common/SmsInput'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class personModal extends Component {
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
    let count = this.state.count + 1
    this.setState({count: count})

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
        key: this.props.item.key
      }
      // console.log('data',data)
      this.props.onOk(data)
    })
  }

  render() {
    const options = ['apple', 'pear', 'orange']
    // console.log('ahahahahahaha', this.props.item)
    // console.log('ahahahahahaha',options)
    const roles = []
    if (this.props.item.roleList) {
      this.props.item.roleList.forEach((record)=> {
        roles.push(record)
      })
    }
    // console.log('type',this.props.type)
    // console.log('roleList',this.props.roleList)
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建用户' : '修改用户'}
        visible={this.state.visible}
        onOk={()=> {
          this.handleOk()
        }}
        onCancel={()=> {
          let count = this.state.count + 1
          this.setState({count: count})
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.state.count}
      >
        <Form horizontal>
          <FormItem label='姓名：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.type === 'create' ? '' : this.props.item.username,
              rules: [
                {
                  required: true,
                  message: '姓名未填写'
                }
              ]
            })(<Input disabled={this.props.type === 'create' ? false : true}/>)}
          </FormItem>
          <FormItem label='密码：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('password', {
              initialValue: this.props.type === 'create' ? '' : this.props.item.password,
              rules: [
                {
                  required: true,
                  message: '密码未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='手机号：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('phone', {
              initialValue: this.props.type === 'create' ? '' : this.props.item.phone,
              rules: [
                {
                  required: true,
                  message: '手机号未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='角色' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('roleList', {
              initialValue: this.props.type === 'create' ? [] : roles,
              rules: [
                {
                  required: true,
                  message: '请选择角色'
                }
              ]
            })(
              <CheckboxGroup options={this.props.roleList}>

              </CheckboxGroup>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

personModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(personModal)
