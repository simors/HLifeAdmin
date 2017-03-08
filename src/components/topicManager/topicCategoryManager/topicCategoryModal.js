/**
 * Created by lilu on 2017/2/21.
 */
import React, {PropTypes, Component} from 'react'
import {Form, Input, Modal, Upload,Icon} from 'antd'
import styles from './topicCategoryModal.less'

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
