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



async function sendDataToBackend(email, password) {
  try {
    const response = await fetch('http://localhost:3001/user/signup/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error("Error parsing response as JSON:", error);
      // Try to parse response as text
      try {
        data = JSON.parse(await response.text());
      } catch (parseError) {
        console.error("Error parsing response as string:", parseError);
        throw new Error("Unable to parse response from server");
      }
    }

    if (data.flag !== undefined) {
      console.log("Flag received:", data.flag);

      if(data.flag == 1){

        window.location = "../../Trio Kart.html"


      }



    } else {
      console.error("Flag value is undefined in the response");
      throw new Error("Flag value is undefined in the response");
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Unable to check user existence: " + error.message);
  }
}


  

