// const { status } = require("express/lib/response");

console.log("content.js is working!")

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

// // Listen for changes in the URL
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     if (message.action === 'urlChanged' && message.url.startsWith('https://www.instagram.com/p/')) {
//         sendPostDataToBackground();
//     }
// });

let scrollEvents = [];
let intervalId;

// Function to send scroll data to background script
function sendScrollDataToBackground() {
    try{
        const scrollData = {
            userId: '123', // Hardcoded for now, replace with actual user ID if available
            timestamp: Date.now(),
            scrollY: window.scrollY
        };
        chrome.runtime.sendMessage({
            action: 'storeScrollData', // Add action attribute
            scrollData: scrollData
        });
        scrollEvents.push(scrollData);
        console.log("Scroll data: " + scrollData);
    }catch(e){
        console.log("Error while sending messages: ", e)
    }
}

// // Listen for scroll events
// window.addEventListener('scroll', sendScrollDataToBackground);


let THREASHOLD = 50; // number of posts scrolled in a span of 5 minutes

// Function to send scroll data statistics to background script
function sendScrollStatisticsToBackground() {
    console.log("Scroll Statistics Sent to background");
    if (scrollEvents.length > 0) {
        const totalScrollAmount = scrollEvents.reduce((total, event) => total + event.scrollY, 0);
        const averageScrollAmount = totalScrollAmount / scrollEvents.length;

        // Assuming average post height is 800 pixels
        const averagePostsScrolled = averageScrollAmount / 800;

        // Send statistics to background script
        const statistics = {
            userId: '123', // Hardcoded for now, replace with actual user ID if available
            timestamp: Date.now(),
            totalScrollAmount: totalScrollAmount,
            averageScrollAmount: averageScrollAmount,
            averagePostsScrolled: averagePostsScrolled
        };
        console.log(statistics)
        if(averagePostsScrolled >= THREASHOLD){
            console.log("PASSIVE SCROLLING ALERT! ")
        }
        chrome.runtime.sendMessage({
            action: 'storeScrollStatistics',
            statistics: statistics
        });

        // Clear scroll events for the next interval
        scrollEvents = [];
    }
    else{
        console.log("No scroll events fetched!")
    }
}

// Function to handle scroll events
function handleScrollEvent() {
    const scrollData = {
        timestamp: Date.now(),
        scrollY: window.scrollY
    };
    scrollEvents.push(scrollData);
}

// Start measuring scroll activity
function startScrollMeasurement() {
    intervalId = setInterval(sendScrollStatisticsToBackground, 1 * 5 * 1000); // 5 minutes = 5 * 60 * 1000
    window.addEventListener('scroll', sendScrollDataToBackground);
}

// Stop measuring scroll activity
function stopScrollMeasurement() {
    clearInterval(intervalId);
    window.removeEventListener('scroll', handleScrollEvent);
}
// Start measuring scroll activity initially
startScrollMeasurement();