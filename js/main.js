// main.js

// Function to notify during events and exams
function notifyUser(message) {
    alert(message);
}

// Example usage
notifyUser('Welcome to Gegis Class of 2028!');

// Load the list of students
fetch('data/students.json')
    .then(response => response.json())
    .then(data => {
        console.log('Current Students:', data);
    })
    .catch(error => console.error('Error loading students:', error));