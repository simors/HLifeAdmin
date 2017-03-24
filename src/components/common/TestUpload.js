/**
 * Created by lilu on 2017/3/24.
 */
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import {Button,Icon,Upload,Input} from 'antd'
const Search = Input.Search
import AV from 'leancloud-storage'

export default class TestUpload extends Component{
  constructor(props){
    super(props)
    this.state={
      fileUrl:''
    }
  }
  upload(value){
    console.log('value',value)

    let base = window.btoa(window.encodeURIComponent(value))
    let baseto=window.decodeURIComponent(window.atob(base))
    console.log('baseto',baseto)

    console.log('base',base)

    let file = {base64:base}
    console.log('value',value)

    let File = new AV.File('test.html',file)
    File.save().then((url)=>{
      console.log('url',url)

      this.setState({
        fileUrl:url.attributes.url
      })
      console.log('url',this.state.fileUrl)
    },(err)=>{
      console.log('err',err)
      this.setState({
        fileUrl:err
      })
    })
  }
  upload2(payload){
    let uploadFile=payload.file.originFileObj
    let file = new AV.File('test.html',uploadFile)
    file.save().then((url)=>{
      console.log('url',url)
      this.setState({
        fileUrl:url.attributes.url
      })
    })
  }
  render(){
    return(
      // {/*<Search*/}
      //   {/*placeholder="input search text"*/}
      //   {/*style={{ width: 200 }}*/}
      //   {/*onSearch={(value)=>{*/}
      //     {/*this.upload(value)*/}
      //   {/*}}*/}
      // {/*/>*/}
      <div>
      <Upload onChange={(payload)=>{
       this.upload2(payload)
      }}>upload</Upload>
      <a href={this.state.fileUrl}>ggggg</a></div>
    )
  }
}