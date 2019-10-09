import React, { useContext } from 'react';
import { DataContext } from '../utils/contexts';

function renderList(list = [], initialCurrency, convertedCurrency) {
  return list.map((item, index) => (
    <p key={index}>
      {item[0]} <span className="currency">{initialCurrency}</span> @ {item[1]}
      <span className="currency"> {convertedCurrency}</span>
    </p>
  ));
}

function OrderBookStream() {
  const {
    orders: { bids, asks },
    selectedCurrencyPair,
  } = useContext(DataContext);
  const [initialCurrency, convertedCurrency] = selectedCurrencyPair.split('/');
  return (
    <div className="order-stream-container">
      <div className="bids">
        {bids.length > 0 && <h3>Bids</h3>}
        {renderList(bids, initialCurrency, convertedCurrency)}
      </div>
      <div className="asks">
        {asks.length > 0 && <h3>Asks</h3>}
        {renderList(asks, initialCurrency, convertedCurrency)}
      </div>
    </div>
  );
}

export default OrderBookStream;
