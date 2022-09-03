/* eslint-disable */
/* eslint sonarjs/no-collapsible-if: 0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/pixelated.menu-simple.css';

/* ========== MENU ========== */
export class Menu extends Component {
  static propTypes = {
    menuItems: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
  }

  generateMenuItems() {
    const myItems = [];
    for (const itemKey in this.props.menuItems) {
      myItems.push(<MenuItem key={itemKey} name={itemKey} href={this.props.menuItems[itemKey]} />);
    }
    // this.setState({ menuItems: myItems })
    return myItems;
  }

  componentDidMount() {
    const menu = document.getElementById('menu');
  }

  render() {
    return (
      <div className="menu-wrapper">
        <hr />
        <div className="menu" id="menu">
          <ul>
            { this.generateMenuItems() }
          </ul>
        </div>
        <hr />
      </div>
    );
  }
}

/* ========== MENU ITEM ========== */
export class MenuItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  };

  render() {
    return (
      <li className='menu-item'><a href={this.props.href}>{this.props.name}</a></li>
    );
  }
}
