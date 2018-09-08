import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const PriceDisplayer = ({currency, price, change}) => {
	const indicatorGlyph =
		'glyphicon glyphicon-chevron-' + (change > 0 ? 'up' : 'down');

	return (
		<div id="price-displayer" className="col-md-10 col-md-offset-1">
			<div>
				{price.toFixed(2)} {currency} <Glyphicon glyph={indicatorGlyph}/> ({change} %)
			</div>

			<div id="price-displayer-info">
				Powered by <i>coinmarketcap.com</i> and <i>exchangeratesapi.io</i>
			</div>
		</div>
	);
}

export default PriceDisplayer;
