// // Listen for messages from content script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'storeScroll') {
//       // Store scroll input in Chrome storage
//       chrome.storage.local.get('scrollInputs', (data) => {
//         let scrollInputs = data.scrollInputs || [];
//         scrollInputs.push(message.scrollData);
//         chrome.storage.local.set({ 'scrollInputs': scrollInputs });
//       });
//     }
//   });

//   console.log("Working, background.js")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'storePostData') {
      // Send post data to server
      fetch('http://localhost:3001/post-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ postId: message.postId, postData: message.postData }) // Include postId
    })
    
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to send post data to server');
          }
          console.log('Post data sent successfully');
      })
      .catch(error => {
          console.error('Error sending post data to server:', error);
      });
  }
});


// Listen for changes in the tab URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, { action: 'urlChanged', url: changeInfo.url });
      });
  }
});
