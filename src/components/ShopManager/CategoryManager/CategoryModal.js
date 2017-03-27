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
class CategoryModal extends Component {
  constructor(props) {
    super(props)

    console.log('rednder')
    this.state = {
      color: '#000000',
      pickerOpen: false,
      count: -1,
      visible: false,
      fileList: [],
      imageList: [],
      selectedRowKeys: [],
      selectTags: []
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.type!='create'){
      if(newProps.data.imageSource!=this.props.data.imageSource){
        console.log('data===============>', newProps.data.imageSource)

        if(newProps.data.imageSource){
          this.setState({
            fileList: [{
              uid: -1,
              status: 'done',
              name: newProps.data.text,
              url: newProps.data.imageSource
            }],
          })
        }


      }
      if(newProps.data.showPictureSource!=this.props.data.showPictureSource){
        console.log('data===============>', newProps.data.showPictureSource)

        if(newProps.data.showPictureSource){
          this.setState({
            imageList: [{
              uid: -1,
              status: 'done',
              name: newProps.data.text,
              url: newProps.data.showPictureSource
            }],
          })
        }


      }
    }

  }

  //
  //    console.log('imnewProps',newProps.item.imageSource)
  //
  //   // if((newProps.type==='create')&&(newProps.type!=this.props.type)){
  //   //   this.setState({
  //   //     color: '#000000',
  //   //     pickerOpen: false,
  //   //     fileList: [],
  //   //     imageList: [],
  //   //     selectedRowKeys: [],
  //   //     selectTags: [],
  //   //     visible:newProps.visible
  //   //   })
  //   // }else
  //     {
  //     let keys = []
  //     if (newProps.item.containedTag) {
  //
  //       newProps.item.containedTag.forEach((result)=> {
  //         keys.push(result.id)
  //       })
  //       this.setState({
  //         selectedRowKeys:keys,
  //         selectTags:newProps.item.containedTag
  //       })
  //     }
  //     if (this.props.visible != newProps.visible) {
  //       this.setState({visible: newProps.visible})
  //     }
  //     // console.log('this.props.item.containedTag', newProps.item.containedTag)
  //     //  console.log('newProps.item.imageSource <<<<<<<<<<', newProps.item.imageSource )
  //     // console.log('this.props.item.imageSource====>>>>>> ', this.props.item.imageSource )
  //
  //     if (newProps.item.imageSource!=this.props.item.imageSource ) {
  //
  //       this.setState({
  //         fileList: (this.state.type === 'create') ? [] : [{
  //           uid: -1,
  //           status: 'done',
  //           name: newProps.item.text,
  //           url: newProps.item.imageSource
  //         }],
  //       })
  //     }
  //     if(newProps.item.showPictureSource !=this.props.item.showPictureSource){
  //       this.setState({
  //         imageList: (this.state.type === 'create') ? [] : [{
  //           uid: -1,
  //           status: 'done',
  //           name: newProps.item.text,
  //           url: newProps.item.showPictureSource
  //         }],
  //       })
  //       // console.log('state',this.state.type,this.state.imageList)
  //
  //     }
  //     if(newProps.item.textColor!=this.props.item.textColor)
  //     this.setState({
  //       color: newProps.item.textColor
  //     })
  //   }
  // }

  componentDidMount() {
    console.log('data', this.props.data)
    let keys = []
    if (this.props.data.containedTag) {

      this.props.data.containedTag.forEach((result)=> {
        keys.push(result.id)
      })
      this.setState({
        selectedRowKeys: keys,
        selectTags: this.props.data.containedTag
      })
    }
    if (this.props.data.showPictureSource) {
      this.setState({
        imageList: [{
          uid: -1,
          status: 'done',
          name: this.props.data.text,
          url: this.props.data.showPictureSource
        }],
      })
    }
    if (this.props.data.imageSource) {

      this.setState({
        fileList: [{
          uid: -1,
          status: 'done',
          name: this.props.data.text,
          url: this.props.data.imageSource
        }],
      })
    }
    if (this.props.data.textColor) {
      this.setState({
        color: this.props.data.textColor
      })
    }


    this.setState({visible: this.props.modalVisible})
    // console.log('hahahah',this.state.visible)

  }

  onSelectChange = (selectedRowKeys, selectedRowData) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);

    this.setState({selectedRowKeys: selectedRowKeys, selectTags: selectedRowData});

  }

  handleOk() {

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        selectedTags: this.state.selectTags,
        ...this.props.form.getFieldsValue(),
        key: this.props.data.id ? this.props.data.id : '',
        textColor: this.state.color == '#000000' ? this.props.data.textColor : this.state.color
      }
      // let count = this.state.count - 1
      this.setState({
        fileList: [], imageList: [], color: '#000000', selectedRowKeys: [], pickerOpen: false, selectTags: []
      })
      // console.log('data',...this.props.form.getFieldsValue())
      console.log('data', data)

      this.props.onOk(data)
    })
  }

  pickOpen() {
    this.setState({pickerOpen: !this.state.pickerOpen})
  }

  pickClose() {
    this.setState({pickerOpen: false})
  }

  pickChange(color) {
    console.log('color', color)
    this.setState({color: color.hex})
  }

  returnUrl(payload) {
    var localFile = payload.file
    var name = 'categorytestimage.png'
    var file = new AV.File(name, localFile)
    file.save().then((file)=> {
      // console.log(file.url())
      this.setState({
          fileList: [{
            uid: -1,
            name: name,
            status: 'done',
            url: file.url()
          }]
        }
      )
      return (file.url())
    })
  }

  selectStatus(value, optin) {
    console.log('vale', value, optin)
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
    let rowKeys = []
    if (this.props.data.containedTag) {
      this.props.data.containedTag.forEach((record)=> {
        rowKeys.push(record.id)
      })
    }
    const selectedRowKeys = this.state.selectedRowKeys.length > 0 ? this.state.selectedRowKeys : rowKeys;

    // let fileCount = 0
    // let imageCount = 0
    // if (this.state.fileList.length > 0) {
    //   fileCount = 1
    // } else if (this.props.data.imageSource) {
    //   fileCount = 1
    // }
    // if (this.state.imageList.length > 0) {
    //   imageCount = 1
    // } else if (this.props.data.showPictureSource) {
    //   imageCount = 1
    // }
    // console.log('count',fileCount,imageCount)
    // console.log('selectR', selectedRowKeys)
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
    console.log('here is picture ',this.state.fileList,this.state.imageList)
    // const options = ['apple', 'pear', 'orange']
    // console.log('ahahahahahaha', selectedRowKeys)
    //  console.log('itemandcount',this.props.item,this.state.count)
    // console.log('fileList',this.state.fileList)
    // console.log('imageList',this.state.imageList)

    const roles = []
    if (this.props.data.roleList) {
      this.props.data.roleList.forEach((record)=> {
        roles.push(record)
      })
    }
    const color = this.state.color == '#000000' ? this.props.data.textColor : this.state.color

    // console.log('type',this.props.modalKey)
    //   console.log('fileList',this.state.fileList)
    // console.log('count',this.state.count)

    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.props.modalVisible}
        onOk={()=> {
          this.handleOk()
        }}
        onCancel={()=> {
          this.setState({
            fileList: [], imageList: [], color: '#000000', selectedRowKeys: [], pickerOpen: false, selectTags: []
          })
          this.props.onCancel()
        }}
        wrapClassName='vertical-center-modal'
        key={this.props.modalKey}
      >

        <Form horizontal>
          <FormItem label='名称：' hasFeedback {...formItemLayout}>
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
          <FormItem label='描述：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('describe', {
              initialValue: this.props.type === 'create' ? '' : this.props.data.describe,
              rules: [
                {
                  required: true,
                  message: '名称未填写'
                }
              ]
            })(<Input />)}
          </FormItem>
          {/*<FormItem label='精选排名：' hasFeedback {...formItemLayout}>*/}
          {/*{this.props.form.getFieldDecorator('displaySort', {*/}
          {/*initialValue: this.props.type === 'create' ? '' : this.props.item.displaySort,*/}
          {/*rules: [*/}
          {/*{*/}
          {/*required: true,*/}
          {/*message: '状态未填写'*/}
          {/*}*/}
          {/*]*/}
          {/*})(<InputNumber />)}*/}
          {/*</FormItem>*/}
          <FormItem label='精选字体颜色：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('textColor', {
              initialValue: this.props.type == 'create' ? this.state.color : this.props.data.textColor,

            })(<div>
              <Button key={this.state.count} type='ghost' size='large'
                      style={{width: 120, height: 30, backgroundColor: '#FFFFFF', color: color}}
                      onClick={()=> {
                        this.pickOpen()
                      }}>
                选择颜色点我
              </Button>
              { this.state.pickerOpen ? <div style={ styles.popover }>
                <div className={ styles.cover } onClick={ ()=> {
                  this.pickClose()
                } }/>
                <SketchPicker color={ color} onChange={ (color)=> {
                  this.pickChange(color)
                } }/>
              </div> : null }
            </div>)}
          </FormItem>

          <FormItem label='图标：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('imageSource', {
              initialValue: (this.state.fileList.length>0) ? {
                uid: -1,
                status: 'done',
                name: this.state.fileList[0].name,
                url: this.state.fileList[0].url
              } : null,
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload
              listType='picture'
              defaultFileList={(this.state.fileList.length>0) ? [{
                uid: -1,
                status: 'done',
                name: this.state.fileList[0].name,
                url: this.state.fileList[0].url
              }] : []}
              onChange={(info)=> {
                console.log('info', info)
                let fileList = info.fileList
                fileList = fileList.slice(-1)
                this.setState({fileList: fileList})
                //console.log('fileList',fileList)

              }}
            >

              { (this.state.fileList.length>0)? null :
                <div><Icon type='plus' className={styles.avatar}/></div>}
            </Upload>)}
          </FormItem>
          <FormItem label='精选封面：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('showPictureSource', {
              initialValue:(this.state.imageList.length>0)? {
                uid: -1,
                status: 'done',
                name: this.state.imageList[0].name,
                url: this.state.imageList[0].url
              } : null,
              rules: [
                {
                  required: true,
                  message: '精选封面'
                }
              ]
            })(<Upload
              listType='picture'
              defaultFileList={(this.state.imageList.length>0) ? [{
                uid: -1,
                status: 'done',
                name: this.state.imageList[0].name,
                url: this.state.imageList[0].url
              }] : []}
              onChange={(info)=> {
                console.log('info', info)
                let fileList = info.fileList
                fileList = fileList.slice(-1)
                this.setState({imageList: fileList})
                console.log('fileList', fileList)

              }}
            >

              { (this.state.imageList.length>0) ? null : (
                <div><Icon type='plus' className={styles.avatar}/></div>)}
            </Upload>)}
          </FormItem>
          {/*<FormItem label='显示状态：' hasFeedback {...formItemLayout}>*/}
          {/*{this.props.form.getFieldDecorator('status', {*/}
          {/*initialValue: 0 ,*/}
          {/*rules: [*/}
          {/*{*/}
          {/*required: true,*/}
          {/*message: '状态未填写'*/}
          {/*}*/}
          {/*]*/}
          {/*})(*/}
          {/*<div> 是否显示：*/}
          {/*<Select onChange={this.selectStatus}>*/}
          {/*<Option value={1}>显示</Option>*/}
          {/*<Option value={0}>不显示</Option>*/}
          {/*</Select>*/}
          {/*</div>*/}
          {/*)}*/}
          {/*</FormItem>*/}
          <FormItem label='标签' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('containedTag', {
              initialValue: rowKeys
            })(
              <Table bordered scroll={{
                y: 300
              }} dataSource={this.props.tagList} columns={columns} pagination='false' rowKey={record=>record.id}
                     rowSelection={rowSelection}></Table>
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

export default connect(mapStateToProps)(Form.create()(CategoryModal))
