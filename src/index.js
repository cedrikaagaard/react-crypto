import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

import PriceDisplayer from './components/price_displayer';
import ControlButtons from './components/control_buttons';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			price: 0,
			change: 0,
			sekPrice: 0,
			eth: true,
			usd: true
		};

		this.fetch();
	}

	extractCryptoApiData(data) {
		const ethData = Object.values(data).find(e => e.symbol === 'ETH');
		const btcData = Object.values(data).find(e => e.symbol === 'BTC');

		const res = {
			eth: {
				price: ethData.quotes.USD.price,
				change: ethData.quotes.USD.percent_change_24h
			},

			btc: {
				price: btcData.quotes.USD.price,
				change: btcData.quotes.USD.percent_change_24h
			}
		};

		return res;
	}

	cryptoApiRequest() {
		return new Promise((resolve, reject) => {
			axios.get('https://api.coinmarketcap.com/v2/ticker/')
				.then(response => {
					resolve(this.extractCryptoApiData(response.data.data));
				});
		})
	}

	fiatApiRequest() {
		return new Promise((resolve, reject) => {
			axios.get('https://api.exchangeratesapi.io/latest?base=USD')
				.then(response => {
					resolve(response.data.rates.SEK);
				});
		});
	}

	fetch() {
		let promises = [];

		promises.push(this.fiatApiRequest());
		promises.push(this.cryptoApiRequest());

		Promise.all(promises).then(result => {
			let newState = Object.assign({}, this.state);

			if (this.state.usd) {
				if (this.state.eth) {
					newState.price = result[1].eth.price;
					newState.change = result[1].eth.change;
				}

				else {
					newState.price = result[1].btc.price;
					newState.change = result[1].btc.change;
				}
			}

			else {
				if (this.state.eth) {
					newState.price = result[1].eth.price * result[0];
					newState.change = result[1].eth.change;
				}

				else {
					newState.price = result[1].btc.price * result[0];
					newState.change = result[1].btc.change;
				}
			}

			this.setState(newState);
		});
	}

	onCryptoChanged(eth) {
		let newState = Object.assign({}, this.state);
		newState.eth = eth;
		this.setState(newState);

		this.fetch();
	}

	onFiatChanged(usd) {
		let newState = Object.assign({}, this.state);
		newState.usd = usd;
		this.setState(newState);

		this.fetch();
	}


	render() {
		return (
			<div>
				<PriceDisplayer
					currency={this.state.usd ? 'USD' : 'SEK'}
					price={this.state.price}
					change={this.state.change}>
				</PriceDisplayer>


		<ControlButtons
					eth={this.state.eth}
					usd={this.state.usd}
					onCryptoChanged={eth => this.onCryptoChanged(eth)}
					onFiatChanged={usd => this.onFiatChanged(usd)}>
				</ControlButtons>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.querySelector('.container'));
