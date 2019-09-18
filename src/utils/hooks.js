import { useState, useEffect } from 'react';
import { fetchData } from './helpers';

function useInput(initialValue) {
  const [value, setvalue] = useState(initialValue);

  function onValueChange(event) {
    setvalue(event.target.value);
  }

  return [value, onValueChange];
}

function useFetch(url) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDataFromUrl() {
      setloading(true);
      try {
        const res = await fetchData(url);
        setdata(res);
      } catch (error) {
        setError(error);
      } finally {
        setloading(false);
      }
    }
    fetchDataFromUrl();
  }, [url]);
  return { data, loading, error };
}

function useBitStampSubscription(currencyPair) {
  const [orders, setOrders] = useState({ bids: [], asks: [] });
  const [errorOccured, setErrorOccured] = useState(false);

  const BITSTAMP_WEBSOCKET_URL = 'wss://ws.bitstamp.net';

  function serializeDataAndSet(data) {
    const { bids, asks } = data;
    setOrders({ bids, asks });
  }

  useEffect(() => {
    const ws = new WebSocket(BITSTAMP_WEBSOCKET_URL);

    const suscribeMsg = {
      event: 'bts:subscribe',
      data: {
        channel: `detail_order_book_${currencyPair}`,
      },
    };

    const unsuscribeMsg = {
      event: 'bts:unsubscribe',
      data: {
        channel: `detail_order_book_${currencyPair}`,
      },
    };

    function initWebSocket() {
      ws.onopen = () => {
        // suscribe to channel
        ws.send(JSON.stringify(suscribeMsg));
      };

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data);
        switch (response.event) {
          case 'data': {
            serializeDataAndSet(response.data);
            break;
          }
          case 'bts:request_reconnect': {
            // resuscribe if connection fails
            initWebSocket();
            break;
          }
          default:
            break;
        }
      };

      ws.onerror = () => {
        setErrorOccured(true);
      };
    }
    initWebSocket();

    return () => {
      // unsuscribe from channel
      ws.send(JSON.stringify(unsuscribeMsg));
    };
  }, [currencyPair]);

  return [orders, errorOccured];
}

export { useInput, useFetch, useBitStampSubscription };
