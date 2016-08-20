import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import {observable, action} from 'mobx';
import {observe} from 'mobx-react';

const messageStores = observable([]);

ReactDOM.render(<App stores={messageStores} />, document.getElementById('root'));