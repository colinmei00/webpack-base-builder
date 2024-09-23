'use strict';

import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import largeNumber from 'colin-large-number';
import './search.less';
import logo from '@/search/images/logo.png';
import '../../common';
import { a } from './tree-shaking';

if (false) {
  a();
}

function App() {
  const [text, setText] = useState(null);

  async function handleClickLoad() {
    const res = await import('./text');
    console.log('res=>', res);
    setText(res.default);
  }

  const sum = largeNumber(123, 22);

  return (
    <div className="container">
      <div className="search-text">
        search page1<span className="aaa">2</span>{' '}
      </div>
      {sum}
      <img src={logo} alt="logo" onClick={handleClickLoad} />
      {text}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
