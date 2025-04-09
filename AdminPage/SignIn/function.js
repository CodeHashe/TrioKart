const loginForm = document.getElementById('loginForm');
const signInButton = document.getElementById('signIn'); 
const spinner = signInButton.querySelector('.spinner'); 

signInButton.addEventListener('click', (event) => {
    event.preventDefault(); 

    const emailValue = document.getElementById('adminEmail').value;
    const passwordValue = document.getElementById('adminPass').value
    console.log("Email:", emailValue, "Password:", passwordValue); 

    // Your validation logic
    if (!emailValue.includes('@')) {
      event.preventDefault(); 
      alert('Please enter a valid email address with an @ symbol.');
      return; // Stop execution if email is invalid
    }
    signInButton.disabled = true;
    signInButton.classList.add('loading'); // Add a 'loading' class
    spinner.style.opacity = 1;  
    // ... your code to send the login request ...
    sendDataToBackend(emailValue, passwordValue); 
});



function sendDataToBackend(email, password) {
    fetch('http://localhost:3002/admin/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }) 
    })
    .then(response => {
        if (!response.ok) {
            console.error("Error sending data:", response.statusText);
            // You might display an error to the user here
        } else {
            console.log("Login successful, redirecting...");
            window.location = "../Title/index.html"; 
        }
    })
    .catch(error => {
        console.error("Error sending data:", error);
        // Handle network-level errors here if needed
    });
  }


  

