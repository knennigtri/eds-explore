/**
 * Loads a fragment.
 * @param {string} path The path in the JCR
 * @returns {HTMLElement} The root element in the JCR
 */
export async function loadStockData(path) {
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.html/, '');
    const resp = await fetch(`${path}.json`);
    if (resp.ok) {
      console('resp OK');
      return resp.text();
    }
  }
  return null;
}

export default async function decorate(block) {
  const [sWrapper] = block.children;

  const aemContent = block.querySelector('a');
  let path = aemContent ? aemContent.getAttribute('title') : block.textContent.trim();
  const dirs = path.split('/');
  const symbolText = dirs[dirs.length - 1];

  const titleElement = document.createElement('h2');
  titleElement.textContent = symbolText;

  path += '/trade';

  const stockData = {
    'jcr:primaryType': 'nt:unstructured',
    week52Low: 498.1,
    week52High: 520.48,
    ytdPercentageChange: 0.39365408535881957,
    sector: 'Software',
    timeOfUpdate: '07:16 AM EST',
    upDown: 4.44,
    volume: 1591582,
    rangeHigh: 515.05,
    companyName: 'Adobe, Inc.',
    dayOfLastUpdate: 'Sun December 1, 2019',
    rangeLow: 509.37,
    openPrice: 514.13,
    lastTrade: 518.97,
  };
  // const stockData = await loadStockData(redirectPath);

  if (stockData) {
    const originalTableBody = document.createElement('tbody');
    const table1Body = document.createElement('tbody');
    table1Body.className = 'column1';
    const table2Body = document.createElement('tbody');
    table2Body.className = 'column2';

    Object.entries(stockData).forEach(([key, value]) => {
      if (key !== 'jcr:primaryType') {
        const row = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        keyCell.textContent = key;
        valueCell.textContent = value;
        row.appendChild(keyCell);
        row.appendChild(valueCell);
        originalTableBody.appendChild(row);
      }
    });

    // Split the rows into two tables
    const rows = Array.from(originalTableBody.querySelectorAll('tr'));
    const half = Math.ceil(rows.length / 2);

    rows.forEach((row, index) => {
      if (index < half) {
        table1Body.appendChild(row);
      } else {
        table2Body.appendChild(row);
      }
    });

    const newElementsArray = [titleElement, table1Body, table2Body];

    sWrapper.replaceChildren(...newElementsArray);
  }
}
