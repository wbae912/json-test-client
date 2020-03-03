import React, { Component } from 'react';
import './Form.css';

export default class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      title: '',
      itemNames: '',
      list: {}
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const itemNames = this.state.itemNames.split('\n');
    const result = [];

    for(let i = 0; i < itemNames.length; i++) {
      result.push({
        name: itemNames[i],
        checked: false
      })
    }

    const newList = {
      title: this.state.title,
      items: result
    }


    fetch('http://localhost:8000/lists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newList)
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => Promise.reject(err));
      }
      return res.json();
    })
    .then(data => {
      this.setState({
        list: data
      })
    })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Title</label>
            <input 
              type="text"
              name="title"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label>Items</label>
            <textarea 
              name="itemNames"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}
