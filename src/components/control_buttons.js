import React from 'react';
import {Button} from 'react-bootstrap';

const ControlButtons = ({eth, usd, onCryptoChanged, onFiatChanged}) => {
	return (
		<div id="control-buttons" className="col-md-10 col-md-offset-1">
			<div className="col-md-3">
				<Button
					bsStyle="primary"
					className="btn-lg"
					disabled={eth}
					onClick={event => onCryptoChanged(true)}>
				Ethereum
				</Button>
			</div>

			<div className="col-md-3">
				<Button
					bsStyle="primary"
					className="btn-lg"
					disabled={!eth}
					onClick={event => onCryptoChanged(false)}>
				Bitcoin
				</Button>
			</div>

			<div className="col-md-3">
				<Button
					bsStyle="primary"
					className="btn-lg"
					disabled={usd}
					onClick={event => onFiatChanged(true)}>
				Us Dollar
				</Button>
			</div>

			<div className="col-md-3">
				<Button
					bsStyle="primary"
					className="btn-lg"
					disabled={!usd}
					onClick={event => onFiatChanged(false)}>
				Svensk Krona
				</Button>
			</div>
		</div>
	)
}

export default ControlButtons;
