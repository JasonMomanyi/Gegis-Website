// Function to schedule notifications
function scheduleNotifications(eventName, eventDate) {
    const date24HoursBefore = new Date(new Date(eventDate).getTime() - (24 * 60 * 60 * 1000));
    const date1HourBefore = new Date(new Date(eventDate).getTime() - (60 * 60 * 1000));
  
    const now = new Date();
  
    if (date24HoursBefore > now) {
      setTimeout(() => {
        sendNotification(`Reminder: ${eventName} is in 24 hours!`);
      }, date24HoursBefore - now);
    }
  
    if (date1HourBefore > now) {
      setTimeout(() => {
        sendNotification(`Reminder: ${eventName} is in 1 hour!`);
      }, date1HourBefore - now);
    }
  }
  
  // Function to send notifications (this can be customized to send notifications to students' phones)
  function sendNotification(message) {
    // For simplicity, we'll use browser notifications
    if (Notification.permission === 'granted') {
      new Notification(message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(message);
        }
      });
    }
  }
  
  // Request notification permission on page load
  document.addEventListener('DOMContentLoaded', function() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  });