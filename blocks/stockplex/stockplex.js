// import { createOptimizedPicture } from '../../scripts/aem.js';
// import { moveInstrumentation } from '../../scripts/scripts.js';

// export default function decorate(block) {
//   /* change to ul, li */
//   const ul = document.createElement('ul');
//   [...block.children].forEach((row) => {
//     const li = document.createElement('li');
//     moveInstrumentation(row, li);
//     while (row.firstElementChild) li.append(row.firstElementChild);
//     [...li.children].forEach((div) => {
//       if (div.children.length === 1 && div.querySelector('picture')) div.className = 'stockplex-stockplex-image';
//       else div.className = 'stockplex-stockplex-body';
//     });
//     ul.append(li);
//   });
//   ul.querySelectorAll('picture > img').forEach((img) => {
//     const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
//     moveInstrumentation(img, optimizedPic.querySelector('img'));
//     img.closest('picture').replaceWith(optimizedPic);
//   });
//   block.textContent = '';
//   block.append(ul);
// }


export default function decorate(block) {
  const [sWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = sWrapper.textContent.trim();
  sWrapper.replaceChildren(blockquote);
}
