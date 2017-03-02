/**
 * Created by lilu on 2017/3/1.
 */
import AV from 'leancloud-storage'
import React, {PropTypes, Component} from 'react'
import {Form, Input, InputNumber, Radio, Modal, Checkbox,Upload,Table,Icon,Button} from 'antd'
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
    this.state = {
      visible: false,
      fileList: [
    ],
      selectedRowKeys: [],
      selectTags:[]
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
  onSelectChange = (selectedRowKeys,selectedRowData) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    //console.log('selectedRowKeys changed: ', this.state.selectedRowKeys);

    this.setState({ selectedRowKeys:selectedRowKeys,selectTags:selectedRowData });

  }

  handleOk() {
    this.props.form.validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        selectedTags:this.state.selectTags,
        ...this.props.form.getFieldsValue(),
        key: this.props.item.key?this.props.item.key:''
      }
      //console.log('data',data)
      this.props.onOk(data)
    })
  }
  returnUrl(payload){
    var localFile = payload.file
    var name = 'categorytestimage.png'
    var file = new AV.File(name,localFile)
    file.save().then((file)=>{
      console.log(file.url())
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
    // console.log('ahahahahahaha', this.props.item)
    // console.log('ahahahahahaha',options)
    const roles = []
    if (this.props.item.roleList)
    {
      this.props.item.roleList.forEach((record)=>{
        roles.push(record)
      })
    }
    // console.log('type',this.props.type)
    // console.log('roleList',this.props.roleList)
    return (
      <Modal
        title={(this.props.type === 'create') ? '新建分类' : '修改分类'}
        visible={this.state.visible}
        onOk={()=>{this.handleOk()}}
        onCancel={()=>{this.props.onCancel()}}
        wrapClassName='vertical-center-modal'
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
          <FormItem label='图标：' hasFeedback {...formItemLayout}>
            {this.props.form.getFieldDecorator('imageSource', {
              initialValue: this.props.type==='create'?'':this.props.item.imageSource,
              rules: [
                {
                  required: true,
                  message: '图标'
                }
              ]
            })(<Upload  listType='picture'  >
              <Button>
              <Icon type='upload' />upload</Button>
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
              initialValue: [],

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
