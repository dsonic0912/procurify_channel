require('../../../css/lib/bootstrap/css/bootstrap.min.css');
require('../../../css/dashboard.css');

import React, {Component} from 'react';
import { Grid,Row,Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';
import MessageStore from '../Store/MessageStore';

@observer
class App extends Component {
	constructor() {
		super();
		this.socket = new WebSocket("ws://" + window.location.host + "/chat/");
	}

	componentDidMount() {
		this.socket.onmessage = this.messageReceive.bind(this);
	}

	@observable input = '';

	@action messageReceive(msg) {
		this.props.stores.push(new MessageStore(msg.data));
	}

	@action onChange = (e) => {
		this.input = e.target.value;
	}

	@action onSubmit = () => {
		this.socket.send(this.input);
		this.input = '';
	}

	render() {
		const stores = this.props.stores;

		return (
			<Row>
				<Col md={2}>
					<h1>Channe#1</h1>
				</Col>
				<Col md={10} className="main">
					<Row>
						<Col md={12}>
							{ stores.map(t => <p key={t.id}>{ t.message }</p>)}
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormControl onChange={this.onChange} value={this.input} componentClass="textarea" />
							<Button onClick={this.onSubmit}>Send</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default App;