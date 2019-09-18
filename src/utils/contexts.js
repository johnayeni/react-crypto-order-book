import React from 'react';

const DataContext = React.createContext({
  currencyPairs: [],
  loading: false,
  error: null,
  errorOccured: false,
  selectedCurrencyPair: null,
  orders: { bids: [], asks: [] },
  onSelectedCurrencyPairChange: () => {},
});

export { DataContext };
