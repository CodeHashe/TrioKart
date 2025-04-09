fetch('http://localhost:3007/carparts')
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("cart-list");

        products.forEach(product => {
            document.body.style.backgroundColor = "white";
            const div = document.createElement('div');
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'; // Adjust weights if needed
            document.head.appendChild(link);
            div.style.fontFamily = "Roboto";
            div.style.height = "100px";
            div.style.width = "200px";
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
            cssLink.href = 'doorhandles.css'; // Specify the path to your CSS file
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
                <button class="product-cart">Add to Cart</button>
                
            `;
            productList.appendChild(div); // Append div to the products-list
            
            
        });
    });
