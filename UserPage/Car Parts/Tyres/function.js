const addToCartButtons = document.querySelectorAll('button');
addToCartButtons.forEach(button =>{
button.addEventListener('click',(event) =>{
if(event.target.textContent === "Add to Cart"){
    addToCart();
}
})
});

const cartCount = document.querySelector('.cart-count');

function addToCart(){
if(cartCount.textContent === "0"){

    cartCount.style.color = "red";

}

let currentCount = parseInt(cartCount.textContent, 10); // Convert to number
    currentCount++; 
    cartCount.textContent = currentCount; 
}



