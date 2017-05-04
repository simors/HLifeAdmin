/**
 * Created by lilu on 2017/4/2.
 */
/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal,Button, Checkbox,Cascader,Popconfirm} from 'antd'
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
class user2promoterModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      count: 0,
      liveArea:[],
      identityArea:[],
      popVisible:false,
      identity:0
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
    // console.log(...this.props)

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
      this.setState({
        popVisible:false
      })
      this.props.onOk(data)

    })
  }
  openPop(){
    this.setState({
      popVisible:true
    })
  }
  onIdentityChange = (e) => {
    // console.log('radio3 checked', e.target.value);
    // console.log(' this.state.identityArea', this.state.identityArea);
    this.setState({
      identity:e.target.value
    })

  }
  cancel(){
    this.setState({
      popVisible:false
    })
  }
  render() {
    const options = ['apple', 'pear', 'orange']
    // console.log('ahahahahahaha', this.props.item)
    // console.log('ahahahahahaha',options)
    let value=''
    switch (this.state.identity){
      case 0:
        value = '推广员'
        break;
      case 1:
          value = this.state.identityArea[1]+'省代理'
        break;
      case 2:
        value=this.state.identityArea[2]+'市代理'

        break;
      case 3:
        value= this.state.identityArea[3]+'区代理'
        break
    }
    // console.log('type',this.props.type)
    // console.log('roleList',this.props.roleList)
    return (
      <Modal
        title={'设置为推广员'}
        visible={this.state.visible}
        onOk={() => this.handleOk()}
        onCancel={()=> {
          let count = this.state.count + 1
          this.setState({count: count})
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.state.count}
        footer={[
          <Button key="back" size='large' onClick={()=> {
            let count = this.state.count + 1
            this.setState({count: count})
            this.props.onCancel()
          }}>取消</Button>,
          <Popconfirm title={'是否直接升为'+value} onConfirm={() => this.handleOk()} >
          <Button key="ok" size="large">确定</Button>
          </Popconfirm>
          ]}>


        <Form horizontal>
          <FormItem label='姓名：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.userDetail.nickname,
              rules: [
                {
                  required: true,
                  message: '姓名未填写'
                }
              ]
            })(<Input disabled={true}/>)}
          </FormItem>
          <FormItem label='电话号码：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('phone', {
              initialValue: this.props.userDetail.mobilePhoneNumber,
              rules: [
                {
                  required: true,
                  message: '电话号码未填写'
                }
              ]
            })(<Input disabled={true}/>)}
          </FormItem>
          <FormItem label='代理等级：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('identity', )
            (<RadioGroup onChange={(e)=>{this.onIdentityChange(e)}} >
              <Radio key={0} value={0}>无代理</Radio>
              <Radio key={1} value={1}>省代理</Radio>
              <Radio key={2} value={2}>市代理</Radio>
              <Radio key={3} value={3}>区代理</Radio>
            </RadioGroup>)}
          </FormItem>
          <FormItem {...formItemLayout} hasFeedback label={'生活地区'}>
            {this.props.form.getFieldDecorator('liveArea',{
              rules:[
                {
                  required: true,
                  message:'生活地区未选择'
                }
              ]
            })(
              <Cascader
                options={this.props.areaTreeSelectData}
                changeOnSelect
                placeholder="请选择生活地区地区"
                onChange={(value,selectedOptions)=>{
                  this.selectedLiveDistrict(value,selectedOptions)
                }}
              />
            )}
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

user2promoterModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(user2promoterModal)
