/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, Modal, Upload,Icon,message} from 'antd'
import styles from './topicCategoryModal.less'
import {trim} from '../../../services/CommonService'

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
      visible: false,
      fileList: [],
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
  contains(arr, obj) {
    var i = arr.length;
    while (i--) {
      if ((trim(arr[i].title) === obj)&&(arr[i].id!=obj.id)) {
        // console.log('arr',arr[i],obj)
        return true;
      }
    }
    return false;
  }
  handleOk() {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return errors
      }
      const data = {
        ...this.props.form.getFieldsValue(),
        id: this.props.item.id
      }
      data.name=trim(data.name)
      if(data.name&&trim(data.name)!=''){
        // console.log('this.categoryList',this.props.categoryList)
        let categoryList = this.props.categoryList.map((item,key)=>{
// console.log('item',item)
            return item

        })
        // console.log('test',categoryList,data)
        let isEx=this.contains(categoryList,data.name)
        if(isEx){
          message.error('已有该分类')
          // this.props.onCancel()
        }else{
          this.props.onOk(data)
          // console.log('data====>', data)
          // this.setState({modalVisible: false})
        }
      }else{
        message.error('请填写分类名称')
        // this.props.onCancel()
      }
      // console.log('data',data)

      // this.props.onOk(data)
    })
  }
  setTrimValue(value){
    let trimValue = trim(value)
    // console.log('trim',trimValue)
    return trimValue
  }
  render() {
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
        key={this.props.modalKey}
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
            })(<Input />)}
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
          {/*<FormItem label='图标：' hasFeedback {...formItemLayout}>*/}
            {/*{this.props.form.getFieldDecorator('imageSource', {*/}
              {/*initialValue: this.props.type==='create'?'':{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource},*/}
              {/*rules: [*/}
                {/*{*/}
                  {/*required: true,*/}
                  {/*message: '图标'*/}
                {/*}*/}
              {/*]*/}
            {/*})(<Upload*/}
              {/*listType='picture'*/}
              {/*accept='image/png'*/}
              {/*defaultFileList={this.props.type==='create'?[]:[{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource}]}*/}
              {/*onChange={(info)=>{*/}
                {/*//console.log('info',info)*/}
                {/*let fileList = info.fileList*/}
                {/*this.setState({fileList:fileList})*/}
                {/*//console.log('fileList',fileList)*/}

              {/*}}*/}
            {/*>*/}

              {/*{ (this.state.fileList.length>=1&&this.state.fileList[0].name!=undefined)?null:(<div><Icon type='plus' className={styles.avatar}/></div>)}*/}
            {/*</Upload>)}*/}
          {/*</FormItem>*/}
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
