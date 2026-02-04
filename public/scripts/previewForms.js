const main = document.querySelector('.wrapper');
const curtain = document.getElementById('curtain');
const shareFileForm = document.querySelector('.shareFile');
const deleteFileForm = document.querySelector('.deleteFile');
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
  if (!e.target.closest('.fakeBtn')) return;
  const fakeBtn = e.target.closest('.fakeBtn');
  if (fakeBtn) {
    if (fakeBtn.classList.contains('shareBtn')) {
      // Share file 
      toggleForm(shareFileForm);
    } else if (fakeBtn.classList.contains('delBtn')) {
      // Delete file
      toggleForm(deleteFileForm);
    }

  }
});
curtain.addEventListener('click', (e) => {
  if (e.target !== curtain) return;
  hideAll();
})

