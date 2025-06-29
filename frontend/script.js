console.log("Script loaded");

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const file = document.getElementById('aadhaarFile').files[0];
  const password = document.getElementById('password').value;
  const formData = new FormData();
  formData.append('aadhaar', file);
  formData.append('password', password);

  try {
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    document.getElementById('templateFront').src = `http://localhost:5000${data.downloadUrlFront}`;
    document.getElementById('templateBack').src = `http://localhost:5000${data.downloadUrlBack}`;

    document.getElementById('templateFront').style.display = 'block';
    document.getElementById('templateBack').style.display = 'block';

    document.getElementById('templatePreview').style.display = 'block';

    document.getElementById('downloadFront').href = `http://localhost:5000${data.downloadUrlFront}`;
    document.getElementById('downloadBack').href = `http://localhost:5000${data.downloadUrlBack}`;

    document.getElementById('downloadFront').style.display = 'inline-block';
    document.getElementById('downloadBack').style.display = 'inline-block';


  } catch (err) {
    console.error('Upload failed', err);
    alert('Something went wrong');
  }
});
