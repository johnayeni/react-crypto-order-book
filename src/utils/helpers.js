/**
 *
 * @param {string} url
 */
async function fetchData(url) {
  return (await fetch(url)).json();
}

/**
 *
 * @param {string} name
 */
function formatCurrencyPairName(name) {
  return name.replace('/', '').toLowerCase();
}

export { fetchData, formatCurrencyPairName };
