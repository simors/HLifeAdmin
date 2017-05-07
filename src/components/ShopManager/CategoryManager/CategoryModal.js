/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {message, Form, Input, InputNumber, Radio, Modal, Checkbox, Upload, Table, Icon, Button, Select} from 'antd'
import styles from './CategoryModal.less'
import {connect} from 'dva'
import {SketchPicker} from 'react-color'
import {
  getModalData,
  getModalState,
  getModalKey,
  getTagList,
  getSelectTags
} from '../../../selector/ShopManager/categorySelector'
import {trim} from '../../../services/CommonService'

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

    // console.log('rednder')
    this.state = {
      color: '#000000',
      pickerOpen: false,
      count: -1,
      visible: false,
      fileList: [],
      imageList: [],
      selectedRowKeys: [],
      selectTags: [],
      tagList: [],
      newTag: ''
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.type != 'create') {
      if (newProps.data.id != this.props.data.id) {
        this.props.dispatch({type: 'shopCategoryManager/queryTag', payload: {categoryId: newProps.data.id}})
        this.setState({
          tagList: newProps.data.tagList
        })
      }
      if ((newProps.data.imageSource != this.props.data.imageSource) || this.state.fileList.length == 0) {
        // console.log('data===============>', newProps.data.imageSource)

        if (newProps.data.imageSource) {
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
      if ((newProps.data.showPictureSource != this.props.data.showPictureSource) || this.state.fileList.length == 0) {
        // console.log('data===============>', newProps.data.showPictureSource)

        if (newProps.data.showPictureSource) {
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
      if ((newProps.data.containedTag != this.props.data.containedTag) || this.state.selectedRowKeys.length == 0) {
        // console.log('data===============>', newProps.data.showPictureSource)

        if (newProps.data.containedTag) {
          let rowKeys = []
          newProps.data.containedTag.forEach((record)=> {

            rowKeys.push(record.id)
          })
          // console.log('this.rowKeys',rowKeys)
          // this.props.dispatch({type:'shopCategoryManager/fetchSelectTag',payload:newProps.data.containedTag})
          this.setState({
            selectedRowKeys: rowKeys,
            selectTags: newProps.data.containedTag
          })
          // console.log('this.state',this.state.selectedRowKeys,this.state.selectTags)
        }
      }
    }
    // else {
    //   this.setState({
    //     color: '#000000',
    //     pickerOpen: false,
    //     fileList: [],
    //     imageList: [],
    //     selectedRowKeys: [],
    //     selectTags: []
    //   })
    // }

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
    // console.log('data', this.props.data)
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

  contains(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }

  addTag() {
    // console.log('tagList',this.props.tagList)

    let tagNameList = this.props.tagList.map((item, key)=> {
      return item.name
    })
    this.setState({
      newTag  :trim(this.state.newTag)
    })
    // console.log('tagList',tagNameList)
    if (trim(this.state.newTag) && trim(this.state.newTag) != '') {
      let isEx = this.contains(tagNameList, trim(this.state.newTag))
      if (isEx) {
        message.info('已经存在该标签')
      } else {
        this.props.dispatch({
          type: 'shopCategoryManager/tagcreate',
          payload: {categoryId: this.props.data.id, name: trim(this.state.newTag)}
        })
      }
    } else {
      message.info('请填写标签名称')
    }

  }

  onSelectChange = (selectedRowKeys, selectedRowData) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);

    this.setState({selectedRowKeys: selectedRowKeys, selectTags: selectedRowData});

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

    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      // console.log('=======>',{...this.props.form.getFieldsValue()})
      const data = {
        selectedTags: this.state.selectTags,
        ...this.props.form.getFieldsValue(),
        key: this.props.data.id ? this.props.data.id : '',
        textColor: this.state.color == '#000000' ? this.props.data.textColor : this.state.color
      }
      data.text = trim(data.text)
      if ((data.text && data.text != '')) {
        let tagNameList = this.props.categoryList.map((item, key)=> {
          return item.text

        })
        // console.log('test',tagNameList,data)
        let isEx = this.contains(tagNameList, data.text)
        if (isEx&&data.text!=this.props.data.text) {
          message.error('已有该分类')
          // this.props.onCancel()

        } else {
          this.setState({
            fileList: [], imageList: [], color: '#000000', selectedRowKeys: [], pickerOpen: false, selectTags: []
          })
          // console.log('data',...this.props.form.getFieldsValue())
          // console.log('data', data)

          this.props.onOk(data)          // console.log('data====>', data)
          // this.setState({modalVisible: false})
        }
      } else {
        message.error('请填写分类名称')
        // this.props.onCancel()
      }
      // let count = this.state.count - 1

    })
  }

  tagChange(value) {
    this.setState({
      newTag: value.target.value
    })
    // console.log('value',value.target.value)
  }

  pickOpen() {
    this.setState({pickerOpen: !this.state.pickerOpen})
  }

  pickClose() {
    this.setState({pickerOpen: false})
  }

  pickChange(color) {
    // console.log('color', color)
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
    // console.log('vale', value, optin)
  }

  selectTag(value) {
    // console.log('value',value)
    let selectKeys = this.state.selectedRowKeys
    selectKeys.push(value.id)
    let tagList = this.state.selectTags
    tagList.push(value)
    this.setState({
      selectTags: tagList,
      selectedRowKeys: selectKeys

    })
    // this.props.dispatch({type:'shopCategoryManager/fetchSelectTag',payload:tagList})
    //  console.log('this.state.selectTags',this.state.selectTags)

    // console.log('this.state.selectRowKeys',this.state.selectedRowKeys)

  }

  unSelectTag(tag) {
    // let tagList = this.state.selectTags
    let selectKeys = this.state.selectedRowKeys
    let tagList = this.state.selectTags
    for (let i = 0; i < selectKeys.length; i++) {
      if (selectKeys[i] == tag.id) {
        selectKeys.splice(i, 1)
      }
    }
    for (let j = 0; j < tagList.length; j++) {
      if (tagList[j].id == tag.id) {
        tagList.splice(j, 1)
      }
    }
    this.setState({
      selectedRowKeys: selectKeys,
      selectTags: tagList
    })
  }

  renderTagList() {
    // console.log('tagList',this.props.tagList)

    if (this.props.tagList && this.props.tagList.length > 0) {
      let tagList = this.props.tagList.map((item, key)=> {
        let tag = {
          categoryId: item.categoryId,
          categoryName: item.categoryName,
          id: item.id,
          name: item.name
        }
        let isSelect = this.contains(this.state.selectedRowKeys, item.id)
        if (isSelect) {
          return <Button style={{
            color: '#FFFFFF',
            borderRadius: 5,
            width: 80,
            height: 25,
            backgroundColor: '#FF9D4E',
            marginTop: 10,
            marginLeft: 20
          }} key={item.id} onClick={()=> {
            this.unSelectTag(tag)
          }}>{item.name}</Button>
        } else {
          return <Button style={{
            color: '#FF9D4E',
            borderRadius: 5,
            width: 80,
            height: 25,
            backgroundColor: '#FFFFFF',
            marginTop: 10,
            marginLeft: 20
          }} key={item.id} onClick={()=> {
            this.selectTag(tag)
          }}>{item.name}</Button>

        }
      })
      return tagList
    }
  }

  setTrimValue(value) {
    let trimValue = trim(value)
    // console.log('trim',trimValue)
    return trimValue
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
    const selectedRowKeys = this.state.selectedRowKeys
    // console.log('selectTag',this.state.fileList)
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
    // console.log('here is picture ',this.state.fileList,this.state.imageList)
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
              // getValueFromEvent:(e)=>{
              //  let value=this.setTrimValue(e.target.value)
              //  return value
              //},
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
                  message: '描述未填写'
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
              initialValue: (this.state.fileList.length > 0) ? {
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
              defaultFileList={(this.state.fileList.length > 0) ? [{
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
              <div><Button>点击上传图标</Button></div>
            </Upload>)}
          </FormItem>
          <FormItem label='精选封面：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('showPictureSource', {
              initialValue: (this.state.imageList.length > 0) ? {
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
              onChange={(info)=> {
                {/*console.log('info', info)*/
                }
                let fileList = info.fileList
                fileList = fileList.slice(-1)
                this.setState({imageList: fileList})
                {/*console.log('fileList', fileList)*/
                }
              }}
              fileList={this.state.imageList}
            >
              <div><Button>点击上传封面</Button></div>
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
          {this.props.type == 'create' ? null :
            <div style={{marginLeft: 115, marginRight: 115}}><Input size='default' onChange={(value)=> {
              this.tagChange(value)
            }} placeholder="添加标签"></Input><Button onClick={()=> {
              this.addTag()
            }}>添加标签</Button></div>}
          {this.props.type == 'create' ? null :
            <div>{this.renderTagList()}</div>
          }
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
  let selectTags = getSelectTags(state)
  let tagList = getTagList(state)
  let data = getModalData(state)
  let modalVisible = getModalState(state)
  let modalKey = getModalKey(state)
  // console.log('tagList==========>', tagList)
  return {
    selectTags: selectTags,
    tagList: tagList,
    data: data,
    modalVisible: modalVisible,
    modalKey: modalKey
  }
}

export default connect(mapStateToProps)(Form.create()(CategoryModal))
