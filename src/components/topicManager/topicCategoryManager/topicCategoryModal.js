/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, Modal} from 'antd'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class topicCategoryModal extends Component {
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
    console.log(...this.props)

  }

  handleOk() {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
        id: this.props.item.id
      }
      //console.log('data',data)
      this.props.onOk(data)
    })
  }

  render() {
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
      >
        <Form horizontal>
          <FormItem label='分类名称：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.type==='create'?'':this.props.item.title,
              rules: [
                {
                  required: true,
                  message: '分类名称未填写'
                }
              ]
            })(<Input disabled={this.props.type==='create'?false:true}/>)}
          </FormItem>
          <FormItem label='简介：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('introduction', {
              initialValue: this.props.type==='create'?'':this.props.item.introduction,
              rules: [
                {
                  required: true,
                  message: '简介未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

topicCategoryModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(topicCategoryModal)
