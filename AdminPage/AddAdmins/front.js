fetch('http://localhost:3002/Products/AddAdmins')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(orders => {
        const ordersTable = document.getElementById('car-parts'); // Assuming 'ordersTable' is your table's ID

        // Data Rows
        orders.forEach(order => {
            const row = ordersTable.insertRow(); 

            const orderIDCell = row.insertCell();
            orderIDCell.textContent = order.AdminID;

            const productIDCell = row.insertCell();
            productIDCell.textContent = order.Email;

            orderIDCell.classList.add('poetsen-one-regular');
            productIDCell.classList.add('poetsen-one-regular');

            // ... Add more cells for other order properties
        });
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
        // Optionally display a user-friendly error message here
    });

    const productActionsSelect = document.getElementById('product-actions');
    productActionsSelect.addEventListener('change', function() {
        const selectedAction = this.value;
      
        switch (selectedAction) {
          case 'add':
            createAdminsForm(); 
            break;
          case 'delete':
            deleteAdminsForm();
            break;
          default: 
        }
      });

function createAdminsForm(){


    const formContainer = document.getElementById('add-product-form-container');
    formContainer.innerHTML = ''; // Clear any previous form
  
    const form = document.createElement('form');
  
    const adminEmail = document.createElement('input');
    adminEmail.type = 'text';
    adminEmail.name = 'adminEmail'; // Give the input a name for form submission
    adminEmail.placeholder = 'Enter Admin Email';
    form.appendChild(adminEmail); 

    const adminPass = document.createElement('input');
    adminPass.type = 'password';
    adminPass.name = 'adminPass'; // Give the input a name for form submission
    adminPass.placeholder = 'Enter Admin Password';
    form.appendChild(adminPass); 

    const formButton = document.createElement('button');
    formButton.type = 'button';
    formButton.name = 'formButton';
    formButton.textContent = 'Submit'; 
    formButton.classList.add('submit');
    form.appendChild(formButton);

    formButton.addEventListener('click', (event) => {
        const form = event.target.form; // Get the form element associated with the button  
    
        const adminEmail = form.elements['adminEmail'].value;
        const adminPass = form.elements['adminPass'].value;
    
        let isValid = true; // Flag to track if all fields are valid
    
        // Validation checks
        if(!adminEmail.includes('@')){
            alert("Enter a valid Email!");
            isValid = false;
        }
    
        if (isValid) {
            sendDataToBackend(adminEmail,adminPass); 
        } 
        });
    
        formContainer.appendChild(form);
}

function sendDataToBackend(adminEmail,adminPass){

    const dataToSend = {
        email: adminEmail,
        password: adminPass,
    };

    fetch('http://localhost:3002/AddAdmins', {  // Adjust URL as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(responseFromBackend => {
        // Handle the response from the backend (success or error)
        console.log('Success:', responseFromBackend); 
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the fetch error and potentially display an error message to the user
    });
}

function deleteAdminsForm(){

    const formContainer = document.getElementById('add-product-form-container');
    formContainer.innerHTML = ''; // Clear any previous form
  
    const form = document.createElement('form');
  
    const adminID = document.createElement('input');
    adminID.type = 'number';
    adminID.name = 'adminID'; // Give the input a name for form submission
    adminID.placeholder = 'Enter Admin ID';
    form.appendChild(adminID); 

    const formButton = document.createElement('button');
    formButton.type = 'button';
    formButton.name = 'formButton';
    formButton.textContent = 'Submit'; 
    formButton.classList.add('submit');
    form.appendChild(formButton);

    formButton.addEventListener('click', (event) => {
        const form = event.target.form; // Get the form element associated with the button  
    
        const adminID = form.elements['adminID'].value;
    
        let isValid = true; // Flag to track if all fields are valid
    
        // Validation checks
    
         sendDataToDelete(adminID);  
        });
    
        formContainer.appendChild(form);
}

function sendDataToDelete(adminID){

    const dataToSend = {
       ID:adminID
    };

    fetch('http://localhost:3002/DeleteAdmins', {  // Adjust URL as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then(responseFromBackend => {
        // Handle the response from the backend (success or error)
        console.log('Success:', responseFromBackend); 
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle the fetch error and potentially display an error message to the user
    });
}

