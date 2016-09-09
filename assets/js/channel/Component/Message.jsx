import React, {Component} from 'react';
import { Grid,Row,Col } from 'react-bootstrap';

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

const Message = (props) => (
	<div className="msg">
		<div className="media-body">
            <Row className="chat-message" style={chatMessageStyle}>
                <Col xs={3} className="mugshot">
                    <img src={ props.messageStore.username == 'admin' ? andyImageUrl : davidImageUrl } style={mugshotStyle} />
                </Col>
                <Col xs={9}>
                    <Row>
                        { props.messageStore.username } <span>{ today }</span>
                    </Row>
                    <Row>
                        { props.messageStore.message }
                    </Row>
                </Col>
            </Row>
		</div>
	</div>
)

export default Message;