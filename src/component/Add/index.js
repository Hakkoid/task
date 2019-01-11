import React, { Component } from 'react';
import './style.css';
import PropTypes from 'prop-types'


class Add extends Component {
  constructor(props){
    super(props);
    this.state = { input: ""};
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleChange(e){
    this.setState({input: e.target.value})
  }

  handleAdd(){
    this.props.onAdd(this.state.input)
  }

  render() {
    return (
      <form className = 'Add' onSubmit = {(e) => { e.preventDefault(); this.handleAdd()}}>
        <input className = 'Add__Input' onChange = {this.handleChange} type="text" value = {this.state.input}/>
        <input type = 'submit' className = 'Add__Button' value = 'Add' />
      </form>
    );
  }
}

Add.propTypes = {
  onAdd: PropTypes.func.isRequired
}

export default Add
