import { useFetch, useInput, useBitStampSubscription } from '../utils/hooks';
import { formatCurrencyPairName } from '../utils/helpers';

const TRADING_PAIRS_API_URL = 'https://www.bitstamp.net/api/v2/trading-pairs-info/';

function DataProvider({ render }) {
  const { data: currencyPairs, loading, error } = useFetch(TRADING_PAIRS_API_URL);
  const [selectedCurrencyPair, onSelectedCurrencyPairChange] = useInput('');
  const { orders, errorOccured } = useBitStampSubscription(
    formatCurrencyPairName(selectedCurrencyPair),
  );

  const data = {
    currencyPairs,
    loading,
    error,
    errorOccured,
    selectedCurrencyPair,
    onSelectedCurrencyPairChange,
    orders,
  };

  return render(data);
}

export default DataProvider;
