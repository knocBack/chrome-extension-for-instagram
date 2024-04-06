console.log("popup.js is working")

// Retrieve stored scroll inputs
chrome.storage.local.get('scrollInputs', (data) => {
  const scrollList = document.getElementById('scrollList');
  if (data.scrollInputs) {
      data.scrollInputs.forEach((scrollInput) => {
          const listItem = document.createElement('li');
          listItem.textContent = `Timestamp: ${scrollInput.timestamp}, ScrollY: ${scrollInput.scrollY}`;
          scrollList.appendChild(listItem);
          
        //   // Send each scroll input to the server
        //   sendScrollDataToServer(scrollInput);
      });
  } else {
      const listItem = document.createElement('li');
      listItem.textContent = 'No scroll inputs recorded yet.';
      scrollList.appendChild(listItem);
  }
});

// Retrieve stored scroll statistics
chrome.storage.local.get('scrollStatistics', (data) => {
    const scrollStatsContainer = document.getElementById('scrollStatsContainer');
  
    if (data.scrollStatistics) {
      const scrollStats = data.scrollStatistics;
      const scrollStatsList = document.createElement('ul');

      const totalScrollAmount = document.createElement('li');
      totalScrollAmount.textContent = `Total Scroll Amount: ${scrollStats.totalScrollAmount} pixels`;
      scrollStatsList.appendChild(totalScrollAmount);

      const averageScrollAmount = document.createElement('li');
      averageScrollAmount.textContent = `Average Scroll Amount: ${scrollStats.averageScrollAmount} pixels`;
      scrollStatsList.appendChild(averageScrollAmount);

      const averagePostsScrolled = document.createElement('li');
      averagePostsScrolled.textContent = `Average Posts Scrolled: ${scrollStats.averagePostsScrolled} posts (each post is of 800 pixels)`;
      scrollStatsList.appendChild(averagePostsScrolled);
  
    //   const scrollSpeedItem = document.createElement('li');
    //   scrollSpeedItem.textContent = `Scroll Speed: ${scrollStats.scrollSpeed.toFixed(2)} pixels per millisecond`;
    //   scrollStatsList.appendChild(scrollSpeedItem);
  
    //   const scrollFrequencyItem = document.createElement('li');
    //   scrollFrequencyItem.textContent = `Scroll Frequency: ${scrollStats.scrollFrequency.toFixed(2)} scrolls per second`;
    //   scrollStatsList.appendChild(scrollFrequencyItem);
  
    //   const contentTypeItem = document.createElement('li');
    //   contentTypeItem.textContent = `Content Type: ${scrollStats.contentType}`;
    //   scrollStatsList.appendChild(contentTypeItem);
  
    //   const averageScrollTimeItem = document.createElement('li');
    //   averageScrollTimeItem.textContent = `Average Scroll Time per Post: ${scrollStats.averageScrollTime.toFixed(2)} milliseconds`;
    //   scrollStatsList.appendChild(averageScrollTimeItem);
        
        console.log("scrollStatsList in popup: ", scrollStatsList)
  
      scrollStatsContainer.appendChild(scrollStatsList);
    } else {
      const noStatsMessage = document.createElement('p');
      noStatsMessage.textContent = 'No scroll statistics recorded yet.';
      scrollStatsContainer.appendChild(noStatsMessage);
    }
  });
  