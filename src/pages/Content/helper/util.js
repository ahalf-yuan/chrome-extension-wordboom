/**
 * util function
 * @param {*} srcContainer
 * @param {*} destContainer
 * @returns
 */
export function moveNodes(srcContainer, destContainer) {
  if (!srcContainer && srcContainer.nodeType !== 1) return;
  if (!destContainer && destContainer.nodeType !== 1) return;

  while (srcContainer.childNodes.length > 0) {
    destContainer.appendChild(srcContainer.childNodes[0]);
  }
}
