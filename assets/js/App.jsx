require('../css/lib/bootstrap/css/bootstrap.min.css');
require('../css/dashboard.css');

import React, {Component} from 'react';
import { Grid,Row,Col } from 'react-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';

class App extends Component {
	render() {
		return (
			<Row>
				<Col md={2}>
					<h1>Left Col</h1>
				</Col>
				<Col md={10} className="main">
					<Row>
						<Col md={12}>
							<h1>Main Content</h1>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<FormControl componentClass="textarea" />
						</Col>
					</Row>
				</Col>
			</Row>
		);
	}
}

export default App;