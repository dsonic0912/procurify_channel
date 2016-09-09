require('../../../css/lib/bootstrap/css/bootstrap.min.css');
require('../../../css/channel/channel_demo.css');

import React, {Component} from 'react';
import { Grid,Row,Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import queryString from 'query-string';

import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
class App extends Component {
    constructor() {
		super();

		let queryParams = queryString.parse(location.search);
        console.log(queryParams);

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

    @action messageReceive(msg) {
        let messageData = JSON.parse(msg.data)
        let message = messageData.message;
        let username = messageData.username;

        this.props.stores.push(new MessageStore(message, username));
    }

	render() {
        var mugshotStyle = {
            'border-radius': '25px',
            width: '50px',
            height: '50px',
        };

        var chatMessageStyle = {
            'margin-top': '5px',
            'margin-bottom': '5px',
        };

	    return (
	        <Row className="chat-wrap">
                <Col xs={12}>
                    <Row className="chat-message" style={chatMessageStyle}>
                        <Col xs={3} className="mugshot">
                            <img src="http://localhost:3000/assets/images/david.jpg" style={mugshotStyle} />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                Xander Fang <span>5:30pm</span>
                            </Row>
                            <Row>
                                Hi Staples!
                            </Row>
                        </Col>
                    </Row>
                    <Row className="chat-message" style={chatMessageStyle}>
                        <Col xs={3} className="mugshot">
                            <img src="http://localhost:3000/assets/images/david.jpg" style={mugshotStyle} />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                Xander Fang <span>5:30pm</span>
                            </Row>
                            <Row>
                                Hi Staples!
                            </Row>
                        </Col>
                    </Row>
                    <Row className="chat-message" style={chatMessageStyle}>
                        <Col xs={3} className="mugshot">
                            <img src="http://localhost:3000/assets/images/david.jpg" style={mugshotStyle} />
                        </Col>
                        <Col xs={9}>
                            <Row>
                                Xander Fang <span>5:30pm</span>
                            </Row>
                            <Row>
                                Hi Staples!
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

export default App;