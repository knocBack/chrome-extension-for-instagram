// // Function to send scroll data to server
// function sendScrollDataToServer(scrollData) {
//   fetch('http://localhost:3000/scroll-data', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(scrollData)
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Failed to send scroll data to server');
//       }
//       console.log('Scroll data sent successfully');
//   })
//   .catch(error => {
//       console.error('Error sending scroll data to server:', error);
//   });
// }

// // Retrieve stored scroll inputs
// chrome.storage.local.get('scrollInputs', (data) => {
//   const scrollList = document.getElementById('scrollList');
//   if (data.scrollInputs) {
//       data.scrollInputs.forEach((scrollInput) => {
//           const listItem = document.createElement('li');
//           listItem.textContent = `Timestamp: ${scrollInput.timestamp}, ScrollY: ${scrollInput.scrollY}`;
//           scrollList.appendChild(listItem);
          
//           // Send each scroll input to the server
//           sendScrollDataToServer(scrollInput);
//       });
//   } else {
//       const listItem = document.createElement('li');
//       listItem.textContent = 'No scroll inputs recorded yet.';
//       scrollList.appendChild(listItem);
//   }
// });
