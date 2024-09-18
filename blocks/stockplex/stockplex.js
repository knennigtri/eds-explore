export default function decorate(block) {
  const [sWrapper] = block.children;

  const blockquote = document.createElement('blockquote');
  blockquote.textContent = sWrapper.textContent.trim();
  sWrapper.replaceChildren(blockquote);
}
