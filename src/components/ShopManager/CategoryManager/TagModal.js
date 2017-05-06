/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox, Select,message} from 'antd'
import {trim} from '../../../services/CommonService'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class TagModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      count: 0,
      tagName:'',
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
  }

  componentDidMount() {
    this.setState({visible: !!this.props.visible})
    // console.log(...this.props)


  }
  contains(arr, obj) {
    var i = arr.length;
    while (i--) {
      // console.log('arr',arr)
      if (trim(arr[i]) === obj) {
        return true;
      }
    }
    return false;
  }
  handleOk() {

    // let count = this.state.count + 1
    // this.setState({count: count})
    this.props.form.validateFields((errors) => {
      if (errors) {
        // console.log('error',errors)
        return
      }
      // console.log('=======>',{...this.props.form.getFieldsValue()})

      const data = {
        ...this.props.form.getFieldsValue(),
        key: this.props.item.id
      }
      // console.log('data====>', data)
        data.name = trim(data.name)

      if((data.name&&data.name!='')&&(data.categoryId&&data.categoryId!='')){
        let tagNameList = this.props.tagList.map((item,key)=>{
          if(item.categoryId==data.categoryId){
            return item.name
          }
        })
        // console.log('test',tagNameList,data)
        let isEx=this.contains(tagNameList,data.name)
        if(isEx){
          message.error('已有该标签')
          // this.props.onCancel()

        }else{
          this.props.onOk(data)
           // console.log('data====>', data)
          // this.setState({modalVisible: false})
        }
      }else{
        message.error('请填写标签名称')
        // this.props.onCancel()
      }
      //console.log('data',data)

    })
  }
  setTrimValue(value){
  let trimValue = trim(value)
  // console.log('trim',trimValue)
  return trimValue
}
  renderCategoryList() {
    if (this.props.categoryList) {
      let categoryList = this.props.categoryList.map((item, key)=> {
        return <Option key={item.id}>{item.text}</Option>
      })
      return categoryList
    }
  }

  render() {
    const options = ['apple', 'pear', 'orange']
    // console.log('ahahahahahaha', this.props.item)
    // console.log('ahahahahahaha',options)
    // const roles = []
    // if (this.props.item.roleList) {
    //   this.props.item.roleList.forEach((record)=> {
    //     roles.push(record)
    //   })
    // }
    // console.log('type',this.props.type)
    // console.log('roleList',this.props.roleList)
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建标签' : '修改标签'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=> {
          let count = this.state.count + 1
          this.setState({count: count})
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.state.count}
      >
        <Form horizontal>
          <FormItem label='上级分类：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('categoryId', {
              initialValue: this.props.type === 'create' ? '' : this.props.item.categoryId,
              rules: [
                {
                  required: true,
                  message: '上级分类未选择'
                }
              ]
            })(<Select>
              {this.renderCategoryList()}
            </Select>)}
          </FormItem>
          <FormItem label='标签名称：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('name', {
              initialValue: this.props.type === 'create' ? '' : this.props.item.name,
             // getValueFromEvent:(e)=>{
               // let value=this.setTrimValue(e.target.value)
                //return value
            //},
              rules: [
                {
                  required: true,
                  message: '名称未填写',
                }
              ]
            })(<Input  />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

TagModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(TagModal)
