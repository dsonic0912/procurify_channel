require('../../../css/lib/bootstrap/css/bootstrap.min.css');
require('../../../css/channel/channel.css');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import { Grid,Row,Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

import MessageStore from '../Store/MessageStore';
import MessageBox from './MessageBox';

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
		let messageData = JSON.parse(msg.data)
		let message = messageData.message;
		let username = messageData.username;

		this.props.stores.push(new MessageStore(message, username));
	}

	@action onChange = (e) => {
		this.input = e.target.value;
	}

	@action onSubmit = (e) => {
		console.log('submit');
		if (e.key == 'Enter') {
			let message = this.input;

			let messageData = {
				username: '',
				message: message
			};

			this.socket.send(JSON.stringify(messageData));

			this.input = '';
		}
	}

	render() {
		const messageStores = this.props.stores;

		return (
			<Row className="chat-wrap">
				<Col xs={3} className="panel-wrap">
					<Col xs={12} className="section-wrap" id="Contacts">

						<Row className="content-wrap">

							<Button className="contact">
								<div className="media-body">
									<h5 className="media-heading">#Vendor1</h5>
								</div>
							</Button>

							<Button className="contact">
								<div className="media-body">
									<h5 className="media-heading">#Vendor2</h5>
								</div>
							</Button>							

						</Row>

					</Col>
				</Col>

				<Col xs={9} className="panel-wrap">
					<MessageBox 
						messageStores={messageStores} 
						updateInputValue={this.onChange} 
						sendMessage={this.onSubmit}
						inputValue={this.input} />
				</Col>
			</Row>
		);
	}
}

export default App;