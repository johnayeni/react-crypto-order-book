async function fetchData(url) {
  return (await fetch(url)).json();
}

function formatCurrencyPairName(name) {
  return name.replace('/', '').toLowerCase();
}

export { fetchData, formatCurrencyPairName };
