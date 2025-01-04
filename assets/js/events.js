document.addEventListener('DOMContentLoaded', function() {
    const eventsContainer = document.getElementById('events-container');
    const addEventForm = document.getElementById('addEventForm');
  
    // Function to display events in the timeline
    function displayEvent(name, date, location, description, src) {
      const container = document.createElement('div');
      container.className = date < new Date().toISOString() ? 'container left' : 'container right';
      container.innerHTML = `
        <div class="content">
          <div class="tag">
            <h2>${name}</h2>
          </div>
          <div class="desc">
            <p>Date and Time: ${new Date(date).toLocaleString()}</p>
            <p>Location: ${location}</p>
            <p>Description: ${description}</p>
            <img draggable="false" src="${src}" alt="${name}" />
          </div>
        </div>
      `;
      eventsContainer.appendChild(container);
    }
  
    // Fetch and display existing events (this would typically involve an API call)
    const existingEvents = [
      { name: 'WonderingBlog', date: '2025-03-01T09:00', location: 'Conference Room 1', description: 'March - April event', src: './assets/images/event1.jpg' },
      // Add more events as needed
    ];
  
    existingEvents.forEach(event => {
      displayEvent(event.name, event.date, event.location, event.description, event.src);
    });
  
    // Handle form submission
    addEventForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const name = document.getElementById('eventName').value;
      const date = document.getElementById('eventDate').value;
      const location = document.getElementById('eventLocation').value;
      const description = document.getElementById('eventDescription').value;
      const file = document.getElementById('eventImage').files[0];
      const reader = new FileReader();
  
      reader.onload = function(event) {
        const src = event.target.result;
        displayEvent(name, date, location, description, src);
  
        // Optionally, save the event to the server (requires backend implementation)
        // Example:
        // const formData = new FormData();
        // formData.append('name', name);
        // formData.append('date', date);
        // formData.append('location', location);
        // formData.append('description', description);
        // formData.append('file', file);
        // fetch('/addEvent', {
        //   method: 'POST',
        //   body: formData,
        // }).then(response => response.json()).then(data => {
        //   console.log('Success:', data);
        // }).catch(error => {
        //   console.error('Error:', error);
        // });
  
        // Schedule notifications for the event
        scheduleNotifications(name, date);
      };
  
      reader.readAsDataURL(file);
    });
  });