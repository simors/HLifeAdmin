/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Upload,Table,Icon,Button} from 'antd'
import styles from './CategoryModal.less'
import {SketchPicker} from 'react-color'
//import {checkBox} from '../../common/checkBox'
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
}
class CategoryModal extends Component {
  constructor(props) {
    super(props)

// console.log('rednder')
    this.state = {
      color:'#000000',
      pickerOpen:false,
      count:-1,
      visible: false,
      fileList: [],
      imageList: [],
      selectedRowKeys: [],
      selectTags:[]
    }
  }

  componentWillReceiveProps(newProps) {
      //console.log('imnewProps',newProps)
    if (this.props.visible != newProps.visible) {
      this.setState({visible: newProps.visible})
    }
    if(newProps.item.imageSource!=this.props.item.imageSource) {
      this.setState({
        fileList: (this.state.type === 'create') ? [] : [{
          uid: -1,
          status: 'done',
          name: newProps.item.text,
          url: newProps.item.imageSource
        }]
      })
      this.setState({
        imageList: (this.state.type === 'create') ? [] : [{
          uid: -1,
          status: 'done',
          name: newProps.item.text,
          url: newProps.item.showPictureSource
        }],color:newProps.item.textColor
      })
    }
  }

  componentDidMount() {

    this.setState({visible: !!this.props.visible})
    // console.log('hahahah',...this.props)

  }
  onSelectChange = (selectedRowKeys,selectedRowData) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);

    this.setState({ selectedRowKeys:selectedRowKeys,selectTags:selectedRowData });

  }

  handleOk() {
    let count=this.state.count-1
    this.setState({count:count,fileList:[],imageList:[]})

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        selectedTags:this.state.selectTags,
        ...this.props.form.getFieldsValue(),
        key: this.props.item.id?this.props.item.id:''
      }
      // console.log('data',data)
       this.props.onOk(data)
    })
  }
  pickOpen(){
    this.setState({pickerOpen:!this.state.pickerOpen})
  }
  pickClose(){
    this.setState({pickerOpen:false})
  }
  pickChange(color){
    this.setState({color:color.hex})
  }
  returnUrl(payload){
    var localFile = payload.file
    var name = 'categorytestimage.png'
    var file = new AV.File(name,localFile)
    file.save().then((file)=>{
      // console.log(file.url())
      this.setState({fileList:[{
        uid:-1,
        name:name,
        status:'done',
        url:file.url()
        }]}

      )
      return(file.url())
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

    const {  selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const columns = [
      {
        title: '标签名称',
        dataIndex: 'name',
        key: 'name'
      }
    ]
    const options = ['apple', 'pear', 'orange']
      // console.log('ahahahahahaha', selectedRowKeys)
    // console.log('ahahahahahaha',options)
    const roles = []
    if (this.props.item.roleList)
    {
      this.props.item.roleList.forEach((record)=>{
        roles.push(record)
      })
  }


    // console.log('type',this.props.type)
    //   console.log('fileList',this.state.fileList)
    // console.log('count',this.state.count)

    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{ let count=this.state.count-1
          this.props.onCancel()
          this.setState({count:count,fileList:[],imageList:[]})
        }}
        wrapClassName='vertical-center-modal'
        key={this.state.count}
      >

        <Form horizontal>
          <FormItem label='名称：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('text', {
              initialValue: this.props.type==='create'?'':this.props.item.text,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          <FormItem label='描述：' hasFeedback {...formItemLayout}>
          {this.props.form.getFieldDecorator('describe', {
            initialValue: this.props.type==='create'?'':this.props.item.describe,
            rules: [
              {
                required: true,
                message: '名称未填写'
              }
            ]
          })(<Input />)}
        </FormItem>
          <FormItem label='精选排名：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('displaySort', {
              initialValue: this.props.type==='create'?'':this.props.item.displaySort,
              rules: [
                {
                  required: true,
                  message: '状态未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label='精选字体颜色：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('textColor', {
              initialValue: this.props.type=='create'?this.state.color:this.props.item.textColor,

            })( <div>
              <Button key={this.state.count}  type='ghost' size='large' style={{width:120,height:30,backgroundColor:'#FFFFFF',color:this.state.color}} onClick={()=>{this.pickOpen()}}>
             选择颜色点我
              </Button>
              { this.state.pickerOpen ? <div style={ styles.popover }>
                <div className={ styles.cover } onClick={ ()=>{this.pickClose()} }/>
                <SketchPicker color={ this.state.color } onChange={ (color)=>{this.pickChange(color)} } />
              </div> : null }
            </div>)}
          </FormItem>

          <FormItem label='图标：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('imageSource', {
              initialValue: this.props.type==='create'?'':{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource},
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload
              listType='picture'
              accept='image/png'
              defaultFileList={this.props.type==='create'?[]:[{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.imageSource}]}
              onChange={(info)=>{
                //console.log('info',info)
                let fileList = info.fileList
                this.setState({fileList:fileList})
                //console.log('fileList',fileList)

              }}
            >

              { (this.state.fileList.length>=1&&this.state.fileList[0].name!=undefined)?null:(<div><Icon type='plus' className={styles.avatar}/></div>)}
            </Upload>)}
          </FormItem>
          <FormItem label='精选封面：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('showPictureSource', {
              initialValue: this.props.type==='create'?'':{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.showPictureSource},
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload
              listType='picture'
              accept='image/png'
              defaultFileList={this.props.type==='create'?[]:[{uid:-1,status:'done',name:this.props.item.text,url:this.props.item.showPictureSource}]}
              onChange={(info)=>{
                //console.log('info',info)
                let fileList = info.fileList
                this.setState({imageList:fileList})
                //console.log('fileList',fileList)

              }}
            >

              { (this.state.imageList.length>=1&&this.state.imageList[0].name!=undefined)?null:(<div><Icon type='plus' className={styles.avatar}/></div>)}
            </Upload>)}
          </FormItem>
          <FormItem label='启用状态：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('status', {
              initialValue: this.props.type==='create'?'':this.props.item.status,
              rules: [
                {
                  required: true,
                  message: '状态未填写'
                }
              ]
            })(<InputNumber />)}
          </FormItem>
          <FormItem label='标签' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('containedTag', {
              initialValue: this.props.type==='create'?[]:this.props.item.containedTag,

            })(
             <Table bordered scroll={{
               y: 300
             }} dataSource={this.props.tagList} columns={columns} pagination='false' rowKey={record=>record.id} rowSelection={rowSelection} ></Table>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

CategoryModal.propTypes = {
  // visible: PropTypes.any,
  // form: PropTypes.object,
  // item: PropTypes.object,
  // onOk: PropTypes.func,
  // onCancel: PropTypes.func
}

export default Form.create()(CategoryModal)
