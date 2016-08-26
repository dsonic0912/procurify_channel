import React, {Component} from 'react';

const Message = (props) => (
	<div className="msg">
		<div className="media-body">
			<h5 className="media-heading">{ props.messageStore.username }</h5>
			<small className="col-md-11">{ props.messageStore.message }</small>
		</div>
	</div>
)

export default Message;