document.addEventListener('DOMContentLoaded', (event) => {
    const inputFile = document.getElementById('image');
    const imgeEle = document.getElementById('image-preview');
  
    function showPreview() {
      const files = inputFile.files;
      if (!files || files.length === 0) {
        imgeEle.style.display = 'none';
        console.log('no file selected');
        return;
      }
      const file = files[0];
      imgeEle.src = URL.createObjectURL(file);
      imgeEle.style.display = 'block';
    }
  
    inputFile.addEventListener('change', showPreview);
  });