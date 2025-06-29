// ✅ Enhanced script.js
console.log("Script loaded");

const form = document.getElementById('uploadForm');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btnText');
const submitBtn = document.getElementById('submitBtn');
const cardFlipper = document.getElementById('cardFlipper');
const toast = document.getElementById('toast');
const darkToggle = document.getElementById('darkToggle');

// Toggle dark mode
if (localStorage.getItem('theme') === 'dark') {
  darkToggle.checked = true;
  document.body.classList.add('dark');
}

darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
  localStorage.setItem('theme', darkToggle.checked ? 'dark' : 'light');
});

// Flip card on click
cardFlipper.addEventListener('click', () => {
  cardFlipper.classList.toggle('flipped');
});

// Toast helper
function showToast(message = 'Success!') {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Helper: Set image state
function setImageLoadState(img) {
  img.classList.add('loading');
  img.onload = () => {
    img.classList.remove('loading');
    img.classList.add('loaded');
  };
  img.onerror = () => {
    img.classList.remove('loading');
    img.classList.remove('loaded');
    console.error('Failed to load image:', img.src);
  };
}


// FORM submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('aadhaarFile').files[0];
  const password = document.getElementById('password').value;

  if (!file || !password) return;

  const formData = new FormData();
  formData.append('aadhaar', file);
  formData.append('password', password);

  submitBtn.disabled = true;
  spinner.classList.remove('hidden');
  btnText.textContent = 'Generating...';

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      const base = window.location.origin;
      const templateFront = document.getElementById('templateFront');
      const templateBack = document.getElementById('templateBack');
      const downloadFront = document.getElementById('downloadFront');
      const downloadBack = document.getElementById('downloadBack');

      setImageLoadState(templateFront);
      setImageLoadState(templateBack);

      templateFront.src = base + data.downloadUrlFront;
      templateBack.src = base + data.downloadUrlBack;

      downloadFront.href = base + data.downloadUrlFront;
      downloadBack.href = base + data.downloadUrlBack;

      document.getElementById('templatePreview').style.display = 'block';

      // Wait for both images
      await Promise.all([
        new Promise(res => templateFront.onload = res),
        new Promise(res => templateBack.onload = res)
      ]);

      showToast('Aadhaar card generated successfully!');
    }
  } catch (err) {
    console.error('Upload failed', err);
    alert('Something went wrong');
  } finally {
    btnText.textContent = 'Generate Aadhaar Card';
    spinner.classList.add('hidden');
    submitBtn.disabled = false;
  }
});