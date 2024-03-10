// Retrieve stored scroll inputs
chrome.storage.local.get('scrollInputs', (data) => {
    const scrollList = document.getElementById('scrollList');
    if (data.scrollInputs) {
      data.scrollInputs.forEach((scrollInput) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Timestamp: ${scrollInput.timestamp}, ScrollY: ${scrollInput.scrollY}`;
        scrollList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement('li');
      listItem.textContent = 'No scroll inputs recorded yet.';
      scrollList.appendChild(listItem);
    }
  });
  