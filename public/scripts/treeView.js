const tree = document.querySelector('.treeContainer');

function toggleArrowColor(arrow) {
  arrow.src = arrow.src.includes('/icons/down-purple.png')
    ? '/icons/down-green.png'
    : '/icons/down-purple.png';
}
document.querySelector('.treeFolder.currentFolder .arrowIcon').src = '/icons/down-green.png';


tree.addEventListener('click', (e) => {
  const arrow = e.target.closest('.arrowIcon');
  if (!arrow) return;

  const treeFolder = arrow.closest('.treeFolder');
  if (!treeFolder) return;

  const treeLvl = arrow.closest('.treeLvl');
  if (!treeLvl) return;

  const childBlock = treeLvl.querySelector(':scope > .treeBlock');
  if (!childBlock) return;

  childBlock.classList.toggle('collapsed');
  arrow.classList.toggle('rotated');

  if (!treeFolder.classList.contains('currentFolder')) {
    toggleArrowColor(arrow);
  }
});

