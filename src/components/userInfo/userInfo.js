/**
 * Created by lilu on 2017/2/27.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Button} from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class UserInfoManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
  }

  componentDidMount() {
    this.setState({visible: !!this.props.visible})

  }

  handleOk() {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        username:this.props.username,
        ...this.props.form.getFieldsValue(),
        // key: this.props.item.key
      }
      //console.log('data',data)
      this.props.onOk(data)
    })
  }

  render() {

    return (
      <Modal
        title={'修改密码'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
      >
        <Form horizontal>
          <FormItem label='旧密码：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('password', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '密码未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='新密码' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('newPassword', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '请填写新密码'
                }
              ]
            })(
              <Input />
            )}
          </FormItem>
        </Form>
        {/*<Button size='large' type='ghost'  onClick={()=>{this.handleOk()}}>修改密码</Button>*/}

      </Modal>
    )
  }
}
export default Form.create()(UserInfoManage)