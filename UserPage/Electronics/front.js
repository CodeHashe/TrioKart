fetch('http://localhost:3001/electronics')
    .then(response => response.json())
    .then(products =>{
        document.body.style.backgroundColor="gray";
        const productList = document.getElementById("products-list");
        productList.style.display = "inline-flex";
        productList.style.alignContent = "center";
        products.forEach(product => {
            const div = document.createElement('div');
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'; // Adjust weights if needed
            document.head.appendChild(link); 
            div.style.fontFamily = "Montserrat", "Helvetica Neue", "Arial", "sans-serif";
            div.style.height = "300px";
            div.style.width = "300px";
            div.style.backgroundColor="white";
            div.innerHTML = `
                <img src="${product.ImageLink}" alt="${product.Name}" style="width: 150px;height = 150px">
                <h2>${product.Name}</h2>
                <p>Price: ${product.Price} Quantity: ${product.Quantity}</p>
                <button style = "border-radius:15px;background-color:#008000;color:white;">Add to Cart</button>
            `

            ;
            productList.appendChild(div);

        });
    });

