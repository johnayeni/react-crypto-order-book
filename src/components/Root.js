import React, { useContext } from 'react';
import { DataContext } from '../utils/contexts';
import CurrencyPairsPicker from './CurrencyPairsPicker';
import OrderBooksSream from './OrderBookStream';

function Root() {
  const { loading, error, errorOccured } = useContext(DataContext);
  return (
    <React.Fragment>
      <h1>Crypto order book</h1>
      {loading ? (
        <p>Loading trading pairs ...</p>
      ) : (
        <React.Fragment>
          {error || errorOccured ? (
            <p className="error">
              Error occured loading data or streaming data, try reloading the page
            </p>
          ) : (
            <React.Fragment>
              <CurrencyPairsPicker />
              <OrderBooksSream />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Root;
