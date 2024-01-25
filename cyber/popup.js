document.addEventListener('DOMContentLoaded', function() {
    chrome.runtime.sendMessage({ message: 'checkPhishing' }, (response) => {
      const isPhishing = response.isPhishing;
  
      const statusElement = document.getElementById('status');
      if (isPhishing) {
        statusElement.innerText = 'Warning: This website may be a phishing site!';
        statusElement.style.color = 'red';
      } else {
        statusElement.innerText = 'This website seems safe.';
        statusElement.style.color = 'green';
      }
    });
  });
  