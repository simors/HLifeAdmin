/**
 * Created by lilu on 2017/6/21.
 */
import React from 'react'
import {Table, Popconfirm, Input,Button,message} from 'antd'
import {TweenOneGroup} from 'rc-tween-one'
import {connect} from 'dva'
import {getUserInfo} from '../../selector/userInfo/userInfo'


class SmsInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countDown: 0
    }
  }

  countDown = () => {
    this.interval = setInterval(()=> {
      this.setState({countDown: this.state.countDown - 1})
    }, 1000)
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  renderCodeFetcher = () => {
    if (this.state.countDown) {
      return (this.state.countDown + 's后重新获取')


    } else {
      this.interval && clearInterval(this.interval)
      return (this.props.getSmsAuthText)

    }
  }

  requestSmsCodeSuccess(){
    message.success('验证码已经发送，请查收！')
  }

  requestSmsCodeError(){
    message.error('发送失败，请过会儿再发！')
  }
  requestSmsCode = () => {
    this.props.dispatch({
      type:'app/requestSmsCode',
      payload:{
        success:()=>{this.requestSmsCodeSuccess()},
        error:()=>{this.requestSmsCodeError()},
        phone:this.props.phone
      }
    })
  }

  getSmsAuthCode = () => {
    if (this.props.reset) {
      this.setState({countDown: 0})
    } else {
      this.setState({countDown: this.props.countTimes})
      this.countDown()
    }
    this.requestSmsCode()
  }

  renderGetSmsButtonEnabled = () => {
    return (
      <Button onClick={this.state.countDown ? ()=> {} : this.getSmsAuthCode}
      >
        {this.renderCodeFetcher()}
      </Button>
    )
  }

  renderGetSmsButtonDisabled = () => {
    return (
      <div>
        {this.renderCodeFetcher()}
      </div>
    )
  }

  render() {
    return (
      <div>
        {/*<Input*/}
          {/*placeholder={this.props.placeholder}*/}
        {/*/>*/}
        {this.state.countDown ? this.renderGetSmsButtonDisabled() : this.renderGetSmsButtonEnabled()}
      </div>
    )
  }

}

SmsInput.defaultProps = {
  getSmsAuthText: '获取验证码',

  //text input
  placeholder: '请输入6位验证码',
  placeholderTextColor: '#E1E1E1',
  maxLength: 6,
  autoFocus: false,
  countTimes: 60,
}

function mapStateToProps(state) {
  let userInfo = getUserInfo(state)
  return {
    phone:userInfo.phone
  }
}

export default connect(mapStateToProps)(SmsInput)

