import React from 'react';
import './ListItem.css';

export default class ListItem extends React.Component {
  handleClick = () => {
    this.props.itemClicked( this.props.item_id);
  };
  deleteClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.deleteClicked( this.props.item_id);
  };
  render = () => {
    const style = {
      cursor: "pointer",
      listStyleType: "none"
    };
    const delete_button_style={
      textDecoration: "none",
      marginRight: "10px"
    };
    return (
      <li onClick={this.handleClick} style={style}>
        <a href='' style={delete_button_style} className="delete_button"
          onClick={this.deleteClicked} title={this.props.tooltip} >
          <span role="img" aria-label="delete">&#10060;</span>
        </a>
        {this.props.item_text}
      </li>
    );
  }
}
