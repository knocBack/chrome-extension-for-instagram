// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'storeScroll') {
      // Store scroll input in Chrome storage
      chrome.storage.local.get('scrollInputs', (data) => {
        let scrollInputs = data.scrollInputs || [];
        scrollInputs.push(message.scrollData);
        chrome.storage.local.set({ 'scrollInputs': scrollInputs });
      });
    }
  });

  console.log("Working, background.js")
