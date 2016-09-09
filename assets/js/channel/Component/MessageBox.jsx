import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Grid,Row,Col } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import {observer} from 'mobx-react';

import Message from './Message';

@observer
class MessageBox extends Component {
	componentDidUpdate() {
		var messageBoxNode = ReactDOM.findDOMNode(this.refs.messageBox);
		messageBoxNode.scrollTop = messageBoxNode.scrollHeight;
	}

	render() {
		const messageStores = this.props.messageStores;
		const updateInputValue = this.props.updateInputValue;
		const sendMessage = this.props.sendMessage;
		const inputValue = this.props.inputValue;

		var mugshotStyle = {
			'border-radius': '25px',
			width: '50px',
			height: '50px',
		};

		var chatMessageStyle = {
			'margin-top': '5px',
			'margin-bottom': '5px',
		};

		let today = Date();

		let andyImageUrl = "http://localhost:3000/assets/images/andy.jpg";
		let davidImageUrl = "http://localhost:3000/assets/images/david.jpg";

		return (
			<Col xs={12} className="section-wrap" id="Messages">
				<Row className="content-wrap messages" ref="messageBox">
					<div className="msg">
						<div className="media-body">
							<Row className="chat-message" style={chatMessageStyle}>
								<Col xs={3} className="mugshot">
									<img src={ andyImageUrl } style={mugshotStyle} />
								</Col>
								<Col xs={9}>
									<Row>
									    admin <span>{ today }</span>
									</Row>
									<Row>
									    Hi Staples!
									</Row>
								</Col>
							</Row>
						</div>
					</div>
					<div className="msg">
						<div className="media-body">
							<Row className="chat-message" style={chatMessageStyle}>
								<Col xs={3} className="mugshot">
									<img src={ davidImageUrl } style={mugshotStyle} />
								</Col>
								<Col xs={9}>
									<Row>
									    dsonic <span>{ today }</span>
									</Row>
									<Row>
									    Hi Xander, how can we help you?
									</Row>
								</Col>
							</Row>
						</div>
					</div>
					<div className="msg">
						<div className="media-body">
							<Row className="chat-message" style={chatMessageStyle}>
								<Col xs={3} className="mugshot">
									<img src={ andyImageUrl } style={mugshotStyle} />
								</Col>
								<Col xs={9}>
									<Row>
									    admin <span>{ today }</span>
									</Row>
									<Row>
									    I want to follow up on my order <a href="http://asco.dev.procurify.xyz/po/history/f7a40742f2ad439a9cfe908312eed013/#/" target="_blank"><Button bsStyle="success">PO PF17</Button></a> that I've put in couple days ago.
									</Row>
								</Col>
							</Row>
						</div>
					</div>
					<div className="msg">
						<div className="media-body">
							<Row className="chat-message" style={chatMessageStyle}>
								<Col xs={3} className="mugshot">
									<img src={ davidImageUrl } style={mugshotStyle} />
								</Col>
								<Col xs={9}>
									<Row>
									    dsonic <span>{ today }</span>
									</Row>
									<Row>
									    Alright, let me take a loot at it.
									</Row>
								</Col>
							</Row>
						</div>
					</div>
					{ messageStores.map(t => 
						<Message messageStore={t} key={t.id} />
					)}
				</Row>

				<Row className="send-wrap">
					<div className="send-message">
						<div className="message-text">
							<FormControl 
								componentClass="textarea" 
								placeholder="Write a message...." 
								rows="1" 
								onChange={updateInputValue} 
								onKeyPress={sendMessage} 
								value={inputValue} 
								className="no-resize-bar form-control" 
								ref="msgTextArea" />
						</div>
					</div>
				</Row>
			</Col>
		);
	}
}

export default MessageBox;