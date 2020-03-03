import React, { Component } from 'react';
import List from '../List/List';

export default class Example extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       lists: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/lists')
      .then(res => {
        if(!res.ok) {
          return res.json().then(err => Promise.reject(err));
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          lists: data
        })
      })
  }
  
  render() {
    return (
      <div>
        {this.state.lists.map(list => 
          <List
            key={list.id}
            list={list}
          />
        )}
      </div>
    )
  }
}
