import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Grid,Row,Col } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
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

		return (
			<Col xs={12} className="section-wrap" id="Messages">
				<Row className="content-wrap messages" ref="messageBox">
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