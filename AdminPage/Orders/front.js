fetch('http://localhost:3002/Products/Orders')
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
            orderIDCell.textContent = order.OrderID;

            const productIDCell = row.insertCell();
            productIDCell.textContent = order.ProductID;

            const userIDCell = row.insertCell();
            userIDCell.textContent = order.UserID;

            orderIDCell.classList.add('poetsen-one-regular');
            productIDCell.classList.add('poetsen-one-regular');
            userIDCell.classList.add('poetsen-one-regular');

            // ... Add more cells for other order properties
        });
    })
    .catch(error => {
        console.error('Error fetching orders:', error);
        // Optionally display a user-friendly error message here
    });
