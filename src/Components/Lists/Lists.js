import React, { Component } from 'react';
import List from '../List/List';
import Form from '../Form/Form';

export default class Example extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       lists: [],
       yesClicked: false,
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

  toggleClick = () => {
    this.setState({
      yesClicked: true
    })
  }

  cancelClicked = () => {
    this.setState({
      yesClicked: false
    })
  }

  renderForm = () => {
    if(this.state.yesClicked) {
      return (
        <>
          <Form />
          <button onClick={this.cancelClicked}>Cancel</button>
        </>
     )
    }
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

        <h3>Do you want to add a list?</h3>
        {!this.state.yesClicked && <button onClick={this.toggleClick}>Yes</button>}

        {this.renderForm()}
      </div>
    )
  }
}
