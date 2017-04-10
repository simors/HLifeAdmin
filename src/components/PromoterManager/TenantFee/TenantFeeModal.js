/**
 * Created by wanpeng on 2017/4/10.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, Modal, Upload,Icon,message, InputNumber} from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}

class TenantFeeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
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
        id: this.props.item.objectId,
        province: this.props.item.province,
        city: this.props.item.city,
      }
      if(data.fee && data.fee!=''){
        this.props.onOk(data)
      }else{
        message.info('请填写入驻费')
        this.props.onCancel()
      }
    })
  }

  render() {
    return (
      <Modal
        title={'修改入驻费'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
        key={this.props.modalKey}
      >
        <Form horizontal>
          <FormItem label='入驻费：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('fee', {
              initialValue: this.props.item.fee,
              rules: [
                {
                  required: true,
                  message: '入驻费未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
        </Form>

      </Modal>
    )
  }
}

// topicCategoryModal.propTypes = {
//
// }

export default Form.create()(TenantFeeModal)
