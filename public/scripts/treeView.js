const tree = document.querySelector('.treeContainer');

tree.addEventListener('click', (e) => {
  e.preventDefault();

  const arrow = e.target.closest('.arrowIcon');
  if (!arrow) return;

  const treeLvl = arrow.closest('.treeLvl');
  if (!treeLvl) return;

  const childBlock = treeLvl.querySelector(':scope > .treeBlock');
  if (!childBlock) return;

  console.log(childBlock);
  childBlock.classList.toggle('collapsed');
  arrow.classList.toggle('rotated');
});


