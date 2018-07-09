import React, { Component } from 'react';
import './MyInput.css';
import checkMod from '../checkMod'


class MyMap__Input extends Component {
	 constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleEnter(event){
    if(event.which == 13 || event.keyCode == 13){
      this.handleEvent()
    }
  }

  handleEvent(){
    if( checkMod(this.props.mods, "noReturnEmpty") && this.state.value === ""){
      return
    }

    if(typeof this.props.onEnter == "function"){
        this.props.onClick(this.state.value)
    }
    if(typeof this.props.mods == "object" && this.props.mods.clearInputByEvent){
      this.setState({value: ''})
    }
  }

  handleClick(event){
    this.handleEvent()
  }

  render() {
    return ( 
      <div className = {"MyInput " + (this.props.className ? this.props.className : "")}>
        <input 
          className = "MyInput__Input" 
          onChange = {this.handleChange} 
          type="text" 
          value={this.state.value}
          onKeyUp = {this.handleEnter}
        />
        <button className = "MyInput__Button" onClick = {this.handleClick}>{this.props.textButton}</button>
      </div>
    )
  }
}

export default MyMap__Input;
