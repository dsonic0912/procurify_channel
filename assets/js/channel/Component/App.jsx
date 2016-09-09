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

import queryString from 'query-string';

@observer
class App extends Component {
	@observable input = '';
	@observable vendor = '';
	@observable socket = {};

	constructor() {
		super();

		let queryParams = queryString.parse(location.search);

		if (Object.keys(queryParams).length > 0) {
			this.vendor = queryParams['vendor'];
		} else {
			this.vendor = 'chat'
		}

		this.socket = new WebSocket("ws://" + window.location.host + "/" + this.vendor + "/");
	}

	componentDidMount() {
		console.log('componentDidMount');
		this.socket.onmessage = this.messageReceive.bind(this);

		this.fetch();
	}

	@action fetch() {
		window.fetch('/api/sample/')
			.then(res => res.json())
			.then(json => {
				json.map(msg => {
					this.props.stores.push(new MessageStore(msg.message, msg.username));
				});
			})
	}

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

	@action vendorClicked = (e) => {
		let clickedVendor = e.target.getAttribute('data-vendor');
		window.location.href = '/?vendor=' + clickedVendor;
	}


	render() {
		const messageStores = this.props.stores;

		return (
			<Row className="chat-wrap">
				<Col xs={3} className="panel-wrap" id="contacts-container">
					<Col xs={12} className="section-wrap" id="Contacts">

						<Row className="content-wrap">

							<div className="contact-header">Channels <small>(5)</small></div>

							<Button className="contact active" data-vendor="Vendor1" onClick={this.vendorClicked}>
								#All Questions
							</Button>

							<Button className="contact" data-vendor="Vendor2" onClick={this.vendorClicked}>
								#Orders
							</Button>

							<Button className="contact" data-vendor="Vendor3" onClick={this.vendorClicked}>
								#Shipping
							</Button>

							<Button className="contact" data-vendor="Vendor4" onClick={this.vendorClicked}>
								#Return an Item
							</Button>

							<Button className="contact" data-vendor="Vendor5" onClick={this.vendorClicked}>
								#Request a Quote
							</Button>

						</Row>

						<Row className="content-wrap">

							<div className="contact-header">Clients Order <small>(15)</small></div>

							<Button className="contact highlight" data-vendor="Quotes" onClick={this.vendorClicked}>
								#Quotes <small>(2)</small>
							</Button>

							<Button className="contact" data-vendor="Vendor2" onClick={this.vendorClicked}>
								#Orders
							</Button>

							<Button className="contact" data-vendor="Vendor3" onClick={this.vendorClicked}>
								#Purchase Orders
							</Button>

						</Row>

					</Col>
				</Col>

				<Col xs={9} className="panel-wrap" id="messages-container">
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