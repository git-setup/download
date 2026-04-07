const downloadBtn = document.getElementById('downloadBtn');
const instructionsBtn = document.getElementById('instructionsBtn');
const copyBtn = document.getElementById('copyBtn');
const passwordValue = document.getElementById('passwordValue');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');

let progressTimer = null;
let isDownloading = false;

function openModal() {
  modalBackdrop.classList.remove('hidden');
  modalBackdrop.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalBackdrop.classList.add('hidden');
  modalBackdrop.setAttribute('aria-hidden', 'true');
}

function animateDownload(onComplete) {
  clearInterval(progressTimer);

  let progress = 8;
  const checkpoints = [18, 34, 49, 63, 77, 89, 100];
  const labels = [
    'Preparing download...',
    'Checking package...',
    'Generating secure link...',
    'Starting transfer...',
    'Downloading archive...',
    'Finalizing...',
    'Download ready'
  ];

  progressFill.style.width = `${progress}%`;
  progressText.textContent = labels[0];

  let index = 0;
  progressTimer = setInterval(() => {
    progress = checkpoints[index];
    progressFill.style.width = `${progress}%`;
    progressText.textContent = labels[index];
    index += 1;

    if (index >= checkpoints.length) {
      clearInterval(progressTimer);
      isDownloading = false;
      if (typeof onComplete === 'function') {
        window.setTimeout(onComplete, 180);
      }
    }
  }, 300);
}

downloadBtn.addEventListener('click', (event) => {
  event.preventDefault();

  if (isDownloading) {
    return;
  }

  isDownloading = true;
  const targetHref = downloadBtn.getAttribute('href');

  animateDownload(() => {
    if (targetHref) {
      window.location.href = targetHref;
    }
  });
});

instructionsBtn.addEventListener('click', openModal);
modalClose.addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

copyBtn.addEventListener('click', async () => {
  const original = copyBtn.textContent;

  try {
    await navigator.clipboard.writeText(passwordValue.textContent.trim());
    copyBtn.textContent = 'Copied';
  } catch {
    copyBtn.textContent = 'Failed';
  }

  window.setTimeout(() => {
    copyBtn.textContent = original;
  }, 1400);
});
