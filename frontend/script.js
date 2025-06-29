console.log("Script loaded");

const form = document.getElementById('uploadForm');
const spinner = document.getElementById('spinner');
const btnText = document.getElementById('btnText');
const cardFlipper = document.getElementById('cardFlipper');
const toast = document.getElementById('toast');

// DARK MODE toggle
const darkToggle = document.getElementById('darkToggle');
darkToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', darkToggle.checked);
});

// FORM submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('aadhaarFile').files[0];
  const password = document.getElementById('password').value;
  const formData = new FormData();
  formData.append('aadhaar', file);
  formData.append('password', password);

  // show spinner
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
      document.getElementById('templateFront').src = base + data.downloadUrlFront;
      document.getElementById('templateBack').src = base + data.downloadUrlBack;

      document.getElementById('downloadFront').href = base + data.downloadUrlFront;
      document.getElementById('downloadBack').href = base + data.downloadUrlBack;

      document.getElementById('templatePreview').style.display = 'block';

      // reset spinner
      btnText.textContent = 'Generate Aadhaar Card';
      spinner.classList.add('hidden');

      // show toast
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 4000);
    }
  } catch (err) {
    console.error('Upload failed', err);
    alert('Something went wrong');
    spinner.classList.add('hidden');
    btnText.textContent = 'Generate Aadhaar Card';
  }
});

// Flip card on click
cardFlipper.addEventListener('click', () => {
  cardFlipper.classList.toggle('flipped');
});
