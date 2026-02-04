const main = document.querySelector('.wrapper');
const curtain = document.getElementById('curtain');
const createFolderForm = document.querySelector('.createFolder');
const editFolderForm = document.querySelector('.editFolder');
const shareFolderForm = document.querySelector('.shareFolder');
const deleteFolderForm = document.querySelector('.deleteFolder');
const createFileForm = document.querySelector('.createFile');
const loadingScreen = document.querySelector('.loadingScreen');
function toggleCurtain(div = curtain) {
  div.classList.toggle('invisible');
  div.classList.toggle('flex');
}

function toggleForm(form) {
  toggleCurtain();
  form.classList.toggle('invisible');
}
function hideAll() {
  const forms = document.querySelectorAll('.form');
  for (const f of forms) {
    f.classList.add('invisible');
  }
  toggleCurtain();
}
main.addEventListener('click', (e) => {
  if (!e.target.closest('.btn') && !e.target.closest('.fakeBtn')) return;
  const btn = e.target.closest('.btn');
  const fakeBtn = e.target.closest('.fakeBtn');
  if (btn) {
    if (btn.classList.contains('treeBtn')) {
      // New folder
      toggleForm(createFolderForm);
    } else if (btn.classList.contains('shareBtn')) {
      toggleForm(shareFolderForm);
    } else if (btn.classList.contains('newBtn')) {
      // New file
      toggleForm(createFileForm);
    }
  } else if (fakeBtn) {
    if (fakeBtn.classList.contains('editBtn')) {
      // Delete folder
      toggleForm(editFolderForm);
    } else if (fakeBtn.classList.contains('deleteBtn')) {
      // Delete folder
      toggleForm(deleteFolderForm);
    }

  }

});
curtain.addEventListener('click', (e) => {
  if (e.target !== curtain) return;
  hideAll();
})
document.body.addEventListener('submit', () => {
  toggleCurtain(loadingScreen);
})
