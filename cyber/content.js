// content.js

const port = chrome.runtime.connect({ name: 'content-script' });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'tabUpdated') {
    console.log('Received tabUpdated message');
    
    // Send a message to the background script to check for phishing
    port.postMessage({ message: 'checkPhishing' });
  }
});
