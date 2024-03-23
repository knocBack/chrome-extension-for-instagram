// Listen for scroll events
// window.addEventListener('scroll', () => {
//     // Send message to background script with scroll data
//     try{
//         let scrollData= {
//             timestamp: Date.now(),
//             scrollY: window.scrollY
//         }
        
//         chrome.runtime.sendMessage({
//         action: 'storeScroll',
//         scrollData: scrollData
//         });
//         // console.log("scrollData: ", scrollData);
//     }catch(e){
//         console.log("Error while sending messages: ", e)
//     }

//   });
  
  // Function to send post data to background script
// Function to send post data to background script
function sendPostDataToBackground() {
    const targetDiv = document.querySelector('div._a9zs');
    if (targetDiv) {
        const postId = window.location.pathname.split('/').pop(); // Extract postId from URL
        const anchorTags = targetDiv.querySelectorAll('a');
        const postData = Array.from(anchorTags).map(tag => tag.textContent);
        chrome.runtime.sendMessage({
            action: 'storePostData',
            postId: postId,
            postData: postData
        });
    }
}

// Listen for changes in the URL
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'urlChanged' && message.url.startsWith('https://www.instagram.com/p/')) {
        sendPostDataToBackground();
    }
});


  // /Users/prashanth/Bits/4-2/Project @ravikiran Sir/chrome extension for instagram    