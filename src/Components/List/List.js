import React, { Component } from 'react';
import './List.css';

export default class List extends Component {
  render() {
    return (
      <div>
        <h2>{this.props.list.title}</h2>
        <ul className="item-ul">
          {this.props.list.items.map((item,index) => {
            if(item.checked) {
              return (
                <li 
                  key={`${item} - ${index}`}
                  className="li-checked"
                >
                {item.name}</li>
              )
            } else {
              return (
                <li 
                  key={`${item} - ${index}`}
                  className="li-unchecked"
                >
                {item.name}</li>
              )
            } 
          }
          )}
        </ul>
      </div>
    )
  }
}
