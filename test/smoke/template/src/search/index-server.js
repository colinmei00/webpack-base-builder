'use strict';

const React = require('react');
const logo = require('@/search/images/logo.png');
require('./search.less');

function App() {
  return (
    <div className="container">
      <div className="search-text">
        search page1<span className="aaa">2</span>{' '}
      </div>
      <img src={logo} alt="logo" />
    </div>
  );
}

module.exports = <App />;
