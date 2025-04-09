const greetingText = document.getElementById("greeting");

fetch('http://localhost:3002/Title/index.html')
    .then(response => response.json())
    
