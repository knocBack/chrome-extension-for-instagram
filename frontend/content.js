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

// Function to send scroll data to background script
function sendScrollDataToBackground() {
    const scrollData = {
        userId: '123', // Hardcoded for now, replace with actual user ID if available
        timestamp: Date.now(),
        scrollY: window.scrollY
    };
    chrome.runtime.sendMessage({
        action: 'storeScrollData', // Add action attribute
        scrollData: scrollData
    });
}



// Listen for scroll events
window.addEventListener('scroll', sendScrollDataToBackground);


// Listen for scroll events
window.addEventListener('scroll', sendScrollDataToBackground);

  // /Users/prashanth/Bits/4-2/Project @ravikiran Sir/chrome extension for instagram    