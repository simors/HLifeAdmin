/**
 * Created by lilu on 2017/3/18.
 */
/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox, Upload, Table, Icon, Button, Select} from 'antd'
import styles from './CategoryModal.less'
import {connect} from 'dva'
import {SketchPicker} from 'react-color'
import {getModalData, getModalState, getModalKey} from '../../../selector/ShopManager/categorySelector'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class ActionModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pickerOpen: false,
      count: -1,
      visible: false,
      fileList: [],
    }
  }


  componentDidMount() {
    console.log('data', this.props.data)

    if (this.props.data.image) {
      this.setState({
        imageList: [{
          uid: -1,
          status: 'done',
          name: this.props.data.title,
          url: this.props.data.image
        }],
      })
    }


    this.setState({visible: this.props.modalVisible})
    // console.log('hahahah',this.state.visible)

  }


  handleOk() {

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...this.props.form.getFieldsValue(),
        key: this.props.data.id ? this.props.data.id : '',
      }
      // let count = this.state.count - 1
      this.setState({
        fileList: []
      })
      // console.log('data',...this.props.form.getFieldsValue())
      console.log('data', data)

      this.props.onOk(data)
    })
  }


  render() {
    // if(this.props.type!='create'){
    //   let tagKeys = []
    //   this.props.item.containedTag.forEach((tag)=>{
    //     tagKeys.push(tag.key)
    //   })
    //   this.setState({selectedRowKeys:tagKeys})
    // }
    // console.log('containedTag',this.props.item.containedTag)
    // const fileSource=this.state.fileList.length>0?this.state.fileList[0].thumbUrl:this.props.data.imageSource
    // const imageSource=this.state.imageList.length>0?this.state.imageList[0].thumbUrl:this.props.data.showPictureSource
    // console.log('fileSource',fileSource,this.state.fileList.length,this.props.data.imageSource)

    let fileCount = 0
    if (this.state.fileList.length > 0) {
      fileCount = 1
    } else if (this.props.data.image) {
      fileCount = 1
    }


    // console.log('type',this.props.modalKey)
    //   console.log('fileList',this.state.fileList)
    // console.log('count',this.state.count)

    return (
      <Modal
        title={(this.props.type === 'create') ? '创建活动' : '活动修改'}
        visible={this.props.modalVisible}
        onOk={()=> {
          this.handleOk()
        }}
        onCancel={()=> {
          this.setState({
            fileList: []
          })
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.props.modalKey}
      >

        <Form horizontal>
          <FormItem label='标题：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.text,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='城市：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('describe', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.describe,
              rules: [
                {
                  required: true,
                  message: '城市未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='地区：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.text,
              rules: [
                {
                  required: true,
                  message: '地区未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='类型：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.text,
              rules: [
                {
                  required: true,
                  message: '类型未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label='类型：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.text,
              rules: [
                {
                  required: true,
                  message: '类型未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label='图标：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('imageSource', {
              initialValue: this.props.data.imageSource ? {
                uid: -1,
                status: 'done',
                name: this.props.data.text,
                url: this.props.data.imageSource
              } : null,
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload
              listType='picture'
              defaultFileList={this.props.data.imageSource ? [{
                uid: -2,
                status: 'done',
                name: this.props.data.text,
                url: this.props.data.imageSource
              }] : []}
              onChange={(info)=> {
                console.log('info', info)
                let fileList = info.fileList
                fileList = fileList.slice(-1)
                this.setState({fileList: fileList})
                //console.log('fileList',fileList)

              }}
            >

              { fileCount == 1 ? null :
                <div><Icon type='plus' className={styles.avatar}/></div>}
            </Upload>)}
          </FormItem>

        </Form>
      </Modal>
    )
  }
}

ActionModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

function mapStateToProps(state) {
  let data = getModalData(state)
  let modalVisible = getModalState(state)
  let modalKey = getModalKey(state)
  console.log('data', data)
  return {
    data: data,
    modalVisible: modalVisible,
    modalKey: modalKey
  }
}

export default connect(mapStateToProps)(Form.create()(ActionModal))
