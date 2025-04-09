fetch('http://localhost:3001/carparts/headlight')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("products-list");

        products.forEach(product => {
            document.body.style.backgroundColor = "whitesmoke";
            const div = document.createElement('div');
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'; // Adjust weights if needed
            document.head.appendChild(link);
            div.style.fontFamily = "Roboto";
            div.style.height = "175px";
            div.style.width = "1300px";
            div.style.backgroundColor = "white";
            div.style.marginTop = "50px";
            div.style.marginLeft = "10px";
            div.style.borderRadius = "10px";
            div.style.border="3px solid darkslategrey";
            div.style.position = "relative"; // Change to relative positioning
            div.style.display = "inline-block"; // Change to inline-block
            // Link the external CSS file
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'headlight.css'; // Specify the path to your CSS file
            document.head.appendChild(cssLink);
            div.addEventListener("mouseenter", () => {
                div.style.boxShadow = " 0px 0px 0px 5px rgba(0, 0, 0, 0.15)";
                div.style.cursor = "pointer";
            });
            div.addEventListener("mouseleave", () => {
                div.style.boxShadow = "none";
                div.style.cursor = "none";
            });
            div.innerHTML = `
                <img class="h-img" src="${product.ImageLink}" alt="${product.Name}">
                <h2 class="product-name">${product.Name}</h2>
                <p class="product-price">Price: ${product.Price} <span class="product-quantity">Quantity: ${product.Quantity}</span></p>
                <button class="product-buy">Buy Now</button><br><br>
                <button class="product-cart" onclick="addToCart('${product.Name}')">Add to Cart</button>
            `;
            productList.appendChild(div); // Append div to the products-list
            
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

