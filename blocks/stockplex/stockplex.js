import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadBlocks,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadStockData(path) {
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    path = path.replace(/(\.plain)?\.json/, '');
    const resp = await fetch(`${path}.json`);
    if (resp.ok) {
      return resp.text();
      // const main = document.createElement('main');
      // main.innerHTML = await resp.text();

      // // reset base path for media to fragment base
      // const resetAttributeBase = (tag, attr) => {
      //   main.querySelectorAll(`${tag}[${attr}^="./media_"]`).forEach((elem) => {
      //     elem[attr] = new URL(elem.getAttribute(attr), new URL(path, window.location)).href;
      //   });
      // };
      // resetAttributeBase('img', 'src');
      // resetAttributeBase('source', 'srcset');

      // decorateMain(main);
      // await loadBlocks(main);
      // return main;
    }
  }
  return null;
}

export default async function decorate(block) {
  // const [sWrapper] = block.children;

  // const blockquote = document.createElement('blockquote');
  // blockquote.textContent = sWrapper.textContent.trim();
  // sWrapper.replaceChildren(blockquote);

  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const dirs = path.split('/');
  const symbolText = dirs[dirs.length - 1];

  const symbolTitle = document.createfinElement('h2');
  symbolTitle.textContent = symbolText ? symbolText : "Err"


  const fragment = await loadStockData(path+"/trade");
  if (fragment) {
    symbolData = document.createfinElement('p');
    symbolData = textContent = fragment;
    // const fragmentSection = fragment.querySelector(':scope .section');
    // if (fragmentSection) {
    //   block.classList.add(...fragmentSection.classList);
    //   block.classList.remove('section');
    //   block.replaceChildren(...fragmentSection.childNodes);
    // }
  }
}
