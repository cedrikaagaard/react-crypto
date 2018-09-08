import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videos: [],
			selectedVideo: null
		};

		//this.videoSearch('surfboards');
	}

	render() {
		return (
			<div>
				hej
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('.container'));
