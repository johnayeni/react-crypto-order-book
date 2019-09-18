import React, { useContext } from 'react';
import { DataContext } from '../utils/contexts';

function renderBids(bids = [], initialCurrency, convertedCurrency) {
  return bids.map((bid, index) => {
    const [from, to] = bid;
    return <p key={index}>{`${from} ${initialCurrency} @ ${to} ${convertedCurrency}`}</p>;
  });
}

function renderAsks(asks = [], initialCurrency, convertedCurrency) {
  return asks.map((ask, index) => {
    const [from, to] = ask;
    return <p key={index}>{`${from} ${initialCurrency} @ ${to} ${convertedCurrency}`}</p>;
  });
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
        {renderBids(bids, initialCurrency, convertedCurrency)}
      </div>
      <div className="asks">
        {asks.length > 0 && <h3>Asks</h3>}
        {renderAsks(asks, initialCurrency, convertedCurrency)}
      </div>
    </div>
  );
}

export default OrderBookStream;
