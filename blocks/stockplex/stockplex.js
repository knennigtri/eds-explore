// import {
//   decorateMain,
// } from '../../scripts/scripts.js';

// import {
//   loadBlocks,
// } from '../../scripts/aem.js';

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
      console.log(resp.json());
      console.log(resp.text());
      return resp.text();
    }
  }
  return null;
}

export default async function decorate(block) {
  const [sWrapper] = block.children;

  const aemContent = block.querySelector('a');
  const path = aemContent ? aemContent.getAttribute('title') : block.textContent.trim();
  const dirs = path.split('/');
  const symbolText = dirs[dirs.length - 1];

  const titleElement = document.createElement('h2');
  titleElement.textContent = symbolText;

  const redirectPath = `/stocks/${symbolText}/trade`;

  let stockData = {
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
  stockData = await loadStockData(redirectPath);

  let tableBody = '';
  if (stockData) {
    tableBody = document.createElement('p');
    Object.entries(stockData).forEach(([key, value]) => {
      // Create a new row
      if (key !== 'jcr:primaryType') {
        const row = document.createElement('tr');

        // Create cells for key and value
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');

        // Set text content for cells
        keyCell.textContent = key;
        valueCell.textContent = value;

        // Append cells to the row
        row.appendChild(keyCell);
        row.appendChild(valueCell);

        // Append the row to the table body
        tableBody.appendChild(row);
      }
    });
    const newElementsArray = [titleElement, tableBody];

    sWrapper.replaceChildren(...newElementsArray);
  }
}
