// Listen for messages from content script
console.log("background.js is working!")

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
    } else if (message.action === 'storeScrollData_STOPLISTENING') { 
        try{
        // storeScrollInput(message.scrollData);
        // sendScrollDataToServer();
        chrome.storage.local.get('scrollInputs', (data) => {
            let scrollInputs = data.scrollInputs || [];
            scrollInputs.push(message.scrollData);
            chrome.storage.local.set({ 'scrollInputs': scrollInputs });
          });
        }catch(e){
            console.log("Error while storing storeScrollData: ", e)
        }
    }
    else if (message.action === 'storeScroll') {
        try{
        // Store scroll input in Chrome storage
        chrome.storage.local.get('scrollInputs', (data) => {
          let scrollInputs = data.scrollInputs || [];
          scrollInputs.push(message.scrollData);
          chrome.storage.local.set({ 'scrollInputs': scrollInputs });
        });
        }catch(e){
            console.log("Error while storing scrollInputs: ", e)
        }
      }
    else if(message.action === "storeScrollStatistics"){
        try{
            // Store scroll statistics in Chrome storage
            chrome.storage.local.get('scrollStatistics', (data) => {
                let scrollStatistics = data.scrollStatistics || [];
                scrollStatistics.push(message.statistics);
                chrome.storage.local.set({ 'scrollStatistics': scrollStatistics });
                });
        }
        catch(e){
            console.log("Error while storing scrollStatistics: ", e)
        }
    }
});

// Listen for changes in the tab URL
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.url) {
//         chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//             const activeTab = tabs[0];
//             chrome.tabs.sendMessage(activeTab.id, { action: 'urlChanged', url: changeInfo.url });
//         });
//     }
// });

/*
work on these TODO

- **Scroll Speed:** Calculate the average distance scrolled per unit time (millisecond).
- **Scroll Frequency:** Analyze the number of scrolls within a specific timeframe (e.g., scrolls per second).
- **Content Type:** Consider the category assigned by the hashtag model (e.g., is the user scrolling faster through travel posts compared to fashion?).
- **Time Spent per Post:** Track the time spent on each post/reel based on scroll timestamps.

*/


// Function to send scroll data statistics to server
// function sendScrollDataToServer() {
//   if (scrollInputs.length > 0) {
//     // Calculate scroll speed
//     const startTime = scrollInputs[0].timestamp;
//     const endTime = scrollInputs[scrollInputs.length - 1].timestamp;
//     const totalDistance = scrollInputs.reduce((acc, curr) => acc + curr.scrollY, 0);
//     const totalTime = endTime - startTime;
//     const scrollSpeed = totalDistance / totalTime;

//     // Calculate scroll frequency
//     const scrollFrequency = scrollInputs.length / (totalTime / 1000); // Convert to seconds

//     // Determine content type (for demonstration purpose, assume all content is travel-related)
//     const contentType = 'travel';

//     // Calculate time spent per post (average scroll time per post)
//     const averageScrollTime = totalTime / scrollInputs.length;

//     // Send scroll statistics to server
//     fetch('http://localhost:3001/scroll-data', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         scrollSpeed: scrollSpeed,
//         scrollFrequency: scrollFrequency,
//         contentType: contentType,
//         averageScrollTime: averageScrollTime
//       })
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to send scroll data to server');
//       }
//       console.log('Scroll data sent successfully');
//     })
//     .catch(error => {
//       console.error('Error sending scroll data to server:', error);
//     });

//     // Clear scrollInputs array
//     scrollInputs = [];
//   }
// }
