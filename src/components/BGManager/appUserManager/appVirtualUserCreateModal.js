/**
 * Created by lilu on 2017/6/13.
 */
/**
 * Created by lilu on 2017/4/2.
 */
/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Button, Checkbox, Cascader, Popconfirm} from 'antd'
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
class appVirtualUserCreateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      count: 0,
      liveArea: [],
      identityArea: [],
      popVisible: false,
      identity: 0,
      areaList: []
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
  }

  selectedLiveDistrict(value, selectedOptions) {
    let liveArea = []
    selectedOptions.forEach((record)=> {
      liveArea.push({geo: record.geo, value: record.value, label: record.label})
    })
    this.setState({
      liveArea: liveArea
    })
    // console.log('hahahahahahah',value,selectedOptions)
  }

  selectedIdentityArea(value, selectedOptions) {
    let identityArea = []
    selectedOptions.forEach((record)=> {
      identityArea.push(record.label)
    })
    this.setState({
      identityArea: identityArea
    })
  }

  componentDidMount() {
    this.setState({visible: !!this.props.visible})
    // console.log(...this.props)

  }

  handleOk() {


    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
        liveArea: this.state.liveArea,
      }
      //console.log('data',data)
      this.props.onOk(data)
    })
  }

  openPop() {
    this.setState({
      popVisible: true
    })
  }


  cancel() {
    this.setState({
      popVisible: false
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
        onOk={() => this.handleOk()}
        onCancel={()=> {
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.props.key}
      >


        <Form horizontal>
          <FormItem label='姓名：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('username', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: '姓名未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='昵称：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('nickname', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          {/*<FormItem label='电话号码：' hasFeedback {...formItemLayout}>*/}
            {/*{this.props.form.getFieldDecorator('mobilePhoneNumber', {*/}
              {/*initialValue: '',*/}
              {/*rules: [*/}
                {/*{*/}
                  {/*required: true,*/}
                  {/*message: '电话号码未填写'*/}
                {/*}*/}
              {/*]*/}
            {/*})(<Input />)}*/}
          {/*</FormItem>*/}

          <FormItem {...formItemLayout} hasFeedback label={'生活地区'}>
            {this.props.form.getFieldDecorator('liveArea', {
              rules: [
                {
                  required: true,
                  message: '生活地区未选择'
                }
              ]
            })(
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择生活地区地区"
                onChange={(value, selectedOptions)=> {
                  this.selectedLiveDistrict(value, selectedOptions)
                }}
              />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}


export default Form.create()(appVirtualUserCreateModal)
