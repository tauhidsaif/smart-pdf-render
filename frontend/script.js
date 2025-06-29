console.log("Script loaded");

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('aadhaarFile').files[0];
  const password = document.getElementById('password').value;
  const formData = new FormData();
  formData.append('aadhaar', file);
  formData.append('password', password);

  try {
    // ✅ Send the request and wait for the response
    const res = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    // ✅ Use same origin for image URLs (no localhost)
    const base = window.location.origin;

    document.getElementById('templateFront').src = base + data.downloadUrlFront;
    document.getElementById('templateBack').src = base + data.downloadUrlBack;

    document.getElementById('templateFront').style.display = 'block';
    document.getElementById('templateBack').style.display = 'block';
    document.getElementById('templatePreview').style.display = 'block';

    document.getElementById('downloadFront').href = base + data.downloadUrlFront;
    document.getElementById('downloadBack').href = base + data.downloadUrlBack;

    document.getElementById('downloadFront').style.display = 'inline-block';
    document.getElementById('downloadBack').style.display = 'inline-block';

  } catch (err) {
    console.error('Upload failed', err);
    alert('Something went wrong');
  }
});
