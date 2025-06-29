console.log("Script loaded");

// 🌗 Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
if (darkToggle) {
  darkToggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
  });
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('aadhaarFile').files[0];
  const password = document.getElementById('password').value;

  const formData = new FormData();
  formData.append('aadhaar', file);
  formData.append('password', password);

  // Show loading spinner
  const btnText = document.getElementById('btnText');
  const spinner = document.getElementById('spinner');
  if (btnText) btnText.textContent = 'Processing...';
  if (spinner) spinner.classList.remove('hidden');

  try {
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();

    if (btnText) btnText.textContent = 'Generate Aadhaar Card';
    if (spinner) spinner.classList.add('hidden');

    if (data.error) {
      alert(data.error);
      return;
    }

    const base = window.location.origin;

    document.getElementById('templateFront').src = base + data.downloadUrlFront;
    document.getElementById('templateBack').src = base + data.downloadUrlBack;

    document.getElementById('templatePreview').style.display = 'block';
    document.getElementById('downloadFront').href = base + data.downloadUrlFront;
    document.getElementById('downloadBack').href = base + data.downloadUrlBack;

    document.getElementById('downloadFront').style.display = 'inline-block';
    document.getElementById('downloadBack').style.display = 'inline-block';

  } catch (err) {
    if (btnText) btnText.textContent = 'Generate Aadhaar Card';
    if (spinner) spinner.classList.add('hidden');
    console.error('Upload failed', err);
    alert('Something went wrong');
  }
});
