/**
 * Created by lilu on 2017/2/18.
 */
import React, {Component} from 'react'
import Block from 'react-blocks'
const COMP_TEXT = 'COMP_TEXT'
const COMP_IMG = 'COMP_IMG'

export default class TopicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgModalShow: false,
      showImg: '',
    }
    this.images = []
  }

  renderText(content, index) {
    return (
      <p key={index} style={{fontSize: 16}}>&nbsp;&nbsp;{content}</p>
    )
  }

  renderImage(url, width, height, index) {
    return (
      <div key={index} style={{justifyContent: 'center', display: 'flex'}}>
        <img src={url}/>
      </div>
    )
  }

  renderComponents() {
    if (this.props.location.query.articleContent) {
      return (
        JSON.parse(this.props.location.query.articleContent).map((section, index) => {
          if (section.type === COMP_TEXT) {
            return this.renderText(section.text, index)
          } else if (section.type === COMP_IMG) {
            return this.renderImage(section.url, section.width, section.height, index)
          } else {
            return <div key={index}/>
          }
        })
      )
    }
  }

  render() {
    return (
      <div style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{marginLeft: 100, marginRight: 100}}>
          <p style={{fontSize: 20, textAlign: 'center'}}>{this.props.location.query.title}</p>
          <br/><br/>
          {this.renderComponents()}
        </div>
      </div>
    )
  }
}
