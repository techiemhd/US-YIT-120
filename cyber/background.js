// background.js

// Keep track of connected ports
const connectedPorts = new Map();

chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'content-script') {
    console.log('Content script connected');

    // Save the port to the connectedPorts map
    connectedPorts.set(port.sender.tab.id, port);

    port.onDisconnect.addListener(() => {
      // Remove the port when it disconnects
      connectedPorts.delete(port.sender.tab.id);
    });

    port.onMessage.addListener((msg) => {
      if (msg.message === 'checkPhishing') {
        // Your phishing detection logic here
        const phishingDomains = ['example-phishing.com', 'another-phishing-site.com'];

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const currentUrl = new URL(tabs[0].url);
          const isPhishing = phishingDomains.some(domain => currentUrl.hostname.includes(domain));

          console.log('Is phishing:', isPhishing);

          // Send the result back to the content script
          port.postMessage({ isPhishing: isPhishing });
        });
      }
    });
  }
});

// Function to broadcast a message to all connected ports
function broadcastMessage(message) {
  connectedPorts.forEach((port) => {
    port.postMessage(message);
  });
}
