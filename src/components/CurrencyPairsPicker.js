import React, { useContext } from 'react';
import { DataContext } from '../utils/contexts';

function renderCurrencyPairOptions(currencyPairs = []) {
  return currencyPairs.map((currencyPair, index) => (
    <option key={index} value={currencyPair.name}>
      {currencyPair.description}
    </option>
  ));
}

function CurrencyPairsPicker() {
  const { currencyPairs, selectedCurrencyPair, onSelectedCurrencyPairChange } = useContext(
    DataContext,
  );
  return (
    <select name="order-books" value={selectedCurrencyPair} onChange={onSelectedCurrencyPairChange}>
      <option value="">Select currency pair</option>
      {renderCurrencyPairOptions(currencyPairs || [])}
    </select>
  );
}

export default CurrencyPairsPicker;
