fetch('http://localhost:3001/electronics/homeappliances')
    .then(response => response.json())
    .then(products =>{
        const productTable = document.querySelector("table.background tbody");
        let currentRow = null;
        products.forEach((product,index )=> {

            if (index % 4 === 0) {
                currentRow = document.createElement('tr');
                productTable.appendChild(currentRow);
            }
            const cell = document.createElement('td');
            cell.classList.add("container"); 

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'; // Adjust weights if needed
            document.head.appendChild(link); 
            cell.innerHTML = `
                <img src="${product.ImageLink}" alt="${product.Name}">
                <p class="h1">${product.Name}</p>
                <img class = "like-button" src = "https://drive.google.com/thumbnail?id=1bTsrvjARYnZVx8heNZKyfEvqy5lAIDDd">
                <p class = "h1-price">Price: ${product.Price}</p>
                <button class ="h1-buy">Buy Now</button>
                <br/><br/>
                <button class ="h1-buy" onclick="addToCart('${product.Name}')">Add to Cart</button>
            `

            ;
            currentRow.appendChild(cell);

        });
    });

    function addToCart(productName) {
        
        const rawVal = localStorage.getItem('UserID');
        const UserID = parseInt(rawVal,10);
        console.log("UserID Received: " + UserID);
        const data = {
            productName: productName,
            userID: UserID
        };
    
        // Make fetch call to the backend
        fetch('http://localhost:3001/AddToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add item to cart');
            }
            alert('Item added to cart successfully');
            // Optionally, you can handle the response here
            return response.json();
        })
        .then(data => {
            // Optionally, you can handle the response data here
            console.log(data);
        })
        .catch(error => {
            console.error('Error adding item to cart:', error);
            // Optionally, you can handle the error here
        });
    }

    const cartButton = document.querySelector(".cart-logo"); // Replace with your cart button selector

    cartButton.addEventListener("click", () => {
        const rawVal = localStorage.getItem('UserID');
        const UserID = parseInt(rawVal,10);
        const data = {
            userID: UserID
        };
    
      fetch("http://localhost:3001/CheckCart",{
    
    
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    
    
    
      })
        .then(response => response.json())
        .then(cartItems => {
          // Create cart details element
          const cartDetails = document.createElement("div");
          cartDetails.classList.add("cart-details"); // Add a class for styling
          cartDetails.style.display = "none"; // Initially hide the cart
    
          // Generate cart details content
          let cartDetailsContent = "";
          if (cartItems.length === 0) {
            cartDetailsContent = "<p>Your cart is empty!</p>";
          } else {
            cartDetailsContent = `<table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>`;
            cartItems.forEach(cartItem => {
              cartDetailsContent += `
                <tr>
                  <td>${cartItem.Name}</td>
                  <td>${cartItem.Price}</td>
                  <td>${cartItem.Quantity}</td>
                </tr>`;
            });
            cartDetailsContent += `</tbody></table>`;
          }
    
          cartDetails.innerHTML = cartDetailsContent;
    
          // Append cart details to the document body (or desired container)
          document.body.appendChild(cartDetails);
    
          // Show the cart details with animation (optional)
          cartDetails.style.display = "block";
          cartDetails.classList.add("cart-details-show"); // Add a class for animation
    
          // Handle cart details close (optional)
          // ... (add logic to close the cart details on another button click or user interaction)
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
          // Handle errors here (e.g., display an error message to the user)
        });
    });