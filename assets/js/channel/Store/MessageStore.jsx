import {observable, action} from 'mobx';
import {observe} from 'mobx-react';

class MessageStore {
	@observable message = '';
	@observable username = '';
	id = Math.random();

	constructor(msg, username) {
		this.message = msg;
		this.username = username;
	}
}

export default MessageStore;