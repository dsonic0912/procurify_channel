import {observable, action} from 'mobx';
import {observe} from 'mobx-react';

class MessageStore {
	@observable message = '';
	@observable username = '';
	id = Math.random();

	constructor(msg) {
		this.message = msg;
	}
}

export default MessageStore;