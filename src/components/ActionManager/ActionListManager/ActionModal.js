/**
 * Created by lilu on 2017/3/18.
 */
/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox, Upload, Table, Icon, Button, Select,TreeSelect,Col} from 'antd'
import SelectDisrict from '../../common/selectDistrict'
import styles from './ActionModal.less'
import {connect} from 'dva'
import {SketchPicker} from 'react-color'
import {getModalData, getModalState, getModalKey} from '../../../selector/ActionManager/actionListManager'
import {selectPushTargetDistrictTreeDatas}from '../../../selector/MessagePushManager/MessagePushSelector'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group
const Option = Select.Option
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

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
      selectedCity:'',
      selectedDistrict:'',
      selectActionType:'link',
      pushTargetDistrict: [],
      pushTargetDistrictLabel:[]


    }
  }

  componentWillReceiveProps(newProps){
    if((newProps.data.image!=this.props.data.image)||(newProps.type=='update'&&this.state.fileList.length==0)){
       console.log('data===============>', newProps.type)

      if(newProps.data.image){
       this.setState({
         fileList: [{
           uid: -1,
           status: 'done',
           name: newProps.data.title,
           url: newProps.data.image
         }],
       })
     }


    }
  }
  componentDidMount() {
    // console.log('data', this.props.data)

    if (this.props.data.image) {
      if(this.props.data){
        this.setState({
          fileList: [{
            uid: -1,
            status: 'done',
            name: this.props.data.title,
            url: this.props.data.image
          }],
        })
      }

    }


    this.setState({visible: this.props.modalVisible})
    // console.log('hahahah',this.state.visible)

  }
  onDistrictTreeDataChange = (value, label, extra) => {
    console.log('onDistrictTreeDataChange ', value, label, extra);
    this.setState({ pushTargetDistrictLabel: label,pushTargetDistrict: value });
  }

  loadDistrictTreeData = (treeNode) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch({
        type: 'messagePushManager/updatePushTargetDistrictTreeDatas',
        payload: {
          eventKey: treeNode.props.eventKey
        }
      })
      resolve();
    })
  }
  renderPushTargetDistrict() {
    let tProps = {
      treeData: this.props.pushTargetDistrictTreeDatas,
      value: this.state.pushTargetDistrict,
      onChange: this.onDistrictTreeDataChange,
      loadData: this.loadDistrictTreeData,
      multiple: true,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '请在下拉菜单选择地区',
      disabled:false,
      showSearch:false,
      style: {
        width: 300,
      },
    };

    return (
      <Col span={20}>
        <TreeSelect {...tProps} />
      </Col>
    )
  }
  cancelImg(){
  this.setState({
    fileList:[]
  })
}
  handleOk() {

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        pushTargetDistrictLabel:this.state.pushTargetDistrictLabel,
        pushTargetDistrict:this.state.pushTargetDistrict,
        geoCity:this.state.selectedCity,
        geoDistrict:this.state.selectedDistrict,
        ...this.props.form.getFieldsValue(),
        id: this.props.data.id ? this.props.data.id : '',
      }
      // let count = this.state.count - 1
      this.setState({
        fileList: [],
        pushTargetDistrict:[],
        pushTargetDistrictLabel:[]
      })
      // console.log('data',...this.props.form.getFieldsValue())
      // console.log('data', data)

      this.props.onOk(data)
    })
  }
  submit(payload){
    // console.log('payload',payload)
    this.setState({
      selectedCity:payload.city,
      selectedDistrict:payload.district
    })
  }
  selectActionType(value){
    this.setState({
      selectActionType:value
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
      fileCount = 1}
    // } else if (this.props.data.image) {
    //   fileCount = 1
    // }


    // console.log('type',this.props.modalKey)
       console.log('fileList',this.state.fileList)
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
            fileList: [],
            pushTargetDistrict:[],
            pushTargetDistrictLabel:[]
          })
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.props.modalKey}
      >
        <div style={{marginRight:50,marginLeft:50,marginBottom:40}}>
          {/*<SelectDisrict city={this.props.data.geoCity} district={this.props.data.geoDistrict} submit={(payload)=>{*/}
          {/*this.submit(payload)*/}
        {/*}}></SelectDisrict>*/}
          {this.renderPushTargetDistrict()}
        </div>
        <Form horizontal>
          <FormItem label='标题：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('title', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.title,
              rules: [
                {
                  required: true,
                  message: '标题未填写'
                }
              ]
            })(<Input />)}
          </FormItem>

          {/*<FormItem label='类型：' hasFeedback {...formItemLayout}>*/}
            {/*{this.props.form.getFieldDecorator('type', {*/}
              {/*initialValue: this.props.type === 'create' ? '' : this.props.data.type,*/}
              {/*rules: [*/}
                {/*{*/}
                  {/*required: true,*/}
                  {/*message: '类型未填写'*/}
                {/*}*/}
              {/*]*/}
            {/*})(<InputNumber />)}*/}
          {/*</FormItem>*/}
          <div style={{marginLeft:45,marginBottom:20}}>* 活动类型:
          <Select  style={{marginLeft:8,width:100}} defaultValue='link' onChange={(value)=>{this.selectActionType(value)}}>
            {/*<Option value='shop'>店铺</Option>*/}
            {/*<Option value='topic'>文章</Option>*/}
            <Option value='link'>网页</Option>
          </Select>
            </div>
          <FormItem label='活动链接：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('action', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.action,
              rules: [
                {
                  required: true,
                  message: '活动类型未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='封面：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('image', {
              initialValue: (this.state.fileList.length>0) ? {
                uid: -1,
                status: 'done',
                name: this.state.fileList[0].name,
                url: this.state.fileList[0].url
              } : null,
              rules: [
                {
                  required: true,
                  message: '封面'
                }
              ]
            })(<Upload
              listType='picture'
              defaultFileList={(this.state.fileList.length>0)? [{
                uid: -1,
                status: 'done',
                name: this.state.fileList[0].name,
                url: this.state.fileList[0].url
              }] : []}
              onChange={(info)=> {
                let fileList = info.fileList
                fileList = fileList.slice(-1)
                this.setState({fileList: fileList})
              }}
              fileList={this.state.fileList}
            >
                <div><Button>点击上传封面</Button></div>
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
  const pushTargetDistrictTreeDatas = selectPushTargetDistrictTreeDatas(state)

   console.log('data', data)
  return {
    data: data,
    modalVisible: modalVisible,
    modalKey: modalKey,
    pushTargetDistrictTreeDatas: pushTargetDistrictTreeDatas

}
}
export default connect(mapStateToProps)(Form.create()(ActionModal))
