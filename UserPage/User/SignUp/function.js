
const loginForm = document.getElementById('loginForm');
const signInButton = document.getElementById('signIn'); 
const spinner = signInButton.querySelector('.spinner'); 

signInButton.addEventListener('click', (event) => {
    event.preventDefault(); 
    const usernameValue = document.getElementById('userName').value;
    const emailValue = document.getElementById('adminEmail').value;
    const passwordValue = document.getElementById('adminPass').value
    console.log("Email:", emailValue, "Password:", passwordValue, "Username:",usernameValue); 

    // Your validation logic
    let isValid = 1;

    if (!emailValue.includes('@')) {
      event.preventDefault(); 
      alert('Please enter a valid email address with an @ symbol.');
      isValid = 0;
    }

    CheckUserExists(usernameValue, emailValue, passwordValue)
    .then(flag => {
      console.log("Value received from Flag: " + flag);
      if (flag) {
        alert('User Exists! Please SignIn!');
        isValid = 0;
      }
    })
    .catch(error => {
      console.error("Error checking user existence:", error);
    });
  

  if(isValid){
    signInButton.disabled = true;
    signInButton.classList.add('loading'); // Add a 'loading' class
    spinner.style.opacity = 1;  
    // ... your code to send the login request ...
    sendDataToBackend(usernameValue,emailValue,passwordValue);
    
  }
});



// Get the value of the userID cookie


async function sendDataToBackend(username, email, password) {
    const response = await fetch('http://localhost:3001/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });
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
      if (data.ID !== undefined) {
      console.log("ID received:", data.ID);
      localStorage.setItem("UserID",`${data.ID}`);
    } else {
      console.error("Flag value is undefined in the response");
      throw new Error("Flag value is undefined in the response");
    }

  }

async function CheckUserExists(username, email, password) {
  try {
    const response = await fetch('http://localhost:3001/user/signup/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
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
      return data.flag;
    } else {
      console.error("Flag value is undefined in the response");
      throw new Error("Flag value is undefined in the response");
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Unable to check user existence: " + error.message);
  }
}




  

