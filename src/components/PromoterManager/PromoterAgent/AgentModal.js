/**
 * Created by lilu on 2017/4/2.
 */
/**
 * Created by lilu on 2017/4/2.
 */

import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Cascader} from 'antd'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const RadioGroup = Radio.Group;


const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class AgentModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      count: 0,
      liveArea:[],
      identityArea:[],
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
  }
  selectedLiveDistrict(value,selectedOptions)
  {
    let liveArea=[]
    selectedOptions.forEach((record)=>{
      liveArea.push(record.label)
    })
    this.setState({
      liveArea:liveArea
    })
    // console.log('hahahahahahah',value,selectedOptions)
  }
  selectedIdentityArea(value,selectedOptions){
    let identityArea=[]
    selectedOptions.forEach((record)=>{
      identityArea.push(record.label)
    })
    this.setState({
      identityArea:identityArea
    })
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
        liveArea:this.state.liveArea,
        identityArea:this.state.identityArea

      }
      //console.log('data',data)
      this.props.onOk(data)
    })
  }

  render() {
    const options = ['apple', 'pear', 'orange']
    // console.log('ahahahahahaha', this.props.item)
    // console.log('ahahahahahaha',options)

    // console.log('type',this.props.type)
    // console.log('roleList',this.props.roleList)
    return (
      <Modal
        title={'设置为推广员'}
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
          <FormItem label='代理等级：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('identity', )
            (<RadioGroup  >
              <Radio value={0}>无代理</Radio>
              <Radio value={1}>省代理</Radio>
              <Radio value={2}>市代理</Radio>
              <Radio value={3}>区代理</Radio>
            </RadioGroup>)}
          </FormItem>

          <FormItem {...formItemLayout} hasFeedback  label={'代理地区'}>
            {this.props.form.getFieldDecorator(`identityArea`)(
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择代理地区"
                onChange={(value,selectedOptions)=>{
                  this.selectedIdentityArea(value,selectedOptions)
                }}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

AgentModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(AgentModal)
