// Listen for scroll events
window.addEventListener('scroll', () => {
    // Send message to background script with scroll data
    try{
        let scrollData= {
            timestamp: Date.now(),
            scrollY: window.scrollY
        }
        
        chrome.runtime.sendMessage({
        action: 'storeScroll',
        scrollData: scrollData
        });
        console.log("scrollData: ", scrollData);
    }catch(e){
        console.log("Error while sending messages: ", e)
    }

  });
  
  // /Users/prashanth/Bits/4-2/Project @ravikiran Sir/chrome extension for instagram    