const main = document.querySelector('.wrapper');
const curtain = document.getElementById('curtain');
const createFolderForm = document.querySelector('.createFolder');

function toggleCurtain() {
  curtain.classList.toggle('invisible');
  curtain.classList.toggle('flex');
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
  if (!e.target.closest('.btn')) return;
  const btn = e.target.closest('.btn');
  // New folder
  if (btn.classList.contains('newBtn')) {
    toggleForm(createFolderForm);
  }
});
curtain.addEventListener('click', (e) => {
  if (e.target !== curtain) return;
  hideAll();
})

