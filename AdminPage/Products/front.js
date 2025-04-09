
const partsList = document.getElementById('car-parts');
const electronicsList = document.getElementById('electronics');
const groceryList = document.getElementById('grocery');

fetch('http://localhost:3002/Products/CarParts')
  .then(response => {
    if (!response.ok) {
      // Improved error handling
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    products.forEach((product) => { // Destructure directly for readability 
      const row = document.createElement('tr');

      // Build cells for each product property
      const productIDCell = document.createElement('td');
      productIDCell.textContent = product.ProductID; 
      row.appendChild(productIDCell);

      const productNameCell = document.createElement('td');
      productNameCell.textContent = product.Name;
      row.appendChild(productNameCell);

      const productPriceCell = document.createElement('td');
      productPriceCell.textContent = `Price: ${product.Price}`;
      row.appendChild(productPriceCell);

      const productQuantityCell = document.createElement('td');
      productQuantityCell.textContent = product.Quantity;

      productIDCell.classList.add('poetsen-one-regular'); 
      productNameCell.classList.add('poetsen-one-regular'); 
      productPriceCell.classList.add('poetsen-one-regular'); 
      productQuantityCell.classList.add('poetsen-one-regular');

      row.appendChild(productQuantityCell);

      // Add the assembled row to the table
      partsList.appendChild(row);
    });
  })
  .catch(error => {
    // Handle fetch errors gracefully
    console.error('Error fetching products:', error);
    // (Optionally) Display an error message to the user
  });

  fetch('http://localhost:3002/Products/Electronics')
  .then(response => {
    if (!response.ok) {
      // Improved error handling
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    products.forEach((product) => { // Destructure directly for readability 
      const row = document.createElement('tr');

      // Build cells for each product property
      const productIDCell = document.createElement('td');
      productIDCell.textContent = product.ProductID; 
      row.appendChild(productIDCell);

      const productNameCell = document.createElement('td');
      productNameCell.textContent = product.Name;
      row.appendChild(productNameCell);

      const productPriceCell = document.createElement('td');
      productPriceCell.textContent = `Price: ${product.Price}`;
      row.appendChild(productPriceCell);

      const productQuantityCell = document.createElement('td');
      productQuantityCell.textContent = product.Quantity;

      productIDCell.classList.add('poetsen-one-regular'); 
      productNameCell.classList.add('poetsen-one-regular'); 
      productPriceCell.classList.add('poetsen-one-regular'); 
      productQuantityCell.classList.add('poetsen-one-regular');


      row.appendChild(productQuantityCell);

      // Add the assembled row to the table
      electronicsList.appendChild(row);
    });
  })
  .catch(error => {
    // Handle fetch errors gracefully
    console.error('Error fetching products:', error);
    // (Optionally) Display an error message to the user
  });

  fetch('http://localhost:3002/Products/Grocery')
  .then(response => {
    if (!response.ok) {
      // Improved error handling
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    products.forEach((product) => { // Destructure directly for readability 
      const row = document.createElement('tr');

      // Build cells for each product property
      const productIDCell = document.createElement('td');
      productIDCell.textContent = product.ProductID; 
      row.appendChild(productIDCell);

      const productNameCell = document.createElement('td');
      productNameCell.textContent = product.Name;
      row.appendChild(productNameCell);

      const productPriceCell = document.createElement('td');
      productPriceCell.textContent = `Price: ${product.Price}`;
      row.appendChild(productPriceCell);

      const productQuantityCell = document.createElement('td');
      productQuantityCell.textContent = product.Quantity;

      productIDCell.classList.add('poetsen-one-regular'); 
      productNameCell.classList.add('poetsen-one-regular'); 
      productPriceCell.classList.add('poetsen-one-regular'); 
      productQuantityCell.classList.add('poetsen-one-regular');


      row.appendChild(productQuantityCell);

      // Add the assembled row to the table
      groceryList.appendChild(row);
    });
  })
  .catch(error => {
    // Handle fetch errors gracefully
    console.error('Error fetching products:', error);
    // (Optionally) Display an error message to the user
  });


const productActionsSelect = document.getElementById('product-actions');

productActionsSelect.addEventListener('change', function() {
    const selectedAction = this.value;
  
    switch (selectedAction) {
      case 'add':
        createAddProductForm(); 
        break;
      case 'update':
        createUpdateProductForm();
        break;
      case 'delete':
        createDeleteProductForm();
        break;
      default: 
    }
  });
  
  function createAddProductForm() {
    const formContainer = document.getElementById('add-product-form-container');
    formContainer.innerHTML = ''; // Clear any previous form
  
    const form = document.createElement('form');
  
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'productName'; // Give the input a name for form submission
    nameInput.placeholder = 'Enter Product Name';
    form.appendChild(nameInput); 

    const productPrice = document.createElement('input');
    productPrice.type = 'number';
    productPrice.name = 'productPrice';
    productPrice.placeholder = 'Enter Product Price';
    form.appendChild(productPrice);

    const productQuantity = document.createElement('input');
    productQuantity.type = 'number';
    productQuantity.name = 'productQuantity';
    productQuantity.placeholder = 'Enter Product Quantity';
    form.appendChild(productQuantity);

    const productImage = document.createElement('input');
    productImage.type = 'url';
    productImage.name = 'productImage';
    productImage.placeholder = 'Enter Product Image';
    form.appendChild(productImage);


    // Create Type dropdown
    const typeSelect = document.createElement('select');
    typeSelect.add(new Option('Electronics', 'electronics')); 
    typeSelect.add(new Option('Grocery', 'grocery'));
    typeSelect.add(new Option('Car Parts', 'car-parts'));
    typeSelect.name = 'productType'
    form.appendChild(typeSelect);

    const productCategory = document.createElement('input');
    productCategory.type = 'text';
    productCategory.name = 'productCategory';
    productCategory.placeholder = 'Enter Product Category';
    form.appendChild(productCategory);
  
    const formButton = document.createElement('button');
    formButton.type = 'button';
    formButton.name = 'formButton';
    formButton.textContent = 'Submit'; 
    formButton.classList.add('submit');
    form.appendChild(formButton);

    formButton.addEventListener('click', (event) => {
    const form = event.target.form; // Get the form element associated with the button  

    const productName = form.elements['productName'].value;
    const productPrice = form.elements['productPrice'].value;
    const productQuantity = form.elements['productQuantity'].value;
    const productImage = form.elements['productImage'].value;
    const productCategory = form.elements['productCategory'].value;
    const productType = form.elements['productType'].value; 
    console.log('Category: ' + productCategory);

    let isValid = true; // Flag to track if all fields are valid

    // Validation checks
    if (!productName) {
        alert('Please enter a product name.');
        isValid = false; 
    } else if (!productPrice) {
        alert('Please enter a product price.');
        isValid = false;
    } else if (!productQuantity) {
        alert('Please enter a product quantity.');
        isValid = false;
    } else if (!productImage) {
        alert('Please enter a product image link.');
        isValid = false;
    } else if (!productCategory) {
        alert('Please select a product category.');
        isValid = false; 
    } else if (!productType) {  
        alert('Please enter a product type.');
        isValid = false; 
    }


    if (isValid) {
        sendDataToBackend(productName, productPrice, productQuantity, productImage, productCategory, productType); 
    } 
    });

    formContainer.appendChild(form);
  }
  
  
  function createUpdateProductForm(){

    const formContainer = document.getElementById('add-product-form-container');
    formContainer.innerHTML = '';

    const form = document.createElement('form');
  
    const inputID = document.createElement('input');
    inputID.type = 'number';
    inputID.name = 'inputID'; // Give the input a name for form submission
    inputID.placeholder = 'Enter Product ID';
    form.appendChild(inputID);

    const inputType = document.createElement('input');
    inputType.type = 'text';
    inputType.name = 'inputType'; // Give the input a name for form submission
    inputType.placeholder = 'Enter the type of info you want to Update (Name,Price or Quantity)';
    form.appendChild(inputType);

    const formButton = document.createElement('button');
    formButton.type = 'button';
    formButton.name = 'formButton';
    formButton.textContent = 'Submit'; 
    formButton.classList.add('submit');
    form.appendChild(formButton);

    formButton.addEventListener('click', (event) => {
        const form = event.target.form; // Get the form element associated with the button  
        let valString;
        let valNumber;
        const productID = form.elements['inputID'].value;
        const updateType = form.elements['inputType'].value;
        console.log(productID);
        let isValid = true; // Flag to track if all fields are valid
        
        if(!checkProductExists(productID)){
            alert("Enter a valid ProductID!");
            isValid = false;
        }

        else if(updateType == 'Price' || updateType == 'price'){
            valNumber = 0;
            valNumber = prompt("Enter Price: ");
            isValid = true;
        }

        else if(updateType == 'Quantity' || updateType == 'quantity'){
            valNumber = 0;
            valNumber = prompt("Enter Quantity: ");
            isValid = true;
        }

        else if(updateType == 'Name' || updateType == 'name'){
            valString = prompt("Enter Name: ");
            isValid = true;
        }

        else{
            alert("Enter a valid update type!");
            isValid = false;
        }
    
        if (isValid && updateType == 'Quantity' || updateType == 'quantity' || updateType == 'Price' || updateType == 'price') {
            sendDataToUpdate(productID,updateType,valNumber); 
        } 

        else if(isValid && updateType == 'Name' || updateType == 'name'){

            sendDataToUpdate(productID,updateType,valString); 
        }

        }
    );

        
    

    formContainer.appendChild(form);

  }

 function createDeleteProductForm(){

    const formContainer = document.getElementById('add-product-form-container');
    formContainer.innerHTML = '';

    const form = document.createElement('form');
  
    const inputID = document.createElement('input');
    inputID.type = 'number';
    inputID.name = 'inputID'; // Give the input a name for form submission
    inputID.placeholder = 'Enter Product ID';
    form.appendChild(inputID);

    const formButton = document.createElement('button');
    formButton.type = 'button';
    formButton.name = 'formButton';
    formButton.textContent = 'Submit'; 
    formButton.classList.add('submit');
    form.appendChild(formButton);

    formButton.addEventListener('click', (event) => {
        const form = event.target.form; // Get the form element associated with the button  
        const productID = form.elements['inputID'].value;
        console.log(productID);
        let isValid = true; // Flag to track if all fields are valid
        
        if(!checkProductExists(productID)){
            alert("Enter a valid ProductID!");
            isValid = false;
        }
    
        if (isValid) {
            sendDataToDelete(productID); 
        } 

        }
    );

    formContainer.append(form);
 }

  async function checkProductExists(productID) {
    try {
      const dataToSend = { productID };
  
      const response = await fetch('http://localhost:3002/Products/Check', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      });
  
      if (!response.ok) {
        throw new Error(`Network response was not ok - ${response.status}`);
      }
  
      const productExists = await response.json(); // Assuming backend sends boolean value
  
      return productExists;
  
    } catch (error) {
      console.error('Error fetching product existence:', error);
      throw error; // Re-throw error to allow handling at a higher level
    }
  }
  
  async function sendDataToUpdate(productID,updateType,val){
    console.log(val);
    const dataToSend = {
        ID: productID,
        Type: updateType,
        Value: val 
     };

     console.log(dataToSend);

     fetch('http://localhost:3002/Products/Update', {  // Adjust URL as needed
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
 
         console.log("Received from Back-End: " + response.body);
 
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

  function sendDataToDelete(productID){

    const dataToSend = {
        ID: productID,
     };

     console.log(dataToSend);

     fetch('http://localhost:3002/Products/Delete', {  // Adjust URL as needed
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
 
         console.log("Received from Back-End: " + response.body);
 
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


function sendDataToBackend(productName, productPrice, productQuantity, productImage, productCategory, productType) {
    const dataToSend = {
        name: productName,
        price: productPrice,
        quantity: productQuantity,
        imageLink: productImage,
        category: productCategory,
        type: productType
    };

    fetch('http://localhost:3002/Products/Add', {  // Adjust URL as needed
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







