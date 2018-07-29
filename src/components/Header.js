import React, { Component } from 'react';
let manifest = require('../../package.json');

console.log(manifest);
class Header extends Component {
  render() {
    return (
        <div id="title-bar">
          <div id="appName">
            <span id="application_name">{manifest.appName} </span>
            <span id="application_version"> {manifest.version}</span>
          </div>
          <div id="search">
            <input type="search" placeholder="Search" id="searchbar" className="animated-search-form"></input>
          </div>
          <div id="menu">
            <span>Menu</span>
          </div>
        </div>
    );
  }
}


export default Header;
